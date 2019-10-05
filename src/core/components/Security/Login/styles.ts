import styled from 'styled-components';
import {Col, Row} from 'react-flexbox-grid';
import {Card} from "antd";

export const LoginFormContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #213e81;
  align-items: center;
  justify-content: center;
  padding: 0;
`;


export const LoginSecondRow = styled(Row)`
padding-top: 77px;
  height: 70%;
  width: 100%;
`;

export const LoginContainer = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: start;
`;

export const LoginCard = styled(Card)`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  width: 317px
`;

export const BlueSpan = styled.span`
    color: blueviolet;
    cursor: pointer;
`;
