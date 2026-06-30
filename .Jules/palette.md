
## 2024-07-01 - Interactive List Items
**Learning:** Found custom `div` elements acting as interactive timeline list items in Sidebar component without proper semantic button roles or selection states.
**Action:** When creating sequential/timeline items that are interactive (clickable for details), always use `<button type="button">` with `w-full text-left` to maintain layout, explicit `focus-visible` ring styles for keyboard navigation, and dynamically applied `aria-current="step"` to semantically communicate the active timeline step to screen readers.
