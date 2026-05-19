
## 2024-05-19 - [Interactive Timeline Accessibility]
**Learning:** In complex navigation components like the interactive timeline where elements trigger view changes and serve as selection lists, screen readers need explicit context. Custom timeline items built with `div` elements lack this context and cannot accurately convey selection state or receive proper focus.
**Action:** Always convert custom interactive list items to semantic `<button type="button">` elements. Apply `w-full text-left` to maintain layout, explicit `focus-visible` styles for keyboard navigation, and use `aria-current="step"` (or `true`) to programmatically indicate the active selection state across responsive views.
