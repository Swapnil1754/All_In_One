import React, { useEffect, useState } from "react";
import './Toaster.css';
const Toaster = ({message}) => {
    const [toast, setToast] = useState(false);
    useEffect(() => {
        if(message) {
            setToast(true);
            const timer = setTimeout(() => {
                setToast(false)
            }, 8000);
            return(() => clearTimeout(timer))
        }
    }, [message]);
    return(
        <div className={`toaster $ {toast ? 'visible':''}`}>
            {message && (
                <div className="toast">{message}</div>
            )}
        </div>
    )
}
export default Toaster;