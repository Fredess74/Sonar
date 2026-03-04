
## 2024-05-15 - [Interactive List Items as Buttons]
**Learning:** Interactive list items (like timeline steps) must be implemented as `<button type='button'>` rather than `div` elements, adding `w-full text-left` to preserve layout.
**Action:** Always use semantic `<button>` tags with `aria-current` for selected states and explicit `focus-visible` styles for better keyboard navigation.

## 2024-05-15 - [Derived State vs useEffect]
**Learning:** Using `useEffect` to sync a prop to state can trigger the `react-hooks/set-state-in-effect` ESLint rule and cause cascading renders.
**Action:** Use the derived state pattern by keeping track of the previous prop value in state and updating state directly during the render phase when the prop changes.
