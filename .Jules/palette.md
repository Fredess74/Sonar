
## 2024-05-18 - [Accessibility: Interactive List Items]
**Learning:** Interactive list items (like timeline steps in sequences) must be implemented as `<button type="button">` with explicitly defined selection states (`aria-current="step"`) instead of non-semantic `<div>` elements with click handlers to be properly usable with screen readers and keyboard navigation.
**Action:** When implementing or fixing interactive list components across responsive views (desktop/mobile), ensure the elements are native buttons, have focus-visible styling (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`), and utilize `aria-current` to denote the active step.
