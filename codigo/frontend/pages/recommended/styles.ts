import { Grid } from 'react-styled-flexboxgrid'
import styled from "styled-components"

export const Container = styled(Grid)`
  display: flex;
  background-color: #0070C9;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;
  min-height: 100vh;
  height: 100%;
  padding: 0 2rem;
`

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4rem;
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Text = styled.p`
  margin-top: 8rem;
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
`

export const Button = styled.button`
  background-color: #fff;
  border: none;
  border-radius: 0.25rem;
  padding: 1rem 1.25rem;
  color: #0070C9;
  font-weight: bold;
  width: 100%;
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: 0 0.15rem 0.25rem rgba(0, 0, 0, 0.2);
`