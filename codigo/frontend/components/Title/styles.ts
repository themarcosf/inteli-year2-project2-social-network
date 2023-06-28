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
            break;
    }
}

export const TitleStyled = styled.h1<{
    color?: string;
    center?: boolean;
    variant?: string;
    bold?: boolean;
}>`
    font-size: ${props => switchProp(props.variant || "md")};
    color: ${props => props.color || "#fff"};
    text-align: ${props => props.center ? "center" : "left"};
    font-weight: ${props => props.bold ? "bold" : "normal"};
`;