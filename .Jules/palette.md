
## 2024-03-20 - Timeline Step Accessibility
**Learning:** Interactive list items (like timeline steps) must be implemented as semantic `<button type='button'>` elements instead of `div`s with `onClick` handlers. For components mapped over a collection (like waypoints), adding `w-full text-left` helps maintain the list item layout, while `aria-current={selectedStepId === wp.id ? 'step' : undefined}` is crucial for screen readers to identify the currently active step. Explicit `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent` is required for proper keyboard navigation.
**Action:** Always use `<button>` for clickable items in a list and include `aria-current` when items represent steps in a process or timeline.
