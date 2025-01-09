import styled from 'styled-components';

// 전체 컨테이너
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: auto;
`;

// 버튼 스타일
export const Button = styled.button`
    width: 100%;
    max-width: 250px;
    padding: 12px 20px;
    margin: 20px 0;
    border: none;
    border-radius: 25px;
    background-color: #007bff;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #0056b3;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

// KeyContainer 추가
export const KeyContainer = styled.div`
    margin-top: 10px;
    font-weight: bold;
    background-color: #e9ecef;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    width: 80%;
`;
