## 2024-07-01 - Focus-Within States on Compound Components
**Learning:** For compound input components (like the Search Island containing an icon and an input field), applying focus states solely on the inner input element often results in a disconnected visual experience. Screen reader and keyboard users benefit from a unified visual indicator.
**Action:** Use Tailwind's `focus-within` on the parent container (e.g., `focus-within:border-sonar-accent/50`) and `group-focus-within` on child elements (like icons) to highlight the entire component when any inner element receives focus, improving both accessibility visibility and visual polish.

## 2024-07-01 - Invisible Input Labels
**Learning:** Textareas used for technical inputs (like JSON editors) often lack visible labels by design to save space, which fails WCAG criteria for screen readers.
**Action:** Always add an explicit `aria-label` to these unlabelled input elements (e.g., `aria-label="JSON route data"`) to provide necessary context without cluttering the UI.
