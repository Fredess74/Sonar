## 2025-06-18 - [Interactive Timeline Steps]
**Learning:** Interactive list items (like timeline steps) must be implemented as `<button type="button">` with `w-full text-left`, `cursor-pointer`, and explicit `focus-visible` styles (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`) for keyboard accessibility, rather than `div` elements. `aria-current='step'` should be used to indicate the selected state.
**Action:** Always use `<button type="button">` with these styles and attributes for interactive list items.
