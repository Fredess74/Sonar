## 2026-04-25 - [A11y Refactor Sidebar Waypoint Items]
**Learning:** The interactive div elements in the timeline view of the Sidebar lacked semantic meaning and focus styles, making keyboard navigation difficult. Replacing them with buttons and adding focus-visible classes improved accessibility without breaking the layout.
**Action:** When creating list items that act as interactive triggers, always use semantic elements like `<button type="button">`, provide clear `aria-current` attributes for active states, and define explicit `focus-visible` utility classes for keyboard navigation.
