import styled from "styled-components";

const switchProp = (variant: string) => {
    switch (variant) {
        case "xs":
            return "0.5rem";
        case "sm":
            return "0.75rem";
        case "md":
            return "1rem";
        case "lg":
            return "1.5rem";
        case "xl":
            return "2rem";

        default:
            break;
    }
}

export const TextStyled = styled.p<{
    color?: string;
    center?: boolean;
    bold?: boolean;
    variant?: string;
}>`
    color: ${props => props.color || "#fff"};
    font-size: ${props => switchProp(props.variant || "md")};
    font-weight: ${props => props.bold ? "bold" : "normal"};
    text-align: ${props => props.center ? "center" : "left"};
`;