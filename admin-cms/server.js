const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs').promises;
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../menu-images')));
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../menu-images'));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));

function requireLogin(req, res, next) {
  if (req.session && req.session.loggedIn) return next();
  res.redirect('/login');
}

// Root route - redirect to login
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    req.session.loggedIn = true;
    res.redirect('/admin');
  } else {
    res.render('login', { error: 'Invalid password' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.get('/admin', requireLogin, (req, res) => {
  res.render('admin-home');
});

// Menu Management Routes
app.get('/admin/menu', requireLogin, (req, res) => {
  res.render('menu-management');
});

// API Routes for Menu Items
app.get('/api/menu-items', requireLogin, async (req, res) => {
  try {
    const menuDataPath = path.join(__dirname, '../menu-data.json');
    const menuData = JSON.parse(await fs.readFile(menuDataPath, 'utf8'));
    
    const { category } = req.query;
    let items = menuData.menu;
    
    if (category && category !== 'all') {
      items = items.filter(item => item.category === category);
    }
    
    res.json(items);
  } catch (error) {
    console.error('Error reading menu data:', error);
    res.status(500).json({ error: 'Failed to load menu items' });
  }
});

app.get('/api/menu-items/:id', requireLogin, async (req, res) => {
  try {
    const menuDataPath = path.join(__dirname, '../menu-data.json');
    const menuData = JSON.parse(await fs.readFile(menuDataPath, 'utf8'));
    
    const item = menuData.menu.find(item => item.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error reading menu item:', error);
    res.status(500).json({ error: 'Failed to load menu item' });
  }
});

app.post('/api/menu-items', requireLogin, upload.single('image'), async (req, res) => {
  try {
    const menuDataPath = path.join(__dirname, '../menu-data.json');
    const menuData = JSON.parse(await fs.readFile(menuDataPath, 'utf8'));
    
    const newItem = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description || '',
      price: parseFloat(req.body.price),
      category: req.body.category,
      image: req.file ? `/menu-images/${req.file.filename}` : null,
      dietary: req.body.dietary ? (Array.isArray(req.body.dietary) ? req.body.dietary : [req.body.dietary]) : [],
      outOfStock: req.body.outOfStock === 'on'
    };
    
    menuData.menu.push(newItem);
    await fs.writeFile(menuDataPath, JSON.stringify(menuData, null, 2));
    
    // Regenerate menu.html
    await regenerateMenuHtml(menuData);
    
    res.json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ success: false, message: 'Failed to add menu item' });
  }
});

app.put('/api/menu-items/:id', requireLogin, upload.single('image'), async (req, res) => {
  try {
    const menuDataPath = path.join(__dirname, '../menu-data.json');
    const menuData = JSON.parse(await fs.readFile(menuDataPath, 'utf8'));
    
    const itemIndex = menuData.menu.findIndex(item => item.id === req.params.id);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    
    const updatedItem = {
      ...menuData.menu[itemIndex],
      name: req.body.name,
      description: req.body.description || '',
      price: parseFloat(req.body.price),
      category: req.body.category,
      dietary: req.body.dietary ? (Array.isArray(req.body.dietary) ? req.body.dietary : [req.body.dietary]) : [],
      outOfStock: req.body.outOfStock === 'on'
    };
    
    if (req.file) {
      updatedItem.image = `/menu-images/${req.file.filename}`;
    }
    
    menuData.menu[itemIndex] = updatedItem;
    await fs.writeFile(menuDataPath, JSON.stringify(menuData, null, 2));
    
    // Regenerate menu.html
    await regenerateMenuHtml(menuData);
    
    res.json({ success: true, item: updatedItem });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ success: false, message: 'Failed to update menu item' });
  }
});

app.delete('/api/menu-items/:id', requireLogin, async (req, res) => {
  try {
    const menuDataPath = path.join(__dirname, '../menu-data.json');
    const menuData = JSON.parse(await fs.readFile(menuDataPath, 'utf8'));
    
    const itemIndex = menuData.menu.findIndex(item => item.id === req.params.id);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    
    menuData.menu.splice(itemIndex, 1);
    await fs.writeFile(menuDataPath, JSON.stringify(menuData, null, 2));
    
    // Regenerate menu.html
    await regenerateMenuHtml(menuData);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ success: false, message: 'Failed to delete menu item' });
  }
});

// Function to regenerate menu.html
async function regenerateMenuHtml(menuData) {
  try {
    const menuTemplate = await fs.readFile(path.join(__dirname, '../menu.html'), 'utf8');
    
    // This is a simplified version - in a real implementation, you'd want to use a proper template engine
    // For now, we'll just update the menu data and let the existing menu.html handle the display
    console.log('Menu data updated, menu.html regeneration would happen here');
  } catch (error) {
    console.error('Error regenerating menu.html:', error);
  }
}

app.listen(PORT, () => {
  console.log(`Admin CMS running at http://localhost:${PORT}`);
}); 