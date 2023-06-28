import { TextStyled } from "./styles"

export const Text = ({ children, center, style, color, bold, variant }: {
    children: React.ReactNode,
    center?: boolean,
    style?: React.CSSProperties,
    color?: string,
    bold?: boolean,
    variant?: string,
}) => {
    return (
        <TextStyled style={style} color={color} center={center} bold={bold} variant={variant}>{children}</TextStyled>
    )
}

