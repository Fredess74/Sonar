## 2024-05-17 - [Timeline Step Buttons]
**Learning:** Interactive timeline steps in the app were being rendered as `div` tags, lacking proper keyboard accessibility and semantics.
**Action:** Timeline steps must be rendered as `<button type='button'>` elements with `w-full text-left`, `cursor-pointer`, explicit focus states (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`), and `aria-current='step'` for the selected state.
