import time
from playwright.sync_api import sync_playwright

def test_timeline_focus():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()

        # Go to app
        page.goto('http://localhost:3000')

        # Wait for app to render, checking what is visible
        time.sleep(2)

        # Take an initial screenshot to see what is shown
        page.screenshot(path='verification/init_state.png')

        # Find buttons
        buttons = page.locator('button[aria-current]')
        print(f"Found {buttons.count()} timeline step buttons.")
        for i in range(buttons.count()):
             btn = buttons.nth(i)
             print(f"Button {i+1} HTML: {btn.evaluate('el => el.outerHTML')[:150]}...")

        # Start tab navigation to find focusable elements
        for _ in range(20):
            page.keyboard.press('Tab')
            time.sleep(0.1)
            focused = page.evaluate("document.activeElement.outerHTML")
            if "w-full text-left relative group flex" in focused:
                print(f"Focused timeline step: {focused[:100]}")
                break

        # Screenshot the full page
        page.screenshot(path='verification/timeline_focus.png')

        browser.close()

if __name__ == '__main__':
    test_timeline_focus()
