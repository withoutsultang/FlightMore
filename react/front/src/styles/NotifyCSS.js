import styled from 'styled-components';

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
    text-align: center;
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

const CSS = {
    InfoRow,
    Label,
    Input,
    Select,
    NumberInput,
    RegisterButton,
};

export default CSS;