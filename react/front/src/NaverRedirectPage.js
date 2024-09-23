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
      console.log("로그인 성공:", data);
      setUser({
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        profileImageUrl: data.profileImageUrl,
      })
      navigate("/Main");
    } catch (error){
      console.error("로그인 오류:", error);
      alert("로그인 실패: " + error);
      navigate("/fail");
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    if(code){
      console.log("Naver 로그인 CODE = " + code);
      handleNaverLogin(code);
    }
  }, [location]);

  return (
      <div>
      </div>
  );
};

export default NaverRedirectPage;