
## 2024-05-15 - Semantic `<button>` for Timeline Steps
**Learning:** In a dual-view system (Sidebar for desktop, BottomSheet for mobile), using `<div>` elements with `onClick` handlers for interactive timeline steps creates accessibility gaps. It prevents proper keyboard navigation (tabbing) and lacks semantic meaning for screen readers.
**Action:** Always use semantic `<button type="button">` elements for interactive list items. Apply `w-full text-left` to reset button default alignment, explicitly add `focus-visible` outline styles (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`) for keyboard users, and use `aria-current="step"` dynamically when an item is selected to clearly indicate current state to screen readers.
