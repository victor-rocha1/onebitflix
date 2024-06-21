import styles from "../../styles/registerLogin.module.scss";
import Head from "next/head";
import HeaderGeneric from "../components/common/headerGeneric";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Footer from "../components/common/footer";

const Register = function () {
    return (
        <>
            <Head>
                <title>Onebitflix - Registro</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main className={styles.main}>
                <HeaderGeneric logoUrl="/" btnUrl="/login" btnContent="Quero fazer login" />
                <Container className="py-5">
                    <p>Bem-vindo(a) ao OneBitFlix!</p>
                    <Form className={styles.form}>
                        <p className="text-center"><strong>Bem-vindo(a) ao OneBitFlix!</strong> </p>
                        <FormGroup>
                            <Label for="firstName" className={styles.label}>
                                NOME
                            </Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="Qual o seu nome?"
                                required
                                maxLength={20}
                                className={styles.inputName}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName" className={styles.label}>
                                SOBRENOME
                            </Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Qual o seu sobrenome?"
                                required
                                maxLength={20}
                                className={styles.inputName}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone" className={styles.label}>
                                WHATSAPP / TELEGRAM
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="(xx) 9xxxx-xxxx"
                                data-mask="[-]+55 (00) 00000-0000"
                                required
                                className={styles.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" className={styles.label}>
                                E-MAIL
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Digite o seu email"
                                required
                                className={styles.input}
                            />
                        </FormGroup>
                        <Button type="submit" outline className={styles.formBtn}>
                            CADASTRAR
                        </Button>
                    </Form>
                </Container>
                <Footer />
            </main >
        </>
    );
};

export default Register;