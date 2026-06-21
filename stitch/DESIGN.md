---
name: RecoveryTile Canary
colors:
  surface: '#031427'
  surface-dim: '#031427'
  surface-bright: '#2a3a4f'
  surface-container-lowest: '#000f21'
  surface-container-low: '#0b1c30'
  surface-container: '#102034'
  surface-container-high: '#1b2b3f'
  surface-container-highest: '#26364a'
  on-surface: '#d3e4fe'
  on-surface-variant: '#c5c6cd'
  inverse-surface: '#d3e4fe'
  inverse-on-surface: '#213145'
  outline: '#8e9197'
  outline-variant: '#44474c'
  surface-tint: '#b9c7e0'
  primary: '#b9c7e0'
  on-primary: '#233144'
  primary-container: '#334155'
  on-primary-container: '#9eadc5'
  inverse-primary: '#515f74'
  secondary: '#bec6e0'
  on-secondary: '#283044'
  secondary-container: '#3f465c'
  on-secondary-container: '#adb4ce'
  tertiary: '#dfc299'
  on-tertiary: '#3f2d10'
  tertiary-container: '#503d1e'
  on-tertiary-container: '#c3a881'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d5e3fd'
  primary-fixed-dim: '#b9c7e0'
  on-primary-fixed: '#0d1c2f'
  on-primary-fixed-variant: '#3a485c'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#fcdeb3'
  tertiary-fixed-dim: '#dfc299'
  on-tertiary-fixed: '#281901'
  on-tertiary-fixed-variant: '#574424'
  background: '#031427'
  on-background: '#d3e4fe'
  surface-variant: '#26364a'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  status-badge:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 12px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  gutter: 12px
  margin: 16px
---

## Brand & Style

The design system is engineered for high-stakes operational environments where information density and clarity are paramount. The brand personality is **utilitarian, precise, and stoic**, prioritizing cognitive ease over visual flair. It is designed for Site Reliability Engineers (SREs), system administrators, and technical operators who require immediate situational awareness without the distraction of marketing-led aesthetics.

The visual style is **Corporate / Modern** with a lean toward **Minimalism**. It utilizes a strict hierarchy, subtle tonal layering, and high-contrast status signaling to guide the eye toward anomalies. There are no decorative gradients, soft shadows, or unnecessary whitespace; every pixel is dedicated to data integrity and functional utility.

## Colors

The design system defaults to a **dark mode** environment to reduce eye strain during long monitoring shifts. The palette is grounded in professional slates and grays, ensuring that chromatic signals are reserved exclusively for status communication.

- **Foundational Neutrals:** Use Slate 950 (`#020617`) for the background and Slate 900 (`#0F172A`) for primary containers. Borders use Slate 800 (`#1E293B`) to provide subtle structure.
- **Status Colors:** These are high-chroma and high-contrast. 
  - **Emerald (`#10B981`):** Operational / Healthy.
  - **Amber (`#F59E0B`):** Warning / Latency / Throttling.
  - **Rose (`#F43F5E`):** Down / Critical / Error.
- **Text:** Primary text is Slate 50 for maximum legibility, while secondary metadata uses Slate 400.

## Typography

The typography system prioritizes scanability and technical precision. **Inter** is the primary typeface for its exceptional legibility in small sizes and neutral character. **JetBrains Mono** is introduced for labels, IDs, and code snippets to provide a distinct visual "texture" for technical data points.

- **Headlines:** Kept small (max 24px) to preserve density.
- **Body:** The 14px size is the workhorse for most UI elements, while 12px is used for secondary metadata and dense table rows.
- **Mono:** Used for all system-generated strings, IP addresses, and resource IDs to differentiate them from human-readable labels.

## Layout & Spacing

The design system employs a **compact fluid grid** based on a 4px baseline. In an operational context, white space is treated as a separator rather than an aesthetic choice. 

- **Layout Model:** A 12-column grid is used for dashboards, but the layout is primarily driven by "Tiles" (containers) that stack and reflow. 
- **Density:** Gutters are kept tight at 12px to maximize the "at-a-glance" information density.
- **Responsive Behavior:** On mobile, complex tables collapse into card-based views, but the priority remains on the desktop experience where most monitoring occurs. Sidebar navigation is collapsible to maximize the central data workspace.

## Elevation & Depth

This design system eschews shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**. Depth is communicated through luminosity:

1.  **Level 0 (Background):** The darkest surface (`#020617`).
2.  **Level 1 (Cards/Tiles):** Slate 900 (`#0F172A`) with a 1px border of Slate 800.
3.  **Level 2 (Modals/Popovers):** Slate 800 (`#1E293B`) with a subtle 2px Slate 700 border.

Interactive elements (buttons, inputs) do not use shadows to appear "raised." Instead, they use background color shifts and high-contrast borders to indicate state change.

## Shapes

The shape language is **Soft (0.25rem)**. This provides just enough rounding to distinguish UI elements from raw data blocks without appearing "bubbly" or consumer-oriented.

- **Standard Elements:** Inputs, buttons, and tiles use a 4px (0.25rem) radius.
- **Status Indicators:** Status pips and small badges may use a full pill shape (999px) to differentiate them from interactive controls.

## Components

### Buttons
- **Primary:** Solid Slate 700 with Slate 50 text. No gradients.
- **Ghost:** Transparent background with Slate 400 text, shifting to Slate 300 on hover.
- **Status-Specific:** Small "Action" buttons for 'Reboot' or 'Kill' use low-saturation Rose or Amber borders to indicate the gravity of the action.

### Status Indicators
- **Pips:** 8x8px circles. Use the status colors (Emerald, Amber, Rose). 
- **Canary Tiles:** Large format blocks with a 4px left-accent border colored by status.

### Data Tables
- **High Density:** 32px row heights. 
- **Zebra Striping:** Use Slate 900 and Slate 800 for row differentiation.
- **Alignment:** Numbers (metrics) are always right-aligned; text labels are left-aligned.

### Input Fields
- **Compact:** 32px height. Darker background than the surface they sit on. Focused state uses a 1px Primary Slate 400 border.

### Chips/Tags
- Small, rectangular, using JetBrains Mono. Used for technical labels like `env:prod` or `region:us-east-1`.