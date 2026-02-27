from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a larger viewport to ensure Sidebar is visible (md:flex)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        print("Navigating to app...")
        try:
            page.goto("http://localhost:5173", timeout=30000)

            # Wait for Sidebar content to load
            print("Waiting for Sidebar...")
            page.wait_for_selector("text=Optimized Path", timeout=10000)

            # Focus on one of the buttons to show the focus style
            print("Focusing on the first timeline button...")
            sidebar = page.locator("div.hidden.md\\:flex")
            first_button = sidebar.locator("button.relative.group.flex.items-start.gap-4").first
            first_button.focus()

            # Take a screenshot of the sidebar area
            print("Taking screenshot...")
            sidebar.screenshot(path="verification/sidebar_visual.png")

            print("Done.")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
