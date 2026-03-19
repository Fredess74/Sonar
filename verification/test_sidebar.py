from playwright.sync_api import sync_playwright

def test_sidebar_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        page.goto("http://localhost:3000")

        # Wait for the sidebar to load and waypoints to be visible
        page.wait_for_selector(".md\\:flex", state="visible")

        # Select the start waypoint button (without a place_card to ensure it doesn't unmount)
        start_waypoint = page.get_by_role("button", name="S Soho Square").first
        start_waypoint.wait_for(state="visible")

        # Click the start waypoint to select it
        start_waypoint.click(force=True)

        # Verify aria-current is true after selection
        aria_current = start_waypoint.get_attribute("aria-current")
        assert aria_current == "true", f"Expected aria-current to be 'true', got {aria_current}"

        # Now verify keyboard focus styles
        # First, click somewhere else to blur
        page.locator("body").click(position={"x": 10, "y": 10})

        # Simulate tab navigation to focus the start_waypoint
        # We need to tab until the start_waypoint is focused.
        # For simplicity, we can focus the element directly and then press 'Tab' or use evaluate
        start_waypoint.focus()

        # Take a screenshot to verify the focus-visible styles (ring-2 ring-sonar-accent)
        start_waypoint.screenshot(path="verification/sidebar_focus.png")

        print("Sidebar accessibility UI test passed successfully!")

        browser.close()

if __name__ == "__main__":
    test_sidebar_accessibility()
