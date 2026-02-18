## 2026-02-18 - [Interactive List Items Must Be Buttons]
**Learning:** Timeline items in Sidebar were `div`s with `onClick`, making them keyboard inaccessible. This pattern breaks tab navigation and screen reader support.
**Action:** Always use `<button>` for interactive list items, ensuring `type="button"`, `w-full text-left` to maintain layout, and explicit focus styles.
