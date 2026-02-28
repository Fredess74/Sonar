
## 2025-02-28 - [Accessible Interactive Timelines]
**Learning:** Changing `<div>` elements to `<button>` elements for interactive list items (like timelines) can break flex layout defaults unless `w-full text-left` is explicitly applied. Furthermore, standard `div` lists fail to communicate state via screen readers and omit focus styling for keyboard users.
**Action:** When implementing clickable items in lists, always use semantic `<button type="button">` with `w-full text-left` to preserve layout, and explicitly add `aria-current` to indicate selection state, alongside `focus-visible` styles to handle keyboard navigation.
