import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    margin-top: 20px;
    max-height: 400px;
    overflow-y: auto;  // 여전히 스크롤바를 숨기고 있지만, 세로 방향으로만 스크롤 허용
    width: 100%;
    box-sizing: border-box;  // 패딩을 포함한 크기 계산
`;

// NotifyContainer: 알림 항목 디자인을 간단히 유지
export const NotifyContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
    width: 95%;  // 너비를 부모의 95%로 설정하여 스크롤 문제 해결
    box-sizing: border-box;  // 패딩을 포함한 크기 계산
    overflow: hidden;  // 내부에서 불필요한 스크롤이 생기지 않도록 설정
`;

// NotifyBox: 알림 정보 박스의 디자인 유지
export const NotifyBox = styled.div`
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 20px;
    flex: 1;  // 가능한 공간을 모두 차지하되, 부모 너비를 초과하지 않도록 설정
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

// Row: 정보를 정돈되게 배치
export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    flex-wrap: wrap;  // 화면 너비가 부족할 때 줄바꿈을 허용
`;

// Text: 폰트 크기와 색상을 개선하여 가독성 증가
export const Text = styled.span`
    font-size: 16px; 
    font-weight: 600;
    color: #333333;
`;

// DeleteButton: 삭제 버튼에 호버 효과 추가
export const DeleteButton = styled.button`
    background: none;
    border: none;
    color: #ff5252;
    font-size: 20px;
    cursor: pointer;
    margin-left: 10px;
    transition: transform 0.2s ease-in-out, color 0.3s ease-in-out;

    &:hover {
        color: #ff1744;
        transform: scale(1.2); // 호버 시 삭제 버튼 확대
    }
`;

export const EmptyText = styled.p`
    font-size: 18px;
    color: #666;
    text-align: center;
`;

