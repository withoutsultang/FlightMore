import React, { useState } from "react";
import CSS from '../styles/NotificationCSS';

const NotificationSettings = () => {
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureLocation, setDepartureLocation] = useState('서');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [numPeople, setNumPeople] = useState('1');

    return (
        <div>
            <CSS.InfoRow>
                <CSS.Label>출발</CSS.Label>
                <CSS.Input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
                <CSS.Select value={departureLocation} onChange={(e) => setDepartureLocation(e.target.value)}>
                    <option value="ICN">인천(ICN)</option>
                    <option value="GMP">김포(GMP)</option>
                    <option value="PUS">부산(PUS)</option>
                </CSS.Select>
            </CSS.InfoRow>
            <CSS.InfoRow>
                <CSS.Label>도착</CSS.Label>
                <CSS.Input type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
                <CSS.Select value={arrivalLocation} onChange={(e) => setArrivalLocation(e.target.value)}>
                    <option value="TYO">도쿄(TYO)</option>
                    <option value="KIX">오사카(KIX)</option>
                    <option value="FUK">후쿠오카(FUK)</option>
                </CSS.Select>
            </CSS.InfoRow>
            <CSS.InfoRow>
                <CSS.Label>가격</CSS.Label>
                <CSS.Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                    <option value="0 ~ 250,000">0 ~ 250,000</option>
                    <option value="250,000 ~ 500,000">250,000 ~ 500,000</option>
                    <option value="500,000 ~ 1,000,000">500,000 ~ 1,000,000</option>
                </CSS.Select>
                <CSS.NumberInput type="number" min="1" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />명
            </CSS.InfoRow>
            <CSS.RegisterButton>등록하기</CSS.RegisterButton>
        </div>
    );
};

export default NotificationSettings;