import styled from "styled-components";

const switchProp = (variant: string) => {
    switch (variant) {
        case "xs":
            return "0.75rem";
        case "sm":
            return "1rem";
        case "md":
            return "1.5rem";
        case "lg":
            return "2rem";
        case "xl":
            return "2.5rem";

        default:
            return "1rem"
    }
}

export const StyledDiv = styled.div<{ size: string }>`
    width: 100%;
    height: ${({ size }) => switchProp(size)};
`;