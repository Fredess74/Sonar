
## 2024-05-20 - Timeline Accessible Buttons
**Learning:** Interactive list items (like timeline steps) that function as buttons but are implemented as `div` elements cause significant accessibility issues. They miss out on keyboard nav, proper semantic focus, and aria roles. When making them buttons in the Sidebar, adding `w-full text-left` helps maintain original layout, and `aria-current="step"` explicitly announces selection states to screen readers. Explicit `focus-visible` styles prevent hidden outlines when navigating via keyboard.
**Action:** Always verify custom list items or clickable regions are wrapped in semantic `<button type="button">` with `aria-current` (when applicable) and defined `focus-visible` styles.
