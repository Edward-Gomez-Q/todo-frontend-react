import { useEffect, useState } from "react";
import { getUserByAccessToken } from "../../stores/user/UserStore";

function PersonalInfoForm() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) return;

            try {
                const data = await getUserByAccessToken(accessToken);
                setUser(data);
            } catch (error) {
                console.error("Error al obtener datos del usuario:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="2xl:col-span-8 xl:col-span-7">
            <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
                Información Personal
            </h3>
            <div className="mt-8">
                <form>
                    <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="nombre"
                                className="text-base text-bgray-600 dark:text-bgray-50 font-medium"
                            >
                                Nombre completo
                            </label>
                            <input
                                id="nombre"
                                type="text"
                                value={user?.nombre || ""}
                                readOnly
                                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border border-bgray-200 dark:border-darkblack-400 focus:outline-none cursor-not-allowed"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-base text-bgray-600 dark:text-bgray-50 font-medium"
                            >
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="text"
                                value={user?.email || ""}
                                readOnly
                                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border border-bgray-200 dark:border-darkblack-400 focus:outline-none cursor-not-allowed"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="createdAt"
                                className="text-base text-bgray-600 dark:text-bgray-50 font-medium"
                            >
                                Fecha de registro
                            </label>
                            <input
                                id="createdAt"
                                type="text"
                                value={user?.createdAt ? new Date(user.createdAt).toLocaleString() : ""}
                                readOnly
                                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border border-bgray-200 dark:border-darkblack-400 focus:outline-none cursor-not-allowed"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PersonalInfoForm;
