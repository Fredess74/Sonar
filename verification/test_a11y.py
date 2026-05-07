import time
from playwright.sync_api import sync_playwright

def test_timeline_a11y():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to http://localhost:3000...")
        page.goto("http://localhost:3000")

        # Wait for map or initial rendering
        page.wait_for_selector(".leaflet-container")
        time.sleep(2)  # Allow data and UI to fully load

        print("Finding a waypoint button in Sidebar (Desktop)...")
        # Find the first timeline waypoint button in the sidebar
        # Using role='button' and looking for an element with text like "Start" or "Hotel"

        # The Sidebar is visible in `.md\\:flex` block, but we can just get the first one that matches role='button' with aria-current
        waypoint_buttons = page.locator("button[aria-current='step']")

        # We need to click one to make it selected, or we can just tab to it
        print("Pressing Tab multiple times to verify focusability of elements")

        # Focus the search input first, then tab to timeline
        page.locator("input[placeholder='Where to next?']").click()

        # Tab 10 times to go through UI and ideally hit the timeline buttons
        for i in range(10):
            page.keyboard.press("Tab")
            time.sleep(0.2)

            # Check what has focus
            focused_element = page.evaluate("document.activeElement.tagName")
            aria_current = page.evaluate("document.activeElement.getAttribute('aria-current')")
            text = page.evaluate("document.activeElement.textContent")

            print(f"Tab {i+1}: Focused element is <{focused_element}> with aria-current='{aria_current}' and text '{text[:20] if text else ''}'")

        print("Verification script finished successfully!")
        browser.close()

if __name__ == "__main__":
    test_timeline_a11y()
