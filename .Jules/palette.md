
## 2024-05-14 - Interactive Timeline Accessibility
**Learning:** Interactive list items (like timeline steps in sequence) must be implemented as `<button type='button'>` rather than `div` elements for semantic meaning and proper keyboard accessibility.
**Action:** When implementing clickable sequence items or custom list item buttons, ensure they use `<button type="button">`, have `w-full text-left` to maintain correct text alignment, set `aria-current="step"` for the active/selected state, and include explicit focus indicators like `focus-visible:outline-none focus-visible:ring-2`.
