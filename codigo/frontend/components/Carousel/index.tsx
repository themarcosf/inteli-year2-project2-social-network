import { Col, Row } from "react-styled-flexboxgrid";
import { Ball, Button, Container, Slide, Wrapper } from "./styles";

import { useEffect } from "react";

interface Props {
    slides: React.ReactNode[];
    currentSlide: number;
    setCurrentSlide: (index: number) => void;
}

export const Carousel: React.FC<Props> = ({ slides, currentSlide, setCurrentSlide }) => {
    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % slides.length);
        console.log(currentSlide)
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        console.log(currentSlide)
    };

    useEffect(() => {
        console.log(currentSlide)
    }, [currentSlide])

    return (
        <Wrapper>
            <Container fluid>
                <Row center="xs">
                    <Col xs={12}>
                        <Slide>
                            {slides[currentSlide]}
                        </Slide>
                    </Col>
                </Row>
                <Row center="xs">
                    <Col xs={12}>
                        <Row>
                            {slides.map((_, index) => (
                                <Ball
                                    key={index}
                                    active={index === currentSlide}
                                    onClick={() => goToSlide(index)}
                                />
                            ))}
                        </Row>
                    </Col>
                </Row>
                <Row center="xs">
                    <Col xs={12}>
                        <Button onClick={
                            nextSlide
                        }>Next</Button>
                    </Col>
                </Row>
            </Container>
        </Wrapper>
    )
};

