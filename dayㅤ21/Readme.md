#  Advanced Frontend Master Project

**Live Demo:**  
 https://yashhh710.github.io/Frontend-Master/

---

## Project Overview

The **Advanced Frontend Master Project** is a complete all-in-one frontend architecture built using pure **HTML5 and CSS3**.

This project demonstrates senior-level frontend skills including:

- Semantic HTML structure
- Advanced CSS layouts (Grid + Flexbox)
- Accessibility best practices
- Performance optimization strategies
- Responsive design system
- Dark mode support
- Reduced motion support
- UI components & animations
- Modern CSS techniques

All implemented inside a **single production-ready structure (1 HTML + 1 CSS file).**

---

# Project Structure

        
Frontend-Master/                           
│                              
├── README.md                   
├── Report.pdf            
├── index.html                               
└── style.css                        

           
---

# Design Decisions

## 01 Single File Architecture
- Built using **one HTML file + one CSS file**
- Sections modularized using semantic `<section>` blocks
- Clear internal comments for maintainability
- Organized component styling inside a structured CSS file

## 02 Mobile-First Strategy
- Base styles target small devices
- Progressive enhancement for larger screens
- Better performance on low-powered devices

## 03 Semantic HTML5
Used proper structural elements:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<aside>`
- `<footer>`

Benefits:
- Improved SEO
- Better accessibility
- Clean document structure

## 04 Layout Strategy
- **CSS Grid** → complex layouts (dashboard, 12-column grid)
- **Flexbox** → alignment and responsive components
- Logical properties → future-ready layout scaling

## 05 Component-Based CSS
- Reusable UI components
- Utility-based helpers
- Organized animation sections
- CSS Custom Properties (Variables)
- BEM-inspired naming methodology

---

#  Breakpoints Used

Mobile-first responsive system.

| Breakpoint | Usage |
|------------|--------|
| 480px | Small mobile landscape |
| 768px | Tablet layout |
| 1024px | Laptop layout |
| 1440px | Large desktop |

Additional responsive techniques:
- Orientation-based queries
- 5-breakpoint grid demo
- Fluid typography using `clamp()`
- CSS-only hamburger navigation

---

#  Accessibility Features

Built following accessibility best practices (WCAG-inspired).

##  Semantic Landmarks
Proper structural elements improve screen reader navigation.

##  ARIA Usage
- `aria-label`
- `aria-labelledby`
- `aria-describedby`
- Accessible navigation
- Accessible dropdown menus
- Accessible modal structure

ARIA is used only when native HTML elements are insufficient.

##  Keyboard Accessibility
- Logical tab order
- Visible focus states
- No keyboard traps

##  Forms Accessibility
- `<fieldset>` and `<legend>`
- Pattern validation
- Proper `<label>` associations
- Structured multi-step form layout

##  Media Accessibility
- Video with captions
- Optimized image alt text
- Responsive image handling (`<picture>`, `srcset`, `sizes`)

##  Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none;
    transition: none;
  }
}
 Dark Mode Support
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111;
    --text: #f5f5f5;
  }
}
