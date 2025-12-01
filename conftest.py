import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import os

@pytest.fixture(scope="function")
def driver():
    chrome_driver_path = os.path.join(os.getcwd(), "drivers", "chromedriver.exe")

    options = Options()
    options.add_argument("--start-maximized")
    # options.add_argument("--headless")  # uncomment if you don’t want to open browser

    service = Service(chrome_driver_path)
    driver = webdriver.Chrome(service=service, options=options)

    yield driver
    driver.quit()
