## 2024-05-13 - Interactive Sequence Steps Accessibility
**Learning:** Interactive list items (like timeline steps in sequence) must be implemented as semantic `<button type='button'>` elements rather than `<div>` elements. They should include `w-full text-left` to maintain layout, explicit `focus-visible` styles for keyboard navigation, and `aria-current='step'` for the selected state.
**Action:** Always use `<button type='button'>` with `aria-current` and explicit focus rings for interactive sequential lists or timelines.
