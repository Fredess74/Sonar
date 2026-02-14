## 2026-02-14 - Icon-only Buttons Accessibility
**Learning:** The app relies heavily on icon-only buttons for its clean aesthetic, but they consistently lack accessible names (ARIA labels).
**Action:** Systematically audit all icon-only buttons and ensure they have descriptive `aria-label` attributes, even if they have `title` tooltips.
