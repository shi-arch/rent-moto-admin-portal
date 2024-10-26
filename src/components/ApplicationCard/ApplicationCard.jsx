import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ButtonSkeleton, ImageSkeleton } from "../Skeleton";
import webLogo from "../../assets/logo/logo-full.png";
import { useDispatch } from "react-redux";
import {
  handleDataId,
  toggleEditLimitModal,
} from "../../Redux/SideBarSlice/SideBarSlice";
import AdsErrorIcon from "../Error/AdsErrorIcon";
import AdsErrorMessage from "../Error/AdsErrorMessage";
import { db } from "../../firebase";
import { doc, increment, updateDoc } from "firebase/firestore";

const ApplicationCard = ({ item }) => {
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(true);
  // const [downloads, setDownloads] = useState(0);
  // const [downloadLoading, setDownloadLoading] = useState(false);

  //through this we will edit the limit
  const handleEditLimit = async (id, limit, downloadLimit) => {
    await updateDoc(
      doc(db, "users", import.meta.env.VITE_PROMISE_NUMBER, "letters", id),
      { leads: increment(1) }
    );
    dispatch(
      handleDataId({
        id: id,
        limit: limit,
        totalDownload: downloadLimit,
      })
    );
    dispatch(toggleEditLimitModal());
  };

  // useEffect(() => {
  //   // fetching download for every app
  //   if (!item?.TransactionId) return;

  //   const fetchDownloads = async () => {
  //     try {
  //       setDownloadLoading(true);
  //       const downloadResponse = await handleFetchApplicationMoreInfo(
  //         item?.TransactionId
  //       );
  //       if (downloadResponse) {
  //         setDownloads(downloadResponse?.totalDownload);
  //       }
  //     } catch (error) {
  //       handleAsyncError(dispatch, "Error while fetching downloads");
  //     } finally {
  //       setDownloadLoading(false);
  //     }
  //   };
  //   fetchDownloads();
  // }, [item?.TransactionId]);

  return (
    <div className="p-5 shadow-md rounded-xl bg-white relative hover:shadow-xl transition duration-300 ease-in-out cursor-pointer relative">
      {/* shows the pause tag if any of the condition is true  */}
      <AdsErrorIcon {...item} />

      <div className=" w-full h-40 overflow-hidden pb-1 border-b-2 mb-5">
        {/* show this until image load fully  */}
        {imageLoading && <ImageSkeleton />}
        <img
          srcSet={item.Attachment1 != "" ? item?.Attachment1 : { webLogo }}
          className="w-full h-full object-contain rounded-xl"
          loading="lazy"
          alt="APP-IMAGE"
          onLoad={() => setImageLoading(false)}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="text-sm flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
          </svg>
          <span className="font-semibold mr-1">Total Download:</span>
          {/* {downloadLoading ? (
            <span className="animate-pulse italic">loading..</span>
          ) : (
            downloads
          )} */}
          {item?.leads || "0"}
        </div>
        <div className="text-sm flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          <span className="font-semibold mr-1">Cost Per Install:</span>
          <p className="mr-[0.1rem]">{item?.CurrencySymbol}</p>
          <p>{item?.agent ? item?.agent : "0.00"}</p>
        </div>
        <div className="text-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8M12 19.8V12M16 17l-4 4-4-4" />
          </svg>
          <span className="font-semibold mr-1">Max Download Limit:</span>
          {item?.enquiryLimit}
        </div>

        {/* <div
          className={`flex items-center gap-2 ${
            downloadLoading && "animate-pulse"
          }`}
        > */}
        <div className="flex items-center gap-2">
          {/* do not show button until total download is fetching */}
          {/* {!downloadLoading ?  */}
          {
            <>
              <Link
                to={item.SenderSignature}
                className="flex items-center gap-1 px-2 py-1.5 bg-theme-blue hover:bg-theme-blue-light text-gray-100 gap-1 mt-2 rounded"
                target={"_blank"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="stroke-gray-100"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                View
              </Link>
              <button
                className="flex items-center gap-1 border px-2 py-1.5 rounded mt-2 hover:bg-theme-blue hover:text-gray-100 transition duration-300 ease-in-out hover:border-theme-blue group"
                onClick={() =>
                  handleEditLimit(
                    item?.TransactionId,
                    item?.enquiryLimit,
                    item?.totalDownload
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="stroke-black group-hover:stroke-gray-100 transition duration-300 ease-in-out"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                  <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                </svg>
                Edit Limit
              </button>
            </>
            //  : (
            //   <>
            //     <ButtonSkeleton />
            //     <ButtonSkeleton />
            //   </>
            // )
          }
        </div>

        {/* showing the error that why your ads in pause  */}
        <AdsErrorMessage {...item} />
      </div>
    </div>
  );
};

export default ApplicationCard;
