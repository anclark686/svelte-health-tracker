import { goto } from "$app/navigation";
import { doc, getDoc, query, collection, getDocs, addDoc, setDoc, deleteDoc } from "firebase/firestore";

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
    return docSnap.data();
  } else {
    console.log("No such document!");
    return {};
  }
};

export const getAllFoodsInFoods = async (uid) => {
  const foodObj = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  }
  const q = query(collection(db, "users", uid, "foods"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    foodObj[doc.data().meal].push(doc.data());
  });

  return foodObj
}

export const findMealsInDates = async (uid, meal, date) => {
  const foodArray = [];
  const q = query(collection(db, "users", uid, "dates", date, meal));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    foodArray.push(doc.data());
  });

  return foodArray
}

export const addOrEditFoodInFoods = async (data, uid, meal) => {
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

export const addOrEditFoodInDates = async (data, uid, meal, date) => {
  const {
    name,
    calories,
    protein,
    fat,
    carbs,
    quantity,
  } = data

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

export const deleteFoodFromDates = async (uid, food, date) => {
  console.log(food)
  console.log(date)
  console.log(uid)
  const docRef = doc(db, "users", uid, "dates", date, food.meal, food.name.toLowerCase());

  await deleteDoc(docRef);
}

export const deleteFoodFromFoods = async (uid, food) => {
  const docRef = doc(db, "users", uid, "foods", food.name.toLowerCase());

  await deleteDoc(docRef);
}

export const changeQuantityInDates = async (uid, food, date, quantity) => {
  console.log(food)
  console.log(date)
  console.log(uid)
  console.log(quantity)
  const docRef = doc(db, "users", uid, "dates", date, food.meal, food.name.toLowerCase());

  await setDoc(docRef, {
    ...food,
    quantity
  });
}