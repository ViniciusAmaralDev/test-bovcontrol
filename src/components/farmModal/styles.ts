import styled from "styled-components";
import { RiCloseLine } from "react-icons/ri";

export const Background = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  padding: 16px;
  width: 350px;
  border-radius: 12px;
  background-color: #fefefe;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.label`
  font-size: 20px;
  color: #212121;
  font-weight: bold;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #212121;
`;

export const ErrorText = styled.label`
  font-size: 12px;
  color: red;
  margin-top: -8px;
  margin-bottom: 8px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
`;

export const Input = styled.input`
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0 10px;
`;

export const Button = styled.button`
  height: 40px;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

export const CloseIcon = styled(RiCloseLine)`
  font-size: 24px;
  cursor: pointer;
  color: #212121;
`;

export const CloseButton = styled.button`
  border: none;
`;
