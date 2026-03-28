## 2025-03-28 - [Interactive Timeline Accessibility]
**Learning:** Interactive list items acting as selection steps (e.g., in a route timeline) should use `<button type="button">` instead of `<div>` for native keyboard focus support and screen reader semantic value.
**Action:** Consistently apply `w-full text-left` to counteract button default centering, use `aria-current="step"` for the selected item, and add explicit `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color]` utilities to provide clear, accessible focus states.
