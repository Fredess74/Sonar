## 2024-05-05 - Interactive List Items Accessibility
**Learning:** Timeline/waypoint list items in dual-view designs (Sidebar for desktop, BottomSheet for mobile) must use explicit `<button type="button">` tags rather than interactive `<div>`s to ensure robust screen reader compatibility, and they require explicit state signaling like `aria-current="step"`.
**Action:** Always implement interactive list items in Sonar's mapping components as native buttons with full keyboard access (`focus-visible` styles) and synchronize their ARIA states across responsive views.
