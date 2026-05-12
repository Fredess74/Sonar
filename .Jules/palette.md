
## 2024-05-12 - [Accessible Interactive Timeline Steps]
**Learning:** Interactive list items (like timeline steps in the Sidebar and BottomSheet) must be implemented as `<button type="button">` instead of `<div>` with `onClick` to ensure accessibility and correct tab navigation.
**Action:** Always use `<button type="button">` with `w-full text-left` to maintain layout structure, explicitly add `focus-visible` styles for clear keyboard focus (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`), and set `aria-current="step"` on the active item in a sequence or timeline list.
