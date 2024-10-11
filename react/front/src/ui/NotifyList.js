import React, {useEffect} from "react";
import CSS from '../styles/ListCSS';
import Tostify from '../components/Tostify';
import { ToastContainer } from "react-toastify";

const NotifyList = () => {
    const [notifyData, setNotifyData] = React.useState([]);

    const getUserId = () => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser).id : null;
    }

    const getNotifyData = async () => {
        const memberId = getUserId();
        if(memberId){
            try{
                const response = await axios.get(`http://localhost:8080/api/notify/${memberId}`);
                setNotifyData(response.data);
            } catch (error){
                Tostify.Error('알림 목록을 불러오는데 실패했습니다.');
            }
        } else {
            Tostify.Error('사용자 정보를 찾을 수 없습니다.');
        }
    }

    const handleDeleteClick = async (noticationId) => {
        try{
            await axios.delete(`http://localhost:8080/api/notify/${noticationId}`);
            Tostify.Success('알림이 삭제되었습니다.');
            getNotifyData();
        } catch (error){
            Tostify.Error('알림 삭제에 실패했습니다.');
        }
    };

    useEffect(() => {
        getNotifyData();
    }, []);

    return (
        <CSS.Container>
            {notifyData.length > 0 ? notifyData.map((data, i) => (
                <CSS.NotifyContainer key={i}>
                    <CSS.NotifyBox>
                        <CSS.Row>
                            <CSS.Text>{data.departureLocation} ➡️ {data.arrivalLocation}</CSS.Text>
                            <CSS.Text>{data.departureDate} ➡️ {data.arrivalDate}</CSS.Text>
                        </CSS.Row>
                        <CSS.Row>
                            <CSS.Text>가격 {data.minPrice} ~ {data.maxPrice}</CSS.Text>
                            <CSS.Text>인원 {data.numPeople}</CSS.Text>
                        </CSS.Row>
                    </CSS.NotifyBox>
                    <CSS.DeleteButton onClick={() => handleDeleteClick(data.notificationId)}>&#10060;</CSS.DeleteButton>
                    <ToastContainer />
                </CSS.NotifyContainer>
            )): <CSS.EmptyText>등록된 알림이 없습니다.</CSS.EmptyText>}

        </CSS.Container>
    );
};

export default NotifyList;
