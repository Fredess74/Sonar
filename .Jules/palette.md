## 2024-05-01 - [Interactive Elements Require Explicit Focus States in Cyberpunk Theme]
**Learning:** The default browser focus outlines are often overridden or hidden by the dark 'Cyberpunk' theme components in this app (like the blurred `sonar-surface`). Interactive elements require explicit Tailwind pseudo-class utility rings (e.g., `focus-visible:ring-sonar-accent`) to remain accessible to keyboard navigators.
**Action:** When adding or updating interactive elements, always explicitly apply `focus-visible` utility classes to ensure adequate visual focus indicators.
