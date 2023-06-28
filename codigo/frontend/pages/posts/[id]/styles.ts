import styled from "styled-components";
import { Col, Row } from "react-styled-flexboxgrid";

export const Container = styled(Col)`
    width: 100%;
    padding: 5rem 0;
`

export const TopBar = styled(Row)`
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100vw;
    padding: 0.75rem 0.5rem;
    border-bottom: 1px solid #00000040;
    flex: 1;
    margin: 0%;
`

export const BottomBar = styled(Row)`
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100vw;
    padding: 0.75rem 0.5rem;
    border-top: 1px solid #00000040;
    flex: 1;
    margin: 0%;
`