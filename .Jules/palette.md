## 2024-04-08 - Accessibility Standard for List Items
**Learning:** Interactive list items (like timeline steps in Sidebar) must be implemented as `<button type='button'>` with `w-full text-left`, `cursor-pointer`, `aria-current` for selected states, and explicit `focus-visible` styles (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`), rather than `div` elements.
**Action:** Use this standard when converting any interactive `div` elements into accessible buttons.
