# 🚀 Deployment Guide - Shoe Bank

This guide covers deploying Shoe Bank to various platforms.

---

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Backend Deployment](#backend-deployment)
  - [Render](#deploy-to-render)
  - [Railway](#deploy-to-railway)
  - [Heroku](#deploy-to-heroku)
- [Frontend Deployment](#frontend-deployment)
  - [Vercel](#deploy-to-vercel)
  - [Netlify](#deploy-to-netlify)
- [Database Setup](#database-setup)
- [Docker Deployment](#docker-deployment)
- [Domain Configuration](#domain-configuration)
- [SSL/TLS Setup](#ssltls-setup)
- [Monitoring & Logging](#monitoring--logging)

---

## ✅ Prerequisites

Before deploying, ensure you have:
- [ ] GitHub account with repository access
- [ ] MongoDB Atlas account (for cloud database)
- [ ] Cloudinary account (for image storage)
- [ ] Email service (Mailtrap/SendGrid/Gmail)
- [ ] Domain name (optional but recommended)

---

## 🔧 Environment Configuration

### Production Environment Variables

Create production `.env` file:

```env
# Production Settings
NODE_ENV=production
PORT=5000

# Database (MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shoebank?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=production-secret-key-32-chars-minimum
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Production)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM=noreply@shoebank.lk

# Frontend URL
FRONTEND_URL=https://shoebank.lk

# Security
OTP_EXPIRES_IN=10
MAX_FILE_SIZE=5
```

---

## 🌐 Backend Deployment

### Deploy to Render

#### Step 1: Create Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

#### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   ```
   Name: shoebank-backend
   Region: Select closest to your users
   Branch: main
   Root Directory: Back-End
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

#### Step 3: Add Environment Variables
Add all production environment variables from the list above.

#### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Note your backend URL: `https://shoebank-backend.onrender.com`

#### Important Render Settings
```yaml
# render.yaml (optional, place in root)
services:
  - type: web
    name: shoebank-backend
    env: node
    region: oregon
    plan: free
    buildCommand: cd Back-End && npm install
    startCommand: cd Back-End && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        generateValue: true
```

---

### Deploy to Railway

#### Step 1: Setup
1. Visit [railway.app](https://railway.app)
2. Login with GitHub
3. Click "New Project"

#### Step 2: Deploy from GitHub
1. Select "Deploy from GitHub repo"
2. Choose your repository
3. Select backend service

#### Step 3: Configuration
```bash
# Railway automatically detects Node.js
# Add environment variables in Railway dashboard
```

#### Step 4: Custom Start Command
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

#### Step 5: Add MongoDB
1. In Railway dashboard: "New" → "Database" → "Add MongoDB"
2. Copy connection string to `MONGODB_URI`

---

### Deploy to Heroku

#### Step 1: Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

#### Step 2: Create App
```bash
cd Back-End
heroku create shoebank-backend
```

#### Step 3: Add MongoDB
```bash
heroku addons:create mongolab:sandbox
```

#### Step 4: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key
heroku config:set CLOUDINARY_CLOUD_NAME=your-cloud-name
# ... add all other variables
```

#### Step 5: Create Procfile
```
web: npm start
```

#### Step 6: Deploy
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

---

## 🎨 Frontend Deployment

### Deploy to Vercel

#### Option 1: Vercel CLI
```bash
cd Front-End/Shoe-bank-frontend
npm install -g vercel
vercel login
vercel
```

#### Option 2: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import Git Repository
3. Select `Front-End/Shoe-bank-frontend` as root directory
4. Framework Preset: Vite
5. Build Command: `npm run build`
6. Output Directory: `dist`

#### Environment Variables
```env
VITE_API_URL=https://shoebank-backend.onrender.com/api
```

#### vercel.json Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

### Deploy to Netlify

#### Option 1: Netlify CLI
```bash
cd Front-End/Shoe-bank-frontend
npm install -g netlify-cli
netlify login
netlify init
```

#### Option 2: Drag and Drop
```bash
npm run build
# Drag dist/ folder to netlify.com
```

#### Option 3: Git Integration
1. Connect GitHub repository
2. Set build settings:
   ```
   Base directory: Front-End/Shoe-bank-frontend
   Build command: npm run build
   Publish directory: Front-End/Shoe-bank-frontend/dist
   ```

#### netlify.toml Configuration
```toml
[build]
  base = "Front-End/Shoe-bank-frontend"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "https://shoebank-backend.onrender.com/api"
```

---

## 🗄️ Database Setup

### MongoDB Atlas

#### Step 1: Create Cluster
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up / Login
3. Create free M0 cluster
4. Choose region (closest to backend server)

#### Step 2: Create Database User
1. Database Access → Add New User
2. Username: `shoebank_admin`
3. Password: Generate secure password
4. Database User Privileges: Read and Write to any database

#### Step 3: Network Access
1. Network Access → Add IP Address
2. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or whitelist your server's IP for better security

#### Step 4: Get Connection String
1. Clusters → Connect
2. Choose "Connect your application"
3. Copy connection string:
   ```
   mongodb+srv://shoebank_admin:<password>@cluster0.xxxxx.mongodb.net/shoebank?retryWrites=true&w=majority
   ```
4. Replace `<password>` with actual password

#### Step 5: Create Database
```javascript
// Database will be created automatically
// Name: shoebank (as specified in connection string)
```

---

## 🐳 Docker Deployment

### Using Docker Compose

#### Step 1: Build and Run
```bash
# From project root
docker-compose up -d
```

#### Step 2: Verify Services
```bash
docker-compose ps
```

#### Step 3: View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

#### Step 4: Stop Services
```bash
docker-compose down
```

### Production Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build: ./Back-End
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
    restart: unless-stopped

  frontend:
    build: ./Front-End
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
    command: nginx -g 'daemon off;'

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - backend
      - frontend
```

---

## 🌍 Domain Configuration

### Option 1: Custom Domain on Vercel
1. Vercel Dashboard → Project Settings → Domains
2. Add domain: `shoebank.lk`
3. Configure DNS records (provided by Vercel):
   ```
   Type: A
   Name: @
   Value: 76.76.19.19

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Option 2: Custom Domain on Netlify
1. Netlify → Domain Settings → Add custom domain
2. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### Backend Domain Configuration
If using custom domain for backend:
```
Type: A
Name: api
Value: <your-server-ip>
```
Result: `api.shoebank.lk`

---

## 🔒 SSL/TLS Setup

### Automatic SSL (Vercel/Netlify)
- SSL certificates are automatic and free
- Automatically renewed

### Manual SSL (Let's Encrypt)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d shoebank.lk -d www.shoebank.lk

# Auto-renewal
sudo certbot renew --dry-run
```

### Nginx SSL Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name shoebank.lk www.shoebank.lk;

    ssl_certificate /etc/letsencrypt/live/shoebank.lk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/shoebank.lk/privkey.pem;

    location / {
        proxy_pass http://frontend:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name shoebank.lk www.shoebank.lk;
    return 301 https://$server_name$request_uri;
}
```

---

## 📊 Monitoring & Logging

### Application Monitoring

#### 1. Sentry (Error Tracking)
```bash
npm install @sentry/node
```

```javascript
// server.js
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

#### 2. PM2 (Process Manager)
```bash
npm install -g pm2

# Start app
pm2 start server.js --name shoebank-backend

# Monitor
pm2 monit

# Logs
pm2 logs shoebank-backend

# Restart
pm2 restart shoebank-backend

# Auto-start on boot
pm2 startup
pm2 save
```

#### 3. Winston (Logging)
```bash
npm install winston
```

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Shoe Bank

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          cd Back-End
          npm install
      
      - name: Run tests
        run: |
          cd Back-End
          npm test
      
      - name: Deploy to Render
        env:
          RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
        run: |
          curl -X POST https://api.render.com/v1/services/${{ secrets.RENDER_SERVICE_ID }}/deploys \
          -H "Authorization: Bearer $RENDER_API_KEY"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./Front-End/Shoe-bank-frontend
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend is accessible via API URL
- [ ] Frontend loads correctly
- [ ] Database connection is successful
- [ ] Image upload works (Cloudinary)
- [ ] Email sending works
- [ ] Authentication flow works
- [ ] CORS is configured correctly
- [ ] SSL certificate is active
- [ ] Custom domain is working
- [ ] Monitoring is set up
- [ ] Backups are configured
- [ ] Error logging is working
- [ ] Performance is acceptable
- [ ] Security headers are set

---

## 🐛 Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem**: Frontend can't connect to backend

**Solution**:
```javascript
// server.js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

#### 2. Database Connection Failed
**Problem**: Can't connect to MongoDB

**Solution**:
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure network access is configured

#### 3. Images Not Loading
**Problem**: Cloudinary images don't display

**Solution**:
- Verify Cloudinary credentials
- Check API key permissions
- Ensure CORS is configured in Cloudinary

#### 4. JWT Cookie Not Set
**Problem**: Authentication doesn't persist

**Solution**:
```javascript
res.cookie('jwt', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none'
});
```

---

## 📞 Support

For deployment issues:
- GitHub Issues: [Repository Issues](https://github.com/HajithMohamed/SHOE_BANK_MERNSTACK/issues)
- Email: [Support email]

---

**Last Updated**: February 2026  
**Version**: 1.0.0
