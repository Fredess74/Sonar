
## 2024-06-08 - Accessible Sequence Lists
**Learning:** Interactive timeline steps in responsive dual-views (Sidebar/BottomSheet) were implemented as divs, which lack native keyboard support and semantic meaning for screen readers navigating the route sequentially.
**Action:** Always implement interactive sequence items as `<button type="button">` with `w-full text-left`, explicitly manage selected state using `aria-current="step"`, and provide clear `focus-visible` styling (`focus-visible:ring-2`) to ensure consistent keyboard and assistive technology experiences across breakpoints.
