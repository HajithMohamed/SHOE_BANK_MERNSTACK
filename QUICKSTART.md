# ⚡ Quick Start Guide - Shoe Bank

Get Shoe Bank running on your local machine in 5 minutes!

---

## 🎯 Prerequisites

Before you begin, make sure you have:
- ✅ Node.js (v18 or higher) - [Download](https://nodejs.org/)
- ✅ MongoDB - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)
- ✅ Git - [Download](https://git-scm.com/)
- ✅ Code Editor (VS Code recommended)

---

## 🚀 5-Minute Setup

### Step 1: Clone Repository (30 seconds)
```bash
git clone https://github.com/HajithMohamed/SHOE_BANK_MERNSTACK.git
cd SHOE_BANK_MERNSTACK
```

### Step 2: Setup Backend (2 minutes)

#### Install Dependencies
```bash
cd Back-End
npm install
```

#### Configure Environment
```bash
# Create .env file
cp .env.example .env
```

Edit `.env` file with your settings (minimum required):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shoebank
JWT_SECRET=your-secret-key-minimum-32-characters-long
```

#### Start Backend Server
```bash
npm run dev
```

✅ Backend running at **http://localhost:5000**

### Step 3: Setup Frontend (1.5 minutes)

Open a new terminal:

```bash
cd Front-End/Shoe-bank-frontend
npm install
npm run dev
```

✅ Frontend running at **http://localhost:5173**

---

## 🎉 You're Ready!

Open your browser and visit:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/home

---

## 🔧 Optional: Full Configuration

For full functionality, add these to your `.env`:

### Cloudinary (Image Upload)
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from Dashboard
3. Add to `.env`:
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Email Service (Mailtrap for Testing)
1. Sign up at [mailtrap.io](https://mailtrap.io)
2. Create inbox and get credentials
3. Add to `.env`:
```env
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your-mailtrap-username
MAILTRAP_PASS=your-mailtrap-password
```

---

## 🐳 Quick Start with Docker

If you prefer Docker:

```bash
# From project root
docker-compose up -d
```

That's it! All services (MongoDB, Backend, Frontend) start automatically.

Access:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- MongoDB: localhost:27017

Stop services:
```bash
docker-compose down
```

---

## 📱 Test the API

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

### Get Homepage Data
```bash
curl http://localhost:5000/api/home
```

---

## 🛠️ Common Issues & Fixes

### Issue: MongoDB Connection Failed
**Error**: `MongoServerError: connect ECONNREFUSED`

**Fix**:
```bash
# Make sure MongoDB is running
# Windows: Start MongoDB service
# Mac/Linux: 
mongod

# OR use MongoDB Atlas (cloud database)
# Update MONGODB_URI in .env with Atlas connection string
```

### Issue: Port Already in Use
**Error**: `Port 5000 is already in use`

**Fix**:
```bash
# Change port in .env
PORT=5001

# Or kill the process using the port (Windows):
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### Issue: npm install fails
**Error**: `EACCES` or permission errors

**Fix**:
```bash
# Clear npm cache
npm cache clean --force

# Install again
npm install

# If still fails, use sudo (Mac/Linux):
sudo npm install
```

---

## 📚 Next Steps

Now that you're up and running:

1. **Read the Documentation**
   - [README.md](README.md) - Full project overview
   - [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
   - [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute

2. **Explore the Features**
   - Register an admin account
   - Add some products
   - Create customer accounts
   - Upload product images

3. **Start Developing**
   - Check the [Roadmap](README.md#-roadmap)
   - Pick a feature to implement
   - Read [Contributing Guidelines](CONTRIBUTING.md)
   - Create a pull request

---

## 🆘 Need Help?

- **Documentation**: Check [README.md](README.md) and [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Issues**: [GitHub Issues](https://github.com/HajithMohamed/SHOE_BANK_MERNSTACK/issues)
- **Questions**: Create a discussion on GitHub
- **Email**: [Your support email]

---

## 📖 Useful Commands

### Backend
```bash
# Development with auto-reload
npm run dev

# Production mode
npm start

# Check for errors
npm run lint
```

### Frontend
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Docker
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild images
docker-compose up -d --build
```

### MongoDB
```bash
# Connect to local MongoDB
mongosh

# Use shoebank database
use shoebank

# View collections
show collections

# View all users
db.users.find()

# Clear all data (be careful!)
db.dropDatabase()
```

---

## ✅ Verification Checklist

Make sure everything is working:

- [ ] Backend starts without errors
- [ ] Frontend loads in browser
- [ ] Can access http://localhost:5173
- [ ] API responds at http://localhost:5000/api/home
- [ ] MongoDB connection successful
- [ ] No console errors in browser
- [ ] Can register a new user (if email configured)

---

## 🎓 Learning Resources

New to MERN stack? Check these resources:

- **MongoDB**: [MongoDB University](https://university.mongodb.com/)
- **Express.js**: [Express Documentation](https://expressjs.com/)
- **React**: [React Documentation](https://react.dev/)
- **Node.js**: [Node.js Documentation](https://nodejs.org/docs/)
- **Vite**: [Vite Guide](https://vitejs.dev/guide/)

---

## 🚀 Ready to Deploy?

When you're ready to go live:
1. Read [DEPLOYMENT.md](DEPLOYMENT.md)
2. Choose your hosting platform
3. Configure production environment
4. Deploy!

---

**Happy Coding! 🎉**

Need help? Don't hesitate to ask in [GitHub Discussions](https://github.com/HajithMohamed/SHOE_BANK_MERNSTACK/discussions)!
