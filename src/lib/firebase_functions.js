import { goto } from "$app/navigation";
import { doc, getDoc, query, collection, getDocs, addDoc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase";
import { getBasicData } from "../lib/helper_functions";

export const logoutUser = () => {
  auth.signOut();
  goto("/");
};

export const getDataFromDB = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {};
  }
};

export const findFoodInFoods = async (uid, food) => {

}

export const findMealsInDates = async (uid, meal, date) => {
  const foodArray = [];
  const q = query(collection(db, "users", uid, "dates", date, meal));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    foodArray.push(doc.data());
  });

  return foodArray
}

export const addNewFoodToFoods = async (data, uid, meal) => {
  const {
    name,
    calories,
    protein,
    fat,
    carbs,
    quantity,
  } = data

  return await setDoc(doc(db, "users", uid, "foods", name.toLowerCase()), {
    name: name.toLowerCase(),
    calories,
    protein,
    fat,
    carbs,
    quantity,
    meal: meal,
    uid: uid
  })
}

export const addNewFoodToDatesManual = async (data, uid, meal, date) => {
  console.log("adding new food")
  console.log(uid)

  const {
    name,
    calories,
    protein,
    fat,
    carbs,
    quantity,
  } = data
  console.log(name, calories, protein, fat, carbs, quantity);
  return await setDoc(doc(db, "users", uid, "dates", date, meal, name.toLowerCase()), {
    name: name.toLowerCase(),
    calories,
    protein,
    fat,
    carbs,
    quantity,
    meal: meal,
    uid: uid
  });
}