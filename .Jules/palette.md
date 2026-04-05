## 2024-05-24 - [Accessible Timeline Items]
**Learning:** Timeline steps in React applications are often implemented as clickable `div` elements, lacking native keyboard accessibility and semantic meaning.
**Action:** When creating interactive timeline items or list items, always use `<button type="button">` instead of a `div`. Ensure it has classes for keyboard accessibility (`w-full text-left`, `cursor-pointer`, and explicit `focus-visible` styles) and includes `aria-current="step"` to communicate the selected state to screen readers.
