import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//성공
const Success = (message) => {
    toast.success(message, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
    });
};

//에러
const Error = (message) => {
    toast.error(message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
    });
};

export default { 
    Success,
    Error
};