
## 2024-05-15 - [Glassmorphic Focus Patterns]
**Learning:** For compound input components with glassmorphic styles (like the Search Island), relying solely on default browser focus rings breaks the aesthetic and can be cut off by `overflow: hidden` or rounded corners. Additionally, sibling icons don't naturally react to input focus.
**Action:** Use `focus-within` and `group` on the parent container to apply thematic focus styles (like glowing borders or shadows) and `group-focus-within` on sibling icons to create a cohesive, accessible focus state without needing custom JavaScript focus event handlers.
