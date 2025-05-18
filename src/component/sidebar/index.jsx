import logoColor from "../../assets/images/logo/logo_white.png";
import logoDark from "../../assets/images/logo/logo_dark.png";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ModeToggler from "../modeToggler";

function SidebarResponsive() {
    const navigate = useNavigate();
    const { pathname: location } = useLocation();

    
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/");

    };

    return (
        <aside className="relative w-[64px] sm:w-[80px] md:w-[96px] bg-white dark:bg-darkblack-600">
            <div className="sidebar-wrapper-collapse relative top-0 z-30 w-full">
                <div className="sidebar-header sticky top-0 z-20 flex h-[108px] w-full items-center justify-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] bg-white dark:border-darkblack-500 dark:bg-darkblack-600">
                    <Link to="/">
                        <img src={logoColor} alt="Logo" className="block dark:hidden w-10 h-10 sm:w-14 sm:h-14" />
                        <img src={logoDark} alt="Logo" className="hidden dark:block w-10 h-10 sm:w-14 sm:h-14" />
                    </Link>
                </div>
                <div className="sidebar-body w-full pt-[14px]">
                    <div className="flex flex-col items-center">
                        <div className="nav-wrapper mb-[36px]">
                            <div className="item-wrapper mb-5">
                                <ul className="mt-2.5 flex flex-col items-center justify-center">
                                    <li className="item px-3 sm:px-6 py-[11px]">
                                        <Link
                                        to="/user/tasks"
                                        className={`${
                                            location === "/support-ticket" ? "nav-active" : ""
                                        }`}
                                        >
                                        <span className="item-ico">
                                            <svg
                                            width="20"
                                            height="18"
                                            viewBox="0 0 20 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path
                                                d="M5 2V11C5 12.1046 5.89543 13 7 13H18C19.1046 13 20 12.1046 20 11V2C20 0.895431 19.1046 0 18 0H7C5.89543 0 5 0.89543 5 2Z"
                                                fill="#1A202C"
                                                className="path-1"
                                            />
                                            <path
                                                d="M0 15C0 13.8954 0.895431 13 2 13H2.17157C2.70201 13 3.21071 13.2107 3.58579 13.5858C4.36683 14.3668 5.63317 14.3668 6.41421 13.5858C6.78929 13.2107 7.29799 13 7.82843 13H8C9.10457 13 10 13.8954 10 15V16C10 17.1046 9.10457 18 8 18H2C0.89543 18 0 17.1046 0 16V15Z"
                                                fill="#22C55E"
                                                className="path-2"
                                            />
                                            <path
                                                d="M7.5 9.5C7.5 10.8807 6.38071 12 5 12C3.61929 12 2.5 10.8807 2.5 9.5C2.5 8.11929 3.61929 7 5 7C6.38071 7 7.5 8.11929 7.5 9.5Z"
                                                fill="#22C55E"
                                                className="path-2"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M8.25 4.5C8.25 4.08579 8.58579 3.75 9 3.75L16 3.75C16.4142 3.75 16.75 4.08579 16.75 4.5C16.75 4.91421 16.4142 5.25 16 5.25L9 5.25C8.58579 5.25 8.25 4.91421 8.25 4.5Z"
                                                fill="#22C55E"
                                                className="path-2"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M11.25 8.5C11.25 8.08579 11.5858 7.75 12 7.75L16 7.75C16.4142 7.75 16.75 8.08579 16.75 8.5C16.75 8.91421 16.4142 9.25 16 9.25L12 9.25C11.5858 9.25 11.25 8.91421 11.25 8.5Z"
                                                fill="#22C55E"
                                                className="path-2"
                                            />
                                            </svg>
                                        </span>
                                        </Link>
                                    </li>
                                    <li className="item px-3 sm:px-6 py-[11px]">
                                        <Link
                                        to="/user"
                                        className={`${
                                            location === "/user" ? "nav-active" : ""
                                        }`}
                                        >
                                        <span className="item-ico">
                                            <svg
                                            width="14"
                                            height="18"
                                            viewBox="0 0 14 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <ellipse
                                                cx="7"
                                                cy="14"
                                                rx="7"
                                                ry="4"
                                                className="path-1"
                                                fill="#1A202C"
                                            />
                                            <circle
                                                cx="7"
                                                cy="4"
                                                r="4"
                                                fill="#22C55E"
                                                className="path-2"
                                            />
                                            </svg>
                                        </span>
                                        </Link>
                                    </li>
                                    <li className="item px-3 sm:px-6 py-[11px]">
                                        <ModeToggler />
                                    </li>
                                    <li className="item px-3 sm:px-6 py-[11px]">
                                        <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left">
                                            <span className="item-ico">
                                                <svg
                                                width="21"
                                                height="18"
                                                viewBox="0 0 21 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M17.1464 10.4394C16.8536 10.7323 16.8536 11.2072 17.1464 11.5001C17.4393 11.7929 17.9142 11.7929 18.2071 11.5001L19.5 10.2072C20.1834 9.52375 20.1834 8.41571 19.5 7.73229L18.2071 6.4394C17.9142 6.1465 17.4393 6.1465 17.1464 6.4394C16.8536 6.73229 16.8536 7.20716 17.1464 7.50006L17.8661 8.21973H11.75C11.3358 8.21973 11 8.55551 11 8.96973C11 9.38394 11.3358 9.71973 11.75 9.71973H17.8661L17.1464 10.4394Z"
                                                    fill="#22C55E"
                                                    className="path-2"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M4.75 17.75H12C14.6234 17.75 16.75 15.6234 16.75 13C16.75 12.5858 16.4142 12.25 16 12.25C15.5858 12.25 15.25 12.5858 15.25 13C15.25 14.7949 13.7949 16.25 12 16.25H8.21412C7.34758 17.1733 6.11614 17.75 4.75 17.75ZM8.21412 1.75H12C13.7949 1.75 15.25 3.20507 15.25 5C15.25 5.41421 15.5858 5.75 16 5.75C16.4142 5.75 16.75 5.41421 16.75 5C16.75 2.37665 14.6234 0.25 12 0.25H4.75C6.11614 0.25 7.34758 0.82673 8.21412 1.75Z"
                                                    fill="#1A202C"
                                                    className="path-1"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M0 5C0 2.37665 2.12665 0.25 4.75 0.25C7.37335 0.25 9.5 2.37665 9.5 5V13C9.5 15.6234 7.37335 17.75 4.75 17.75C2.12665 17.75 0 15.6234 0 13V5Z"
                                                    fill="#1A202C"
                                                    className="path-1"
                                                />
                                                </svg>
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );


}
export default SidebarResponsive;