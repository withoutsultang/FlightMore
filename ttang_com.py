from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
from dbconn import Database
from datetime import datetime

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

def extract_flight_info(driver, index):
    try:
        # 출발지와 도착지 정보 추출
        starting = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.optWay > span:nth-child(1) > strong'))).text
        destination = driver.find_element(By.CSS_SELECTOR, 'div.optWay > span:nth-child(3) > strong').text

        flight_info = []
        exair2_elements = driver.find_elements(By.CLASS_NAME, 'exair2')

        for i in range(1, len(exair2_elements) + 1):
            airline = driver.find_element(By.CSS_SELECTOR, "body > div.layerLoadWrap > div > div > div.lyContWrap.lyc_exairScedule.srch_result.fixTopScroll > div:nth-child(1) > div > div.abtLogo > span").text
            departure_date = driver.find_element(By.CSS_SELECTOR, f"#id_detail_result > li:nth-child({i}) > div > div.airScdInfo3 > ul > li:nth-child(1)").text
            return_date = driver.find_element(By.CSS_SELECTOR, f"#id_detail_result > li:nth-child({i}) > div > div.airScdInfo3 > ul > li:nth-child(2)").text
            validity_period = driver.find_element(By.CSS_SELECTOR, f"#id_detail_result > li:nth-child({i}) > div > div.airScdInfo3 > ul > li:nth-child(3)").text
            opt_seat = driver.find_element(By.CSS_SELECTOR, f"#id_detail_result > li:nth-child({i}) > div > div.airScdInfo3 > strong").text
            price = driver.find_element(By.CSS_SELECTOR, f"#id_detail_result > li:nth-child({i}) > div > div.wrapMore > div.wrapMoreTop > p > span.priceWrap.fc_red > span").text.replace(",", "")
            # 상세일정 보기
            element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, f"#div_title_{i}")))
            driver.execute_script("arguments[0].click();", element)

            outbound_flight_number = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, f"#div_sche_{i} > div:nth-child(1) > div > div.groupB > p.optPCode"))).text
            outbound_departure_time = driver.find_element(By.CSS_SELECTOR, f"#div_sche_{i} > div:nth-child(1) > div > div.groupA.absL > p.optTime > strong").text
            inbound_flight_number = driver.find_element(By.CSS_SELECTOR, f"#div_sche_{i} > div:nth-child(2) > div > div.groupB > p.optPCode").text
            inbound_departure_time = driver.find_element(By.CSS_SELECTOR, f"#div_sche_{i} > div:nth-child(2) > div > div.groupA.absL > p.optTime > strong").text

            flight_info.append({
                "airline": airline,
                "arrival_airport": starting,
                "departure_airport": destination,
                "arrival_time": departure_date,
                "departure_time": return_date,
                "validity_period": validity_period,
                "opt_seat": opt_seat,
                "price": int(price),
                "outbound_flight_number": outbound_flight_number,
                "outbound_departure_time": outbound_departure_time,
                "inbound_flight_number": inbound_flight_number,
                "inbound_departure_time": inbound_departure_time
            })

        return flight_info

    except Exception as e:
        print(f"데이터를 추출하는 도중 오류 발생: {e}")
        return None

def main():
    start_time = time.time()

    driver = init_webdriver()
    db = Database()

    url = "https://mm.ttang.com/ttangair/search/discount/today.do?trip=RT&gubun=T"

    try:
        driver.get(url)
        wait_for_element(driver, By.CSS_SELECTOR, '#more_page_num')
        scroll_to_bottom(driver)

        flights = driver.find_elements(By.CSS_SELECTOR, '#id_fare_text > strong:nth-child(2)')

        for index in range(1, len(flights) + 1):
            try:
                # 예약하기 선택
                element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, f'#id_search_result > li:nth-child({index}) > a')))
                driver.execute_script("arguments[0].click();", element)

                # 탑승 인원 선택
                element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.btn_area.n2 > span:nth-child(2) > button')))
                driver.execute_script("arguments[0].click();", element)

                flight_info = extract_flight_info(driver, index)
                if flight_info:
                    # 추출된 항공편 정보를 배치로 처리하여 삽입 또는 업데이트
                    db.insert_or_update_flight_data_batch(flight_info)

                # 뒤로 가기
                back_button = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.lyHeaderWrap > a')))
                driver.execute_script("arguments[0].click();", back_button)

            except Exception as e:
                print(f"특가 선택 도중 오류 발생 : {e}")

    except Exception as e:
        print(f"오류 발생: {e}")

    finally:
        driver.quit()
        db.close()
        end_time = time.time()
        total_time = end_time - start_time
        print(f"총 실행 시간: {total_time:.2f}초")


if __name__ == "__main__":
    main()
