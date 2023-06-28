import { Grid } from "react-styled-flexboxgrid";
import styled from "styled-components";

export const Container = styled(Grid) <{
  backgroundColor?: string;
  navbar?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  /* justify-content: center; */
  /* min-height: 100vh; */
  height: 100%;
  padding: 0 2rem;
  margin-bottom: ${({ navbar }) => navbar ? '80px' : '0'};
  background-color: ${({ backgroundColor }) => backgroundColor};
`