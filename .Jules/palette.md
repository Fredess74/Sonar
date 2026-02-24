## 2024-05-23 - Sidebar Navigation Accessibility
**Learning:** Interactive list items (like timeline steps) must be implemented as `<button type='button'>` with `w-full text-left`, `cursor-pointer`, `aria-current` for selected states, and explicit `focus-visible` styles, rather than `div` elements.
**Action:** When implementing list-based navigation, always use semantic `<button>` elements to ensure native keyboard support and screen reader compatibility.
