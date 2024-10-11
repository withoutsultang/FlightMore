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

# 필요한 변수 설정
departure_city = "ICN"
arrival_city = "YGJ"
continent_code = "JPN"
departure_date = "2024-06-07"
arrival_date = "2024-06-09"

# URL 생성
url = (f"https://www.modetour.com/flights/discount-flight?query=%7B%22departureCity%22%3A%22{departure_city}%22%2C"
       f"%22arrivalCity%22%3A%22{arrival_city}%22%2C%22continentCode%22%3A%22{continent_code}%22%2C"
       f"%22departureDate%22%3A%22{departure_date}%22%2C%22arrivalDate%22%3A%22{arrival_date}%22%7D")

list = []

try:
    driver.get(url)

    element = driver.find_element(By.CSS_SELECTOR,'#main-layout-pc > main > div > div > div > div:nth-child(5) > div.flex.justify-between.items-center.h-full.mt-\[30px\] > div.flex.items-center.min-w-\[90px\].justify-end.cursor-pointer > div > div')
    driver.execute_script("arguments[0].click();", element)

    # element = WebDriverWait(driver, 10).until(
    #         EC.presence_of_element_located((By.CSS_SELECTOR, "#main-layout-pc > main > div > div > div > div:nth-child(5) > div.flex.justify-between.items-center.h-full.mt-\[30px\] > div.flex.items-center.min-w-\[90px\].justify-end.cursor-pointer > div > div > div.SelectOptions_selectChange__yDG3d.mt-2.z-\[8\].absolute.right-0.top-\[110\%\].bg-\[\#fff\].w-\[140px\].rounded-\[5px\].overflow-hidden > span.h-\[42px\].text-\[14px\].text.text-blackText.px-\[18px\].flex.items-center.cursor-pointer.\!hover\:text-primary2.hover\:font-medium.text-\[\#111111\].font-medium.bg-\[\#ffffff\]"
    #         )))  # 도착지 선택 버튼
    # driver.execute_script("arguments[0].click();", element)

    # 항공 정보를 포함하는 div 요소들 찾기
    flight_info_divs = driver.find_elements(By.CSS_SELECTOR, "#main-layout-pc > main > div > div > div > div:nth-child(5) > div:nth-child(2) > div > div > div > div > div")
    if flight_info_divs[0].text == "조건에 해당하는 항공권이 없습니다.\n출발일 또는 도착지역을 변경하여 다시 검색 해 주세요.":
        print("조건에 해당하는 항공권이 없습니다.")
    else:
    # 각 div 요소를 순회하며 데이터 추출
        for flight_info_div in flight_info_divs:
            try:
                flight_info = flight_info_div.text.split("\n")

                # 항공사 이름
                airline_name = flight_info[0]

                # 출발 시간
                departure_time = flight_info[1]

                # 출발지
                departure_city = flight_info[2]

                # 도착지 출발 시간
                arrival_time = flight_info[5]

                # 도착지
                arrival_city = flight_info[6]
                # 소요 시간
                duration = flight_info[4]

                # 가격
                try:
                    discount = flight_info[11]
                    price = flight_info[12]
                except:
                    discount = "N/A"
                    price = flight_info[10]

                # 데이터 출력
                print(f"항공사: {airline_name}")
                print(f"출발 시간: {departure_time}")
                print(f"출발지: {departure_city}")
                print(f"출발 시간(도착지): {arrival_time}")
                print(f"도착지: {arrival_city}")
                print(f"소요 시간: {duration}")
                print(f"할인율: {discount}")
                print(f"가격: {price}")
                print("-" * 30)

            except Exception as e:
                print(f"데이터 추출 중 오류 발생: {e}")

except Exception as e:
     print(f"오류 발생: {e}")

finally:
    driver.quit()
    end_time = time.time()
    total_time = end_time - start_time
    print(f"총 실행 시간: {total_time:.2f}초")



