## 2025-02-18 - [Timeline Accessibility Pattern]
**Learning:** Interactive timeline steps implemented as `div`s with `onClick` excluded keyboard users and screen readers. Converting them to semantic `<button>` elements with `text-left` and `w-full` preserved the layout while instantly enabling keyboard navigation and focus states.
**Action:** When auditing list-based navigation, prioritize converting non-semantic `div` handlers to `<button>` elements with appropriate ARIA attributes (`aria-current`) before adding custom key handlers.
