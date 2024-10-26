import { useEffect, useState } from "react";
import {
  handleCreateAgent,
  handleCreateNewAd,
  handleFetchApplicationPresent,
  handleUploadAppImage,
} from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleAsyncError } from "../utils/Helper/handleAsyncError";
import Spinner from "../components/spinner/Spinner.jsx";

const CreateNewAds = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imagesUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [aplicationUrl, setApplicationUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.currentUser);
  // dynamically set the rows of textarea
  const [rows, setRows] = useState(1);

  const handleCheckApplicationAlreadyExist = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (aplicationUrl == "" || aplicationUrl == " ") {
      setLoading(false);
      return handleAsyncError(dispatch, "invalid app url");
    }
    const response = await handleFetchApplicationPresent(aplicationUrl);
    setLoading(false);
    if (response.message == "Success") {
      handleCreateAds(e);
    } else {
      handleAsyncError(dispatch, response.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      // console.log(file);
    }
  };

  const handleCreateAds = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      // if (
      //   !currentUser?.userAddress &&
      //   !currentUser?.addressLat &&
      //   !currentUser?.addressLng
      // ) {
      //   setLoading(false);
      //   return handleAsyncError(dispatch, "First update your address!");
      // }
      if (!image) {
        setLoading(false);
        return handleAsyncError(dispatch, "Please Upload App Logo");
      }
      const imageUpload = await handleUploadAppImage(image);
      if (imageUpload?.appUrl) {
        // if user don't have address than pass default address
        const updatedAddressLat =
          currentUser?.addressLat == ""
            ? import.meta.env.VITE_LAT
            : currentUser?.addressLat;
        const updatedAddressLng =
          currentUser?.addressLng == ""
            ? import.meta.env.VITE_LNG
            : currentUser?.addressLng;
        const updatedAddress =
          currentUser?.userAddress == ""
            ? import.meta.env.VITE_ADDRESS
            : currentUser?.userAddress;

        const result = await handleCreateNewAd(
          imageUpload?.appUrl,
          aplicationUrl,
          parseFloat(updatedAddressLat),
          parseFloat(updatedAddressLng),
          updatedAddress,
          currentUser?.phone,
          currentUser?.balance
        );
        if (result.id) {
          const agentResult = await handleCreateAgent(
            currentUser?.phone,
            currentUser?.balance,
            currentUser?.userName,
            result?.id
          );
          if (agentResult?.message == "success") {
            handleAsyncError(dispatch, "Ad create successfully", "success");
            navigate("/my-ads");
          }
        }
      } else {
        handleAsyncError(dispatch, "error while uploading image");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return handleAsyncError(dispatch, error.message);
    }
  };

  // dynamically set the rows of textarea
  const updateRows = () => {
    if (window.innerWidth < 640) {
      // Adjust this value for your breakpoint
      setRows(2); // More rows for mobile
    } else {
      setRows(1); // Few rows for desktop
    }
  };
  // dynamically set the rows of textarea
  useEffect(() => {
    updateRows(); // Set initial rows on mount
    window.addEventListener("resize", updateRows); // Update on resize

    return () => {
      window.removeEventListener("resize", updateRows); // Cleanup
    };
  }, []);

  return (
    <>
      <h1 className="text-2xl uppercase font-bold text-theme-blue mb-5">
        Create New Ads
      </h1>
      <div className="w-full lg:w-[95%] shadow-lg rounded-xl p-5 mx-auto bg-white">
        <>
          <form onSubmit={handleCheckApplicationAlreadyExist}>
            <>
              <p className="block text-gray-800 font-semibold text-sm mb-2">
                Image
              </p>
              <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md px-6 py-6 md:py-5 lg:py-4 text-center mb-5">
                <input
                  type="file"
                  className="hidden"
                  id="ImageInput"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagesUrl ? (
                  //  image preview only shows when there user select any image
                  <>
                    <div className="lg:absolute block text-right right-8 z-50 mb-5">
                      {/* remove image if user want to reupload another image  */}
                      <button
                        className="inline-flex items-center gap-1 text-red-500 border border-red-500 p-1 rounded-md hover:bg-red-500 hover:text-gray-100 transition duration-300 ease-in-out group"
                        onClick={() => setImageUrl("")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="group-hover:stroke-gray-100 stroke-red-500 transition duration-300 ease-in-out group"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        Remove
                      </button>
                    </div>
                    <div className="w-full h-28 lg:h-40 mx-auto relative mx-auto">
                      <img
                        src={imagesUrl}
                        className="w-full h-full object-contain hover:border rounded-xl transition duration-300 ease-in-out"
                        alt="UPLOAD_IMAGE"
                      />
                    </div>
                  </>
                ) : (
                  <label htmlFor="ImageInput" className="cursor-pointer">
                    {/* if not showing image preview than show option to upload */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-300 mb-4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <g transform="translate(2 3)">
                        <path d="M20 16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2v11z" />
                        <circle cx="10" cy="10" r="4" />
                      </g>
                    </svg>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="ImageInput"
                        className="cursor-pointer text-theme-blue hover:underline mr-1"
                      >
                        Browse
                      </label>
                      to upload logo.
                    </p>
                  </label>
                )}
              </div>
            </>
            <div>
              <label
                htmlFor="inputUrl"
                className="block text-gray-800 font-semibold text-sm"
              >
                Paste App URL
              </label>
              <div className="mt-2">
                <textarea
                  id="inputUrl"
                  className="block w-full rounded-md px-5 py-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800 outline-none resize-none"
                  value={aplicationUrl}
                  onChange={(e) => setApplicationUrl(e.target.value)}
                  rows={rows}
                  placeholder="https://example.com/store/search?q=example&c=apps&hl=en"
                ></textarea>
              </div>
            </div>
            <button
              className="hover:bg-yellow-500 border border-yellow-500 text-yellow-500 hover:text-gray-100 font-bold rounded-md w-full mt-6 focus:outline-none focus:ring-opacity-50 w-full"
              type="button"
            >
              <Link
                target={"_blank"}
                to={aplicationUrl && aplicationUrl}
                className="w-full block px-5 py-3"
              >
                View Link
              </Link>
            </button>
            <p className="text-center mt-3 text-gray-400">OR</p>
            <button
              className="bg-theme-blue hover:bg-theme-blue-light text-white font-bold px-5 py-3 rounded-md w-full mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner message={"uploading"} /> : "Publish"}
            </button>
          </form>
        </>
        {/* // )} */}
      </div>
    </>
  );
};

export default CreateNewAds;
