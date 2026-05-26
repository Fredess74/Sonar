## 2024-05-26 - Accessible List Items in Sidebar
**Learning:** Interactive timeline steps were implemented as divs, failing basic accessibility checks for keyboard navigation and screen reader support (no `button` role, no `aria-current`).
**Action:** Always use `<button type="button">` for interactive list items, use `w-full text-left` to maintain layout, and apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent` for clear keyboard focus indicators. Set `aria-current="step"` on the currently active step.
