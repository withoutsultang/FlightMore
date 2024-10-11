import React, { useState } from "react";
import CSS from '../styles/NotifyCSS';
import Tostify from '../components/Tostify';
import { ToastContainer } from "react-toastify";
import axios from "axios";

const SetNotify = () => {
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureLocation, setDepartureLocation] = useState('ICN');
    const [arrivalLocation, setArrivalLocation] = useState('TYO');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [numPeople, setNumPeople] = useState('1');

    const getUserId = () => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser).id : null;
    }

    const handleRegisterClick = async () => {
        const currentDate = new Date().toISOString().split("T")[0];

        if (departureDate < currentDate || arrivalDate < currentDate) {
            Tostify.Error('출발 및 도착 날짜는 현재 날짜 이후로 설정해야 합니다.');
            return;
        }

        if (arrivalDate < departureDate) {
            Tostify.Error('도착 날짜는 출발 날짜 이후여야 합니다.');
            return;
        }

        const minPriceValue = parseInt(minPrice);
        const maxPriceValue = parseInt(maxPrice);

        if (!minPrice || !maxPrice) {
            Tostify.Error('가격 범위를 입력하세요.');
            return;
        }

        if (isNaN(minPriceValue) || isNaN(maxPriceValue)) {
            Tostify.Error('가격 범위는 숫자여야 합니다.');
            return;
        }

        if (minPriceValue < 0 || maxPriceValue < 0) {
            Tostify.Error('가격은 0 이상이어야 합니다.');
            return;
        }

        if (minPriceValue > maxPriceValue) {
            Tostify.Error('최소 가격은 최대 가격보다 작아야 합니다.');
            return;
        }

        const numPeopleValue = parseInt(numPeople);

        if (!numPeople) {
            Tostify.Error('인원수를 입력하세요.');
            return;
        }

        if (isNaN(numPeopleValue) || numPeopleValue < 1) {
            Tostify.Error('인원수는 1명 이상이어야 합니다.');
            return;
        }

        // 유효성 검사가 통과되면 서버로 POST 요청 전송
        const notifyData = {
            memberId: getUserId(),
            departureDate,
            arrivalDate,
            departureLocation,
            arrivalLocation,
            minPrice: minPriceValue,
            maxPrice: maxPriceValue,
            numPeople: numPeopleValue
        };

        console.log(notifyData)

        try {
            const response = await axios.post('http://localhost:8080/api/notify', notifyData);
            if (response.status === 200) {
                Tostify.Success('알림이 등록되었습니다.');
            }
        } catch (error) {
            console.error("알림 등록 오류:", error);
            Tostify.Error('알림 등록에 실패했습니다.\n', error);
        }
    };

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
                    <option value="CTS">삿포로(CTS)</option>
                    <option value="NGO">나고야(NGO)</option>
                </CSS.Select>
            </CSS.InfoRow>
            <CSS.InfoRow>
                <CSS.Label>가격 범위</CSS.Label>
                <CSS.Input
                    type="number"
                    placeholder="최소 가격"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                ~
                <CSS.Input
                    type="number"
                    placeholder="최대 가격"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </CSS.InfoRow>
            <CSS.InfoRow>
                <CSS.Label>인원수</CSS.Label>
                <CSS.NumberInput type="number" min="1" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />명
            </CSS.InfoRow>
            <CSS.RegisterButton onClick={handleRegisterClick}>등록하기</CSS.RegisterButton>
            <ToastContainer />
        </div>
    );
};

export default SetNotify;
