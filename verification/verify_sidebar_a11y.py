from playwright.sync_api import sync_playwright, expect

def verify_sidebar():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800}) # Desktop to show Sidebar

        # Go to app
        page.goto("http://localhost:3000")

        # Wait for the sidebar to be visible
        page.wait_for_selector(".md\\:flex")

        # Use simple get_by_role
        waypoint_buttons = page.locator(".md\\:flex").get_by_role("button")

        # There are 6 buttons in the sidebar on load
        expect(waypoint_buttons).to_have_count(6, timeout=10000)

        # One of these is a timeline element. Let's find one by checking for w-full text-left
        # Let's just focus nth(2) assuming index 0 is toggle, 1 is timeline step, 2 is next
        waypoint_buttons.nth(2).focus()
        page.keyboard.press('Tab')

        page.wait_for_timeout(1000)

        # Screenshot
        page.screenshot(path="verification/sidebar_a11y.png")

        browser.close()

if __name__ == "__main__":
    verify_sidebar()
