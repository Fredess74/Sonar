## 2026-03-09 - Interactive List Items as Accessible Buttons
**Learning:** Interactive list items (like timeline steps) must be implemented as semantic `<button type='button'>` elements instead of `<div>`s to ensure accessibility.
**Action:** Use `<button type='button'>` with `w-full text-left`, `cursor-pointer`, `aria-current` for selected states, and explicit `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent` styles rather than `<div>` elements for interactive list items.
