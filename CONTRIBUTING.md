# 🤝 Contributing to Shoe Bank

Thank you for considering contributing to Shoe Bank! This document provides guidelines for contributing to the project.

---

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

---

## 📜 Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Expected Behavior
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior
- Harassment or discriminatory language
- Trolling or insulting comments
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

---

## 🚀 Getting Started

### Prerequisites
Before contributing, ensure you have:
- Node.js (v18+)
- MongoDB
- Git
- Code editor (VS Code recommended)
- Basic knowledge of MERN stack

### Fork and Clone
1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/SHOE_BANK_MERNSTACK.git
cd SHOE_BANK_MERNSTACK
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/HajithMohamed/SHOE_BANK_MERNSTACK.git
```

### Install Dependencies
```bash
# Backend
cd Back-End
npm install

# Frontend
cd ../Front-End/Shoe-bank-frontend
npm install
```

### Setup Environment
```bash
# Backend
cd Back-End
cp .env.example .env
# Edit .env with your configuration
```

---

## 💻 Development Workflow

### 1. Create a Branch
Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/issue-description
# or
git checkout -b hotfix/critical-fix
```

**Branch Naming Convention:**
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or fixes

### 2. Make Changes
- Write clean, readable code
- Follow the coding standards (see below)
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes
```bash
# Backend
cd Back-End
npm run dev

# Frontend
cd Front-End/Shoe-bank-frontend
npm run dev
```

### 4. Commit Changes
Follow the commit message guidelines (see below):
```bash
git add .
git commit -m "feat: add product filtering by price range"
```

### 5. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request
- Go to GitHub and create a Pull Request
- Fill in the PR template
- Link related issues
- Wait for review

---

## 📝 Coding Standards

### JavaScript/Node.js

#### Naming Conventions
- **Variables & Functions**: camelCase
  ```javascript
  const userName = "John";
  function getUserProfile() {}
  ```

- **Classes**: PascalCase
  ```javascript
  class UserController {}
  ```

- **Constants**: UPPER_SNAKE_CASE
  ```javascript
  const MAX_FILE_SIZE = 5;
  const API_BASE_URL = "http://localhost:5000";
  ```

- **Files**: kebab-case
  ```
  user-controller.js
  auth-middleware.js
  ```

#### Code Style
- Use **const** by default, **let** when reassignment needed
- Avoid **var**
- Use arrow functions for callbacks
- Use async/await instead of callbacks
- Add JSDoc comments for functions:
  ```javascript
  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User object
   */
  async function getUserById(userId) {
    // implementation
  }
  ```

### React/JSX

#### Component Structure
```jsx
import React from 'react';

/**
 * ProductCard component
 * @param {Object} product - Product data
 */
const ProductCard = ({ product }) => {
  // Hooks at the top
  const [isLiked, setIsLiked] = React.useState(false);

  // Event handlers
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // Render
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <button onClick={handleLike}>
        {isLiked ? 'Unlike' : 'Like'}
      </button>
    </div>
  );
};

export default ProductCard;
```

#### Best Practices
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use PropTypes or TypeScript for type checking
- Avoid inline styles (use CSS modules or styled-components)

### Backend Structure

#### Controller Pattern
```javascript
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Product = require('../Models/Product');

exports.getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    data: { product }
  });
});
```

#### Error Handling
- Always use `catchAsync` wrapper for async routes
- Use `AppError` for operational errors
- Provide meaningful error messages
- Don't expose sensitive information in errors

---

## 📝 Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (deps, build, etc.)
- **perf**: Performance improvements

### Examples
```bash
feat(product): add price range filtering

Add ability to filter products by minimum and maximum price.
Includes backend API changes and frontend UI updates.

Closes #123
```

```bash
fix(auth): resolve JWT token expiration issue

Fixed bug where JWT tokens were not being refreshed properly,
causing users to be logged out prematurely.

Fixes #456
```

```bash
docs(readme): update installation instructions

Added detailed steps for MongoDB setup and environment
variable configuration.
```

