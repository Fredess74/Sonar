
## 2024-05-11 - Accessible Timeline Steps
**Learning:** Interactive list items (like timeline steps in sequence in `Sidebar.tsx` and `BottomSheet.tsx`) must be implemented as `<button type='button'>` with `w-full text-left`, `cursor-pointer`, `aria-current='step'` for selected states across responsive views, and explicit `focus-visible` styles (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`), rather than `div` elements.
**Action:** Always use semantic `<button>` elements for interactive sequence items, and ensure `aria-current` is used to convey the active item to screen readers.
