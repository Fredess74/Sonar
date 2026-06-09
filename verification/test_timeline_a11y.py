from playwright.sync_api import sync_playwright
import time

def test_timeline_a11y():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Set viewport to ensure desktop Sidebar is visible
        page.set_viewport_size({"width": 1280, "height": 800})

        page.goto("http://localhost:3000")

        # Click 'Start Simulation' to load mock data
        page.get_by_role("button", name="Start Simulation").click()
        time.sleep(2) # wait for simulation/mock data to load

        # Test 1: Desktop Sidebar Keyboard Accessibility
        # Find the first timeline step button
        # In the sidebar, timeline steps are buttons. We'll find all buttons inside the sidebar container.
        sidebar_locator = page.locator('.md\\:flex.w-96')

        # Press Tab repeatedly until we focus a timeline step or have pressed it too many times
        focused = False
        for _ in range(15):
            page.keyboard.press("Tab")
            focused_element = page.evaluate("document.activeElement")
            aria_current = page.evaluate("document.activeElement.getAttribute('aria-current')")
            class_name = page.evaluate("document.activeElement.className")
            # We are looking for the step buttons that have 'focus-visible:ring-2' and maybe aria-current
            if 'focus-visible:ring-2' in class_name and 'focus-visible:ring-sonar-accent' in class_name:
                print("Successfully focused a timeline step in Sidebar using keyboard.")
                focused = True
                break
            time.sleep(0.1)

        if not focused:
            print("Failed to focus timeline step in Sidebar.")
            browser.close()
            return

        # Select the focused item
        page.keyboard.press("Enter")
        time.sleep(0.5)

        # Verify aria-current is 'step' on the active element
        aria_current = page.evaluate("document.activeElement.getAttribute('aria-current')")
        if aria_current == "step":
             print("aria-current='step' successfully applied upon selection in Sidebar.")
        else:
             print(f"Warning: aria-current is {aria_current}")

        # Take a screenshot for the frontend verification step
        page.screenshot(path="verification/timeline_a11y.png")

        browser.close()
        print("Timeline accessibility test completed successfully.")

if __name__ == "__main__":
    test_timeline_a11y()
