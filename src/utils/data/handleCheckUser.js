import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const handleCheckUser = async (phone) => {
  try {
    if (!phone) return;
    const updatedNumber = phone.startsWith("+91") ? phone : `+91${phone}`;
    const docRef = doc(db, "users", updatedNumber);
    const docSnap = await getDoc(docRef);
    //checking whether the given number exists & whether user is a bussiness partner or not
    if (docSnap.exists()) {
      return { data: docSnap.data(), type: "success" };
    } else {
      return { message: "Phone Number not exist's", type: "error" };
    }
  } catch (error) {
    return { message: error.message };
  }
};

export default handleCheckUser;
