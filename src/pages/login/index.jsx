import SignInForm from "../../component/signin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  //Si hay un token en el localStorage, redirigir a la página de tareas
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/user/tasks");
    }
  }, [navigate]);
  return (
    <section className="bg-white dark:bg-darkblack-500">
        <SignInForm />
    </section>
  );
}

export default SignIn;