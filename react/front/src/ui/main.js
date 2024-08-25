import React from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

//규칙 위반했음 님아 main
function Main() {
    const navigate = useNavigate();
    const handleLogout = () => {
        /* (임시)시작화면으로 이동 */
        navigate('/');
      };

    return (
        <div>
            <h1>(임시) 네이버 로그인 완료 화면임~</h1>
            <Button onClick={handleLogout}>로그아웃</Button>
        </div>
    )
}

export default Main;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #28a745; /* 초록색 버튼 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;