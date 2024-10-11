# 데이터베이스에 저장할 때 칼럼 네임 통일이랑 어디서 수집햇는지, 언제 수집햇는지  칼럼 추가
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
import logging
from dbconn import Database
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor


# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


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
    try:  # 수정: try-except 블록 추가로 예외 처리 강화
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
            "price": price,
            "site": "Naver",
            "created_date": datetime.now(),
            "updated_date": None
        }
    except Exception as e:
        logging.error(f"데이터 추출 중 오류 발생: {e}")  # 수정: print 대신 logging 사용
        return None



def crawl_flight_data(driver, url, departure_date, db):
    driver = init_webdriver()
    try:
        driver.get(url)
        wait_for_element(driver, By.CSS_SELECTOR, '#container > div.priceGraph_PriceGraph__HsePr')
        scroll_to_bottom(driver)
        flights = driver.find_elements(By.CSS_SELECTOR, '.concurrent_ConcurrentItemContainer__NDJda')

        flight_data = []
        for flight in flights:
            data = extract_flight_data(flight, departure_date)
            if data and not db.is_duplicate(data["airline"], data["arrival_airport"], data["arrival_time"], data["departure_airport"], data["departure_time"]):
                flight_data.append(data)

        return flight_data
    except Exception as e:
        logging.error(f"크롤링 중 오류 발생: {e}")  # 수정: print 대신 logging 사용
        return []
    finally:
        driver.quit()

def main():
    start_time = time.time()

    db = Database()

    departures = 'ICN'
    arrivals = ['TYO', 'KIX', 'NGO', 'FUK', 'CTS']  # 여러 도착지 설정
    departure_date = '20240918' # 추후 수정
    arrival_date = '20240920' # 추후 수정
    adult = 1
    child = 0

    try:
        # 수정: ThreadPoolExecutor를 사용한 병렬 처리
        with ThreadPoolExecutor(max_workers=5) as executor:
            futures = []
            for arrival in arrivals:
                url = (f"https://flight.naver.com/flights/international/"
                       f"{departures}-{arrival}-{departure_date}/{arrival}-{departures}-{arrival_date}"
                       f"?adult={adult}&child={child}&isDirect=true&fareType=Y")
                futures.append(executor.submit(crawl_flight_data, url, departure_date, db))

            for future in futures:
                flight_data = future.result()
                if flight_data:
                    db.insert_flight_data_batch(flight_data)

    except Exception as e:
        logging.error(f"메인 실행 중 오류 발생: {e}")  # 수정: print 대신 logging 사용
    finally:
        db.close()
        end_time = time.time()
        total_time = end_time - start_time
        logging.info(f"네이버 항공권 크롤링 완료. 소요 시간: {total_time:.2f}초")  # 수정: print 대신 logging 사용


if __name__ == "__main__":
    main()
