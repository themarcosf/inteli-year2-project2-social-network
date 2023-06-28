import Link from "next/link";
import { Col, Grid, Row } from "react-styled-flexboxgrid"
import styled from "styled-components"

export const Container = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    justify-content: center;
    min-height: 100vh;
    height: 100%;
    padding: 0 2rem;
`;

export const SlideContainer = styled(Col)`
    margin-top: 24rem;
`;

export const Heading = styled(Col)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Text = styled.p`
    margin-top: 8rem;
    color: #fff;
    font-size: 1.2rem;
    text-align: center;
`;

export const Button = styled(Link)`
    background-color: #fff;
    border: none;
    border-radius: 0.25rem;
    padding: 1rem 1.25rem;
    color: #0070c9;
    font-weight: bold;
    width: 100%;
    font-size: 1.25rem;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 0.15rem 0.25rem rgba(0, 0, 0, 0.2);
    text-decoration: none;
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

export const LoginButton = styled.button`
    background-color: #fff;
    border: none;
    width: 100%;
    border-radius: 0.25rem;
    font-size: 1.15rem;
    font-weight: 600;
    margin: 1.5rem 0;
    color: #0070C9;
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export const InputContainer = styled(Row)`
    margin: 1rem 0;
    display: flex;
    justify-content: center;
`

export const Input = styled(Col)`
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column; 
`

export const InputText = styled(Text)`
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    margin-top: 0;
`

export const LoginInput = styled.input`
    background-color: transparent;
    border: 1px solid white;
    border-radius: 0.25rem;
    padding: 0.75rem 1rem;
    color: white;
    font-size: 1.15rem;
    width: 100%;

    ::placeholder {
        color: white;
        background-color: transparent;
    }
`