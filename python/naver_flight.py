from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
from dbconn import Database
from datetime import datetime, timedelta

def init_webdriver():
    option = webdriver.ChromeOptions()
    option.add_argument("--headless")
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=option)
    return driver

def wait_for_element(driver, by, value, timeout=30):
    return WebDriverWait(driver, timeout).until(EC.presence_of_element_located((by, value)))

def scroll_to_bottom(driver):
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

def extract_flight_data(flight, departure_date):
    flight_airline = flight.find_element(By.CSS_SELECTOR, '.airline_name__0Tw5w').text.strip()
    departure_time = flight.find_elements(By.CSS_SELECTOR, '.route_time__xWu7a')[0].text.strip()
    departure_airport = flight.find_elements(By.CSS_SELECTOR, '.route_code__S07WE')[0].text.strip()
    arrival_time = flight.find_elements(By.CSS_SELECTOR, '.route_time__xWu7a')[1].text.strip()
    arrival_airport = flight.find_elements(By.CSS_SELECTOR, '.route_code__S07WE')[1].text.strip()
    flight_duration = flight.find_element(By.CSS_SELECTOR, '.route_info__RVh13').text.strip()
    flight_duration_text = flight_duration.replace('직항,', '').strip() if '직항,' in flight_duration else flight_duration

    try:
        price = int(flight.find_element(By.CSS_SELECTOR, '.item_promoted__fRqOW .item_num__aKbk4').text.strip().replace(",", "").replace("원", ""))
    except:
        price = int(flight.find_element(By.CSS_SELECTOR, '.item_usual__wg002 .item_num__aKbk4').text.strip().replace(",", "").replace("원", ""))

    flight_arrival_time = datetime.strptime(f"{departure_date} {arrival_time}", '%Y%m%d %H:%M')
    flight_departure_date = datetime.strptime(f"{departure_date} {departure_time}", '%Y%m%d %H:%M')
    hours, minutes = map(int, flight_duration_text.replace('시간', '').replace('분', '').split())
    flight_time = timedelta(hours=hours, minutes=minutes)

    return {
        "flight_number": "",
        "airline": flight_airline,
        "arrival_airport": arrival_airport,
        "arrival_time": flight_arrival_time,
        "departure_airport": departure_airport,
        "departure_time": flight_departure_date,
        "flight_time": flight_time,
        "price": price
    }

def crawl_flight_data(driver, url, departure_date, db):
    driver.get(url)
    wait_for_element(driver, By.CSS_SELECTOR, '#container > div.priceGraph_PriceGraph__HsePr')
    scroll_to_bottom(driver)
    flights = driver.find_elements(By.CSS_SELECTOR, '.concurrent_ConcurrentItemContainer__NDJda')

    flight_data = []
    for flight in flights:
        try:
            data = extract_flight_data(flight, departure_date)
            if not db.is_duplicate(data["airline"], data["arrival_airport"], data["arrival_time"], data["departure_airport"], data["departure_time"]):
                flight_data.append(data)
        except Exception as e:
            print(f"데이터를 추출하는 도중 오류 발생: {e}")

    return flight_data

def main():
    start_time = time.time()

    driver = init_webdriver()
    db = Database()

    departures = 'ICN'
    arrivals = 'TYO'
    departure_date = '20240918'
    arrival_date = '20240920'
    adult = 1
    child = 0

    url = (f"https://flight.naver.com/flights/international/"
           f"{departures}-{arrivals}-{departure_date}/{arrivals}-{departures}-{arrival_date}"
           f"?adult={adult}&child={child}&isDirect=true&fareType=Y")

    try:
        flight_data = crawl_flight_data(driver, url, departure_date, db)
        if flight_data:
            db.insert_flight_data_batch(flight_data)
    except Exception as e:
        print(f"오류 발생: {e}")
    finally:
        driver.quit()
        db.close()
        end_time = time.time()
        total_time = end_time - start_time
        print(f"네이버 항공권 크롤링 시간: {total_time:.2f}초")

if __name__ == "__main__":
    main()
