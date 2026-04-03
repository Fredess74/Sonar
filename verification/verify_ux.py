from playwright.sync_api import sync_playwright, expect
import time

def test_timeline_and_search_focus(page):
    page.goto("http://localhost:3000/")

    # Wait for the page to load
    page.wait_for_selector("input[placeholder='Where to next?']")

    # Focus the search input using the Tab key to simulate keyboard navigation
    # This will trigger the focus-within states on the Search Island
    page.keyboard.press("Tab") # Focuses Search Input

    # Take a screenshot to see if the search island has the focus styles (neon shadow, accented icon)
    page.screenshot(path="verification/search_focus.png")

    # The timeline steps and map populate from goldenPath in local dev
    # We can directly inspect the timeline on the initial load

    # Now verify the timeline step buttons in the sidebar (desktop)
    # Target the timeline container in the Sidebar
    sidebar = page.locator("div[class*='md:flex']")

    # Focus a timeline step (e.g., Soho Square)
    step_btn = sidebar.get_by_role("button").filter(has_text="Soho Square")

    expect(step_btn).to_be_visible()

    # Click it to select it, then verify aria-current
    step_btn.click(force=True)
    expect(step_btn).to_have_attribute("aria-current", "step")

    # Wait for the animation to complete
    time.sleep(1)

    # Note: Soho Square has a place card. If clicked, the timeline unmounts and the card shows.
    # To test the selected state remaining in the list, we should click a step without a place card.

    # Click the Back button if place card showed up
    back_btn = sidebar.get_by_role("button", name="Back to timeline")
    if back_btn.is_visible():
        back_btn.click(force=True)

    # Click the Start Location which has no place card
    start_btn = sidebar.get_by_role("button").filter(has_text="Start Location")
    if start_btn.is_visible():
        start_btn.click(force=True)
        expect(start_btn).to_have_attribute("aria-current", "step")

        # Focus it via keyboard to see focus ring (simulate pressing Tab repeatedly until it hits start_btn)
        start_btn.focus()
        page.screenshot(path="verification/timeline_selected.png")
    else:
        # Fallback to taking a screenshot of the whole page
        page.screenshot(path="verification/timeline_selected.png")


if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_timeline_and_search_focus(page)
        finally:
            browser.close()
