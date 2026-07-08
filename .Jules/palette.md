
## 2024-07-08 - Accessible Interactive Timeline Items
**Learning:** Interactive sequence items (like waypoints in a route timeline) implemented as generic divs cause significant accessibility barriers. They fail to communicate their active state correctly without aria-current and lack clear focus indications when navigating via keyboard.
**Action:** When implementing clickable list items or timeline sequences, always use `<button type="button">` with `w-full text-left`, explicit focus states (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`), and dynamically applied `aria-current="step"` for the selected item.
