import React from "react";
import CSS from '../styles/AlarmCSS';

const SetAlarms = () => {
    const alarmData = [
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

    return (
        <CSS.Container>
            {alarmData.map((alarm, i) => (
                <CSS.AlarmContainer key={i}>
                    <CSS.AlarmBox>
                        <CSS.Row>
                            <CSS.Text>{alarm.from} ➡️ {alarm.to}</CSS.Text>
                            <CSS.Text>{alarm.departure} ➡️ {alarm.return}</CSS.Text>
                        </CSS.Row>
                        <CSS.Row>
                            <CSS.Text>가격 {alarm.price}</CSS.Text>
                            <CSS.Text>인원 {alarm.people}</CSS.Text>
                        </CSS.Row>
                    </CSS.AlarmBox>
                    <CSS.DeleteButton>&#10060;</CSS.DeleteButton>
                </CSS.AlarmContainer>
            ))}
        </CSS.Container>
    );
};

export default SetAlarms;
