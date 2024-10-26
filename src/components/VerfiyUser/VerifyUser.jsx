import { useEffect, useState } from "react";
import aadhaarImage from "../../assets/logo/aadhaar_card.png";
import { handleAadhaarUserGenerateOtp } from "../../utils/AadhaarApi";
import { useSelector } from "react-redux";

const VerifyUser = () => {
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [otp, setOtp] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [error, setError] = useState("");
  const { isVerifyUserModalActive } = useSelector((state) => state.sideBar);

  const handleUserVerification = async (e) => {
    e.preventDefault();
    if (!aadhaarNumber) {
      return setError("Please enter a valid 12-digit Aadhaar number.");
    }
    // Validate Aadhaar number format
    const aadhaarRegex =
      /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
    if (!aadhaarRegex.test(aadhaarNumber)) {
      console.log("entered");
      return setError("Please enter a valid 12-digit Aadhaar number.");
    }

    const result = await handleAadhaarUserGenerateOtp(aadhaarNumber);
    console.log(result);
  };

  //   adding hypen after every 4 digit entered by user and don't let user to enter the any number more than 12 digits
  const formatAadhaarNumber = (e) => {
    let value = e.target.value;
    if (value.length == 4 || value.length == 9) {
      value += "-";
    }
    if (value.length == 15) return;
    setAadhaarNumber(value);
  };

  //clear the aadhaar number input when modal close
  useEffect(() => {
    setAadhaarNumber("");
  }, [isVerifyUserModalActive]);

  return (
    <>
      <h1 className="text-xl uppercase font-semibold mb-2">
        Verify User Using Addhaar Card
      </h1>
      <div className="w-[60%] mx-auto mb-5">
        <img
          src={aadhaarImage}
          className="w-full h-full object-cover"
          alt="aadhaar_card"
        />
      </div>
      <form onSubmit={handleUserVerification}>
        {error && <p className="text-red-500 mb-5">{error.message}</p>}
        <div className="mb-5">
          <label htmlFor="aadhaar_card">Enter Aadhaar Card Number</label>
          <input
            id="aadhaar_card"
            name="aadhaar_card"
            type="text"
            className="w-full border-b border-gray-300 px-3 py-2 border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
            placeholder="xxxx-xxxx-xxxx"
            value={aadhaarNumber}
            onChange={(e) => formatAadhaarNumber(e)}
            // onChange={(e) => setAadhaarNumber(e.target.value)}
          />
        </div>
        <div className={`${!isOtpSend ? "hidden" : ""} mb-10`}>
          <label htmlFor="aadhaar_card_otp">Enter OTP</label>
          <input
            id="aadhaar_card_otp"
            name="aadhaar_card_otp"
            type="number"
            className="w-full border-b border-gray-300 px-3 py-2 border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
            placeholder="xxxx"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-theme-blue hover:bg-theme-blue-light text-gray-100 transition duration-300 ease-in-out px-3 py-2 w-full rounded-lg"
        >
          {!isOtpSend ? "Get OTP" : "Verify User"}
        </button>
      </form>
    </>
  );
};

export default VerifyUser;
