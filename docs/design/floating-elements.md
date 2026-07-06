# Floating Elements Smart Positioning

## Overview

The floating UI elements (call button and scroll-to-top button) feature intelligent positioning that prevents overlap with the footer content. This system uses Intersection Observer API to detect when the footer comes into view and automatically adjusts element positioning.

## Components Affected

### Flow Floating Call Button

- **File**: `src/components/flow-floating-call-button.js`
- **Position**: Bottom-left corner
- **Functionality**: Appears when hero section is out of view

### Flow Scroll to Top Button

- **File**: `src/components/flow-scroll-to-top.js`
- **Position**: Bottom-right corner
- **Functionality**: Appears when hero section is out of view

## Smart Positioning Logic

### Default State (Fixed Positioning)

```css
:host {
  position: fixed;
  bottom: 2rem;
  left: 2rem; /* or right: 2rem for scroll-to-top */
  z-index: 999;
}
```

### Pinned State (Absolute Positioning)

```css
:host([pinned]) {
  position: absolute;
  bottom: auto;
  top: -5rem;
  left: 2rem; /* or right: 2rem for scroll-to-top */
}
```

## Technical Implementation

### Intersection Observer Setup

Each floating component sets up two intersection observers:

1. **Hero Observer**: Controls visibility based on hero section
2. **Footer Observer**: Controls pinned positioning based on footer

```javascript
_setupFooterObserver() {
  requestAnimationFrame(() => {
    this._footerElement = document.querySelector("footer");

    if (this._footerElement) {
      this._footerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Pin button when footer comes into view
            this.pinned = entry.isIntersecting;
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        }
      );

      this._footerObserver.observe(this._footerElement);
    }
  });
}
```

### Component Properties

Both components include a new `pinned` property:

```javascript
static properties = {
  visible: { type: Boolean, reflect: true },
  pinned: { type: Boolean, reflect: true },
};
```

### Lifecycle Management

```javascript
connectedCallback() {
  super.connectedCallback();
  this._setupIntersectionObserver(); // Hero observer
  this._setupFooterObserver();       // Footer observer
}

disconnectedCallback() {
  super.disconnectedCallback();
  if (this._intersectionObserver) {
    this._intersectionObserver.disconnect();
  }
  if (this._footerObserver) {
    this._footerObserver.disconnect();
  }
}
```

## Positioning Behavior

### Scenario 1: Normal Scrolling

- Elements remain fixed to viewport bottom
- Maintain 2rem margin from screen edges
- Standard z-index layering

### Scenario 2: Footer Approaches

- Intersection Observer detects footer entering viewport
- Components receive `pinned="true"` attribute
- CSS switches to absolute positioning
- Elements position 5rem above footer top

### Scenario 3: Footer Leaves View

- Intersection Observer detects footer leaving viewport
- Components receive `pinned="false"` attribute
- CSS reverts to fixed positioning
- Elements return to viewport bottom position

## Cross-Screen Compatibility

### Mobile Devices

- Compact footer reduces potential overlap
- Smart positioning still active
- Touch-friendly button sizes maintained

### Tablets

- Full footer with navigation links
- Optimal spacing maintained
- Responsive positioning adjustments

### Desktop

- Complete footer experience
- Maximum content without overlap
- Precise positioning control

## Performance Considerations

### Efficient Observer Management

- Single observer per component per target
- Proper cleanup on component destruction
- RequestAnimationFrame for DOM-ready detection

### CSS Transitions

- Smooth animations between states
- Hardware-accelerated transforms
- Minimal reflow/repaint operations

```css
:host {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Memory Management

- Observers disconnected on component removal
- No memory leaks from uncleaned observers
- Efficient DOM queries with caching

## Testing Coverage

### Unit Tests

- Observer setup verification
- State change validation
- Property reflection testing
- Event dispatching confirmation

### Integration Tests

- Footer interaction testing
- Multi-component coordination
- Responsive behavior validation

### Browser Tests

- Cross-browser observer support
- CSS positioning compatibility
- Animation performance testing

## Debugging and Troubleshooting

### Common Issues

1. **Elements not pinning**

   - Verify footer has correct selector
   - Check Intersection Observer support
   - Validate CSS positioning context

2. **Positioning incorrect**

   - Ensure footer has `position: relative`
   - Check CSS specificity conflicts
   - Verify z-index layering

3. **Performance issues**
   - Monitor observer callback frequency
   - Check for observer memory leaks
   - Validate CSS animation efficiency

### Debug Tools

```javascript
// Add to component for debugging
connectedCallback() {
  super.connectedCallback();
  console.log('Setting up observers for:', this.tagName);
  this._setupIntersectionObserver();
  this._setupFooterObserver();
}

// Monitor state changes
updated(changedProperties) {
  if (changedProperties.has('pinned')) {
    console.log('Pinned state changed:', this.pinned);
  }
}
```

## Future Enhancements

### Potential Improvements

- Dynamic margin calculation based on footer height
- Multiple footer support for complex layouts
- Animation customization options
- Performance monitoring and optimization

### Accessibility Enhancements

- Screen reader announcements for position changes
- High contrast mode support
- Reduced motion preferences
- Keyboard navigation considerations
