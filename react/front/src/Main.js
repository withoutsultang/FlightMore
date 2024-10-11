import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import image from './components/Image';
import CSS from './styles/MainCSS';
import Setting from './ui/SetNotify';
import List from './ui/NotifyList';
import Telegram from './ui/ConnTelegram';
import LogoutImage from './assets/images/btnG_logout.png';

function Main({user, handleLogout}) {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('setting');

    const handleLogoutClick = () => {
        // 로컬 스토리지에서 사용자 정보 삭제
        localStorage.removeItem('user');
        handleLogout(); // App.js에서 handleLogout 호출
        navigate('/'); // 홈 페이지로 리다이렉트
    };

    return (
      <CSS.Container>
        <CSS.Title>⚙️</CSS.Title>
        <CSS.InfoContainer>
          <CSS.Sidebar>
            <CSS.Profile>
              <CSS.ProfileImage src={user?.profileImageUrl || image.img1} alt="프로필 이미지" />
              <CSS.ProfileName>{user?.name || "guest"}</CSS.ProfileName>
            </CSS.Profile>
            <CSS.SidebarItem
                active={activeSection === 'setting'}
                onClick={() => setActiveSection('setting')}>알림 설정</CSS.SidebarItem>
            <CSS.SidebarItem
              active={activeSection === 'list'}
              onClick={() => setActiveSection('list')}>알람 목록</CSS.SidebarItem>
            <CSS.SidebarItem
              active={activeSection === 'telegram'}
              onClick={() => setActiveSection('telegram')}>텔레그램 연결</CSS.SidebarItem>
            <CSS.Logout><CSS.LogoutButton onClick={handleLogoutClick}>
                <img src={LogoutImage} alt="로그아웃"/>
            </CSS.LogoutButton></CSS.Logout>
          </CSS.Sidebar>
          <CSS.Content>
            {activeSection === 'setting' && <Setting />}
            {activeSection === 'list' && <List />}
            {activeSection === 'telegram' && <Telegram />}
          </CSS.Content>
        </CSS.InfoContainer>
      </CSS.Container>
    )
}

export default Main;