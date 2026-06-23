
## 2025-06-23 - [Timeline Accessibility Pattern]
**Learning:** Timeline steps and list items acting as sequential selectors in responsive views must use `<button type="button">` wrappers, not `div`s, to support keyboard navigation. When managing selected state, using `aria-current="step"` explicitly communicates the current item within a step-by-step process better than generic selection states.
**Action:** Always use `<button type="button">` with `w-full text-left` for full-width interactive list items, and consistently apply explicit `focus-visible` styles (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`) for clear keyboard focus indicators.
