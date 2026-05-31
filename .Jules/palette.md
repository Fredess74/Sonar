
## 2024-05-31 - [Interactive Timeline Accessibility]
**Learning:** For sequential timeline components containing interactive routing waypoints, developers often default to clickable `<div>` elements with `onClick` handlers. This creates an accessibility barrier for keyboard and screen reader users who cannot focus or natively determine the active item in the flow.
**Action:** Always implement interactive timeline nodes as `<button>` elements with `w-full text-left` to preserve structure, apply explicit `focus-visible` styling (e.g., `focus-visible:ring-2 focus-visible:ring-sonar-accent`), and use `aria-current="step"` to semantically communicate the active timeline waypoint to assistive technologies.
