import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  formatDate,
  formatTime,
  formatTimestamp,
  generateGeoHash,
} from "../index";

const fetchAgentData = async (phoneNumber) => {
  try {
    const agentsCol = doc(
      db,
      `users/${import.meta.env.VITE_PROMISE_NUMBER}/agents/${phoneNumber}`
    );
    const agentsSnapshot = await getDoc(agentsCol);
    if (agentsSnapshot.exists()) {
      // console.log(agentsSnapshot.data());
      return agentsSnapshot.data();
    }
  } catch (error) {
    console.log(error);
  }
};

const handleFetchApplicationPresent = async (link) => {
  try {
    const lettersRef = collection(
      db,
      "users",
      import.meta.env.VITE_PROMISE_NUMBER,
      "letters"
    );
    const q = query(lettersRef, where("SenderSignature", "==", link), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // console.log("error");
      return { message: "app link already exists." };
    } else {
      // console.log("success");
      return { message: "Success" };
    }
  } catch (error) {
    console.log(error);
  }
};

const handleFetchApplicationByLink = async (link) => {
  try {
    const lettersRef = collection(
      db,
      "users",
      import.meta.env.VITE_PROMISE_NUMBER,
      "letters"
    );
    const q = query(lettersRef, where("SenderSignature", "==", link), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // console.log("error");
      return { message: "app not found." };
    } else {
      const data = [];
      querySnapshot.forEach((doc) => {
        const obj = doc.data();
        data.push(obj);
      });
      return { data, message: "Success" };
    }
  } catch (error) {
    console.log(error);
  }
};

const handleFetchApplication = async (
  phoneNumber,
  lastVisible = null,
  pageSize = 9
) => {
  try {
    const lettersRef = collection(
      db,
      "users",
      import.meta.env.VITE_PROMISE_NUMBER,
      "letters"
    );
    const q = lastVisible
      ? query(
          lettersRef,
          where("ClientUser", "==", phoneNumber),
          startAfter(lastVisible)
          // orderBy("TimeStamp"),
          // limit(pageSize)
        )
      : query(
          lettersRef,
          where("ClientUser", "==", phoneNumber)
          // orderBy("TimeStamp"),
          // limit(pageSize)
        );
    const querySnapshot = await getDocs(q);
    // size of collection
    const totalApp = querySnapshot.size;
    // lastVisible doc index
    const lastVisibleDoc = querySnapshot.size != 0 ? querySnapshot.size - 1 : 0;

    const models = [];
    querySnapshot.forEach((doc) => {
      // models.unshift({
      //   TransactionId: doc.data().TransactionId,
      //   SenderSignature: doc.data().SenderSignature,
      //   CurrencySymbol: doc.data().CurrencySymbol,
      //   Attachment1: doc.data().Attachment1,
      //   Type: doc.data().Type,
      //   agent: doc.data().agent || "",
      //   enquiryLimit: doc.data().enquiryLimit,
      //   tokan: doc.data().tokan,
      //   limitoff: doc.data().limitoff || "",
      //   timeStamp: doc.data().TimeStamp,
      // });
      models.unshift(doc.data());
    });

    return {
      models: models,
      totalApp,
      lastVisible: lastVisibleDoc,
      hasMoreApp: totalApp === 0 ? false : true,
    };

    // console.log(models);
  } catch (error) {
    return {
      models: [],
      totalApp: 0,
      lastVisible: null,
      message: error.message,
    };
  }
};

