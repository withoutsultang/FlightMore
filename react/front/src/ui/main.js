import React, { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import image from '../components/image';

function Main() {
    const navigate = useNavigate();
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureLocation, setDepartureLocation] = useState('서');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [numPeople, setNumPeople] = useState('1');

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
            <SidebarItem active>알림 설정</SidebarItem>
            <SidebarItem>설정된 알람</SidebarItem>
            <SidebarItem>텔레그램 연결</SidebarItem>
            <Logout><LogoutButton onClick={handleLogout}>로그아웃</LogoutButton></Logout>
          </Sidebar>
          <Content>
            <InfoRow>
              <Label>출발</Label>
              <Input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
              <Select value={departureLocation} onChange={(e) => setDepartureLocation(e.target.value)}>
                  <option value="ICN">인천(ICN)</option>
                  <option value="GMP">김포(GMP)</option>
                  <option value="PUS">부산(PUS)</option>
              </Select>
            </InfoRow>
            <InfoRow>
              <Label>도착</Label>
              <Input type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
              <Select value={arrivalLocation} onChange={(e) => setArrivalLocation(e.target.value)}>
                  <option value="TYO">도쿄(TYO)</option>
                  <option value="KIX">오사카(KIX)</option>
                  <option value="FUK">후쿠오카(FUK)</option>
              </Select>
            </InfoRow>
            <InfoRow>
              <Label>가격</Label>
              <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="0 ~ 250,000">0 ~ 250,000</option>
                <option value="250,000 ~ 500,000">250,000 ~ 500,000</option>
                <option value="500,000 ~ 1,000,000">500,000 ~ 1,000,000</option>
              </Select>
              <NumberInput type="number" min="1" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />명
            </InfoRow>
            <RegisterButton>등록하기</RegisterButton>
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

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 800px;
  height: 100%;
  max-height: 400px;
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

const Content = styled.div`
  flex: 1;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  border-bottom: 1px solid #ddd;
`;

const Label = styled.div`
  font-weight: bold;
  font-size: 1em;
  flex: 1;
`;

const Input = styled.input`
  flex: 2;
  padding: 8px;
  border: none;
  border-radius: 5px;
`;

const Select = styled.select`
  flex: 2;
  padding: 8px;
  border: none;
  border-radius: 5px;
`;

const NumberInput = styled.input`
  flex: 2;
  padding: 8px;
  border: none;
  border-radius: 5px;
  outline: none;
  text-align: center;

  // 스피너 제거
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  max-width: 40%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  background-color: #000000ff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #00000065;
  }
`;
