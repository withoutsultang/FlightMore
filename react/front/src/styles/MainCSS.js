import styled from 'styled-components';

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

const Logout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  img{
    width: 120px;
    height: 40px;
  }
`;

const Content = styled.div`
  flex: 1;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CSS = {
  Container,
  Title,
  InfoContainer,
  Sidebar,
  Profile,
  ProfileImage,
  ProfileName,
  SidebarItem,
  Logout,
  LogoutButton,
  Content
};

export default CSS;