### Best Practices
- Use present tense ("add" not "added")
- Use imperative mood ("move" not "moves")
- Keep first line under 72 characters
- Reference issues in footer (Closes #123, Fixes #456)
- Explain **what** and **why**, not **how**

---

## 🔄 Pull Request Process

### Before Submitting
1. **Update your branch** with latest upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests** (when available):
   ```bash
   npm test
   ```

3. **Lint your code**:
   ```bash
   npm run lint
   ```

4. **Build successfully**:
   ```bash
   npm run build
   ```

### PR Title Format
Follow the same format as commit messages:
```
feat(customer): add customer search functionality
```

### PR Description Template
```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Added customer search by name
- Implemented pagination for results
- Updated API documentation

## Testing
- [ ] Tested locally
- [ ] Added unit tests
- [ ] Tested on different browsers

## Screenshots (if applicable)
![Screenshot](url)

## Related Issues
Closes #123
Related to #456

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have commented complex code sections
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested my changes
```

### Review Process
1. At least one approval required
2. All CI checks must pass
3. No merge conflicts
4. Code review feedback addressed
5. Documentation updated if needed

---

## 🧪 Testing

### Writing Tests
```javascript
// Example test structure
describe('Product Controller', () => {
  describe('GET /api/product/:id', () => {
    it('should return product if ID is valid', async () => {
      // Arrange
      const productId = '64a1b2c3d4e5f6g7h8i9j0k1';
      
      // Act
      const response = await request(app)
        .get(`/api/product/${productId}`)
        .expect(200);
      
      // Assert
      expect(response.body.success).toBe(true);
      expect(response.body.data.product).toBeDefined();
    });

    it('should return 404 if product not found', async () => {
      const invalidId = '64a1b2c3d4e5f6g7h8i9j0k2';
      
      const response = await request(app)
        .get(`/api/product/${invalidId}`)
        .expect(404);
      
      expect(response.body.success).toBe(false);
    });
  });
});
```

### Test Coverage
Aim for:
- Unit tests: 80%+ coverage
- Integration tests for critical paths
- E2E tests for main user flows

---

## 📚 Documentation

### Code Comments
```javascript
/**
 * Calculate discounted price
 * @param {number} price - Original price
 * @param {number} discountPercent - Discount percentage (0-100)
 * @returns {number} Discounted price
 * @example
 * calculateDiscount(1000, 10) // returns 900
 */
function calculateDiscount(price, discountPercent) {
  return price - (price * discountPercent / 100);
}
```

### API Documentation
- Update `API_DOCUMENTATION.md` for new endpoints
- Include request/response examples
- Document all query parameters
- List possible error responses

### README Updates
- Update README.md if you add new features
- Add screenshots for UI changes
- Update installation steps if dependencies change

---

## 🐛 Reporting Bugs

### Bug Report Template
```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen

**Actual Behavior**
What actually happened

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 20.10.0]

**Additional Context**
Any other relevant information
```

---

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this feature needed? Who benefits?

**Proposed Solution**
How should this be implemented?

**Alternatives Considered**
Other approaches you've thought about

**Additional Context**
Mockups, examples, etc.
```

---

## 🎯 Areas for Contribution

We welcome contributions in these areas:

### Backend
- [ ] Implement order management system
- [ ] Add payment gateway integration
- [ ] Create analytics endpoints
- [ ] Implement caching with Redis
- [ ] Add unit tests
- [ ] API rate limiting

### Frontend
- [ ] Build product listing page
- [ ] Create shopping cart UI
- [ ] Design admin dashboard
- [ ] Implement responsive navigation
- [ ] Add loading states and animations
- [ ] Accessibility improvements

### DevOps
- [ ] CI/CD pipeline setup
- [ ] Docker Compose configuration
- [ ] Kubernetes deployment
- [ ] Monitoring and logging
- [ ] Performance optimization

### Documentation
- [ ] API endpoint examples
- [ ] Video tutorials
- [ ] Architecture diagrams
- [ ] Deployment guides
- [ ] Troubleshooting guide

---

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Email**: [Developer email]

---

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Shoe Bank! 🎉

**Happy Coding!** 👨‍💻👩‍💻
