from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        page.goto("http://localhost:3000")
        time.sleep(2)  # Wait for load

        # Click Start Simulation to load mock data
        page.get_by_role("button", name="Start Simulation").click()
        time.sleep(1)

        # Desktop View (Sidebar) test
        print("Testing Desktop (Sidebar) View...")

        sidebar_button = page.locator(".md\\:flex button").filter(has_text="Soho Square").first

        print(f"Sidebar 'Soho Square' button tag name: {sidebar_button.evaluate('el => el.tagName')}")
        assert sidebar_button.evaluate('el => el.tagName').upper() == "BUTTON", "Timeline items should be <button>"

        # Verify it has aria-current when selected
        sidebar_button.click(force=True)
        time.sleep(0.5)

        aria_current = sidebar_button.get_attribute("aria-current")
        print(f"Sidebar button aria-current after click: {aria_current}")
        assert aria_current == "step", "Button should have aria-current='step' when selected"

        # Mobile View (BottomSheet) test
        print("\nTesting Mobile (BottomSheet) View...")
        context_mobile = browser.new_context(viewport={"width": 375, "height": 667})
        page_mobile = context_mobile.new_page()

        page_mobile.goto("http://localhost:3000")
        time.sleep(2)

        page_mobile.get_by_role("button", name="Start Simulation").click()
        time.sleep(1)

        # Need to scroll to or explicitly evaluate the element in the bottom sheet to avoid "outside viewport" error when clicking
        bottomsheet_button = page_mobile.locator(".fixed.bottom-0 button").filter(has_text="Soho Square").first

        print(f"BottomSheet 'Soho Square' button tag name: {bottomsheet_button.evaluate('el => el.tagName')}")
        assert bottomsheet_button.evaluate('el => el.tagName').upper() == "BUTTON", "Timeline items should be <button>"

        # Instead of click(), let's dispatch an event to avoid viewport checking
        bottomsheet_button.evaluate("el => el.click()")
        time.sleep(0.5)

        aria_current_mobile = bottomsheet_button.get_attribute("aria-current")
        print(f"BottomSheet button aria-current after click: {aria_current_mobile}")
        assert aria_current_mobile == "step", "Button should have aria-current='step' when selected"

        print("\nAll UI tests passed successfully!")

        browser.close()

if __name__ == "__main__":
    run()
