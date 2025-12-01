import time
import pytest

# list of URLs and expected titles
pages_to_test = [
    ("http://localhost:3001/", "Create Next App"),
    ("http://localhost:3001/men", "Create Next App"),
    ("http://localhost:3001/women", "Create Next App"),
    ("http://localhost:3001/kids", "Create Next App"),
    ("http://localhost:3001/beauty", "Create Next App"),
]

@pytest.mark.parametrize("url,expected_title", pages_to_test)
def test_page_titles(driver, url, expected_title):
    driver.get(url)
    time.sleep(3)  # wait for JavaScript to load page content
    actual_title = driver.title
    assert expected_title in actual_title, f"Expected '{expected_title}' but got '{actual_title}' at {url}"
