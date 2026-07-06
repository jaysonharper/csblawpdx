# Footer Component Documentation

## Overview

The footer component provides a professional, responsive footer for the Law Offices of Carson, Seegmuller & Baker LLP website. It features different layouts for desktop/tablet and mobile devices, ensuring optimal user experience across all screen sizes.

## Features

### 🖥️ Desktop/Tablet Footer

- **Business branding**: Law firm name and tagline prominently displayed
- **Navigation links**: Quick access to main site sections
- **Professional styling**: Dark gradient background matching the navbar theme
- **Copyright notice**: Full business name and rights statement

### 📱 Mobile Footer

- **Compact design**: Minimal vertical space usage
- **Essential information only**: Business name and simplified copyright
- **No redundant navigation**: Eliminates duplicate links (hamburger menu provides navigation)
- **Responsive typography**: Optimized font sizes for mobile screens

## Implementation

### HTML Structure

```html
<footer
  class="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white border-t border-gray-700"
>
  <div class="max-w-6xl mx-auto px-4">
    <!-- Desktop/Tablet Footer (md and up) -->
    <div class="hidden md:block py-12">
      <!-- Business Name -->
      <div class="text-center mb-8">
        <h3 class="text-2xl font-bold text-white mb-2">
          Law Offices of Carson, Seegmuller & Baker LLP
        </h3>
        <p class="text-gray-300 text-sm">Professional Legal Services</p>
      </div>

      <!-- Navigation Links -->
      <div class="flex justify-center mb-8">
        <nav class="flex flex-wrap justify-center gap-6 md:gap-8">
          <a href="#services">Services</a>
          <a href="#attorneys">Attorneys</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#find-us">Find Us</a>
        </nav>
      </div>

      <!-- Copyright -->
      <div class="text-center pt-6 border-t border-gray-700">
        <p class="text-gray-400 text-sm">
          &copy; 2026 Law Offices of Carson, Seegmuller & Baker LLP. All rights
          reserved.
        </p>
      </div>
    </div>

    <!-- Mobile Footer (compact) -->
    <div class="md:hidden py-6 text-center">
      <h4 class="text-lg font-semibold text-white mb-2">
        Law Offices of Carson, Seegmuller & Baker LLP
      </h4>
      <p class="text-gray-400 text-xs">&copy; 2026 All rights reserved.</p>
    </div>
  </div>
</footer>
```

### CSS Classes Used

#### Layout Classes

- `relative`: Enables absolute positioning for floating elements
- `hidden md:block`: Desktop/tablet only content
- `md:hidden`: Mobile only content
- `max-w-6xl mx-auto px-4`: Centered container with responsive padding

#### Styling Classes

- `bg-gradient-to-r from-gray-900 to-gray-800`: Dark gradient background
- `text-white`: Primary text color
- `border-t border-gray-700`: Top border separation
- `py-12` / `py-6`: Responsive vertical padding

#### Typography Classes

- `text-2xl font-bold`: Desktop business name
- `text-lg font-semibold`: Mobile business name
- `text-gray-300` / `text-gray-400`: Muted text colors
- `text-sm` / `text-xs`: Responsive font sizes

## Floating Elements Integration

The footer includes special positioning logic for floating UI elements:

### Smart Positioning System

- **Normal state**: Floating elements stay fixed at viewport bottom
- **Footer visible**: Elements pin above footer with 2rem margin
- **Smooth transitions**: CSS animations handle state changes

### Technical Implementation

- Footer uses `position: relative` to enable absolute positioning context
- Floating components observe footer visibility using Intersection Observer API
- When footer intersects viewport, components switch from `position: fixed` to `position: absolute`

## Responsive Breakpoints

### Mobile (< 768px)

- Compact footer with minimal content
- Single column layout
- Reduced vertical padding (`py-6`)
- Simplified copyright text

### Desktop/Tablet (≥ 768px)

- Full footer with complete navigation
- Multi-section layout with visual hierarchy
- Increased vertical padding (`py-12`)
- Complete copyright statement

## Accessibility Features

### Semantic HTML

- Proper `<footer>` element
- Heading hierarchy (`<h3>`, `<h4>`)
- Navigation wrapped in `<nav>` element
- Meaningful link text

### Visual Design

- High contrast text colors
- Sufficient color contrast ratios
- Clear visual hierarchy
- Consistent spacing and typography

### Interactive Elements

- Hover states for navigation links
- Smooth transitions for better UX
- Touch-friendly target sizes on mobile

## Testing

The footer includes comprehensive test coverage:

```bash
npm run test:node
```

### Test Categories

- **Structure tests**: Verify HTML element presence and attributes
- **Content tests**: Ensure correct text content and business information
- **Responsive tests**: Validate mobile/desktop layout differences
- **Accessibility tests**: Check semantic HTML and ARIA compliance
- **Styling tests**: Verify CSS classes and responsive behavior

## Maintenance Notes

### Business Information Updates

- Business name: Update in both desktop and mobile sections
- Copyright year: Update annually in both sections
- Navigation links: Modify href attributes and link text as needed

### Styling Modifications

- Color scheme: Modify gradient and text color classes
- Spacing: Adjust padding and margin classes
- Typography: Update font size and weight classes

### Mobile Optimization

- Consider content priority for mobile users
- Test on various device sizes
- Ensure touch targets meet accessibility guidelines

## Related Components

### Floating Call Button

- Observes footer for smart positioning
- Pins above footer when footer is in view
- Positioned bottom-left with 2rem margin

### Scroll to Top Button

- Observes footer for smart positioning
- Pins above footer when footer is in view
- Positioned bottom-right with 2rem margin

## Browser Support

- **Modern browsers**: Full support with CSS Grid and Flexbox
- **Tailwind CSS**: Provides cross-browser compatibility
- **Intersection Observer**: Supported in all modern browsers
- **CSS Gradients**: Widely supported background styling
