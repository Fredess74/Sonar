
## 2024-06-09 - Timeline Step Accessibility Pattern
**Learning:** Interactive timeline steps (like those in Sidebar and BottomSheet) were implemented as clickable `div`s without keyboard focus states or clear selection semantics.
**Action:** When building interactive timeline or list steps across responsive views, always use `<button type="button">` with `w-full text-left`, explicitly define keyboard focus states (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent`), and denote the selected step with `aria-current="step"`.
