
## 2024-05-18 - [Header Navigation Focus States]
**Learning:** For compound glassmorphic components (like the Header's Search Island), setting focus purely on the input causes visual disconnects.
**Action:** Use `focus-within:border-sonar-accent/50 focus-within:shadow-[...]` on the parent container, and `group-focus-within:text-sonar-accent` on sibling icons to create cohesive, accessible focus states across the entire logical component group.
