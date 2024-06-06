from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time

option = webdriver.ChromeOptions()
option.add_argument("--headless")  # 브라우저를 백그라운드에서 실행

# 실행 시간 측정 시작
start_time = time.time()

driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=option)

departures = 'ICN'
arrivals = 'TYO'
departure_date = '20240618'
arrival_date = '20240620'
adult = 1
child = 0

url = (f"https://flight.naver.com/flights/international/"
       f"{departures}-{arrivals}-{departure_date}/{arrivals}-{departures}-{arrival_date}"
       f"?adult={adult}&child={child}&isDirect=true&fareType=Y")

list = []

try:
    driver.get(url)
    WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '#container > div.priceGraph_PriceGraph__HsePr'))
    )

    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        new_height = driver.execute_script("return document.body.scrollHeight")

        if new_height == last_height:
            break
        last_height = new_height

    flights = driver.find_elements(By.CSS_SELECTOR, '.concurrent_ConcurrentItemContainer__NDJda')

    for flight in flights:
        try:
            airline_name = flight.find_element(By.CSS_SELECTOR, '.airline_name__0Tw5w').text.strip()
            departure_time = flight.find_elements(By.CSS_SELECTOR, '.route_time__xWu7a')[0].text.strip()
            departure_airport = flight.find_elements(By.CSS_SELECTOR, '.route_code__S07WE')[0].text.strip()
            arrival_time = flight.find_elements(By.CSS_SELECTOR, '.route_time__xWu7a')[1].text.strip()
            arrival_airport = flight.find_elements(By.CSS_SELECTOR, '.route_code__S07WE')[1].text.strip()
            flight_duration = flight.find_element(By.CSS_SELECTOR, '.route_info__RVh13').text.strip()
            try:
                price = flight.find_element(By.CSS_SELECTOR, '.item_promoted__fRqOW .item_num__aKbk4').text.strip() + "원"
            except:
                price = flight.find_element(By.CSS_SELECTOR, '.item_usual__wg002 .item_num__aKbk4').text.strip() + "원"

            print(f"항공사: {airline_name}")
            print(f"출발 시간: {departure_time} ({departure_airport})")
            print(f"도착 시간: {arrival_time} ({arrival_airport})")
            print(f"비행 시간: {flight_duration}")
            print(f"가격: {price}")
            print("-" * 40)
        except Exception as e:
            print(f"데이터를 추출하는 도중 오류 발생: {e}")

except Exception as e:
     print(f"오류 발생: {e}")

finally:
    driver.quit()
    end_time = time.time()
    total_time = end_time - start_time
    print(f"총 실행 시간: {total_time:.2f}초")



