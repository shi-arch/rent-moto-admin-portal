import Login from "./components/Auth/Login";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateNewAds, Profile, Ads, Wallet, SearchAds } from "./Pages/index";
import Layout from "./components/layout/Layout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSignInUser } from "./Redux/currentUserSlice/CurrentUserSlice";
import Recharge from "./components/Wallet Recharge/Recharge";

const App = () => {
  const dispatch = useDispatch();
  //through this we can check whether the user is loggedIn or not if we found user id in localstorage than we can give user access to the dashboard without asking to login again
  useEffect(() => {
    dispatch(getSignInUser());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="my-ads" exact element={<Ads />} />
          <Route path="profile" exact element={<Profile />} />
          <Route path="create-new-ads" exact element={<CreateNewAds />} />
          <Route path="wallet" exact element={<Wallet />} />
          <Route path="recharge" exact element={<Recharge />} />
          <Route path="search-ads" exact element={<SearchAds />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
