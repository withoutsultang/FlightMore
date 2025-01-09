import styled from 'styled-components';

// InfoRow: 전체 행을 보다 시각적으로 구분하도록 여백과 스타일 개선
const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
    gap: 20px; // 각 입력 필드 사이에 수평 간격 추가
`;

// Label: 입력 필드의 라벨을 강조하고, 줄바꿈 없이 유지하도록 개선
const Label = styled.label`
    font-weight: 600;
    font-size: 1em;
    flex: 1;
    color: #444; // 텍스트 색상을 부드러운 회색으로 설정하여 시각적 피로 감소
    text-align: right;
    padding-right: 10px;
    white-space: nowrap; // 줄바꿈 방지하여 라벨이 줄바꿈되지 않도록 설정
`;

// Input: 입력 필드의 스타일을 개선하여 시각적으로 더 일관성 있는 디자인 제공
const Input = styled.input`
    flex: 2;
    padding: 10px;
    margin-right: 10px; // 출발지와 도착지 입력 필드 사이에 여백 추가
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    text-align: center;

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.4);
    }
`;

// Select: 드롭다운 필드의 스타일을 Input과 일관되게 개선
const Select = styled.select`
    flex: 2;
    padding: 10px;
    margin-right: 10px; // 출발 날짜와 도착 날짜 선택 필드 사이에 여백 추가
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.4);
    }
`;

// NumberInput: 숫자 입력 필드의 스타일을 개선하고, 스피너 제거
const NumberInput = styled.input`
    flex: 2;
    padding: 10px;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    outline: none;
    text-align: center;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    // 스피너 제거
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.4);
    }
`;

// RegisterButton: 버튼을 더 눈에 띄고, 호버 효과를 개선하여 사용자 경험 개선
const RegisterButton = styled.button`
    width: 100%;
    max-width: 300px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #0056b3;
        transform: translateX(-50%) scale(1.05);
    }

    &:active {
        transform: translateX(-50%) scale(0.98);
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
