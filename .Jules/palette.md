## 2026-02-16 - Icon-Only Buttons Lacking Accessibility
**Learning:** The application heavily uses icon-only buttons for key actions (e.g., search, plan, simulate) without accompanying text labels or `aria-label` attributes.
**Action:** When creating or modifying components with icon-only buttons, always ensure an `aria-label` is provided to describe the action for screen reader users.
