
## 2024-07-25 - Compound Input Focus States
**Learning:** In glassmorphic compound components (like search bars with sibling icons/buttons inside a wrapper), native `:focus` on the input only styles the input itself. Applying `focus-within` on the parent container (e.g. `focus-within:border-sonar-accent/50`) and using `group-focus-within` on sibling elements creates a cohesive, accessible focus state for the entire compound element without needing JavaScript focus event handlers.
**Action:** Use `group` on the parent, `focus-within` for wrapper styles, and `group-focus-within` for inner elements to manage focus states in custom UI controls.
