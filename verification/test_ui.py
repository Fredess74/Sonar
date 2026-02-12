from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # Wait for server to start
        print("Navigating to app...")
        try:
            page.goto("http://localhost:3000", timeout=30000)

            # Wait for key elements
            print("Waiting for Sidebar...")
            page.wait_for_selector("text=Optimized Path", timeout=10000)

            print("Waiting for Header...")
            page.wait_for_selector("input[placeholder='Where to next?']", timeout=10000)

            # Take a screenshot of the dashboard
            print("Taking screenshot...")
            page.screenshot(path="verification/dashboard.png")

            print("Done.")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
