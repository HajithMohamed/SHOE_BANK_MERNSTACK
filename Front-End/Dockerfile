# Frontend Dockerfile for Shoe Bank

# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY Shoe-bank-frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY Shoe-bank-frontend/ .

# Expose Vite development server port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host"]
