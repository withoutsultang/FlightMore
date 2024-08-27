import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 20px;
  background-color: none;
`;

export const Button = styled.button`
  width: 30%;
  padding: 10px 20px;
  margin: 30px 0;
  border: none;
  border-radius: 4px;
  background-color: #000000;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000000b6;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CSS = {
    Container,
    Button
}

export default CSS;
