
## 2024-06-02 - Accessible Timeline Steps
**Learning:** Interactive timeline list items (like waypoints in a route) should be implemented as `<button type="button">` with `aria-current="step"` for the selected item, rather than `<div>` elements. This provides proper semantic meaning, native keyboard interactions, and clearly communicates the selected state to screen readers across responsive views.
**Action:** Ensure all interactive list elements in sequences use `<button>` with appropriate `aria-current` properties and `focus-visible` outlines.
