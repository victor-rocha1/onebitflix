import { Toast, ToastBody } from "reactstrap";

interface Props {
    isOpen: boolean;
    message: string;
    color: string;
}

const ToastComponent: React.FC<Props> = ({ isOpen, message, color }) => {
    return (
        <>
            <Toast
                className={`${color} text-white fixed-top ms-auto mt-3`}
                isOpen={isOpen}
            >
                <ToastBody className="text-center">{message}</ToastBody>
            </Toast>
        </>
    );
};

export default ToastComponent;
