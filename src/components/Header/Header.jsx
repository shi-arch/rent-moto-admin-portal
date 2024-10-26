import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import walletImage from "../../assets/logo/wallet.png";
import userImage from "../../assets/logo/user.png";
import {
  toggleModal,
  toggleSideBar,
} from "../../Redux/SideBarSlice/SideBarSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSignOut, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const adminRef = useRef(null);
  const { currentUser } = useSelector((state) => state.currentUser);

  //for dropdown menu
  useEffect(() => {
    if (isVisible) {
      setIsVisible(!isVisible);
    }
  }, [window.location.href]);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // for closing dropdown menu when user click outside anywhere on screen
  const handleClickOutside = (event) => {
    if (adminRef.current && !adminRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header>
      <div className="flex items-center justify-between px-5 lg:px-10 py-4 border-gray-200 shadow">
        {/* hamburger menu  */}
        <div className="flex items-center gap-4">
          <button
            className="group block"
            onClick={() => dispatch(toggleSideBar())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-black group-hover:stroke-theme-blue transition duration-200 ease-in-out"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        {/* wallet & admin menu */}
        <div className="flex gap-2 items-center">
          <button className="rounded-xl items-center gap-2 bg-white p-1.5 md:p-3 lg:p-3.5 shadow-md flex">
            <img
              src={walletImage}
              className="w-8 object-cover border-r-2 p-1"
              alt="WALLET_ICON"
            />
            <Link to={"/wallet"} className="flex items-center gap-1">
              <p className="font-semibold">₹</p>
              <p className="font-semibold">{currentUser?.balance || 0}</p>
            </Link>
          </button>
          <button
            className="relative hover:shadow-none shadow-md bg-white rounded-xl cursor-pointer flex items-center gap-2 px-2 py-1"
            ref={adminRef}
            onClick={handleToggleVisibility}
          >
            <img
              src={`${
                currentUser?.userProfileImage
                  ? currentUser?.userProfileImage
                  : userImage
              }`}
              className="w-8 h-8 rounded-xl"
              loading="lazy"
              alt="USERIMAGE"
            />
            <div className="hidden md:block lg:block">
              <h2 className="font-semibold text-md lg:text-lg capitalize">
                {currentUser?.userName.split(" ")[0]}
              </h2>
              <small className="float-left text-gray-400 text-sm lg:text-md">
                {currentUser.isbusinessPartner ? "Business Partner" : "User"}
              </small>
            </div>
            {isVisible && (
              <div className="absolute w-40 top-16 right-0 z-10 bg-white flex flex-col items-center text-left gap-2 border border-gray-200 rounded-xl p-2">
                <Link className="lg:hidden border-b-2 text-center font-semibold md:hidden py-1.5 hover:bg-theme-blue hover:text-white transition duration-200 ease-in-ou w-full capitalize">
                  <FontAwesomeIcon className=" mr-1" icon={faUser} />
                  {currentUser.userName}
                </Link>
                <Link
                  className="py-1.5 px-1.5 hover:bg-theme-blue rounded-md hover:text-white transition duration-200 ease-in-ou w-full"
                  to={"/profile"}
                >
                  <FontAwesomeIcon className=" mr-1" icon={faUser} />
                  View Profile
                </Link>
                <Link
                  className="py-1.5 px-1.5 hover:bg-theme-blue rounded-md hover:text-white transition duration-200 ease-in-out w-full"
                  to={"/wallet"}
                >
                  <FontAwesomeIcon className=" mr-1" icon={faWallet} />
                  View Wallet
                </Link>
                <Link
                  className="py-1.5 px-1.5 hover:bg-red-400 rounded-md hover:text-white transition duration-200 ease-in-ou w-full"
                  onClick={() => dispatch(toggleModal())}
                >
                  <FontAwesomeIcon className=" mr-1" icon={faSignOut} />
                  Logout
                </Link>
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
