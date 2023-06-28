import { Row } from "react-styled-flexboxgrid";
import styled from "styled-components";

export const StyledInput = styled(Row)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #F2F2F2;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    margin-bottom: 1rem;
    
    input {
        border: none;
        width: 100%;
        font-size: 1rem;
        padding: 0.5rem;
        background-color: transparent;
    }
`