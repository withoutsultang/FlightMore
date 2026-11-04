CREATE TABLE demo_flight (
    code VARCHAR(10) PRIMARY KEY,
    airline VARCHAR(60) NOT NULL,
    departure VARCHAR(3) NOT NULL,
    destination VARCHAR(3) NOT NULL,
    departure_date DATE NOT NULL,
    return_date DATE NOT NULL,
    price_per_person INTEGER NOT NULL,
    seats INTEGER NOT NULL
);

INSERT INTO demo_flight VALUES
    ('FM101', 'FlightMore Air', 'ICN', 'NRT', '2027-05-12', '2027-05-16', 189000, 4),
    ('FM102', 'FlightMore Air', 'ICN', 'NRT', '2027-05-12', '2027-05-16', 219000, 2),
    ('FM103', 'FlightMore Air', 'ICN', 'NRT', '2027-05-12', '2027-05-16', 289000, 6),
    ('FM104', 'FlightMore Air', 'ICN', 'NRT', '2027-05-12', '2027-05-16', 175000, 1),
    ('FM201', 'FlightMore Air', 'ICN', 'KIX', '2027-05-12', '2027-05-16', 175000, 4),
    ('FM202', 'FlightMore Air', 'ICN', 'NRT', '2027-05-13', '2027-05-16', 175000, 4);
