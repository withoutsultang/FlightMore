import React, {useState} from 'react';
import styled from 'styled-components';
import {Routes, Route, Navigate} from 'react-router-dom';
import Slide from './components/Slide';
import LoginImage from './assets/images/btnG_login.png';
import NaverRedirectPage from './NaverRedirectPage';
import Main from './Main';

function App() {
    const [user, setUser] = useState(() => {
        // 로컬 스토리지에서 사용자 정보 가져오기
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const handleLogin = () => {
        /* 스프링으로 이동 */
        window.location.href = 'http://localhost:8080/login/naver';
    }

    const handleLogout = () => {
        // 로그아웃 시 로컬 스토리지에서 사용자 정보 삭제
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
            <Routes>
                <Route path={"/"} element={
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
                            <LoginButton onClick={handleLogin}>
                                <img src={LoginImage} alt="네이버 로그인" />
                            </LoginButton>
                        </LeftColumn>
                        <RightColumn>
                            <Image><Slide /></Image>
                        </RightColumn>
                    </Container>
                }/>
                <Route path={"/login/redirected/naver"} element={<NaverRedirectPage setUser={setUser}/>} />
                <Route path="/Main" element={user ? <Main user={user} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
            </Routes>
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const LoginButton = styled.button`
  border: none;
  background-color: transparent;
  img{
    width: 150px;
    height: 40px;
  }

  &:hover {
    cursor: pointer;
  }
`;