
## 2024-05-18 - [Accessibility: Interactive Sequence Items]
**Learning:** Interactive list items (like timeline steps in a sequence) should be implemented as semantic `<button type='button'>` elements with `w-full text-left` classes for correct layout, rather than `div` elements with `onClick` handlers. Additionally, setting `aria-current='step'` for the currently selected item improves screen reader experience, alongside explicit `focus-visible` styles for keyboard navigation.
**Action:** Always use `<button>` tags with `w-full text-left`, `aria-current`, and `focus-visible` ring classes when building interactive, selectable list items instead of clickable divs.
