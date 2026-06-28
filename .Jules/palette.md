## 2023-11-20 - Interactive List Sequence Items Accessibility
**Learning:** Interactive list items (like timeline steps in sequence) must be implemented as `<button type='button'>` rather than `div` elements to ensure full keyboard accessibility (focus styles and key events).
**Action:** When creating sequential interactive lists across responsive views (like Sidebar and BottomSheet), use semantic buttons with `w-full text-left`, `cursor-pointer`, explicit `focus-visible` styles, and `aria-current='step'` for the selected state to maintain accessibility consistency.
