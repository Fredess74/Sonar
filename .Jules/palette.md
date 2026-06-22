
## 2025-06-22 - [Timeline Keyboard Accessibility Pattern]
**Learning:** Interactive list items (like timeline steps in sequence) must be implemented as `<button type='button'>` with `w-full text-left`, `cursor-pointer`, `aria-current='step'` for selected states across responsive views, and explicit `focus-visible` styles (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`), rather than `div` elements to ensure keyboard focusability and screen reader announcements.
**Action:** Always check `map` functions rendering lists of interactive items to ensure they use accessible button elements and apply `aria-current` based on selection state.
