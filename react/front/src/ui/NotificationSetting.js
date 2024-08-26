import React, { useState } from "react";
import styled from 'styled-components';

const NotificationSettings = () => {
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureLocation, setDepartureLocation] = useState('서');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [numPeople, setNumPeople] = useState('1');

    return (
        <div>
            <InfoRow>
                <Label>출발</Label>
                <Input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
                <Select value={departureLocation} onChange={(e) => setDepartureLocation(e.target.value)}>
                    <option value="ICN">인천(ICN)</option>
                    <option value="GMP">김포(GMP)</option>
                    <option value="PUS">부산(PUS)</option>
                </Select>
            </InfoRow>
            <InfoRow>
                <Label>도착</Label>
                <Input type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
                <Select value={arrivalLocation} onChange={(e) => setArrivalLocation(e.target.value)}>
                    <option value="TYO">도쿄(TYO)</option>
                    <option value="KIX">오사카(KIX)</option>
                    <option value="FUK">후쿠오카(FUK)</option>
                </Select>
            </InfoRow>
            <InfoRow>
                <Label>가격</Label>
                <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                    <option value="0 ~ 250,000">0 ~ 250,000</option>
                    <option value="250,000 ~ 500,000">250,000 ~ 500,000</option>
                    <option value="500,000 ~ 1,000,000">500,000 ~ 1,000,000</option>
                </Select>
                <NumberInput type="number" min="1" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />명
            </InfoRow>
            <RegisterButton>등록하기</RegisterButton>
        </div>
    );
};

export default NotificationSettings;

// 스타일 컴포넌트
const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    border-bottom: 1px solid #ddd;
`;

const Label = styled.div`
    font-weight: bold;
    font-size: 1em;
    flex: 1;
`;

const Input = styled.input`
    flex: 2;
    padding: 8px;
    border: none;
    border-radius: 5px;
`;

const Select = styled.select`
    flex: 2;
    padding: 8px;
    border: none;
    border-radius: 5px;
`;

const NumberInput = styled.input`
    flex: 2;
    padding: 8px;
    border: none;
    border-radius: 5px;
    outline: none;
    text-align: center;

    // 스피너 제거
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const RegisterButton = styled.button`
    width: 100%;
    max-width: 40%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    background-color: #000000ff;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
        background-color: #00000065;
    }
`;
