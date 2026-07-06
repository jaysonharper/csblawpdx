# Project Structure Improvements

This document outlines the enhanced project structure following modern best practices for static web applications.

## 📁 Current Directory Structure

```
src/
├── app.main.js          # Application entry point
├── main.test.js         # App-level unit tests
├── main.dom.test.js     # DOM interaction tests (browser)
├── components/          # Lit web components
│   ├── flow-alert.js
│   ├── flow-attorney-card.js
│   ├── flow-button.js
│   ├── flow-call-button.js
│   ├── flow-floating-call-button.js
│   ├── flow-navbar.js
│   ├── flow-scroll-to-top.js
│   ├── flow-scales-icon.js  # Deprecated – inlined as static SVG in navbar
│   ├── service-highlights.js
│   ├── index.js             # Component registry & exports
│   └── *.test.js            # Co-located component tests
└── styles/              # Modular CSS (PostCSS + Tailwind)
    ├── main.css
    ├── base/            # reset, variables, typography
    ├── components/      # hero, services, attorneys, etc.
    ├── layout/          # sections, animations
    └── utilities/       # responsive, scroll

tests/
├── unit/index.js        # Component registry smoke tests
└── integration/index.js # App-level integration tests
```

## 🎯 Benefits of New Structure

### **Better Organization**

- Clear separation of concerns
- Easier to locate specific files
- Scalable for team development

### **Improved Maintainability**

- Logical grouping of related files
- Consistent naming conventions
- Better dependency management

### **Enhanced Developer Experience**

- Faster file discovery
- Better IDE support
- Clearer project navigation

## 🚀 Migration Guide

### **1. Moving Components**

Consider organizing existing components:

```
# UI Components (move to ui/)
- flow-button.js
- flow-alert.js

# Layout Components (move to layout/)
- flow-navbar.js
- flow-scroll-to-top.js
```

### **2. Static Assets**

Place images, icons, and fonts in:

```
src/assets/
├── images/logo.svg
├── icons/scale.svg
└── fonts/roboto.woff2
```

### **3. Utility Functions**

Extract reusable logic to:

```
src/utils/
├── index.js        # Main utilities
├── validation.js   # Form validation
└── formatting.js   # Data formatting
```

## 🧪 Testing Strategy

### **Unit Tests**

- Individual component testing
- Utility function testing
- CSS module testing

### **Integration Tests**

- Component interaction testing
- CSS compilation testing
- Cross-browser compatibility

## 📦 Environment Configuration

Use `.env.example` as template:

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

## 🛠️ Development Workflow

### **Component Development**

1. Create component in `src/components/`
2. Export from `src/components/index.js`
3. Write co-located unit tests (`component.test.js`)
4. Document in `/docs`

### **Style Development**

1. Use existing modular CSS structure
2. Follow BEM or utility-first approach
3. Test across breakpoints
4. Validate with CSS tests

## 📚 Documentation

- Component docs in `/docs`
- Setup guides in README
- Architecture decisions in ADRs

## 🔄 Future Improvements

### **Potential Additions**

- TypeScript support
- Component library packaging
- Automated testing pipeline
- Performance monitoring

### **Scalability Considerations**

- Micro-frontend architecture
- Component versioning
- Design system integration
- API layer abstraction
