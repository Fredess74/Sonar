from playwright.sync_api import sync_playwright

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the preview server
        page.goto("http://localhost:4173")

        # Wait for map or header to be visible
        page.wait_for_selector('input[placeholder="Where to next?"]')

        # Verify header aria-label is present
        input_locator = page.locator('input[placeholder="Where to next?"]')
        aria_label = input_locator.get_attribute('aria-label')
        print(f"Aria-label found: {aria_label}")
        assert aria_label == "Where to next?"

        # To verify BottomSheet derived state, we can simulate clicking a marker
        # but since map markers are rendered via canvas/leaflet, we can click a sidebar item first if visible
        # For mobile view (BottomSheet), we need to set viewport size
        page.set_viewport_size({"width": 375, "height": 812})

        # Wait for bottom sheet buttons to appear
        page.wait_for_selector('button[aria-label="Expand route details"]')

        # Take screenshot of the initial mobile view
        page.screenshot(path="verification/mobile_initial.png")

        # Click a step in the bottom sheet to select it
        step_buttons = page.locator('button.w-full.text-left')
        if step_buttons.count() > 0:
            step_buttons.first.click()
            page.wait_for_timeout(500) # wait for animation
            page.screenshot(path="verification/mobile_step_selected.png")

        print("Verification successful!")
        browser.close()

if __name__ == "__main__":
    verify_ui()
