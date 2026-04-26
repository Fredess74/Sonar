
## 2024-10-25 - [Glassmorphic Focus States]
**Learning:** Standard focus rings can disrupt the visual cohesion of compound, borderless "glassmorphic" inputs (like a search island with an input and icon). Applying focus-visible strictly to the input element breaks the illusion of the entire container being the interactive element.
**Action:** Use Tailwind's `focus-within` on the parent container to apply thematic border/ring styles (e.g., `focus-within:border-sonar-accent/50`), and `group-focus-within` on sibling elements like icons to change their color, creating a unified, accessible focus state without needing custom JS focus event handlers.
