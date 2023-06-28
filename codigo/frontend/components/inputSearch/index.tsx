import { Col, Row } from 'react-styled-flexboxgrid'
import Image from "next/image";
import search from "@/assets/icons/search.svg"
import styles from "./styles.module.scss";
import { StyledInput } from "./styles";

export const InputSearch = ({ placeholder }: { placeholder: string }) => {
    return (
        <StyledInput middle="xs" center="xs">
            <Col xs={1}>
                <Image src={search} width={16} height={16} alt="Search" />
            </Col>
            <Col xs={11}>
                <input placeholder={placeholder} />
            </Col>
        </StyledInput>
    )
}


