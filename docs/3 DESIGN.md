# Design & Visual Identity

[[File Goal: The LOOK and FEEL (UI/UX standards).]]

## 1. Visual Language

- **Design Standard**: Strictly follows the **gov.il design language**.
- **Aesthetic**: Emphasizes clarity, trust, and consistency using structured layouts and professional, neutral tones.
- **Tone**: Authoritative yet approachable, focusing on transparency and accessibility.

## 2. Layout & Grid

- **Layout**: Two-column responsive grid with a fixed sidebar (right-aligned for RTL) and a flexible main content area.
- **Max Width**: 1200px centered container.
- **Grid**: 12-column system with 16-24px gutters.
- **Typography Limit**: 60-80 characters per line for optimal readability.

## 3. Color Palette & Typography

### Primary Colors
| Role | Hex Code | Usage |
| :--- | :--- | :--- |
| **Primary Blue** | `#0F4C94` | Headers, buttons, active links |
| **Light Blue** | `#1976D2` | Hover states, secondary elements |
| **Teal** | `#00838F` | Data viz, accents |
| **Red** | `#C62828` | Alerts, error states |

### Typography
- **Font Stack**: `Assistant`, `Arimo`, or `Open Sans` (Sans-serif).
- **Alignment**: Right-aligned (RTL Hebrew).
- **Line Height**: 1.6 - 1.8 for body text.

## 4. Component Philosophy

- **Library**: Built using **Shadcn UI** for core interactive components (Dialogs, Tabs, Inputs).
- **Theming**: Custom Tailwind tokens match the gov.il color palette.
- **Data Viz**: **Recharts** for accessible, responsive charts using the project's Teal and Blue accents.

## 5. Accessibility (WCAG 2.1 AA)

- **Contrast**: All text/background combinations are verified for AA compliance.
- **Keyboard Navigation**: All interactive elements (Sidebar, Tabs, Dialogs) are fully navigable via keyboard with visible focus states.
- **Screen Readers**:
    - Use of ARIA labels for icon-only buttons.
    - Semantic HTML structure (main, section, nav).
    - Descriptive alt text for all meaningful images.
- **RTL Support**: Full native support for Hebrew layout and bidirectional text handling.

## 6. Interaction & Motion
- **Transitions**: 150-300ms `ease-in-out`.
- **Feedback**: Immediate hover and active states for all interactive elements.
