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

adult = 1

url = ("https://mm.ttang.com/ttangair/search/discount/today.do?trip=RT&gubun=T")

try:
    driver.get(url)
    WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '#more_page_num'))
    )

    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        new_height = driver.execute_script("return document.body.scrollHeight")

        if new_height == last_height:
            break
        last_height = new_height

    #flights = driver.find_elements(By.CSS_SELECTOR, '#id_search_result')

    flights = driver.find_elements(By.CSS_SELECTOR, '#id_fare_text > strong:nth-child(2)')[0].text

    for index in range(1, len(flights)+1):
        try:
            # 예약하기 선택
            element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, f'#id_search_result > li:nth-child({index}) > a')))
            driver.execute_script("arguments[0].click();", element)
        except Exception as e:
            print(f"특가 선택 도중 오류 발생 : {e}")

        try:
            # 탑승인원쪽 선택
            element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'body > div.layerLoadWrap > div > div.btn_area.n2 > span:nth-child(2) > button')))
            driver.execute_script("arguments[0].click();", element)
        except Exception as e:
            print(f"탑승인원 선택 도중 오류 발생 : {e}")

        # ? to ? 항공권 갯수 확인
        flight_deals = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.XPATH, '/html/body/div[8]/div/div/div[2]/div[2]/ul')))
        flight_deals = flight_deals[0]
        exair2_elements = flight_deals.find_elements(By.CLASS_NAME, 'exair2')

        starting = driver.find_element(By.CSS_SELECTOR, 'body > div.layerLoadWrap > div > div > div.lyContWrap.lyc_exairScedule.srch_result.fixTopScroll > div:nth-child(1) > div > div.optWay > span:nth-child(1) > strong').text
        destination = driver.find_element(By.CSS_SELECTOR, 'body > div.layerLoadWrap > div > div > div.lyContWrap.lyc_exairScedule.srch_result.fixTopScroll > div:nth-child(1) > div > div.optWay > span:nth-child(3) > strong').text

        try:
            for i in range(1, len(exair2_elements)+1):
                element = driver.find_element(By.CSS_SELECTOR, f'#id_detail_result > li:nth-child({i}) #div_title_{i}')
                driver.execute_script("arguments[0].click();", element)

                # 출국일 추출
                departure_date = driver.find_element(By.CSS_SELECTOR, f"#id_detail_result > li:nth-child({i}) > div > div.airScdInfo3 > ul > li:nth-child(1)").text
                # 귀국일 추출
                return_date = driver.find_element(By.CSS_SELECTOR, f"#id_detail_result > li:nth-child({i}) > div > div.airScdInfo3 > ul > li:nth-child(2)").text
                # 유효기간 추출
                validity_period = driver.find_element(By.CSS_SELECTOR, f"#id_detail_result > li:nth-child({i}) > div > div.airScdInfo3 > ul > li:nth-child(3)").text

#id_detail_result > li:nth-child(1) > div > div.airScdInfo3 > strong
                # 좌석 수 추출
                opt_seat = driver.find_element(By.CSS_SELECTOR, f"#id_detail_result > li:nth-child({i}) > div > div.airScdInfo3 > strong").text
#id_detail_result > li:nth-child(1) > div > div.wrapMore > div.wrapMoreTop > p > span.priceWrap.fc_red > span
                # 총 금액 추출
                price = driver.find_element(By.CSS_SELECTOR, f"#id_detail_result > li:nth-child({i}) > div > div.wrapMore > div.wrapMoreTop > p > span.priceWrap.fc_red > span").text

                time.sleep(1)

                # 출국 편명 및 시간 추출
                #div_sche_1 > div:nth-child(2) > div > div.groupB > p.optPCode#div_sche_1 > div:nth-child(1) > div > div.groupB > p.optPTime
                outbound_flight_number = driver.find_element(By.CSS_SELECTOR, f"#div_sche_{i} > div:nth-child(1) > div > div.groupB > p.optPCode").text
                outbound_departure_time = driver.find_element(By.CSS_SELECTOR, f"#div_sche_{i} > div:nth-child(1) > div > div.groupA.absL > p.optTime > strong").text
                # 귀국 편명 및 시간 추출
                inbound_flight_number = driver.find_element(By.CSS_SELECTOR, f"#div_sche_{i} > div:nth-child(2) > div > div.groupB > p.optPCode").text
                inbound_departure_time = driver.find_element(By.CSS_SELECTOR, f"#div_sche_{i} > div:nth-child(2) > div > div.groupA.absL > p.optTime > strong").text

                print("출발지 :", starting, ", 도착지 :", destination)
                print( departure_date)
                print( return_date)
                print(validity_period)
                print("좌석 수:", opt_seat)
                print("총 금액:", price, "원")
                print("출국 편명:", outbound_flight_number)
                print("출국 출발시간:", outbound_departure_time)
                print("귀국 편명:", inbound_flight_number)
                print("귀국 출발시간:", inbound_departure_time)
                print("-" * 40)

        except Exception as e:
            print(f"데이터를 추출하는 도중 오류 발생: {e}")


        element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'body > div.layerLoadWrap > div > div > div.lyHeaderWrap > a')))
        driver.execute_script("arguments[0].click();", element)

except Exception as e:
     print(f"오류 발생: {e}")

finally:
    driver.quit()
    end_time = time.time()
    total_time = end_time - start_time
    print(f"총 실행 시간: {total_time:.2f}초")