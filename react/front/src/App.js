import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const handleLogin = () => {
    /* (임시)main으로 이동 */
    navigate('/main');
  };

  return (
    <Container>
      <LeftColumn>
        <Title>항공권모아</Title>
        <Description>
          <p>항공권 특가 정보 실시간 제공</p>
          <p>편리한 가격 추이 그래프</p>
          <p>맞춤형 항공권까지</p>
        </Description>
        <SmallText>
          <p>지금 바로</p>
          <p>알림 받아보기</p>
          <p>▼</p>
        </SmallText>
        <Button onClick={handleLogin}>네이버 로그인</Button>
      </LeftColumn>
      <RightColumn>
        {/* 캡쳐 화면 이미지 */}
        <Image></Image>
      </RightColumn>
    </Container>
  );
}

export default App;

// CSS
const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const LeftColumn = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RightColumn = styled.div`
  flex: 1;
  margin-right : 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius : 10px;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const SmallText = styled.p`
  text-align: center;
  font-size: 0.8em;
  margin-bottom: 20px;
`;

const Image = styled.div`
  width : 40%;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #28a745; /* 초록색 버튼 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;