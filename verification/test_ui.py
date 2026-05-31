import time
from playwright.sync_api import sync_playwright

def verify_a11y_improvements():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Desktop view to check Sidebar
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto("http://localhost:3000/")

        # Wait for the Start Simulation button and click it
        page.get_by_role("button", name="Start Simulation").click()
        time.sleep(2)

        # Take a screenshot to see what rendered
        page.screenshot(path="verification/rendered_state.png")

        # Select any waypoint button instead of a specific text to avoid text mismatches
        # In Sidebar, waypoints are buttons. The toggle button is also a button, but let's select one with an aria-current or just tab.

        waypoint = page.locator("button.w-full.text-left").first
        if waypoint.is_visible():
            waypoint.click(force=True)
            time.sleep(1)

            # Press tab to move focus and check focus-visible ring
            page.keyboard.press("Tab")
            time.sleep(0.5)
            page.screenshot(path="verification/sidebar_focus.png")

            # Verify aria-current is updated
            is_selected = waypoint.get_attribute("aria-current") == "step"
            print(f"Desktop Sidebar waypoint aria-current='step': {is_selected}")

        # Mobile view to check BottomSheet
        page.set_viewport_size({"width": 375, "height": 812})
        time.sleep(1)

        # Look for BottomSheet waypoint
        mobile_waypoint = page.locator("button.w-full.text-left").last
        if mobile_waypoint.is_visible():
            mobile_waypoint.click(force=True)
            time.sleep(1)
            is_mobile_selected = mobile_waypoint.get_attribute("aria-current") == "step"
            print(f"Mobile BottomSheet waypoint aria-current='step': {is_mobile_selected}")
            page.screenshot(path="verification/bottomsheet_selected.png")

        print("Verification script completed successfully.")
        browser.close()

if __name__ == "__main__":
    verify_a11y_improvements()
