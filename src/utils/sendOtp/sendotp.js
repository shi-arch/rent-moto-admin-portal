import axios from "axios";

// const handleSendOtp = async (otp, phoneNumber) => {
//   try {
//     // const response = await fetch("/fast/dev/bulkV2", {
//     const response = await axios.post("http://localhost:5000/send-otp", {
//       otp,
//       phoneNumber,
//     });

//     // const data = await response.json();
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//   }
// };

const handleSendOtp = async (otp, phoneNumber) => {
  try {
    const response = await axios.post(import.meta.env.VITE_SEND_OTP, {
      otp: otp,
      phoneNumber: phoneNumber,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

export default handleSendOtp;
