import { useState } from "react";
import webLogo from "../../assets/logo/logo-full.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleRechargeModal } from "../../Redux/SideBarSlice/SideBarSlice";

const Recharge = () => {
  const dispatch = useDispatch();
  const Amount = [100, 500, 1000, 2000, 5000, 10000];
  const [amountInput, SetAmountInput] = useState("");
  const { currentUser } = useSelector((state) => state.currentUser);

  const handleChangeAmount = (e) => {
    // console.log("amountInput");
    SetAmountInput(e.target.innerText);
  };

  const handleAddBalance = async (e) => {
    e.preventDefault();
    if (currentUser?.phone && amountInput != 0) {
      window.open(
        `https://mypromise.app/pay/?amount=${amountInput}"&mobile=${currentUser?.phone}`,
        "_blank"
      );
    }
    SetAmountInput("");
    dispatch(toggleRechargeModal());
  };
  return (
    <>
      <div className="w-40 lg:w-64 h-auto lg:h-20 mx-auto mb-3">
        <img
          src={webLogo}
          className="w-full h-full object-cover"
          alt="SURE_SUCCESS"
        />
      </div>
      <p className="text-center text-sm mb-5 text-gray-400 uppercase">
        Recharge Wallet
      </p>
      {/* <h1 className="text-2xl uppercase font-bold text-theme-blue mb-5 text-center">
        Recharge Wallet
      </h1> */}
      <form onSubmit={handleAddBalance}>
        {/* <p className="font-semibold mb-2">Enter Amount</p> */}
        <div className="flex items-center gap-1 mb-10">
          <label htmlFor="payment">₹</label>
          <input
            id="payment"
            name="payment"
            type="number"
            className="w-full border-b border-gray-300 px-3 py-2 border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
            placeholder="100 ~ 1000"
            value={amountInput}
            onChange={(e) => e.target.value}
          />
        </div>
        {/* <h2>Select Amount</h2> */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-5">
          {Amount.map((item, index) => (
            <button
              type="button"
              className="px-4 py-2 shadow-md rounded-lg hover:text-gray-100 border hover:bg-theme-blue"
              key={index}
              onClick={(e) => handleChangeAmount(e)}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="bg-theme-blue hover:bg-theme-blue-light text-gray-100 transition duration-300 ease-in-out px-3 py-2 w-full rounded-lg"
        >
          Add balance
        </button>
      </form>
    </>
  );
};

export default Recharge;
