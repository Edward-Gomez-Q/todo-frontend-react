import SignUpForm from "../../component/signupform"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/user/tasks");
    }
  }, [navigate]);

  return (
    <section className="bg-white dark:bg-darkblack-500">
        <SignUpForm />
    </section>
  );
}

export default SignUp;