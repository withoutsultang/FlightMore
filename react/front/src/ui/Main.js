import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import image from '../components/Image';
import CSS from '../styles/MainCSS';
import Setting from './SetNotify';
import List from './NotifyList';
import Telegram from './ConnTelegram';
import LogoutImage from '../assets/images/btnG_logout.png';

function Main() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('setting');

    //로그아웃 시 페이지 이동(임시) 추후 수정 필요
    const handleLogout = () => {
        navigate('/');
    };

    return (
      <CSS.Container>
        <CSS.Title>⚙️</CSS.Title>
        <CSS.InfoContainer>
          <CSS.Sidebar>
            <CSS.Profile>
              <CSS.ProfileImage src={image.img1} alt="프로필 이미지" />
              <CSS.ProfileName>김건우</CSS.ProfileName>
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
            <CSS.Logout><CSS.LogoutButton onClick={handleLogout}>
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