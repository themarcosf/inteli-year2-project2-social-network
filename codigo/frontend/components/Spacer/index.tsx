import { StyledDiv } from "./styles";

export const Spacer = ({
    size = 'xs',
}: { size: string; }) => {
    return (
        <StyledDiv size={size} />
    )
}