import React, { useState, useEffect } from 'react';
import { Container, Button, KeyContainer } from '../styles/TelegramCSS'; // 각각 개별 가져오기
import axios from 'axios';
import {Link} from "react-router-dom";

const TelegramConnection = () => {
    const [authKey, setAuthKey] = useState('');
    const [chatId, setChatId] = useState('');

    const handleGenerateKey = async () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (!storedUser) {
                alert('로그인 후 이용해주세요.');
                return;
            }

            const memberId = JSON.parse(storedUser).id;

            const response = await axios.post('http://localhost:8080/api/telegram/generate-key', {
                memberId: memberId,
            });

            const generatedAuthKey = response.data.authKey;
            console.log('Generated authKey from server:', generatedAuthKey);

            setAuthKey(generatedAuthKey);
        } catch (error) {
            alert('인증키를 발급하는 데 실패했습니다.');
        }
    };

    useEffect(() => {
        if (authKey) {
            console.log('Updated authKey state:', authKey);
        }
    }, [authKey]);

    const handleAddTelegram = () => {
        if (!authKey) {
            alert('먼저 인증키를 발급받으세요.');
            return;
        }
        alert(`Telegram 봇에 다음 키를 입력해주세요\n AUTH: ${authKey}`);
    };

    const handleDisconnect = async () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (!storedUser) {
                alert('로그인 후 이용해주세요.');
                return;
            }

            const memberId = JSON.parse(storedUser).id;

            await axios.post('http://localhost:8080/api/telegram/disconnect', { memberId });
            setChatId('');
            alert('Telegram 연결이 해제되었습니다.');
        } catch (error) {
            console.error('Failed to disconnect', error);
            alert('연결 해제에 실패했습니다.');
        }
    };

    return (
        <Container>
            <Button onClick={handleGenerateKey}>인증키 발급</Button>
            <Button onClick={handleAddTelegram}>텔레그램 추가</Button>
            {authKey && (
                <KeyContainer>
                    <span>텔레그램: <Link to={"https://t.me/FlightMorebot"}/></span>
                    인증키: {authKey}
                </KeyContainer>
            )}
            <Button onClick={handleDisconnect}>연결 해제</Button>
        </Container>
    );
};  

export default TelegramConnection;
