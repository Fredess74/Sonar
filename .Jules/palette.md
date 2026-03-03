## 2024-03-03 - [Fix Accessibility of Interactive List Items in Sidebar.tsx]
**Learning:** Interactive timeline nodes/waypoints in this app's sidebar were improperly implemented as `div` elements with `onClick` handlers, which hindered keyboard accessibility and semantic meaning.
**Action:** When creating custom interactive list items (like timeline steps), always use `<button type='button'>` with `w-full text-left` to ensure correct keyboard focus and native event handling. Ensure they have appropriate `aria-current` attributes to signify selection state to screen readers.
