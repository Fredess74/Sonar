## 2025-03-15 - [Interactive List Accessibility]
**Learning:** Timeline steps and list items acting as interactive components should be implemented as `<button>` elements, rather than clickable `<div>`s, to inherit built-in keyboard accessibility features. Using `aria-current="step"` on the selected item properly communicates the current state to screen readers.
**Action:** Ensure all interactive list items are buttons, apply `w-full text-left` to maintain layout, use `focus-visible` for proper keyboard focus outlines, and leverage `aria-current` for the selected state.
