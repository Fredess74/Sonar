## 2024-05-20 - [Timeline Accessibility]
**Learning:** The interactive timeline items in the map application were initially implemented as `div` elements, breaking keyboard accessibility and screen reader support for a critical navigation element.
**Action:** Always ensure interactive list items are implemented as `<button type='button'>` with `w-full text-left` to preserve layout, and explicitly use `aria-current='step'` for selected states across responsive views (like Desktop Sidebar vs. Mobile BottomSheet).
