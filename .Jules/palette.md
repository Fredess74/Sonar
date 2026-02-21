## 2025-10-26 - [Interactive List Accessibility]
**Learning:** Timeline items in `Sidebar.tsx` were inaccessible `div`s, while `BottomSheet.tsx` correctly used `button` elements. Inconsistent implementation of the same UI pattern hurts maintainability and accessibility.
**Action:** When implementing interactive lists, always use `<button type="button">` with `text-left` and `w-full`. Reference `BottomSheet.tsx` as the correct pattern for this project.
