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

            # Locate the timeline items container
            # Based on Sidebar.tsx: <div className="relative pl-4 pb-20"> contains the items
            # The items themselves currently are divs with onClick.

            # Let's look for the timeline items. They have text like "Soho Square", "Monmouth Coffee Company", etc.
            # I'll look for the container of the list.

            # Selector for the timeline items.
            # In Sidebar.tsx, the items are direct children of the div with class "relative pl-4 pb-20"
            # Each item has class "relative group flex items-start gap-4 p-3 rounded-xl cursor-pointer transition-all border"

            # Count buttons in the sidebar timeline
            # We can scope the search to the sidebar
            sidebar = page.locator("div.hidden.md\\:flex") # The sidebar has 'hidden md:flex'

            # Find all timeline items (divs currently)
            timeline_items = sidebar.locator("div.relative.group.flex.items-start.gap-4")
            count_items = timeline_items.count()
            print(f"Found {count_items} timeline items.")

            # Check if they are buttons
            buttons = sidebar.locator("button.relative.group.flex.items-start.gap-4")
            count_buttons = buttons.count()
            print(f"Found {count_buttons} timeline buttons.")

            if count_buttons == 0 and count_items > 0:
                print("BASELINE: Timeline items are NOT buttons.")
            elif count_buttons > 0:
                print("VERIFIED: Timeline items ARE buttons.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
