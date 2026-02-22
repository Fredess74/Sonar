from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        print("Navigating to app...")
        try:
            # Increase timeout for slow environments
            page.goto("http://localhost:5173", timeout=60000)

            # Wait for Sidebar
            print("Waiting for Sidebar...")
            page.wait_for_selector("text=Optimized Path", timeout=30000)

            # Locate waypoint buttons
            print("Locating waypoint buttons...")
            # We look for buttons that contain the waypoint numbers or 'S'/'E'
            # Based on the code: <div ...>{wp.type === 'start' ? 'S' ...}</div>

            # Wait for at least one waypoint button
            # The buttons have class 'group flex items-start' and are inside the sidebar list
            # We can select by role 'button'

            # Wait a bit for the list to render
            time.sleep(2)

            buttons = page.locator("button[aria-current], button:has-text('S')").all()

            # Filter out the toggle button and navigation button if they get caught,
            # though the waypoint buttons are distinctive.
            # Let's target the container if possible, or just look for the specific structure.
            # The waypoints are in a div with "Timeline View" comment in code, but no specific class on container.
            # However, the buttons themselves have text-left and relative classes.

            waypoint_buttons = page.locator("button.text-left.relative.group").all()

            print(f"Found {len(waypoint_buttons)} waypoint buttons.")

            if len(waypoint_buttons) == 0:
                print("No waypoint buttons found! Check the selector.")
                # Fallback to verify if old divs are still there (which would be a failure)
                old_divs = page.locator("div.group.flex.items-start.cursor-pointer").all()
                if len(old_divs) > 0:
                     print(f"Found {len(old_divs)} old div-based waypoints. Refactor failed?")
                raise Exception("Waypoint buttons not found")

            first_wp = waypoint_buttons[0]

            # Test Focus
            print("Testing focus on first waypoint...")
            first_wp.focus()

            # Check if focused
            is_focused = first_wp.evaluate("el => document.activeElement === el")
            if is_focused:
                print("✅ First waypoint is focusable.")
            else:
                print("❌ First waypoint is NOT focused.")
                raise Exception("Focus test failed")

            # Test Selection and ARIA attribute
            print("Testing selection...")
            first_wp.click()

            # Wait for React to update
            time.sleep(1)

            # Check aria-current
            aria_current = first_wp.get_attribute("aria-current")
            if aria_current == "step":
                 print(f"✅ Selected waypoint has aria-current='{aria_current}'.")
            else:
                 print(f"❌ Selected waypoint has aria-current='{aria_current}' (expected 'step').")
                 raise Exception("ARIA attribute test failed")

            # Take screenshot
            print("Taking verification screenshot...")
            page.screenshot(path="verification/sidebar_a11y.png")
            print("Screenshot saved to verification/sidebar_a11y.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    run()
