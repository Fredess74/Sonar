from playwright.sync_api import sync_playwright
import time

def run():
    print("Starting verification script...")
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        page.set_viewport_size({'width': 1280, 'height': 800})

        print("Navigating to app on http://localhost:5173...")
        try:
            # Navigate to the app (assuming it's running on localhost:5173)
            page.goto("http://localhost:5173", timeout=30000)

            # Wait for sidebar to load
            print("Waiting for Sidebar text 'Optimized Path'...")
            page.wait_for_selector("text=Optimized Path", timeout=10000)

            # Find waypoint buttons. The logic in Sidebar.tsx renders buttons with `type="button"` and `text-left`
            # We can select by role 'button' and check if there are multiple.
            # Specifically look for waypoint buttons. They contain text like "S", "E", or numbers in the circle div.
            # The sidebar container has `bg-sonar-surface/90`.
            # Inside it, we have the waypoint list.

            # Use `w-full text-left` classes as they are unique to waypoint buttons in Sidebar.
            waypoint_buttons = page.locator("button.w-full.text-left")

            count = waypoint_buttons.count()
            print(f"Found {count} waypoint buttons.")

            if count > 0:
                print("Verifying waypoint buttons are focusable...")
                first_btn = waypoint_buttons.first
                first_btn.focus()

                # Check focus
                is_focused = page.evaluate("() => document.activeElement === document.querySelector('button.w-full.text-left')")
                print(f"First button focused: {is_focused}")

                # Check accessibility attributes
                # Click it to see if aria-current updates
                print("Clicking first button...")
                first_btn.click()

                # Wait for React state update
                page.wait_for_timeout(500)

                aria_current = first_btn.get_attribute("aria-current")
                print(f"First button aria-current after click: {aria_current}")

                if aria_current == "step":
                     print("SUCCESS: aria-current is correctly set to 'step'.")
                else:
                     print(f"WARNING: aria-current is '{aria_current}', expected 'step'.")

                # Verify key navigation (Tab)
                print("Testing keyboard navigation...")
                page.keyboard.press("Tab")
                page.wait_for_timeout(200)

                # Should move to next button if there are more
                if count > 1:
                    second_btn_focused = page.evaluate("() => document.activeElement === document.querySelectorAll('button.w-full.text-left')[1]")
                    print(f"Second button focused after Tab: {second_btn_focused}")

                # Screenshot for visual verification
                page.screenshot(path="verification/sidebar_a11y_check.png")
                print("Screenshot saved to verification/sidebar_a11y_check.png")

            else:
                print("ERROR: No waypoint buttons found. Check if selectors match or if app loaded correctly.")
                page.screenshot(path="verification/error_no_buttons.png")

        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="verification/error_exception.png")
        finally:
            browser.close()
            print("Browser closed.")

if __name__ == "__main__":
    run()
