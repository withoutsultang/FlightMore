import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    margin-top: 20px;
    max-height: 400px;
    overflow-y: auto;
`;

const AlarmContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
    width: 100%;
`;

const AlarmBox = styled.div`
    background-color: #f9f4e7;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    padding: 15px;
    width: 85%;
    position: relative;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`;

const Text = styled.span`
    font-size: 18px;
    font-weight: 500;
    color: #000000;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: red;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;
`;

const CSS = {
    Container,
    AlarmContainer,
    AlarmBox,
    Row,
    Text,
    DeleteButton,
};

export default CSS;
