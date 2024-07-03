import { goto } from "$app/navigation"
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

export const logoutUser = () => {
  auth.signOut()
  goto("/")
}



export const getDataFromDB = async (uid) => {

  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {}
  }
}