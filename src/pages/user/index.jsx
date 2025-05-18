import PersonalInfoFrom from "../../component/UserInfoForm";
import Sidebar from "../../component/sidebar";
function User() {
    return (
        <div className="flex flex-col gap-10">
            <div className="hidden sm:block">
                <Sidebar />
            </div>
            <div className="flex flex-col gap-5">
                <h1 className="text-2xl font-semibold text-bgray-600 dark:text-bgray-50">
                User Profile
                </h1>
                <p className="text-base text-bgray-500 dark:text-bgray-50">
                Update your profile information
                </p>
            </div>
            <PersonalInfoFrom />
        </div>
    );
}
export default User;
