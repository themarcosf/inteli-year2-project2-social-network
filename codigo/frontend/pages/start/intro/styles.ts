import Link from "next/link";
import { Col, Grid } from "react-styled-flexboxgrid";
import styled from "styled-components";

export const Container = styled(Grid) <{ background: string } >`
    display: flex;
    ${({ background }) => (background == "" ? `background-color: #0070c9;` : ``)}
    flex-direction: column;
    align-items: center;
    flex: 1;
    justify-content: center;
    min-height: 100vh;
    height: 100%;
    padding: 0 2rem;
    background-image: ${({ background }) =>
        background ? `url(${background})` : ""};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
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