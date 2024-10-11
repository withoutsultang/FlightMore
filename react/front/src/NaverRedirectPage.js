import React, {useEffect}  from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const NaverRedirectPage = ({setUser}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNaverLogin = async(code) => {
    try{
      const response = await axios.get(`http://localhost:8080/login/callback/naver?code=${code}`);
      const data = response.data;
      setUser({
        memberId: data.id,
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        profileImageUrl: data.profileImageUrl,
      })
      console.log(data)

      // 로컬 스토리지에 사용자 정보 저장
      localStorage.setItem('user', JSON.stringify(data));

      navigate("/Main");
    } catch (error){
      alert("로그인 실패: " + error);
      navigate("/fail");
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    if(code){
      handleNaverLogin(code);
    }
  }, [location]);

  return (
      <div>
      </div>
  );
};

export default NaverRedirectPage;