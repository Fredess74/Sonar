
## 2025-04-10 - Accessible Interactive List Items
**Learning:** In the Sonar application, waypoints in the timeline (`Sidebar.tsx` and `BottomSheet.tsx`) are highly interactive and change selection state. Using a `div` element with an `onClick` handler prevents screen readers and keyboard users from discovering and navigating these effectively.
**Action:** Always implement interactive list items that change state (like timeline steps) using semantic `<button type='button'>` elements. Apply `w-full text-left` to maintain layout, and ensure `aria-current` is used to communicate the currently selected step. Add explicit `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent` classes to provide visual feedback for keyboard navigation.
