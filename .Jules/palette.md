
## 2024-05-17 - [Interactive Timeline Steps Accessibility]
**Learning:** In the Sidebar, timeline steps were implemented as clickable `div` elements, lacking semantic meaning and native keyboard focus handling. Replacing them with `<button type="button">` with `w-full text-left` combined with explicit focus indicators (`focus-visible:ring-sonar-accent`) and `aria-current="step"` significantly improves keyboard navigation and screen reader semantics without breaking visual design.
**Action:** Always use `<button type="button">` rather than `div` for interactive list items, and explicitly style `focus-visible` for consistent accessibility.
