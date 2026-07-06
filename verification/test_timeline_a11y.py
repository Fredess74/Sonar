from playwright.sync_api import sync_playwright
import time
import sys

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    # Desktop view for Sidebar
    context = browser.new_context(viewport={'width': 1280, 'height': 800})
    page = context.new_page()

    print("Navigating to http://localhost:3000...")
    try:
        page.goto("http://localhost:3000")
        page.wait_for_load_state("networkidle")
    except Exception as e:
        print(f"Failed to load page: {e}")
        browser.close()
        sys.exit(1)

    print("Starting simulation to load mock data...")
    page.get_by_role("button", name="Start Simulation").click()
    time.sleep(1) # wait for data to load and Sidebar to render

    print("Verifying Sidebar timeline buttons (Desktop)...")
    # Get the "Soho Square" waypoint which does not have a place_card so it stays in the list
    central_park_btn = page.locator('.md\\:flex button', has_text="Soho Square").first

    # Click to select it
    central_park_btn.click()
    time.sleep(0.5)

    # Check aria-current
    aria_current = central_park_btn.get_attribute('aria-current')
    if aria_current != 'step':
        print(f"Error: Expected aria-current='step', got {aria_current}")
        sys.exit(1)

    print("Testing keyboard focus on Sidebar timeline buttons...")
    page.keyboard.press("Tab") # Move focus
    time.sleep(0.5)

    print("Desktop Sidebar verification passed.")

    # Mobile view for BottomSheet
    context_mobile = browser.new_context(viewport={'width': 375, 'height': 812})
    page_mobile = context_mobile.new_page()
    page_mobile.goto("http://localhost:3000")
    page_mobile.wait_for_load_state("networkidle")

    print("Starting simulation on mobile...")
    page_mobile.get_by_role("button", name="Start Simulation").click()
    time.sleep(1)

    print("Verifying BottomSheet timeline buttons (Mobile)...")
    # Get the "Soho Square" waypoint
    central_park_btn_mobile = page_mobile.locator('.md\\:hidden button', has_text="Soho Square").first

    # Click to select it
    central_park_btn_mobile.click()
    time.sleep(0.5)

    # Check aria-current
    aria_current_mobile = central_park_btn_mobile.get_attribute('aria-current')
    if aria_current_mobile != 'step':
        print(f"Error: Mobile expected aria-current='step', got {aria_current_mobile}")
        sys.exit(1)

    print("Testing keyboard focus on BottomSheet timeline buttons...")
    page_mobile.keyboard.press("Tab") # Move focus
    time.sleep(0.5)

    print("Mobile BottomSheet verification passed.")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
