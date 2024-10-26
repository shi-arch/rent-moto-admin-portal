import { useEffect } from "react";
import ApplicationCard from "../components/ApplicationCard/ApplicationCard";
import {
  handleFetchApplication,
  handleFetchApplicationMoreInfo,
} from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { AdsSkeleton } from "../components/Skeleton";
import noDataImg from "../assets/logo/No-data.svg";
import { Link } from "react-router-dom";
import EditLimitModal from "../components/Modal/EditLimitModal";
import { fetchAdsStart, fetchAdsSuccess } from "../Redux/AdsSlice/AdsSlice";

const Ads = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.currentUser);
  const { ads, loading } = useSelector((state) => state.ads);
  useEffect(() => {
    // fetching ads data on page load
    (async () => {
      // if (ads?.models) return;
      dispatch(fetchAdsStart());
      const response = await handleFetchApplication(currentUser?.phone);
      if (response) {
        console.log(response);
        dispatch(fetchAdsSuccess(response));
      }
    })();
  }, []);

  return (
    <>
      {/* edit limit modal  */}
      <EditLimitModal />
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl uppercase font-bold text-theme-blue">My Ads</h1>
        <Link
          className="bg-theme-blue font-semibold text-gray-100 px-4 lg:px-6 py-2.5 rounded-md shadow-lg hover:bg-theme-blue-light hover:shadow-md inline-flex items-center gap-1"
          to={"/create-new-ads"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="stroke-gray-100"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create Ad
        </Link>
      </div>
      {!loading ? (
        ads?.models?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {ads?.models?.map((item) => (
                <ApplicationCard item={item} key={item.TransactionId} />
              ))}
            </div>
          </>
        ) : (
          //when there is no data
          <>
            <div className="w-80 h-80 mx-auto mb-2">
              <img src={noDataImg} alt="NO_DATA" />
            </div>
            <h2 className="text-center font-semibold text-xl">No Ads Found.</h2>
          </>
        )
      ) : (
        <AdsSkeleton />
      )}
    </>
  );
};

export default Ads;
