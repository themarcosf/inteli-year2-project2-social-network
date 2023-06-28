import { Col, Row } from "react-styled-flexboxgrid";

import { Ball, Container, Input, InputText, LoginButton, LoginInput } from "./styles";
import { Text } from '@/components/Text'
import { Title } from '@/components/Title'
import Image from "next/image";

import dell from '@/assets/icons/dell.svg'
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import AuthService from "@/services/auth";

export const Login = ({ slides, currentSlide, setCurrentSlide }: {
    slides: React.ReactNode[];
    currentSlide: number;
    setCurrentSlide: (index: number) => void;
}) => {
    const router = useRouter();
    let token;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        const { email, password } = data;

        await AuthService.signIn(email, password).then(
            (data: any) => {
                toast("Redirecting...")
                console.log(data)
                const token = data.accessToken
                const userId = data.userId

                if (token) {
                    localStorage.setItem('accessToken', token)
                    if (userId) {
                        localStorage.setItem('userId', userId)
                    }
                }

                setTimeout(() => {
                    router.push('/')
                }, 1500);
            }
        ).catch((err) => {
            toast.error(err.response.data.message)
        }).finally(() => {
            console.log('Done')
        });
    };

    return (
        <Container fluid>
            <Col xs={12} md={6}>
                <Row center='xs'>
                    <Col xs={12} sm={10}>
                        <Row center="xs">
                            <Title>Login</Title>
                        </Row>

                        <Row center="xs">
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                        </Row>

                        <Row center='xs'>
                            <Col xs={12} sm={10}>
                                <LoginButton onClick={() => {
                                    toast('Login with Dell SSO')
                                }}>
                                    Sign in with{" "}<Image src={dell} alt="Vercel Logo" width={75} />
                                </LoginButton>
                            </Col>
                        </Row>

                        <Col xs={12}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Col xs={12}>
                                    <Input xs={12}>
                                        <Row start='xs'>
                                            <InputText>Email</InputText>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <LoginInput {...register("email", {
                                                    required: true, pattern: {
                                                        // make it necessary to include @dell.com in the email
                                                        value: /\S+@\S+\.\S+/,
                                                        message: "Entered value does not match email format"
                                                    }
                                                })} placeholder='Email' type="email" />
                                                {errors.email?.type === 'required' && <Text color={"#f19336"}>This field is required</Text>}
                                            </Col>
                                        </Row>
                                    </Input>

                                    <Input xs={12}>
                                        <Row start='xs'>
                                            <InputText>Password</InputText>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <LoginInput {...register("password", { required: true, minLength: 6 })} placeholder='Password' type="password" />
                                                {errors.password?.type === 'required' && <Text color={"#f19336"}>This field is required</Text>}
                                                {errors.password?.type === 'minLength' && <Text color={"#f19336"}>This field is minLength 8</Text>}
                                            </Col>
                                        </Row>
                                    </Input>
                                </Col>

                                <Row center='xs'>
                                    <Col xs={12} sm={10}>
                                        <LoginButton type="submit">
                                            Sign in
                                        </LoginButton>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Col>
                </Row>


                <Row center='xs'>
                    {slides.map((_, index) => (
                        <Ball
                            key={index}
                            active={index === currentSlide}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </Row>
            </Col>
        </Container>
    )
}