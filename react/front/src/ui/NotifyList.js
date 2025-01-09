import React, { useEffect, useState } from "react";
import { Container, NotifyContainer, NotifyBox, Row, Text, DeleteButton } from '../styles/ListCSS';
import Tostify from '../components/Tostify';
import { ToastContainer } from "react-toastify";
import axios from 'axios';

const NotifyList = () => {
    const [notifyData, setNotifyData] = useState([]);

    const getUserId = () => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser).id : null;
    }

    const getNotifyData = async () => {
        const memberId = getUserId();
        if (memberId) {
            try {
                const response = await axios.get(`http://localhost:8080/api/notify/${memberId}`);
                setNotifyData(response.data);
            } catch (error) {
                Tostify.Error('알림 목록을 불러오는데 실패했습니다.');
            }
        } else {
            Tostify.Error('사용자 정보를 찾을 수 없습니다.');
        }
    }

    const handleDeleteClick = async (notificationId) => {
        try {
            await axios.delete(`http://localhost:8080/api/notify/${notificationId}`);
            Tostify.Success('알림이 삭제되었습니다.');
            getNotifyData();
        } catch (error) {
            Tostify.Error('알림 삭제에 실패했습니다.');
        }
    };

    useEffect(() => {
        getNotifyData();
    }, []);

    return (
        <Container>
            {notifyData.length > 0 ? notifyData.map((data, i) => (
                <NotifyContainer key={i}>
                    <NotifyBox>
                        <Row>
                            <Text>{data.departureLocation} ➡️ {data.arrivalLocation}</Text>
                            <Text>{data.departureDate} ➡️ {data.arrivalDate}</Text>
                        </Row>
                        <Row>
                            <Text>가격 {data.minPrice} ~ {data.maxPrice}</Text>
                            <Text>인원 {data.numPeople}</Text>
                        </Row>
                    </NotifyBox>
                    <DeleteButton onClick={() => handleDeleteClick(data.id)}>&#10060;</DeleteButton>
                </NotifyContainer>
            )) : <Text>등록된 알림이 없습니다.</Text>}
            <ToastContainer />
        </Container>
    );
};

export default NotifyList;
