import { useRef, useState } from "react";
import VerifyOtp from "./VerifyOtp";
import Alert from "../Alert/Alert";
import webLogo from "../../assets/logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { handleAsyncError } from "../../utils/Helper/handleAsyncError";
import handleCheckUser from "../../utils/data/handleCheckUser";
// import { clearError } from "../../Redux/ErrorSlice/ErrorSlice";
import { Navigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { handleKeyDown } from "../../utils";
import { handleCreateNewUser } from "../../utils/data";

const Login = () => {
  const [otp, setOtp] = useState(null);
  const [number, setNumber] = useState(null);
  const [user, setUser] = useState({});
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { message, type } = useSelector((state) => state.error);
  const { currentUser } = useSelector((state) => state.currentUser);
  const inputRef = useRef(null);

  const handleOtpLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = new FormData(event.target);
    const { phoneNumber } = Object.fromEntries(response.entries());
    //verify the phone number
    const phoneRegex = /^(0|91)?[6-9][0-9]{9}$/;
    if (phoneNumber.length == 10 && phoneRegex.test(phoneNumber)) {
      let checkUser = await handleCheckUser(phoneNumber);
      //generating otp
      const generateOtp = Math.floor(100000 + Math.random() * 900000);
      if (generateOtp) {
        setLoading(false);
        if (checkUser.type == "success") {
          setUser({
            id: checkUser?.data?.UserId,
            phone: checkUser?.data?.UserPhoneNumber,
            userName: checkUser?.data?.UserName,
            userAddress: checkUser?.data?.UserAddress,
            addressLat: checkUser?.data?.AddressLat,
            addressLng: checkUser?.data?.AddressLng,
            userProfileImage: checkUser?.data?.UserProfileImageUri,
            isbusinessPartner: checkUser?.data?.businessPartner ? true : false,
          });
        }
        // }
        setIsOtpSend(true);
        setOtp(generateOtp && generateOtp);
        setNumber(phoneNumber);
        // //for setting time before requesting another otp
        setSeconds(30);
        setIsTimerActive(true);
      }
    } else {
      handleAsyncError(dispatch, "Invalid Phone Number");
      setLoading(false);
    }
  };

  //center the input in mobile view
  const handleCenterInput = () => {
    inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return !currentUser ? (
    <div className="min-h-screen login relative">
      {/* alert or error showing  */}
      {message && <Alert error={message} errorType={type} />}
      {/* login  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-gradient-to-t from-theme-purple from-20% via-theme-blue via-40% to-theme-purple-light to-90% rounded-bl-[18rem] lg:bg-none">
        <div className="flex flex-col items-center justify-center min-h-screen">
          {!isOtpSend ? (
            <div className="w-[90%] lg:w-[65%]">
              <div className="flex flex-col items-center justify-center lg:hidden mb-5">
                <img
                  src={webLogo}
                  className="w-32 mx-auto mb-5 drop-shadow-2xl"
                  alt="LOGO"
                />
              </div>
              <div className="mb-8">
                <h1 className="text-2xl font-bold uppercase text-gray-100 lg:text-black mb-2">
                  Welcome to{" "}
                  <span className="lg:text-theme-blue">Sure Success</span> App
                  Installation Ads
                </h1>
                <p className="capitalize text-gray-200 lg:text-gray-400 text-lg">
                  Continue with mobile number
                </p>
              </div>
              <div>
                <form className="w-full mx-auto mb-8" onSubmit={handleOtpLogin}>
                  <div className="mb-8">
                    <label
                      className="block font-semibold text-sm text-gray-100 lg:text-gray-800"
                      htmlFor="phoneNumber"
                    >
                      Enter Phone Number
                    </label>
                    <div className="relative mt-2 text-gray-100 lg:text-gray-500">
                      <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                        +91
                      </div>
                      <input
                        type="number"
                        placeholder="Enter Phone Number"
                        name="phoneNumber"
                        id="phoneNumber"
                        ref={inputRef}
                        onFocus={handleCenterInput}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-[3.4rem] pr-4 py-3.5 appearance-none bg-transparent outline-none border border-gray-100 lg:border-gray-300 focus:border-text-gray-200 lg:focus:border-theme-blue lg:focus:text-gray-800 text-gray-100 lg:text-gray-800 outline-none rounded-xl placeholder-gray-100 lg:placeholder-gray-400"
                        onChange={(e) => e.target.value}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-theme-blue-light lg:bg-theme-blue py-3.5 px-6 rounded-xl text-white uppercase hover:bg-theme-blue-light transition duration-200 ease-in-out disabled:bg-gray-500 outline-none"
                    disabled={loading}
                  >
                    {loading ? <Spinner message={"loading.."} /> : "continue"}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <VerifyOtp
              length={6}
              otp={otp}
              data={user}
              phone={number}
              seconds={seconds}
              setSecondChanger={setSeconds}
              isTimerActive={isTimerActive}
              setTimerActive={setIsTimerActive}
            />
          )}
        </div>
        <div className="bg-gradient-to-t from-theme-purple from-20% via-theme-blue via-40% to-theme-purple-light to-90% rounded-bl-[18rem] min-h-screen hidden lg:block">
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={webLogo}
              className="w-72 mx-auto mb-5 drop-shadow-2xl"
              alt="LOGO"
            />
            <h1 className="text-6xl text-center uppercase font-bold text-gray-100 mb-1">
              Sure Success
            </h1>
            <p className="text-gray-200 uppercase font-semibold text-2xl">
              App Installation Ads
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/my-ads"} replace />
  );
};

export default Login;
