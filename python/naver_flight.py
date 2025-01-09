from http.client import responses

import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
import logging
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor
import json

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

SPRING_BOOT_URL = "http://localhost:8080/api"

def is_duplicate(data, all_flight_data):
    for flight in all_flight_data:
        if (flight["airline"] == data["airline"] and
            flight["arrival_airport"] == data["arrival_airport"] and
            flight["arrival_time"] == data["arrival_time"] and
            flight["departure_airport"] == data["departure_airport"] and
            flight["departure_time"] == data["departure_time"]):
            return True
    return False

def fetch_notification():
    response = requests.get(f"{SPRING_BOOT_URL}/notify/all")
    if response.status_code == 200:
        return response.json()
    else:
        logging.error(f"알림 조회 실패: {response.status_code}{response.text}")
        return []

def send_data(flight_data):
    flight_data = [data for data in flight_data if data is not None]

    if not flight_data:
        logging.error("전송할 데이터가 없습니다. 데이터가 None이거나 잘못된 형식입니다.")
        return
    url  = f"{SPRING_BOOT_URL}/flights"
    headers = {
        'Content-Type': 'application/json',
    }
    try:
        response = requests.post(url, headers=headers, data=json.dumps(flight_data))
        if response.status_code == 200:
            logging.info(f"데이터 전송 성공: {response.json()}")
        else:
            logging.error(f"데이터 전송 실패: {response.status_code}{response.text}")
    except Exception as e:
        logging.error(f"데이터 전송 중 오류 발생: {e}")

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


def extract_flight_data(flight, departure_date, arrival_date, url):
    try:
        # 항공사 이름 추출
        flight_airline = flight.find_element(By.CSS_SELECTOR, '.airline_name__0Tw5w').text.strip()

        # 출발/도착 시간 및 공항 정보 추출
        departure_time = flight.find_elements(By.CSS_SELECTOR, '.route_time__xWu7a')[0].text.strip()
        departure_airport = flight.find_elements(By.CSS_SELECTOR, '.route_code__S07WE')[0].text.strip()
        arrival_time = flight.find_elements(By.CSS_SELECTOR, '.route_time__xWu7a')[1].text.strip()
        arrival_airport = flight.find_elements(By.CSS_SELECTOR, '.route_code__S07WE')[1].text.strip()

         # 가격 정보 추출
        try:
            price_element = flight.find_element(By.CSS_SELECTOR, '.item_usual__wg002 .item_num__aKbk4')
        except:
            price_element = flight.find_element(By.CSS_SELECTOR, '.item_firstItem__TFXDv .item_num__aKbk4')

        price = int(price_element.text.strip().replace(",", "").replace("원", ""))


        # 출발 및 도착 시간 포맷팅
        flight_arrival_time = datetime.strptime(f"{arrival_date} {arrival_time}", '%Y%m%d %H:%M').isoformat()
        flight_departure_date = datetime.strptime(f"{departure_date} {departure_time}", '%Y%m%d %H:%M').isoformat()

        # 데이터 구성
        return {
                "flightNumber": "",
                "flightAirline": flight_airline,
                "flightArrival": arrival_airport,
                "flightArrivalDate": flight_arrival_time,
                "flightDeparture": departure_airport,
                "flightDepartureDate": flight_departure_date,
                "flightPrice": price,
                "flightSite": "Naver",
                "url": url,
                "createdDate": datetime.now().isoformat(),
                "updatedDate": datetime.now().isoformat()
        }
    except Exception as e:
        logging.error(f"데이터 추출 중 오류 발생: {e}. 항공편: {flight.text[:100]}")  # 오류 위치를 쉽게 파악할 수 있도록 추가 정보 제공
        return None



def crawl_flight_data(url, departure_date, arrival_date, driver):
    try:
        driver.get(url)
        driver.implicitly_wait(2)
        wait_for_element(driver, By.CSS_SELECTOR, '#container > div.priceGraph_PriceGraph__HsePr')
        scroll_to_bottom(driver)
        flights = driver.find_elements(By.CSS_SELECTOR, '.concurrent_ConcurrentItemContainer__NDJda')

        flight_data = []
        for flight in flights:
            data = extract_flight_data(flight, departure_date, arrival_date, url)

            flight_data.append(data)

        return flight_data
    except Exception as e:
        logging.error(f"크롤링 중 오류 발생: {e}. URL: {url}")
        return []


def main():
    start_time = time.time()

    notifications = fetch_notification() # Spring boot로부터 알림 조회
    if not notifications:
        logging.info("조회된 알림이 없습니다.")
        return

    driver = init_webdriver()  # 드라이버를 한 번만 생성

    all_flight_data = []

    try:
        with ThreadPoolExecutor(max_workers=5) as executor:
            futures = []
            for notification in notifications:
                departures = notification["departureLocation"]
                arrival = notification["arrivalLocation"]
                departure_date = notification["departureDate"].replace("-", "")
                arrival_date = notification["arrivalDate"].replace("-", "")
                adult = notification["numPeople"]

                url = (f"https://flight.naver.com/flights/international/"
                       f"{departures}-{arrival}-{departure_date}/{arrival}-{departures}-{arrival_date}"
                       f"?adult={adult}&isDirect=true&fareType=Y")
                futures.append(executor.submit(crawl_flight_data, url, departure_date, arrival_date, driver))

            for future in futures:
                flight_data = future.result()
                if flight_data:
                    all_flight_data.extend(flight_data)
        if all_flight_data:
            logging.info(f"총 수집된 항공 데이터 수: {len(all_flight_data)}")
            print(all_flight_data[1])
            send_data(all_flight_data)
        else:
            logging.info("수집된 항공 데이터가 없습니다.")

    except Exception as e:
        logging.error(f"메인 실행 중 오류 발생: {e}")
    finally:
        driver.quit()
        end_time = time.time()
        total_time = end_time - start_time
        logging.info(f"네이버 항공권 크롤링 완료. 소요 시간: {total_time:.2f}초")


if __name__ == "__main__":
    main()
