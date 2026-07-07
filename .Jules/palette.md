## 2024-07-07 - Timeline Steps as Buttons
**Learning:** Interactive timeline steps (like those in Sidebar and BottomSheet) were implemented as `div` elements, breaking accessibility for screen readers and keyboard users.
**Action:** Always implement interactive list items as `<button type='button'>` with `w-full text-left`, `cursor-pointer`, `aria-current='step'` for selected states, and explicit `focus-visible` styles to ensure proper keyboard navigation and semantic structure.
