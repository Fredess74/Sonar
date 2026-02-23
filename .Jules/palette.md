## 2025-02-14 - [Sidebar vs BottomSheet Pattern Mismatch]
**Learning:** The desktop `Sidebar` timeline items were non-interactive `div`s, while the mobile `BottomSheet` correctly used `button` elements. This created an inconsistent accessibility experience between desktop and mobile.
**Action:** Always check both desktop and mobile implementations of shared features (like timeline lists) to ensure parity in accessibility and semantic structure.

## 2025-02-14 - [Semantic HTML in Interactive Cards]
**Learning:** When converting a card component (like a timeline item) to a `<button>` for better accessibility, you cannot nest block-level elements (like `div`, `h4`, `p`) inside it.
**Action:** Replace nested block elements with `<span>` tags and use CSS (e.g., `display: block`, `flex-direction: column`) to maintain the visual layout while ensuring valid HTML syntax.
