import psycopg
from psycopg_pool import ConnectionPool
from datetime import datetime
import csv
import os

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

    def fetch_old_data(self):
        """오늘 날짜 이전의 데이터를 조회"""
        fetch_query = """
        SELECT flight_number, flight_airline, flight_arrival, flight_arrival_date, 
               flight_departure, flight_departure_date, flight_price, flight_site, created_date, updated_date 
        FROM fm_flight 
        WHERE flight_departure_date < %s
        """
        try:
            with self.pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(fetch_query, (datetime.now().date(),))
                    rows = cur.fetchall()
                    return rows
        except psycopg.Error as e:
            print(f"데이터 조회 실패: {e}")
            return []

    def delete_old_data(self):
        """오늘 날짜 이전의 데이터를 삭제"""
        delete_query = """
        DELETE FROM fm_flight 
        WHERE flight_departure_date < %s
        """
        try:
            with self.pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(delete_query, (datetime.now().date(),))
                    conn.commit()
                    print("오늘 이전 데이터가 성공적으로 삭제되었습니다.")
        except psycopg.Error as e:
            print(f"데이터 삭제 실패: {e}")

    def close(self):
        try:
            self.pool.close()
            print("PostgreSQL 연결이 종료되었습니다.")
        except psycopg.Error as e:
            print(f"연결 종료 실패: {e}")

def save_data_to_file(data, file_path):
    """조회된 데이터를 파일로 저장"""
    with open(file_path, 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        # 파일의 첫 줄에 컬럼 이름을 추가 (해당 컬럼 이름은 데이터베이스 테이블 구조에 따라 변경)
        writer.writerow(['flight_number', 'flight_airline', 'flight_arrival', 'flight_arrival_date',
                         'flight_departure', 'flight_departure_date', 'flight_price', 'flight_site',
                         'created_date', 'updated_date'])
        # 데이터 추가
        writer.writerows(data)
    print(f"데이터가 파일로 저장되었습니다: {file_path}")

if __name__ == "__main__":
    db = Database()
    # 조회된 데이터를 파일로 저장
    old_data = db.fetch_old_data()
    if old_data:
        # 저장할 파일 경로
        file_path = f"old_flight_data_{datetime.now().strftime('%Y%m%d')}.csv"
        save_data_to_file(old_data, file_path)
        # 저장 후 데이터 삭제
        db.delete_old_data()
    else:
        print("삭제할 데이터가 없습니다.")

    db.close()
