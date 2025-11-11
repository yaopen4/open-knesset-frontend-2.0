# Design & Visual Identity

## Overall Aesthetic
The design emphasizes **clarity, trust, and consistency** through structured layouts, neutral tones, and restrained use of color.  
The overall composition reflects **professionalism and transparency**, while remaining approachable and community-oriented.  

---

## Layout & Grid System

### Structure
- Two-column grid with a **fixed sidebar** and a **flexible main content area**.  
- On desktop, the sidebar remains visible; on mobile and tablet, it collapses into a drawer accessible via a header toggle.  
- The page container is **centered with a max width of 1200px** and balanced padding on both sides.  

### Grid
- **12-column responsive grid**, aligned to a **baseline rhythm** for consistent vertical spacing.  
- **Gutter width:** 16–24px depending on viewport.  
- **Margins and padding:** scale fluidly across breakpoints.  
- **Text width:** limited to 60–80 characters per line for optimal readability.  

---

## Header & Navigation

### Header
- **Fixed top header** spanning full viewport width, visible during scroll.  
- Contains:
  - **Site logo/title** (right-aligned for RTL)  
  - **Main navigation links** (About, Map, Dashboard, etc.)  
  - **Sidebar toggle button** for mobile  
- **Background:** `#FFFFFF`  
- **Shadow:** `0 2px 4px rgba(0, 0, 0, 0.1)` for subtle elevation.  

### Navigation Links
- **Font weight:** medium; uppercase or title case.  
- **Active state:** underline or right border in `#0F4C94` (Primary Blue).  
- **Hover state:** text color `#1976D2` (Light Blue).  
- **Spacing:** 24–32px between items.  

---

## Sidebar Panel

### Behavior
- Positioned on the **right** (RTL layout).  
- Default width: **260px**; collapses to 0 on smaller screens.  
- Smooth transition (`0.3s ease-in-out`) for open/close.  
- Scrollable independently of the main content area.  

### Content
- Vertical list of navigation links.  
- **Background:** `#F5F5F5`  
- **Active item:** bold text with right border in `#0F4C94`.  
- **Hover state:** background `#1976D2`.  
- **Dividers:** `1px solid #E0E0E0`.  

---

## Main Content Area
- Positioned **left of the sidebar** (in RTL).  
- Flexible width adjusts to remaining space.  
- Section titles use **Primary Blue (#0F4C94)**.  
- **Paragraph spacing:** line height `1.6`, with `24px` margin between blocks.  
- **Max readable width:** `900px`.  

---

## Color Palette

| Role | Color | Hex Code | Usage |
|------|--------|-----------|--------|
| **Primary Blue** | ![#0F4C94](https://via.placeholder.com/15/0F4C94/000000?text=+) `#0F4C94` | Primary accent for headers, buttons, active links |
| **Light Blue** | ![#1976D2](https://via.placeholder.com/15/1976D2/000000?text=+) `#1976D2` | Hover states and secondary elements |
| **Light Grey** | ![#F5F5F5](https://via.placeholder.com/15/F5F5F5/000000?text=+) `#F5F5F5` | Backgrounds and section dividers |
| **Medium Grey** | ![#E0E0E0](https://via.placeholder.com/15/E0E0E0/000000?text=+) `#E0E0E0` | Borders and subtle UI elements |
| **Dark Grey** | ![#333333](https://via.placeholder.com/15/333333/000000?text=+) `#333333` | Headings and body text |
| **Red (Alert)** | ![#C62828](https://via.placeholder.com/15/C62828/000000?text=+) `#C62828` | Warnings and error states |
| **Teal** | ![#00838F](https://via.placeholder.com/15/00838F/000000?text=+) `#00838F` | Data visualization and service accents |

All color combinations meet **WCAG AA** accessibility standards.

---

## Typography

| Element | Font | Weight | Size (Desktop) | Notes |
|----------|------|--------|----------------|--------|
| **H1** | Assistant / Arimo / Open Sans | 700 | 32–36px | Page titles |
| **H2** | Assistant / Arimo / Open Sans | 600 | 24–28px | Section headings |
| **Body** | Assistant / Arimo / Open Sans | 400 | 16–18px | High-contrast paragraph text |
| **Small Text / Captions** | Assistant / Arimo / Open Sans | 400 | 13–14px | Labels and metadata |

- Text alignment: **Right-aligned (RTL)**  
- Line height: **1.6–1.8**  
- Headings maintain consistent spacing before and after.  

---

## Tone & Accessibility
- **Tone:** Neutral, authoritative, and civic-minded.  
- **Voice:** Clear, factual, and free of jargon.  
- **Accessibility:**
  - Fully supports **RTL** Hebrew layout.  
  - Meets **WCAG 2.1 AA** contrast and keyboard standards.  
  - Interactive elements maintain **visible focus** and **hover states**.  

---

## Interaction & Motion
- **Transition duration:** 150–300ms  
- **Easing:** `ease-in-out` for smooth and predictable interactions.  
- Sidebar and menu animations are responsive and purposeful.  
- Avoid excessive animation to maintain clarity.  

---
