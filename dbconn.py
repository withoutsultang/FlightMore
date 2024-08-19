import psycopg
from psycopg_pool import ConnectionPool
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()

class Database:
    def __init__(self):
        self.pool = ConnectionPool(
            conninfo=f"host={os.getenv('DB_HOST')} dbname={os.getenv('DB_NAME')} user={os.getenv('DB_USER')} password={os.getenv('DB_PASSWORD')} port={os.getenv('DB_PORT')}",
            min_size=1,
            max_size=10
        )

    def insert_flight_data_batch(self, flight_data_batch):
        insert_query = '''
        INSERT INTO fm_flight (flight_number, flight_airline, flight_arrival, flight_arrival_time, flight_departure, flight_departure_date, flight_time, flight_price)
        VALUES %s
        '''
        records = [(data['flight_number'], data['airline'], data['arrival_airport'], data['arrival_time'],
                    data['departure_airport'], data['departure_time'], data['flight_time'], data['price'])
                   for data in flight_data_batch]
        with self.pool.connection() as conn:
            with conn.cursor() as cur:
                psycopg.extras.execute_values(cur, insert_query, records)
            conn.commit()

    def is_duplicate(self, flight_airline, flight_arrival, flight_arrival_time, flight_departure, flight_departure_date):
        check_query = '''
        SELECT COUNT(*) FROM fm_flight 
        WHERE flight_airline = %s 
        AND flight_arrival = %s 
        AND flight_arrival_time = %s 
        AND flight_departure = %s 
        AND flight_departure_date = %s;
        '''
        with self.pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(check_query, (flight_airline, flight_arrival, flight_arrival_time, flight_departure, flight_departure_date))
                count = cur.fetchone()[0]
                return count > 0

    def close(self):
        self.pool.close()

if __name__ == "__main__":
    db = Database()
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"PostgreSQL 연결 성공 - 시간: {current_time}")
    db.close()
