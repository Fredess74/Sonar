from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Click an intermediate step without place_card to stay in timeline view and see aria-current
    # We use force=True to ensure we bypass any potential Map overlap strictness
    # "Soho Square" is the 1st waypoint in goldenPath.ts usually
    page.get_by_role("button", name="Soho Square").click(force=True)
    page.wait_for_timeout(500)

    # We press Tab sequentially to ensure one of the timeline buttons receives focus
    # thus rendering the new `focus-visible:ring-2 focus-visible:ring-sonar-accent` we added
    page.keyboard.press("Tab")
    page.wait_for_timeout(200)
    page.keyboard.press("Tab")
    page.wait_for_timeout(200)
    page.keyboard.press("Tab")
    page.wait_for_timeout(200)
    page.keyboard.press("Tab")
    page.wait_for_timeout(500)

    # Take a screenshot to verify styles and focus ring
    page.screenshot(path="verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos",
            viewport={"width": 1280, "height": 720}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
