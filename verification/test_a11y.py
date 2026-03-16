import asyncio
from playwright.async_api import async_playwright
import urllib.request
import sys

async def check_server_up(url="http://localhost:3000", max_retries=10, delay=1):
    for i in range(max_retries):
        try:
            urllib.request.urlopen(url)
            print(f"Server is up at {url}!")
            return True
        except Exception:
            print(f"Waiting for server... ({i+1}/{max_retries})")
            await asyncio.sleep(delay)
    print("Failed to connect to server.")
    return False

async def main():
    if not await check_server_up():
        sys.exit(1)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        print("Navigating to the app...")
        await page.goto('http://localhost:3000')
        await page.wait_for_selector('h2:has-text("Classic Covent Garden")')

        print("Checking Sidebar (desktop view)...")
        # Ensure we're in desktop view
        await page.set_viewport_size({"width": 1280, "height": 800})

        # Test timeline step in Sidebar
        # Grab a specific step that is not currently selected, e.g., the Start Point
        start_step = page.locator('button:has-text("Soho Square")').first
        await start_step.wait_for()

        # Check button role and text alignment
        role = await start_step.evaluate("el => el.getAttribute('role') || el.tagName")
        print(f"Sidebar step element tag/role: {role}")
        assert role.lower() == 'button', "Step element is not a button"

        aria_current_before = await start_step.evaluate("el => el.getAttribute('aria-current')")
        print(f"Sidebar step aria-current before click: {aria_current_before}")
        assert aria_current_before is None, "Aria-current should be null before selection"

        # Simulate keyboard navigation to test focus-visible
        # Focus on an element first, or just press Tab to start navigating
        await page.keyboard.press("Tab")
        # Might take a few tabs depending on the structure, let's just force focus and tab
        await start_step.focus()
        # To simulate a user tab that triggers :focus-visible, we might need a generic focus then tab. Let's just evaluate the class list.
        class_list = await start_step.evaluate("el => el.className")
        assert "focus-visible:outline-none" in class_list, "Missing focus-visible classes"
        assert "focus-visible:ring-2" in class_list, "Missing focus-visible ring classes"

        # Click the step to set it active
        await start_step.click()
        await page.wait_for_timeout(500) # wait for re-render

        aria_current_after = await start_step.evaluate("el => el.getAttribute('aria-current')")
        print(f"Sidebar step aria-current after click: {aria_current_after}")
        assert aria_current_after == 'step', "Aria-current not set to 'step' after selection"

        print("Sidebar tests passed.")

        # Test BottomSheet (mobile view)
        print("Switching to mobile view for BottomSheet tests...")
        await page.set_viewport_size({"width": 375, "height": 812})
        await page.wait_for_timeout(1000) # allow UI to update

        # Mobile bottom sheet timeline step - grab a different step like "End Point" to be safe. Since Sidebar and BottomSheet are both mounted, we need to specifically target the BottomSheet container
        bottom_sheet = page.locator('.md\\:hidden')
        end_step = bottom_sheet.locator('button:has-text("The British Museum")').first
        await end_step.wait_for()

        # Check button role and classes
        role = await end_step.evaluate("el => el.getAttribute('role') || el.tagName")
        print(f"BottomSheet step element tag/role: {role}")
        assert role.lower() == 'button', "BottomSheet Step element is not a button"

        class_list = await end_step.evaluate("el => el.className")
        assert "focus-visible:outline-none" in class_list, "Missing focus-visible classes in BottomSheet"
        assert "focus-visible:ring-2" in class_list, "Missing focus-visible ring classes in BottomSheet"

        aria_current_before = await end_step.evaluate("el => el.getAttribute('aria-current')")
        print(f"BottomSheet step aria-current before click: {aria_current_before}")
        assert aria_current_before is None, "Aria-current should be null before selection"

        # Click the step to set it active
        await end_step.click()
        await page.wait_for_timeout(500) # wait for re-render

        aria_current_after = await end_step.evaluate("el => el.getAttribute('aria-current')")
        print(f"BottomSheet step aria-current after click: {aria_current_after}")
        assert aria_current_after == 'step', "Aria-current not set to 'step' after selection"

        print("BottomSheet tests passed.")

        print("All accessibility tests passed.")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())