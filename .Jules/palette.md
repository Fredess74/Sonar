
## 2024-05-21 - Accessible Timeline Sequence Elements
**Learning:** In interactive map overlays (like Sidebar timelines and BottomSheets), implementing interactive sequential waypoints as generic `div` elements prevents reliable screen reader navigation and hides selection state.
**Action:** Always implement sequential interactive list items as semantic `<button type="button">` with `w-full text-left`, `cursor-pointer`, explicit `focus-visible` styling (e.g., `focus-visible:ring-sonar-accent`), and `aria-current="step"` for selected elements to communicate step sequence and status across responsive views.
