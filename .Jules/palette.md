
## 2024-02-15 - [Interactive List Items as Accessible Buttons]
**Learning:** In the Sonar design system, using `<div>` for interactive items (like timeline waypoints) removes keyboard navigability and prevents semantic selection feedback (ARIA).
**Action:** When creating scrollable/selectable list items, use `<button type="button">` with `w-full text-left`. Add `aria-current="step"` for selected timeline states across responsive views, and apply explicit `focus-visible` styles (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`).
