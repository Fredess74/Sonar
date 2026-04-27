
## 2024-05-16 - [Accessibility: Interactive Timeline Steps]
**Learning:** Interactive list items (like timeline steps in sequence) must be implemented as `<button type='button'>` with `w-full text-left`, `cursor-pointer`, `aria-current='step'` for selected states across responsive views, and explicit `focus-visible` styles (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`), rather than `div` elements. This improves keyboard navigation and provides proper context to screen readers.
**Action:** Always prefer `<button>` elements for clickable list items and enforce adding explicit focus styles and `aria-current` for selection.
