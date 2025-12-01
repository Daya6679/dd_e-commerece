import os
import time
from PIL import Image, ImageChops
import pytest

# URLs you want to test visually
pages_to_check = [
    ("http://localhost:3001/men", "men.png"),
    ("http://localhost:3001/women", "women.png"),
    ("http://localhost:3001/kids", "kids.png"),
    ("http://localhost:3001/beauty", "beauty.png"),
]

@pytest.mark.parametrize("url,filename", pages_to_check)
def test_visual_ui(driver, url, filename):
    baseline_dir = os.path.join(os.getcwd(), "baseline_screenshots")
    current_dir = os.path.join(os.getcwd(), "current_screenshots")
    os.makedirs(current_dir, exist_ok=True)

    baseline_path = os.path.join(baseline_dir, filename)
    current_path = os.path.join(current_dir, filename)

    # Open the page
    driver.get(url)
    time.sleep(3)  # wait for JS and CSS to load

    # Capture a new screenshot
    driver.save_screenshot(current_path)

    # If baseline doesn’t exist, save it for future use
    if not os.path.exists(baseline_path):
        print(f"⚠️ Baseline not found for {url}, creating one.")
        driver.save_screenshot(baseline_path)
        pytest.skip(f"Baseline created for {url}. Re-run test next time.")
        return

    # Compare current vs baseline
    baseline_img = Image.open(baseline_path)
    current_img = Image.open(current_path)

    diff = ImageChops.difference(baseline_img, current_img)

    # Save diff image if difference found
    diff_path = os.path.join(current_dir, f"diff_{filename}")
    if diff.getbbox():
        diff.save(diff_path)
        assert False, f"UI difference found for {url}! Check {diff_path}"
