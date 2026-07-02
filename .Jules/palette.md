## 2024-07-02 - [Interactive Timeline Steps]
**Learning:** Timeline items that function as route selection triggers should be implemented as `<button type="button">` rather than clickable `<div>` elements. When one step represents the active/current view, `aria-current="step"` must be applied to convey state to screen readers accurately in sequence.
**Action:** Always verify that interactive list items use semantic buttons, include `w-full text-left` to maintain layout, and utilize `focus-visible` for proper keyboard navigation styles without relying on click-only handlers.
