import time
from playwright.sync_api import sync_playwright

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Go to the local dev server
        page.goto("http://localhost:5173")

        # Wait for map and sidebar to load
        page.wait_for_selector(".leaflet-container")

        # Take a screenshot
        page.screenshot(path="verification/sidebar_a11y.png")

        browser.close()

if __name__ == "__main__":
    verify_ui()
