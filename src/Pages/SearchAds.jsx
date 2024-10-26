import { useState } from "react";
import SearchForm from "../components/SearchForm/SearchForm";
import { handleAsyncError } from "../utils/Helper/handleAsyncError";
import { handleFetchApplicationByLink } from "../utils/data";
import { useDispatch } from "react-redux";
import ApplicationInfoCard from "../components/AppllicationInfoCard/ApplicationInfoCard";

const SearchAds = () => {
  const dispatch = useDispatch();
  const [isApplicationChecked, setIsApplicationChecked] = useState(false);
  const [adData, setAdData] = useState([]);
  const [checkApplication, setCheckApplication] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckApplicationAlreadyExist = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (checkApplication == "" || checkApplication == " ") {
      return handleAsyncError(dispatch, "invalid application link");
    }
    const response = await handleFetchApplicationByLink(checkApplication);
    setLoading(false);
    if (response.message == "Success") {
      //   console.log(response?.data[0]);
      setAdData(response?.data[0]);
      setCheckApplication("");
      setIsApplicationChecked(true);
    } else {
      handleAsyncError(dispatch, response.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl uppercase font-bold text-theme-blue mb-5">
        Search Ads
      </h1>
      <div className="w-full lg:w-[95%] shadow-lg rounded-xl p-5 mx-auto bg-white">
        {!isApplicationChecked ? (
          <SearchForm
            formSubmit={handleCheckApplicationAlreadyExist}
            checkApplication={checkApplication}
            setCheckApplication={setCheckApplication}
            loading={loading}
          />
        ) : (
          <>
            <ApplicationInfoCard
              item={adData && adData}
              isApplicationChecked={isApplicationChecked}
              setIsApplicationChecked={setIsApplicationChecked}
            />
          </>
        )}
      </div>
    </>
  );
};

export default SearchAds;
