import { goto } from "$app/navigation";
import { doc, getDoc, query, collection, getDocs, addDoc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";

import { auth, db } from "../firebase";
import { convertWeightToKg, getBasicData } from "../lib/helper_functions";

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

export const addWeightToDates = async (uid, weight, date) => {
  const weightInKg = convertWeightToKg(weight)

  const docRef = doc(db, "users", uid, "dates", date);
  await setDoc(docRef, {
    weight,
    weightInKg
  });
}

export const getPreviousWeightData = async (uid) => {
  const response = await getDataFromDB(uid).then(data => {
    console.log(data)
    const dataObj = {}
    dataObj.currWeight = data.currWeight
    dataObj.currWeightInKg = data.currWeightInKg
    dataObj.lowestWeight = data.lowestWeight
    dataObj.lowestWeightInKg = data.lowestWeightInKg
    dataObj.highestWeight = data.highestWeight
    dataObj.highestWeightInKg = data.highestWeightInKg
    dataObj.initialWeight = data.initialWeight
    dataObj.initialWeightInKg = data.initialWeightInKg
    dataObj.previousWeight = data.previousWeight
    dataObj.previousWeightInKg = data.previousWeightInKg
    dataObj.goalWeight = data.goalWeight
    dataObj.goalWeightInKg = data.goalWeightInKg
    dataObj.weightGoals = data.weightGoals

    console.log(dataObj)
    return dataObj
  })

  return response
}

export const addWeightToMainDetails = async (uid, weight) => {
  const weightInKg = convertWeightToKg(weight)

  const response = await getPreviousWeightData(uid).then(async (data) => {
    let { currWeight, currWeightInKg, lowestWeight, lowestWeightInKg, highestWeight, highestWeightInKg } = data
    console.log(data)
    const docRef = doc(db, "users", uid);

    if (weight < lowestWeight) {
      lowestWeight = weight
      lowestWeightInKg = weightInKg
    } else if (weight > highestWeight) {
      highestWeight = weight
      highestWeightInKg = weightInKg
    }

    await updateDoc(docRef, {
      currWeight: weight,
      currWeightInKg: weightInKg,
      previousWeight: currWeight,
      previousWeightInKg: currWeightInKg,
      lowestWeight: lowestWeight,
      lowestWeightInKg: lowestWeightInKg,
      highestWeight: highestWeight,
      highestWeightInKg: highestWeightInKg
    });
  })
}

export const getHistoricalWeightData = async (uid) => {
  const querySnapshot = await getDocs(collection(db,  "users", uid, "dates"));

  const weightInfo = {}

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    weightInfo[doc.id] = doc.data()
  });

  return weightInfo
}