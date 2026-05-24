## 2024-05-24 - [Semantic Buttons for Interactive Lists]
**Learning:** Interactive list items (like timeline steps) implemented as `div` elements block keyboard accessibility and screen readers. When converting them to `<button>` elements, existing layouts often break because buttons have default browser centering and inline behaviors.
**Action:** Always use `<button type="button" className="w-full text-left">` when converting interactive block elements to preserve full-width layout and text alignment while gaining native keyboard support and semantic meaning.
