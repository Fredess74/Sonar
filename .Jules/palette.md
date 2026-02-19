## 2026-02-19 - [Compound Component Focus]
**Learning:** For compound components like "Search Islands" where an icon and input share a container, standard focus rings on the input look disjointed.
**Action:** Use `focus-within` on the parent container to apply border/shadow styles, and `aria-label` on the inner input to maintain accessibility.
