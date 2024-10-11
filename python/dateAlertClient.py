import requests

class DateAlarmClient:
    def __init__(self, base_url):
        self.base_url = base_url

    def get_date_alarms(self):
        try:
            response = requests.get(f"{self.base_url}/api/alarm/dates")
            response.raise_for_status()  # HTTPError 발생
            return response.json()
        except requests.RequestException as e:
            print(f"API 호출 중 오류 발생: {e}")
            return []
