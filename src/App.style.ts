import styled from "@emotion/styled";

const CardContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  width: 300px;
`;

export const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Card = styled(CardContainer)`
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
`;

export const RemoveButton = styled.button`
  background-color: #ff6464;
  color: white;
  padding: 8px;
  margin-top: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #e53e3e;
  }
`;

export const RestoreButton = styled.button`
  background-color: #61dafb;
  color: white;
  padding: 8px;
  margin-top: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #0e5a8a;
  }
`;
