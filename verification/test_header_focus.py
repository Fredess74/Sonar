import time
from playwright.sync_api import sync_playwright

def test_header_focus():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        page.goto("http://localhost:3000/")

        # Wait for the Search Input to be ready
        input_locator = page.get_by_role("textbox", name="Search destination")
        input_locator.wait_for()

        # Focus the input to trigger `focus-within` on the parent group
        input_locator.focus()

        # Give it a moment to render the visual focus change
        time.sleep(0.5)

        # Take a screenshot
        page.screenshot(path="verification/header_focus_state.png", full_page=False)

        browser.close()

if __name__ == "__main__":
    test_header_focus()
