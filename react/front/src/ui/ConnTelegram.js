import React from 'react';
import CSS from '../styles/TelegramCSS';

const TelegramConnection = () => {
  const handleGenerateKey = () => {
    console.log('Generate Key');
  };

  const handleAddTelegram = () => {
    console.log('Add Telegram');
  };

  const handleDisconnect = () => {
    console.log('Disconnect');
  };

  return (
    <CSS.Container>
      <CSS.Button onClick={handleGenerateKey}>인증키 발급</CSS.Button>
      <CSS.Button onClick={handleAddTelegram}>텔레그램 추가</CSS.Button>
      <CSS.Button onClick={handleDisconnect}>연결 해제</CSS.Button>
    </CSS.Container>
  );
};

export default TelegramConnection;