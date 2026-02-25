## 2026-02-25 - [Interactive List Items]
**Learning:** Timeline steps implemented as `div`s with `onClick` are inaccessible to keyboard users and screen readers.
**Action:** Always use semantic `<button>` elements with `text-left` and `w-full` for list items, ensuring `type="button"` and explicit `focus-visible` styles to maintain design fidelity while adding accessibility.
