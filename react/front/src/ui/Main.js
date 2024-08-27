import React, { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import image from '../components/Image';
import NotificationSettings from './NotificationSetting';
import SetAlarms from './SetAlarms';
import TelegramConnection from './TelegramConnection';

function Main() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('notificationSettings');

    //로그아웃 시 페이지 이동(임시) 추후 수정 필요
    const handleLogout = () => {
        navigate('/');
    };

    return (
      <Container>
        <Title>⚙️</Title>
        <InfoContainer>
          <Sidebar>
            <Profile>
              <ProfileImage src={image.img1} alt="프로필 이미지" />
              <ProfileName>김건우</ProfileName>
            </Profile>
            <SidebarItem
                active={activeSection === 'notificationSettings'}
                onClick={() => setActiveSection('notificationSettings')}>알림 설정</SidebarItem>
            <SidebarItem
              active={activeSection === 'setAlarms'}
              onClick={() => setActiveSection('setAlarms')}>설정된 알람</SidebarItem>
            <SidebarItem
              active={activeSection === 'telegram'}
              onClick={() => setActiveSection('telegram')}>텔레그램 연결</SidebarItem>
            <Logout><LogoutButton onClick={handleLogout}>로그아웃</LogoutButton></Logout>
          </Sidebar>
          <Content>
            {activeSection === 'notificationSettings' && <NotificationSettings />}
            {activeSection === 'setAlarms' && <SetAlarms />}
            {activeSection === 'telegram' && <TelegramConnection />}
          </Content>
        </InfoContainer>
      </Container>
    )
}

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;
  position: relative;
`;

const Title = styled.div`
  position: relative;
  top: 20px;
  left: 20px;
  font-size: 60px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 70%;
  height: 100%;
  max-height: 80%;
  margin: 20px 0px 0px 10%;
  padding: 0px 40px 0px 0px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Sidebar = styled.div`
  width: 20%;
  background-color: #f8f8f8;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
`;

//사이드바 프로필 영역
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ProfileName = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SidebarItem = styled.div`
  padding: 15px 10px;
  margin-bottom: 5px;
  background-color: ${(props) => (props.active ? '#cfe2ff' : 'transparent')};
  color: ${(props) => (props.active ? '#007bff' : '#000')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #d4e6ff;
  }
`;

//사이드바 로그아웃 영역
const Logout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #3cc73c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #34a53471;
  }
`;

const Content = styled.div`
  flex: 1;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;