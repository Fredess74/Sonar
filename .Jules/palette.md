
## 2023-10-27 - [Interactive List Items Pattern]
**Learning:** In the responsive design (desktop Sidebar and mobile BottomSheet), using a standard `div` wrapper for interactive timeline items prevents proper keyboard navigation (tabbing) and lacks semantics for screen readers (like VoiceOver or NVDA) which expect actionable items to have focusability and role-specific attributes.
**Action:** Always refactor interactive, non-navigational list elements from `div` to `button type="button"`. Apply explicitly styled focus rings (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`) and use `aria-current="step"` dynamically when the item represents an active state in a sequence (like a selected waypoint).
