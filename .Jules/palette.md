## 2026-06-05 - [Initial Journal]
**Learning:** Initialized UX journal
**Action:** Ready to add UX improvements

## 2026-06-05 - [Interactive List Elements Accessibility]
**Learning:** Sequence-based interactive list items (like the timeline waypoints in Sidebar and BottomSheet) were implemented as `div` elements, lacking native keyboard support and correct screen reader semantics.
**Action:** Always use `<button type="button">` with `w-full text-left` for custom list items that have interactive click behavior. Explicitly apply `aria-current` (e.g. `aria-current="step"`) to correctly identify the currently selected step in the sequence, and implement explicit `focus-visible` states to support tab navigation.
