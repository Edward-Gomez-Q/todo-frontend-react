import PersonalInfoFrom from "../../component/UserInfoForm";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function User() {
    
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token || token === "undefined") {
        localStorage.removeItem("access_token");
        navigate("/");
        }
    }, [navigate]);
    return (
        <PersonalInfoFrom />
    );
}
export default User;