const handleFetchApplicationMoreInfo = async (TransactionId) => {
  try {
    // Fetch leads
    const leadsRef = collection(
      db,
      "users",
      import.meta.env.VITE_PROMISE_NUMBER,
      "letters",
      TransactionId,
      "leads"
    );
    const leadsSnapshot = await getDocs(leadsRef);
    // const leads = [];
    // leadsSnapshot.forEach((doc) => {
    //   const obj = doc.data();
    //   leads.push(obj);
    // });
    // return { data: leads, totalDownload: leadsSnapshot.size };
    return { transactionId: TransactionId, totalDownload: leadsSnapshot.size };
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateUserProfile = async (userName, profileImage, phoneNumber) => {
  try {
    if (userName || profileImage) {
      // for changing profile image
      if (profileImage != null) {
        const storageRef = ref(storage, `profile_photos/${profileImage.name}`);
        await uploadBytes(storageRef, profileImage);
        const downloadURL = await getDownloadURL(storageRef);

        await updateDoc(doc(db, "users", phoneNumber), {
          UserProfileImageUri: downloadURL,
        });
      }
      // for changing userName
      if (userName) {
        await updateDoc(doc(db, "users", phoneNumber), {
          UserName: userName,
        });
      }
      return { message: "User Profile updated successfully", type: "success" };
    } else {
      return {
        message: "one field is required to update profile",
        type: "error",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const handleUploadAppImage = async (appImage) => {
  try {
    if (!appImage) return;
    const storageRef = ref(storage, `application_image/${appImage.name}`);
    await uploadBytes(storageRef, appImage);
    const downloadURL = await getDownloadURL(storageRef);

    return { appUrl: downloadURL, message: "Image Upload Successfully" };
  } catch (error) {
    console.log(error);
  }
};

const handleCreateNewAd = async (
  imageUrl,
  applicationUrl,
  latitude,
  longitude,
  address,
  UserPhoneNumber,
  currentUserBalance
) => {
  // return console.log(typeof latitude, typeof longitude);
  try {
    const currentDateandTimeInMilliSeconds = Math.floor(Date.now() / 1000);
    const FlagId =
      currentDateandTimeInMilliSeconds +
      import.meta.env.VITE_PROMISE_NUMBER.slice(-4);
    const docRef = doc(
      db,
      "users",
      import.meta.env.VITE_PROMISE_NUMBER,
      "letters",
      FlagId.toString()
    );
    await setDoc(docRef, {
      Amount: "",
      SenderMobileNo: import.meta.env.VITE_PROMISE_NUMBER.toString(),
      Remark: "",
      Description: "",
      Date: formatDate(new Date()).toString(),
      Time: formatTime(new Date()).toString(),
      TimeStamp: formatTimestamp(new Date()).toString(),
      SenderName: "Shumbhu App Marketing",
      AddressLat: latitude.toString(),
      AddressLng: longitude.toString(),
      CurrencySymbol: "₹",
      AddressHash: generateGeoHash(latitude, longitude).toString(),
      TransactionId: FlagId.toString(),
      TransactionType: "own",
      ReceiverName: import.meta.env.VITE_PROMISE_NUMBER.toString(),
      ReceiverMobileNo: FlagId.toString(),
      ShowInfo: "web",
      FlagId: "Download Now",
      Attachment1: imageUrl.toString(),
      Attachment2: "",
      Attachment3: "",
      SenderSelfie: "",
      Address: address,
      MediaPrime: "1",
      Status: "nonprimary",
      SenderSignature: applicationUrl.toString(),
      SenderProfileImageUri: "",
      Type: "active",
      enquiryLimit: "1000",
      limitoff: "",
      leads: "",
      ClientUser: UserPhoneNumber.toString(),
      tokan: currentUserBalance ? currentUserBalance?.toString() : "0",
    });
    return { id: FlagId };
  } catch (error) {
    console.log(error);
  }
};

const handleCreateAgent = async (phoneNumber, balance, username, flagId) => {
  try {
    // Reference to the agent document
    const agentDocRef = doc(
      db,
      "users",
      import.meta.env.VITE_PROMISE_NUMBER,
      "agents",
      phoneNumber
    );
    const documentSnapshot = await getDoc(agentDocRef);
    if (!documentSnapshot.exists()) {
      await setDoc(agentDocRef, {
        BalanceAmount: balance ? balance : "0",
        MobileNo: phoneNumber.toString(),
        CustomerName: username.toString(),
        Date: formatDate(new Date()).toString(),
        TimeStamp: formatTimestamp(new Date()).toString(),
      });
    }
    const lettersDocRef = doc(
      db,
      "users",
      import.meta.env.VITE_PROMISE_NUMBER,
      "letters",
      flagId,
      "agents",
      "agent"
    );
    await setDoc(lettersDocRef, {
      BalanceAmount: balance ? balance : "0",
      MobileNo: phoneNumber.toString(),
      CustomerName: username.toString(),
      Date: formatDate(new Date()).toString(),
      TimeStamp: formatTimestamp(new Date()).toString(),
    });

    return { message: "success" };
  } catch (error) {
    console.log(error);
  }
};

const handleRealTimeTransactions = async (phoneNumber, setData) => {
  const condition = query(
    collection(
      db,
      "users",
      import.meta.env.VITE_PROMISE_NUMBER,
      "agents",
      phoneNumber,
      "transection"
    ),
    orderBy("TimeStamp", "desc"),
    limit(300) // Limit the results to the last 200 transactions
  );
  const unsubscribe = onSnapshot(
    condition,
    (snapShot) => {
      const dataList = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(dataList);
      setData(dataList.reverse());
    },
    (error) => {
      console.log(error);
    }
  );
  return () => unsubscribe();
};

const handleUpdateDownloadLimit = async (
  transId,
  enquiryLimit,
  totalDownload
) => {
  try {
    const limitOff = enquiryLimit < totalDownload ? "yes" : "no";
    await updateDoc(
      doc(db, "users", import.meta.env.VITE_PROMISE_NUMBER, "letters", transId),
      { enquiryLimit: enquiryLimit, limitoff: limitOff }
    );

    return {
      message: "Download Limit Updated Successfully.",
      limitOff,
      type: "success",
    };
  } catch (error) {
    console.log(error);
  }
};

const handleSendMessage = async (userName, phoneNumber, desc) => {
  const transId = phoneNumber + "_" + formatTimestamp(new Date()).toString();
  try {
    await setDoc(
      doc(
        db,
        "users",
        import.meta.env.VITE_PROMISE_NUMBER,
        "agents",
        phoneNumber,
        "transection",
        transId
      ),
      {
        Amount: "0",
        SenderMobileNo: phoneNumber,
        Remark: "",
        Description: desc.trim(),
        Date: formatDate(new Date()).toString(),
        Time: formatTime(new Date()).toString(),
        TimeStamp: formatTimestamp(new Date()).toString(),
        Status: "message",
        Attachment1: "",
        Attachment2: "",
        Attachment3: "",
        Attachment4: "",
        SenderName: userName,
        TransactionId: transId,
        TransactionType: "Debit",
      }
    );
    // console.log("Message sent successfully!");
    return { message: "Message sent successfully!", type: "success" };
  } catch (error) {
    console.log(error);
  }
};

const handleCreateNewUser = async (phoneNumber) => {
  try {
    const userIdDocRef = doc(db, "LatestUserId", "UserId");
    const querySnapshot = await getDoc(userIdDocRef);
    if (!querySnapshot.exists()) {
      return { message: "Error while creating new user..", type: "error" };
    }
    const updateLatestUserId = (
      Number(querySnapshot.data()?.UserId) + 1
    ).toString();
    // formating date and time before adding to database
    const currentDate = (date) => {
      const options = { day: "2-digit", month: "short", year: "numeric" };
      const day = date.toLocaleString("en-GB", { day: "2-digit" });
      const month = date.toLocaleString("en-GB", { month: "short" });
      const year = date.getFullYear();

      return `${day} ${month}, ${year}`;
    };

    // create user
    await setDoc(doc(db, "users", `+91${phoneNumber}`), {
      AddressLat: "",
      AddressLng: "",
      UserAddress: "",
      UserName: "anonymous",
      UserPhoneNumber: `+91${phoneNumber}`,
      UsesBusinessName: "",
      UserMessageToken: "",
      UserStatus: "active",
      RegistrationDate: currentDate(new Date()),
      TimeStamp: formatTimestamp(new Date()),
      UserId: updateLatestUserId,
      UserProfileImageUri: "",
      UserPenCardImageUri: "",
      UserAadharFrontImageUri: "",
      UserAadharBackImageUri: "",
      UserVerify: "no",
      ProfileUpdateRequest: "no",
      ClientUser: "yes",
      ccp: "91",
    });

    // update the latestUserId after adding new user
    await updateDoc(doc(db, "LatestUserId", "UserId"), {
      UserId: updateLatestUserId,
    });
    return {
      message: "user created successfully",
      type: "success",
    };
  } catch (error) {
    return { message: error.message, type: "error" };
  }
};

export {
  fetchAgentData,
  handleUpdateUserProfile,
  handleUploadAppImage,
  handleFetchApplicationPresent,
  handleFetchApplicationByLink,
  handleCreateNewAd,
  handleCreateAgent,
  handleFetchApplication,
  handleFetchApplicationMoreInfo,
  handleRealTimeTransactions,
  handleUpdateDownloadLimit,
  handleSendMessage,
  handleCreateNewUser,
};
