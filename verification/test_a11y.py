import time
from playwright.sync_api import sync_playwright

def test_timeline_a11y():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        # Use a large viewport to ensure Sidebar is visible (desktop view)
        context = browser.new_context(
            record_video_dir='/home/jules/verification/videos',
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()

        # Navigate to app
        page.goto('http://localhost:3000/')
        page.wait_for_selector('button[title="Start Simulation"]')

        # Focus the first waypoint button via keyboard to check focus styles
        print("Testing keyboard focus...")
        page.keyboard.press('Tab')

        # Wait a bit and take a screenshot of initial state
        time.sleep(1)
        page.screenshot(path='/home/jules/verification/initial_desktop.png')

        # Find the first waypoint in the sidebar
        sidebar_waypoints = page.locator('div[class*="md:flex"]').get_by_role("button", name="Soho Square", exact=False)

        # Verify it has aria-current
        print("Clicking first waypoint...")
        sidebar_waypoints.first.click(force=True)
        time.sleep(1)

        # Verify it gets aria-current="step"
        is_current = sidebar_waypoints.first.get_attribute("aria-current")
        print(f"aria-current attribute after click: {is_current}")
        assert is_current == "step", "Selected waypoint should have aria-current='step'"

        # Switch to mobile viewport to check bottom sheet
        print("Switching to mobile viewport...")
        page.set_viewport_size({"width": 375, "height": 812})
        time.sleep(1)
        page.screenshot(path='/home/jules/verification/mobile_view.png')

        # Find waypoint in bottom sheet using role
        mobile_waypoints = page.locator('div[class*="md:hidden"]').get_by_role("button", name="Soho Square", exact=False)

        # Verify it also has aria-current
        is_current_mobile = mobile_waypoints.first.get_attribute("aria-current")
        print(f"Mobile aria-current attribute: {is_current_mobile}")
        assert is_current_mobile == "step", "Selected mobile waypoint should have aria-current='step'"

        context.close()
        browser.close()

if __name__ == "__main__":
    test_timeline_a11y()
    print("Tests passed!")
