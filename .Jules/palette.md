
## 2026-02-20 - [A11y] Timeline Items as Buttons
**Learning:** Timeline items implemented as `div`s are inaccessible. Converting them to `<button type="button">` with `text-left w-full` maintains layout while providing keyboard navigation and screen reader support.
**Action:** Always verify interactive list items are buttons, not divs.

## 2026-02-20 - [React] State Update in Effect
**Learning:** Updating state synchronously in `useEffect` based on props triggers `react-hooks/set-state-in-effect`.
**Action:** Wrap the state setter in `setTimeout(..., 0)` to defer the update, preventing the warning and potential rendering issues.
