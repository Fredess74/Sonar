
## 2024-05-25 - Interactive Timeline Steps Must Be Semantic Buttons
**Learning:** Interactive list items (like timeline steps in sequence) that were previously implemented as `div` elements caused accessibility issues due to lack of proper keyboard focus indicators, semantic meaning for screen readers, and state announcement when selected.
**Action:** Implemented timeline items as `<button type="button">` with `w-full text-left`, `cursor-pointer`, and explicit `focus-visible` styles (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`). Also added `aria-current="step"` for selected states across responsive views to properly announce the currently active step.
