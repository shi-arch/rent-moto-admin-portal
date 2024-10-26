import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  toggleSideBar,
} from "../../Redux/SideBarSlice/SideBarSlice";
import { useIsMobile } from "../../utils";
import { useEffect, useState } from "react";
// images
import webLogo from "../../assets/logo/logo-full.png";
import adsImage from "../../assets/logo/ads.png";
import walletImage from "../../assets/logo/wallet.png";
import profileImage from "../../assets/logo/resume.png";
import logoutImage from "../../assets/logo/logout.png";
import { ImageSkeleton } from "../Skeleton";

const SideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { is_open } = useSelector((state) => state.sideBar);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (isMobile) {
      if (!is_open) {
        dispatch(toggleSideBar());
      }
    }
  }, [window.location.href]);

  // menulist
  const menuList = [
    {
      menuImg: adsImage,
      menuTitle: "My ads",
      menuLink: "/my-ads",
      moreLink: "/create-new-ads",
    },
    { menuImg: walletImage, menuTitle: "Wallet", menuLink: "/Wallet" },
    { menuImg: profileImage, menuTitle: "profile", menuLink: "/profile" },
  ];

  return (
    <div className="shadow-lg min-h-screen">
      {/* close button  */}
      <div className="lg:hidden float-right px-5 py-4">
        <button
          className="border border-gray-300 rounded-lg p-2"
          title="close"
          onClick={() => dispatch(toggleSideBar())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div className="border-b-2 py-[0.32rem]">
        <div className="w-40 lg:w-[12.5rem] h-auto lg:h-20 mx-auto">
          {/* show this until image load fully  */}
          {imageLoading && <ImageSkeleton />}
          <img
            src={webLogo}
            className="w-full h-full object-contain"
            loading="lazy"
            alt="sure success"
            onLoad={() => setImageLoading(false)}
          />
        </div>
      </div>
      <div className="px-4 py-6">
        <ul className="leading-10">
          {menuList.map((item, index) => (
            <Link to={`${item?.menuLink}`} key={index}>
              <li
                className={`px-4 py-2 group capitalize ${
                  location.pathname == `${item?.menuLink}` ||
                  location.pathname == `${item?.moreLink}`
                    ? "bg-theme-blue text-gray-100"
                    : ""
                } hover:bg-theme-blue transition duration-300 ease-in-out rounded-lg flex items-center gap-2 mb-2`}
              >
                <div
                  className={`w-7 h-7 group-hover:text-gray-100 text-lg ${
                    location.pathname == `${item?.menuLink}`
                      ? "text-gray-100"
                      : ""
                  }`}
                >
                  <img
                    src={item?.menuImg}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <span className="group-hover:text-gray-100">
                  {item?.menuTitle}
                </span>
              </li>
            </Link>
          ))}
          <li
            className="px-4 py-2 group capitalize hover:bg-theme-blue transition duration-300 ease-in-out rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={() => dispatch(toggleModal())}
          >
            <div
              className={`w-7 h-7 group-hover:text-gray-100 text-lg ${
                location.pathname == "/ads" ? "text-gray-100" : ""
              }`}
            >
              <img
                src={logoutImage}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <span className="group-hover:text-gray-100">Signout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
