## 2026-03-25 - [Interactive List Item Accessibility]
**Learning:** Interactive list items (like timeline steps) must be implemented as `<button type='button'>` with `w-full text-left`, `cursor-pointer`, `aria-current` for selected states, and explicit `focus-visible` styles (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`), rather than `div` elements.
**Action:** Always use semantic buttons with these specific focus classes and ARIA attributes for selectable list items to ensure proper keyboard navigation and screen reader support.
