import Link from "next/link";
import styles from "./styles.module.scss";
import { Container, Input, Form } from "reactstrap";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import profileService from "../../../services/profileService";

const [initials, setInitials] = useState("");

useEffect(() => {
    profileService.fetchCurrent().then((user) => {
        const firstNameInitial = user.firstName.slice(0, 1);
        const lastNameInitial = user.lastName.slice(0, 1);
        setInitials(firstNameInitial + lastNameInitial);
    });
}, []);

Modal.setAppElement("#__next");  //Para deficientes visuais

const [modalOpen, setModalOpen] = useState(false);

const handleOpenModal = () => {
    setModalOpen(true);
};

const handleCloseModal = () => {
    setModalOpen(false);
};

const router = useRouter();
const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
};

const HeaderAuth = function () {
    return (
        <Container className={styles.nav}>
            <Link href="/home">
                <img src="/logoOnebitflix.svg" alt="logoOnebitflix" className={styles.imgLogoNav} />
            </Link>
            <div className="d-flex align-items-center">
                <Form>
                    <Input
                        name="search"
                        type="search"
                        placeholder="Pesquisar"
                        className={styles.input}
                    />
                </Form>
                <img
                    src="homeAuth/iconSearch.svg"
                    alt="lupaHeader"
                    className={styles.searchImg}
                />
                <p className={styles.userProfile} onClick={handleOpenModal}>
                    {initials}
                </p>
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={handleCloseModal}
                    shouldCloseOnEsc={true}
                    className={styles.modal}
                    overlayClassName={styles.overlayModal}
                >
                    <Link href="/profile">
                        <p className={styles.modalLink}>Meus Dados</p>
                    </Link>
                    <p className={styles.modalLink} onClick={handleLogout}>Sair</p>
                </Modal>
        </Container>
    );
};

export default HeaderAuth;