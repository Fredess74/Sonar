from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a context with a specific viewport size
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        print("Navigating to http://localhost:5173")
        page.goto("http://localhost:5173")

        # Wait for the sidebar to load
        # The sidebar has 'w-96' class initially (expanded)
        # Or look for 'Route Plan' text
        sidebar = page.locator("div.w-96")
        expect(sidebar).to_be_visible(timeout=10000)
        print("Sidebar visible")

        # Find timeline buttons
        # They should have the class 'w-full text-left' that I added
        timeline_buttons = sidebar.locator("button.w-full.text-left")

        # Wait for at least one button to be present
        expect(timeline_buttons.first).to_be_visible()

        count = timeline_buttons.count()
        print(f"Found {count} timeline buttons")

        if count > 0:
            first_button = timeline_buttons.first

            # Check if it's a button
            tag_name = first_button.evaluate("el => el.tagName")
            print(f"First timeline item tag name: {tag_name}")
            assert tag_name == "BUTTON", f"Expected BUTTON, got {tag_name}"

            # Check type="button"
            btn_type = first_button.get_attribute("type")
            print(f"First timeline item type: {btn_type}")
            assert btn_type == "button", f"Expected type='button', got {btn_type}"

            # Focus the first button
            print("Focusing first button...")
            first_button.focus()

            # Take screenshot of focus state
            page.screenshot(path="verification/sidebar_focus.png")
            print("Screenshot saved to verification/sidebar_focus.png")

            # Verify focus styles (checking computed style is hard in headless, but screenshot helps)

            # Click the button
            print("Clicking first button...")
            first_button.click()

            # Wait for selection state
            time.sleep(1) # wait for react state update

            # Verify aria-current
            aria_current = first_button.get_attribute("aria-current")
            print(f"First timeline item aria-current after click: {aria_current}")
            assert aria_current == "step", f"Expected aria-current='step', got {aria_current}"

            # Take screenshot of selected state
            page.screenshot(path="verification/sidebar_selected.png")
            print("Screenshot saved to verification/sidebar_selected.png")

        browser.close()

if __name__ == "__main__":
    run()
