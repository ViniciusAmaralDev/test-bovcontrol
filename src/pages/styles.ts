import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #fefefe;
`;

export const LeftContainer = styled.div`
  display: flex;
  width: 70%;
`;

export const RightContainer = styled.div`
  display: flex;
  width: 30%;
  padding: 16px;
  border-left: 2px solid #ccc;
`;

export const FloatingButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
