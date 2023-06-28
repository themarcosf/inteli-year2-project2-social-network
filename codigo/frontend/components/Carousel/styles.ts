import { Grid } from "react-styled-flexboxgrid";
import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    overflow: hidden;
`;

export const Slide = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    justify-content: center;
    min-height: 100vh;
    height: 100%;
    padding: 0 2rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
`;

export const Ball = styled.div<{ active: boolean }>`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: ${({ active }) => (active ? '1px solid white' : '')};
    background-color: ${({ active }) => (active ? 'white' : '#ffffff80')};
    cursor: pointer;
    margin-right: 10px;
`;

export const Button = styled.button`
    background-color: transparent;
    border: none;
    color: #fff;
    font-weight: 600;
    font-size: 1.25rem;
    margin-top: 2rem;
    text-align: center;
    cursor: pointer;
`;