import axios from "axios";

const handleAadhaarUserGenerateOtp = async (aadhaarNumber) => {
  try {
    console.log("entered");
    const response = await axios.post(
      "https://kyc-api.surepass.io/api/v1/aadhaar-v2/generate-otp",
      { aadhaar_number: aadhaarNumber },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AADHAAR_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.status !== "success") {
      return { message: "Verification failed" };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { message: error.message };
  }
};

const handleAadhaarUserSubmitOtp = async (aadhaarNumber, otp) => {
  try {
    // Replace with the actual API endpoint and options
    const response = await axios.post(
      "https://kyc-api.surepass.io/api/v1/aadhaar-v2/submit-otp",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AADHAAR_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aadhaarNumber }),
      }
    );

    if (!response.ok) {
      return { message: "Verification failed" };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { message: error.message };
  }
};

export { handleAadhaarUserGenerateOtp, handleAadhaarUserSubmitOtp };
