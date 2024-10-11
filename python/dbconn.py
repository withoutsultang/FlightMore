import psycopg
from psycopg_pool import ConnectionPool
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()

class Database:
    def __init__(self):
        try:
            self.pool = ConnectionPool(
                conninfo=f"host={os.getenv('DB_HOST')} dbname={os.getenv('DB_NAME')} user={os.getenv('DB_USER')} password={os.getenv('DB_PASSWORD')} port={os.getenv('DB_PORT')}",
                min_size=1,
                max_size=10
            )
            print("PostgreSQL 연결 성공")
        except psycopg.Error as e:
            print(f"데이터베이스 연결 실패: {e}")
            raise

    def insert_or_update_flight_data_batch(self, flight_data_batch):
        insert_query = '''
        INSERT INTO fm_flight (flight_number, flight_airline, flight_arrival, flight_arrival_date, flight_departure, flight_departure_date, flight_price, flight_site, created_date)
        VALUES (%(flight_number)s, %(airline)s, %(arrival_airport)s, %(arrival_time)s, %(departure_airport)s, %(departure_time)s, %(price)s, %(site)s, %(created_date)s)
        '''
        update_query = '''
        UPDATE fm_flight 
        SET flight_price = %(price)s, updated_date = %(updated_date)s
        WHERE flight_airline = %(airline)s 
        AND flight_arrival = %(arrival_airport)s 
        AND flight_arrival_date = %(arrival_time)s 
        AND flight_departure = %(departure_airport)s 
        AND flight_departure_date = %(departure_time)s
        '''

        try:
            with self.pool.connection() as conn:
                with conn.cursor() as cur:
                    for flight_data in flight_data_batch:
                        is_duplicate, existing_price = self.is_duplicate(
                            flight_data['airline'],
                            flight_data['arrival_airport'],
                            flight_data['arrival_time'],
                            flight_data['departure_airport'],
                            flight_data['departure_time']
                        )

                        if is_duplicate:
                            if flight_data['price'] != existing_price:
                                flight_data['updated_date'] = datetime.now()  # 업데이트 날짜 추가
                                cur.execute(update_query, flight_data)
                                print(f"항공편 업데이트: {flight_data['flight_number']} - 가격 변경 {existing_price} -> {flight_data['price']}")
                        else:
                            cur.execute(insert_query, flight_data)
                            print(f"새 항공편 삽입: {flight_data['flight_number']}")

                    conn.commit()
        except psycopg.Error as e:
            print(f"데이터 삽입/업데이트 실패: {e}")

    def is_duplicate(self, flight_airline, flight_arrival, flight_arrival_time, flight_departure, flight_departure_date):
        check_query = '''
        SELECT flight_price FROM fm_flight 
        WHERE flight_airline = %s 
        AND flight_arrival = %s 
        AND flight_arrival_date = %s 
        AND flight_departure = %s 
        AND flight_departure_date = %s;
        '''
        try:
            with self.pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(check_query, (flight_airline, flight_arrival, flight_arrival_time, flight_departure, flight_departure_date))
                    result = cur.fetchone()
                    if result:
                        return True, result[0]  # 중복 항공편과 기존 가격 반환
                    else:
                        return False, None
        except psycopg.Error as e:
            print(f"중복 체크 실패: {e}")
            return False, None

    def close(self):
        try:
            self.pool.close()
            print("PostgreSQL 연결이 종료되었습니다.")
        except psycopg.Error as e:
            print(f"연결 종료 실패: {e}")


if __name__ == "__main__":
    db = Database()
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"PostgreSQL 연결 성공 - 시간: {current_time}")
    db.close()
