## 2024-05-09 - [Glassmorphic Focus Within Pattern]
**Learning:** For compound glassmorphic components (like a search island with inputs and icons), using focus-within and group classes creates a cohesive and accessible focus state without needing JavaScript event handlers.
**Action:** Apply `group-focus-within:text-[color]` to inner icons/elements and `focus-within:ring-*` to the parent container to highlight the entire interaction area when an internal element gains focus.
