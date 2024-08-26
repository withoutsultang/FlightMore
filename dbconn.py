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

    def insert_flight_data_batch(self, flight_data_batch):
        insert_query = '''
        INSERT INTO fm_flight (flight_number, flight_airline, flight_arrival, flight_arrival_time, flight_departure, flight_departure_date, flight_time, flight_price)
        VALUES (%(flight_number)s, %(airline)s, %(arrival_airport)s, %(arrival_time)s, %(departure_airport)s, %(departure_time)s, %(flight_time)s, %(price)s)
        '''
        try:
            with self.pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.executemany(insert_query, flight_data_batch)
                conn.commit()
            print(f"{len(flight_data_batch)}개의 항공편 데이터가 삽입되었습니다.")
        except psycopg.Error as e:
            print(f"데이터 삽입 실패: {e}")

    def is_duplicate(self, flight_airline, flight_arrival, flight_arrival_time, flight_departure, flight_departure_date):
        check_query = '''
        SELECT COUNT(*) FROM fm_flight 
        WHERE flight_airline = %s 
        AND flight_arrival = %s 
        AND flight_arrival_time = %s 
        AND flight_departure = %s 
        AND flight_departure_date = %s;
        '''
        try:
            with self.pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(check_query, (flight_airline, flight_arrival, flight_arrival_time, flight_departure, flight_departure_date))
                    count = cur.fetchone()[0]
                    return count > 0
        except psycopg.Error as e:
            print(f"중복 체크 실패: {e}")
            return False

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
