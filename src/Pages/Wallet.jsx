import { useEffect, useRef, useState } from "react";
import walletImage from "../assets/logo/wallet.png";
import MessageInput from "../components/MessageInput/MessageInput";
import { useDispatch, useSelector } from "react-redux";
import RechargeModal from "../components/Modal/RechargeModal";
import { toggleRechargeModal } from "../Redux/SideBarSlice/SideBarSlice";
import { handleRealTimeTransactions } from "../utils/data";
import ScrollButton from "../components/ScrollButton/ScrollButton";
import { formatDateLikeApp } from "../utils";

const Wallet = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.currentUser);
  const [data, setData] = useState([]);
  const messagesEndRef = useRef(null);
  // scrolltobottom button
  const [isVisible, setIsVisible] = useState(false);
  // const [messages, setMessages] = useState([
  //   { userNumber: "+919027408729", message: "Hii", time: "11:45" },
  //   {
  //     userNumber: "+919027408729",
  //     message: "this is for testing",
  //     time: "11:50",
  //   },
  // ]);

  // scrollToBottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const { scrollHeight } = messagesEndRef.current;
      messagesEndRef.current.style.scrollBehavior = "smooth";
      messagesEndRef.current.scrollTop = scrollHeight;
    }
  };

  // hide the scrollToBottom buttom when page is pointing to bottom and show the button when not
  useEffect(() => {
    const handleScroll = () => {
      if (messagesEndRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          messagesEndRef.current;
        setIsVisible(scrollTop + clientHeight < scrollHeight);
      }
    };
    const container = messagesEndRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // scroll to bottom when someone open page or send data
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const realTimeResponse = await handleRealTimeTransactions(
          currentUser?.phone,
          setData
        );
        // Cleanup function to unsubscribe
        return () => {
          if (realTimeResponse) {
            realTimeResponse();
          }
        };
      }
    })();
  }, []);

  return (
    <>
      {/* add balance modal  */}
      <RechargeModal />
      <div className="w-full shadow-lg rounded-xl p-5 bg-white relative h-full">
        {/* scroll to bottom  */}
        {isVisible && <ScrollButton handleScroll={scrollToBottom} />}
        <div className="flex items-center justify-end">
          {/* <h1 className="text-2xl uppercase font-bold text-theme-blue">
            Wallet
          </h1> */}
          <div className="flex items-center gap-2">
            <button
              className="hidden lg:flex items-center bg-lighter-gray shadow rounded-xl px-3 py-2 gap-2"
              title="Balance"
            >
              <img
                src={walletImage}
                className="w-7 object-cover border-r-2 p-1"
                alt="WALLET_ICON"
              />
              <h2>₹{currentUser?.balance || 0}</h2>
            </button>
            <button
              className="bg-theme-blue text-gray-100 p-2 lg:px-3 lg:py-2 shadow-lg rounded-lg hover:bg-theme-blue-light"
              onClick={() => dispatch(toggleRechargeModal())}
            >
              Add Balance
            </button>
          </div>
        </div>
        <div
          className="bg-lighter-gray overflow-y-auto my-2 rounded-xl px-4 no-scrollbar py-2"
          ref={messagesEndRef}
          style={{ height: "calc(100% - 110.6px)" }}
        >
          {/* {console.log(data)} */}
          {data?.length > 0 ? (
            data?.map((message, index) => {
              // Check if the date should be displayed
              const messageDate = new Date(message?.Date).toLocaleDateString();
              const lastMessageDate =
                index > 0
                  ? new Date(data[index - 1]?.Date).toLocaleDateString()
                  : null;
              return (
                <div key={message.id}>
                  {messageDate !== lastMessageDate && (
                    // {showDate && (
                    <div className="text-center my-2">
                      <span className="px-2 py-1 border border-gray-300 rounded-xl bg-white">
                        {message?.Date}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex items-center ${
                      message.TransactionType == "Debit"
                        ? "justify-start"
                        : "justify-end"
                    } my-5 gap-2`}
                  >
                    <div>
                      <div
                        className={`bg-white p-2 rounded-xl max-w-40 text-wrap`}
                      >
                        {/* if there is amount than show amount  */}
                        {message?.Amount != "0" && (
                          <span
                            className={`mr-1 block text-xl ${
                              message?.TransactionType == "Debit"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            ₹{message?.Amount}
                          </span>
                        )}
                        {/* if there is image than show image  */}
                        {/* {message?.Attachment1 != "" && (
                          <Link to={message?.Attachment1} target={"_blank"}>
                            <img
                              className="w-32 h-32 object-cover hover:border hover:brightness-90 rounded-xl"
                              src={message?.Attachment1}
                              alt={"MESSAGE_IMAGE"}
                            />
                          </Link>
                        )} */}
                        {message?.Description}
                        <span className="text-sm ml-1 text-right block text-gray-400">
                          {message?.Time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-end justify-center h-full">
              <p className="italic text-gray-400 p-4">
                start new chat with Agent
              </p>
            </div>
          )}
        </div>
        <MessageInput />
      </div>
    </>
  );
};

export default Wallet;
