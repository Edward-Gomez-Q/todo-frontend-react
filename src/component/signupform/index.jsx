import logoColor from "../../assets/images/logo/logo_white.png";
import logoDark from "../../assets/images/logo/logo_dark.png";
import ModeToggler from "../../component/modeToggler";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register, login } from "../../stores/user/AuthStore";

function SignUpForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (error) setError(null);
    };
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Por favor complete todos los campos");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);
        setSuccessMessage(null);

        try {
            const response = await register(formData.name, formData.email, formData.password);
            setSuccess(true);
            setSuccessMessage(response.mensaje + ", redirigiendo a la página de inicio...");

            const loginResponse = await login(formData.email, formData.password);
            localStorage.setItem("access_token", loginResponse.accessToken);
            localStorage.setItem("refresh_token", loginResponse.refreshToken);
            setTimeout(() => {
                setSuccessMessage(null);
                setSuccess(false);
                setLoading(false);
                navigate("/tasks");
            }, 3000);

        } catch (error) {
            setError(error.response?.data?.mensaje || "Error al registrarse");
            setLoading(false);
        }
    };

    return (
        <div className="lg:w-1/2 px-5 xl:pl-12 pt-10 lg:pt-20 lg:pr-10 lg:pb-10 m-auto">
            <header className="flex items-center justify-between mb-2">
                <Link to="/" className="">
                <img src={logoColor} alt="Logo" className="block dark:hidden size-24" />
                <img src={logoDark} alt="Logo" className="hidden dark:block size-24" />
                </Link>
                <ModeToggler />
            </header>
            <div className="max-w-[450px] m-auto pt-14 pb-16">
                <header className="text-center mb-8">
                    <h2 className="text-bgray-900 dark:text-white text-4xl font-semibold font-poppins mb-2">
                        Crea una cuenta en TaskBo
                    </h2>
                    <p className="font-urbanis text-base font-medium text-bgray-600 dark:text-bgray-50">
                        Planea, organiza y finaliza más tareas en menos tiempo
                    </p>
                </header>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Éxito: </strong>
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-bgray-600 dark:text-bgray-50 text-sm font-medium mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                            placeholder="Nombre completo"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-bgray-600 dark:text-bgray-50 text-sm font-medium mb-2">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                            placeholder="Correo electrónico"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-bgray-600 dark:text-bgray-50 text-sm font-medium mb-2">
                            Contraseña
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                            placeholder="Contraseña"
                        />
                        <button
                            type="button"
                            className="absolute top-10 right-4 bottom-4"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {showPassword ? (
                                <svg
                                width="22"
                                height="20"
                                viewBox="0 0 22 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M2 1L20 19"
                                    stroke="#718096"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.58445 8.58704C9.20917 8.96205 8.99823 9.47079 8.99805 10.0013C8.99786 10.5319 9.20844 11.0408 9.58345 11.416C9.95847 11.7913 10.4672 12.0023 10.9977 12.0024C11.5283 12.0026 12.0372 11.7921 12.4125 11.417"
                                    stroke="#718096"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8.363 3.36506C9.22042 3.11978 10.1082 2.9969 11 3.00006C15 3.00006 18.333 5.33306 21 10.0001C20.222 11.3611 19.388 12.5241 18.497 13.4881M16.357 15.3491C14.726 16.4491 12.942 17.0001 11 17.0001C7 17.0001 3.667 14.6671 1 10.0001C2.369 7.60506 3.913 5.82506 5.632 4.65906"
                                    stroke="#718096"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                </svg>
                            ) : (
                                <svg className="stroke-bgray-900 dark:stroke-bgray-50" width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="12" r="3" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-bgray-600 dark:text-bgray-50 text-sm font-medium mb-2">
                            Confirmar contraseña
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                            placeholder="Confirmar contraseña"
                        />
                        <button
                            type="button"
                            className="absolute top-10 right-4 bottom-4"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {showConfirmPassword ? (
                                <svg
                                width="22"
                                height="20"
                                viewBox="0 0 22 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M2 1L20 19"
                                    stroke="#718096"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.58445 8.58704C9.20917 8.96205 8.99823 9.47079 8.99805 10.0013C8.99786 10.5319 9.20844 11.0408 9.58345 11.416C9.95847 11.7913 10.4672 12.0023 10.9977 12.0024C11.5283 12.0026 12.0372 11.7921 12.4125 11.417"
                                    stroke="#718096"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8.363 3.36506C9.22042 3.11978 10.1082 2.9969 11 3.00006C15 3.00006 18.333 5.33306 21 10.0001C20.222 11.3611 19.388 12.5241 18.497 13.4881M16.357 15.3491C14.726 16.4491 12.942 17.0001 11 17.0001C7 17.0001 3.667 14.6671 1 10.0001C2.369 7.60506 3.913 5.82506 5.632 4.65906"
                                    stroke="#718096"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                </svg>
                            ) : (
                                <svg className="stroke-bgray-900 dark:stroke-bgray-50" width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="12" r="3" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className={`py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                            {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Iniciando...
                            </>
                            ) : (
                            "Crear cuenta"
                            )}
                    </button>
                </form>
                <p className="text-bgray-600 dark:text-bgray-50 text-center text-sm mt-6">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/" className="text-success-300 hover:text-success-400 font-semibold">
                        Iniciar sesión
                    </Link>
                </p>
                <p className="text-bgray-600 dark:text-white text-center text-sm mt-6">
                    @ 2025 TaskBo. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
}

export default SignUpForm;