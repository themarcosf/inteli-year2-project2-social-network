import { TitleStyled } from "./styles"

export const Title = ({ children, color, center, variant = "lg", bold }: {
    children: React.ReactNode;
    center?: boolean;
    color?: string;
    variant?: string;
    bold?: boolean;
}) => {
    return (
        <TitleStyled
            color={color}
            center={center}
            variant={variant}
            bold={bold}
        >{children}</TitleStyled>
    )
}
