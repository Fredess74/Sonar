from playwright.sync_api import sync_playwright
import urllib.request
import time
import sys

def check_server_up(url="http://localhost:3000", max_retries=10, delay=1):
    for i in range(max_retries):
        try:
            urllib.request.urlopen(url)
            print(f"Server is up at {url}!")
            return True
        except Exception:
            print(f"Waiting for server... ({i+1}/{max_retries})")
            time.sleep(delay)
    print("Failed to connect to server.")
    return False

def verify_timeline_focus():
    if not check_server_up():
        sys.exit(1)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Desktop Sidebar Verification
        page.set_viewport_size({"width": 1280, "height": 800})
        page.goto("http://localhost:3000")

        # Wait for the app to load
        page.wait_for_selector('h2:has-text("Classic Covent Garden")')

        # Focus the first step button using keyboard navigation to trigger focus-visible
        start_step = page.locator('button:has-text("Soho Square")').first
        start_step.wait_for(state="visible")

        # We need to simulate genuine keyboard Tab to trigger :focus-visible polyfills/styles accurately
        page.keyboard.press('Tab')
        page.keyboard.press('Tab')
        page.keyboard.press('Tab')
        page.keyboard.press('Tab')
        # Alternatively, just force focus to see the ring if the browser naturally applies it programmatically here
        start_step.focus()

        # Take a screenshot of the Sidebar focused state
        page.screenshot(path="verification/sidebar_focus.png", full_page=False)
        print("Captured Sidebar focus screenshot.")

        # 2. Mobile BottomSheet Verification
        page.set_viewport_size({"width": 375, "height": 812})
        time.sleep(1) # Allow responsive re-render

        bottom_sheet = page.locator('.md\\:hidden')
        end_step = bottom_sheet.locator('button:has-text("The British Museum")').first
        end_step.wait_for(state="visible")

        end_step.focus()

        # Take a screenshot of the BottomSheet focused state
        page.screenshot(path="verification/bottomsheet_focus.png", full_page=False)
        print("Captured BottomSheet focus screenshot.")

        browser.close()

if __name__ == "__main__":
    verify_timeline_focus()