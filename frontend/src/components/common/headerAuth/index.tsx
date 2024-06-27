import Link from "next/link";
import styles from "./styles.module.scss";
import { Container, Input, Form } from "reactstrap";
import Modal from "react-modal";
import { FormEvent, useEffect, useState } from "react";
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
const [searchName, setSearchName] = useState("");

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

const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/search?name=${searchName}`);
    setSearchName("");
};

const handleSearchClick = () => {
    router.push(`/search?name=${searchName}`);
    setSearchName("");
};


const HeaderAuth = function () {
    return (
        <Container className={styles.nav}>
            <Link href="/home">
                <img src="/logoOnebitflix.svg" alt="logoOnebitflix" className={styles.imgLogoNav} />
            </Link>
            <div className="d-flex align-items-center">
                <Form onSubmit={handleSearch}>
                    <Input
                        name="search"
                        type="search"
                        placeholder="Pesquisar"
                        className={styles.input}
                        value={searchName}
                        onChange={(event) => {
                            setSearchName(event.currentTarget.value.toLowerCase());
                        }}
                    />
                </Form>
                <img
                    src="homeAuth/iconSearch.svg"
                    alt="lupaHeader"
                    className={styles.searchImg}
                    onClick={handleSearchClick}
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
            </div>
        </Container>
    );
};

export default HeaderAuth;