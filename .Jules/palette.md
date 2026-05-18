
## 2024-05-18 - [Timeline List Items as Buttons]
**Learning:** In responsive timeline designs where list items act as clickable triggers (e.g., to open details), using standard `div` elements creates an accessibility anti-pattern. They lack native keyboard support, semantic meaning, and screen reader feedback for their selected state.
**Action:** Always implement interactive timeline nodes as `<button type="button">` with `w-full text-left` to maintain layout behavior, and explicitly use `aria-current="step"` (or `true`) combined with `focus-visible:outline-none focus-visible:ring-2` to provide robust, visually distinct keyboard accessibility and clear screen reader context for the active selection.
