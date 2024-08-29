import React from "react";
import CSS from '../styles/ListCSS';
import Tostify from '../components/Tostify';
import { ToastContainer } from "react-toastify";

const NotifyList = () => {
    const notifyData = [
        {
            from: "인천(ICN)",
            to: "도쿄(TYO)",
            departure: "2024-09-05",
            return: "2024-09-08",
            price: "0 ~ 250,000원",
            people: "1명"
        },
        {
            from: "인천(ICN)",
            to: "오사카(KIX)",
            departure: "2024-09-05",
            return: "2024-09-08",
            price: "0 ~ 250,000원",
            people: "1명"
        },
        {
            from: "부산(PUS)",
            to: "후쿠오카(FUK)",
            departure: "2024-09-05",
            return: "2024-09-08",
            price: "0 ~ 250,000원",
            people: "1명"
        },
        {
            from: "부산(PUS)",
            to: "후쿠오카(FUK)",
            departure: "2024-09-05",
            return: "2024-09-08",
            price: "0 ~ 250,000원",
            people: "1명"
        }
    ];

    const handleDeleteClick = () => {
        Tostify.Error('알림이 삭제되었습니다.');
    };

    return (
        <CSS.Container>
            {notifyData.map((data, i) => (
                <CSS.NotifyContainer key={i}>
                    <CSS.NotifyBox>
                        <CSS.Row>
                            <CSS.Text>{data.from} ➡️ {data.to}</CSS.Text>
                            <CSS.Text>{data.departure} ➡️ {data.return}</CSS.Text>
                        </CSS.Row>
                        <CSS.Row>
                            <CSS.Text>가격 {data.price}</CSS.Text>
                            <CSS.Text>인원 {data.people}</CSS.Text>
                        </CSS.Row>
                    </CSS.NotifyBox>
                    <CSS.DeleteButton onClick={handleDeleteClick}>&#10060;</CSS.DeleteButton>
                    <ToastContainer />
                </CSS.NotifyContainer>
            ))}
        </CSS.Container>
    );
};

export default NotifyList;
