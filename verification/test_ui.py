from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Take screenshot of Sidebar view
    page.screenshot(path="verification/screenshots/verification.png")

    page.locator("div[class*='md:flex']").first.get_by_text("Soho Square").first.click(force=True)
    page.wait_for_timeout(500)

    # Simulate tab to see focus
    page.keyboard.press("Tab")
    page.wait_for_timeout(500)

    # Mobile BottomSheet - switch to mobile view
    page.set_viewport_size({"width": 375, "height": 812})
    page.wait_for_timeout(1000)

    page.locator(".fixed.bottom-0").get_by_text("Soho Square").first.click(force=True)
    page.wait_for_timeout(500)

    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(record_video_dir="verification/videos")
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
