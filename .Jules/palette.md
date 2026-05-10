
## 2024-05-10 - Sidebar & BottomSheet Interactive List Accessibility
**Learning:** When implementing interactive timeline steps (like the route waypoints in `Sidebar.tsx` and `BottomSheet.tsx`), they must be marked up as `<button type="button">` with `aria-current="step"` when selected, rather than using `div` tags. Additionally, explicit `focus-visible` styles (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`) should be added to ensure keyboard navigation is visibly supported.
**Action:** Always use semantic `<button>` tags with explicit `aria-current` tracking for selectable list items in custom navigation elements.
