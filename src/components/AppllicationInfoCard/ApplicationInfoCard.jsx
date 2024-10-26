import { useEffect, useState } from "react";
import { handleFetchApplicationMoreInfo } from "../../utils/data";
import promiseWeb from "../../assets/logo/promise-remove.png";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import { timeStampUserFormated } from "../../utils";

const ApplicationInfoCard = ({
  item,
  isApplicationChecked,
  setIsApplicationChecked,
}) => {
  const [moreInfo, setMoreInfo] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (item) {
        const moreResponse = await handleFetchApplicationMoreInfo(
          item?.TransactionId
        );
        // console.log(moreResponse);
        setMoreInfo(moreResponse);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center">
        <button
          className="flex items-center px-3 py-2 hover:bg-red-500 hover:text-gray-100 border rounded-lg"
          onClick={() => setIsApplicationChecked(!isApplicationChecked)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
          <span className="ml-1">Back</span>
        </button>
        <div
          className={`w-20 rotate-12 relative ${
            item?.Type == "active" &&
            "hidden" &&
            item?.enquiryLimit != "0" &&
            "hidden" &&
            moreInfo &&
            moreInfo?.totalDownload < 1 &&
            "hidden" &&
            item?.tokan !== "0"
              ? "hidden"
              : ""
          }`}
        >
          <img
            src={promiseWeb}
            className="w-full h-full object-cover"
            alt="ERROR_TYPE"
            // style={{ filter: "hue-rotate(120deg)" }}
            loading="lazy"
          />
          <span
            className="absolute uppercase text-white"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Pause
          </span>
        </div>
      </div>
      <div className="flex items-center justify-around mb-5">
        <div className="mb-5">
          <img
            src={
              item.Attachment1 != ""
                ? item?.Attachment1
                : "https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/react-512.png"
            }
            className="w-20 h-20 object-cover mx-auto rounded-xl"
            loading="lazy"
            alt="APP-IMAGE"
          />
          <Link
            className="px-3 py-2 bg-theme-blue hover:bg-theme-blue-light text-gray-100 gap-1 mt-2 rounded flex items-center"
            to={item.SenderSignature}
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
            View App
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm flex items-center mb-2">
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
            {!loading ? moreInfo?.totalDownload : "fetching..."}
          </p>
          <p className="text-sm flex items-center mb-2">
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
            <span className="font-semibold mr-1">Cost Per Install:</span>₹
            {item?.agent ? item?.agent : "0.00"}
          </p>
          <p className="text-sm flex items-center">
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
            {item.enquiryLimit}
          </p>
          {/* showing the error that why your ads in pause  */}
          {/* <p
            className={`${
              item?.tokan !== "0" &&
              item?.enquiryLimit !== "0" &&
              moreInfo &&
              moreInfo?.totalDownload > 0
                ? "hidden"
                : ""
            } capitalize text-red-600 font-semibold p-1 mt-2`}
          >
            {(item?.tokan === "0" && "This ad pause due to low balance.") ||
              (item?.enquiryLimit === "0" &&
                "This ad pause due to max download limit.") ||
              (moreInfo && moreInfo?.totalDownload < 1 && "No download yet")}
          </p> */}
        </div>
      </div>
      {/* showing the error that why your ads in pause  */}
      <p
        className={`${
          item?.tokan !== "0" &&
          item?.enquiryLimit !== "0" &&
          moreInfo &&
          moreInfo?.totalDownload > 0
            ? "hidden"
            : ""
        } capitalize text-red-600 font-semibold p-1 border-b-2 pb-4 text-center mb-5`}
      >
        {(item?.tokan === "0" && "This ad pause due to low balance.") ||
          (item?.enquiryLimit === "0" &&
            "This ad pause due to max download limit.") ||
          (moreInfo && moreInfo?.totalDownload < 1 && "No download yet")}
      </p>
      {/* download users */}
      <div className="lg:h-48 overflow-hidden overflow-y-scroll no-scrollbar w-full">
        <h2 className="text-theme-blue font-semibold text-lg uppercase mb-3">
          App Download History
        </h2>
        {!loading ? (
          <table className="w-full">
            <thead class="border-2 border-b-0">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r-2"
                >
                  SNo.
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left border-r-2"
                >
                  UserName
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Download Date
                </th>
              </tr>
            </thead>
            {moreInfo?.data?.map((item, index) => (
              <tr class="border-2">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r-2">
                  {index + 1}.
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r-2">
                  {item?.SenderName}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {timeStampUserFormated(item?.TimeStamp)}
                </td>
              </tr>
            ))}
          </table>
        ) : (
          <Spinner message={"loading.."} />
        )}
      </div>
    </>
  );
};

export default ApplicationInfoCard;
