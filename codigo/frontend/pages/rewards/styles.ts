import { Col, Row } from "react-styled-flexboxgrid";
import styled from "styled-components";

export const Container = styled(Col)`
    width: 100%;
`

export const TitleRow = styled(Row)`
    margin-bottom: 1rem;
`

export const StyledRow = styled(Row)`
    margin-bottom: 16px;
    border-radius: 20px;
    padding: 1.5rem 0.5rem;
    background-color: #4285f4;
    min-height: 70px;
    height: fit-content;
    position: relative;
`

export const IconContainer = styled(Col)`
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
    color: white;
`