## 2024-05-24 - Interactive Elements Focus Pattern

**Learning:** When testing interactive UI elements within responsive containers (like the BottomSheet) in Playwright to verify `:focus-visible` accessibility styles, using `.focus()` programmatically does not reliably trigger the visually distinct focus rings. This is because modern browsers differentiate between programmatic focus and genuine keyboard navigation focus (which adds the `:focus-visible` state).
**Action:** When writing Playwright verification scripts that require observing focus rings, use `page.keyboard.press('Tab')` to simulate genuine keyboard navigation.

## 2024-05-24 - React Derived State Pattern

**Learning:** When a React component needs to update internal state (like `isOpen` for a modal/bottom sheet) based on prop changes (like `selectedStepId`), wrapping the state update inside `useEffect` causes a `react-hooks/set-state-in-effect` linting error because it leads to an unnecessary render cycle.
**Action:** Use the derived state pattern by conditionally updating the state directly during the render phase based on a cached previous value of the prop. This avoids the extra re-render and satisfies the linter.
