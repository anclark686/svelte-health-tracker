import { goto } from "$app/navigation";
import {
  doc,
  getDoc,
  query,
  collection,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  increment,
  orderBy
} from "firebase/firestore";

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

// gets the doc stuff that isn't in a folder
export const getDateInfo = async (uid, date) => {
  const docRef = doc(db, "users", uid, "dates", date);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return {};
  }
};

export const getHistoricalData = async (uid) => {
  const querySnapshot = await getDocs(collection(db, "users", uid, "dates"));

  const data = {};

  querySnapshot.forEach((doc) => {
    data[doc.id] = doc.data();
  });

  return data;
};

// food stuff
export const getAllFoodsInFoods = async (uid) => {
  const foodObj = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  };
  const q = query(collection(db, "users", uid, "foods"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    foodObj[doc.data().meal].push(doc.data());
  });

  return foodObj;
};

export const findMealsInDates = async (uid, meal, date) => {
  const foodArray = [];
  const q = query(collection(db, "users", uid, "dates", date, meal));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    foodArray.push(doc.data());
  });

  return foodArray;
};

export const addOrEditFoodInFoods = async (data, uid, meal) => {
  const { name, calories, protein, fat, carbs, quantity } = data;

  return await setDoc(doc(db, "users", uid, "foods", name.toLowerCase()), {
    name: name.toLowerCase(),
    calories,
    protein,
    fat,
    carbs,
    quantity,
    meal: meal,
    uid: uid,
  });
};

export const addOrEditFoodInDates = async (data, uid, meal, date) => {
  const { name, calories, protein, fat, carbs, quantity } = data;

  return await setDoc(
    doc(db, "users", uid, "dates", date, meal, name.toLowerCase()),
    {
      name: name.toLowerCase(),
      calories,
      protein,
      fat,
      carbs,
      quantity,
      meal: meal,
      uid: uid,
    },
  );
};

export const deleteFoodFromDates = async (uid, food, date) => {
  const docRef = doc(
    db,
    "users",
    uid,
    "dates",
    date,
    food.meal,
    food.name.toLowerCase(),
  );

  await deleteDoc(docRef);
};

export const deleteFoodFromFoods = async (uid, food) => {
  const docRef = doc(db, "users", uid, "foods", food.name.toLowerCase());

  await deleteDoc(docRef);
};

export const changeQuantityInDates = async (uid, food, date, quantity) => {
  const docRef = doc(
    db,
    "users",
    uid,
    "dates",
    date,
    food.meal,
    food.name.toLowerCase(),
  );

  await setDoc(docRef, {
    ...food,
    quantity,
  });
};

// weight stuff
export const getHistoricalWeightData = async (uid) => {
  const data = await getHistoricalData(uid);

  const weightInfo = {};

  for (const date in data) {
    const { weight, weightInKg } = data[date];
    weightInfo[date] = { weight, weightInKg };
  }

  return weightInfo;
};

export const getPreviousWeightData = async (uid) => {
  const response = await getDataFromDB(uid).then((data) => {
    const dataObj = {};

    dataObj.currWeight = data.currWeight;
    dataObj.currWeightInKg = data.currWeightInKg;
    dataObj.lowestWeight = data.lowestWeight;
    dataObj.lowestWeightInKg = data.lowestWeightInKg;
    dataObj.highestWeight = data.highestWeight;
    dataObj.highestWeightInKg = data.highestWeightInKg;
    dataObj.initialWeight = data.initialWeight;
    dataObj.initialWeightInKg = data.initialWeightInKg;
    dataObj.previousWeight = data.previousWeight;
    dataObj.previousWeightInKg = data.previousWeightInKg;
    dataObj.goalWeight = data.goalWeight;
    dataObj.goalWeightInKg = data.goalWeightInKg;
    dataObj.weightGoals = data.weightGoals;

    return dataObj;
  });

  return response;
};

export const addWeightToDates = async (uid, weight, date) => {
  const weightInKg = convertWeightToKg(weight);

  const docRef = doc(db, "users", uid, "dates", date);
  await getDateInfo(uid, date).then(async (data) => {
    if (Object.keys(data).length === 0) {
      await setDoc(docRef, {
        weight,
        weightInKg,
      });
    } else {
      await updateDoc(docRef, {
        weight,
        weightInKg,
      });
    }
  });
};

export const addWeightToMainDetails = async (uid, weight) => {
  const weightInKg = convertWeightToKg(weight);

  const response = await getPreviousWeightData(uid).then(async (data) => {
    let {
      currWeight,
      currWeightInKg,
      lowestWeight,
      lowestWeightInKg,
      highestWeight,
      highestWeightInKg,
    } = data;

    const docRef = doc(db, "users", uid);

    if (weight < lowestWeight) {
      lowestWeight = weight;
      lowestWeightInKg = weightInKg;
    } else if (weight > highestWeight) {
      highestWeight = weight;
      highestWeightInKg = weightInKg;
    }

    await updateDoc(docRef, {
      currWeight: weight,
      currWeightInKg: weightInKg,
      previousWeight: currWeight,
      previousWeightInKg: currWeightInKg,
      lowestWeight: lowestWeight,
      lowestWeightInKg: lowestWeightInKg,
      highestWeight: highestWeight,
      highestWeightInKg: highestWeightInKg,
    });
  });
};

// water stuff
export const getHistoricalWaterData = async (uid) => {
  const data = await getHistoricalData(uid);

  const waterInfo = {};

  for (const date in data) {
    const { waterInOunces, waterInCups } = data[date];
    waterInfo[date] = { waterInOunces, waterInCups };
  }

  return waterInfo;
};

export const addWaterToDates = async (uid, waterData, date) => {
  const docRef = doc(db, "users", uid, "dates", date);

  const { ounces, cups } = waterData;

  await getDateInfo(uid, date).then(async (data) => {
    if (Object.keys(data).length === 0) {
      await setDoc(docRef, {
        waterInOunces: parseInt(ounces),
        waterInCups: parseFloat(cups),
      });
    } else {
      if (data.waterInOunces && data.waterInCups) {
        await updateDoc(docRef, {
          waterInOunces: increment(parseInt(ounces)),
          waterInCups: increment(parseFloat(cups)),
        });
      } else {
        await updateDoc(docRef, {
          waterInOunces: parseInt(ounces),
          waterInCups: parseFloat(cups),
        });
      }
    }
  });
};

export const getWaterByDate = async (uid, date) => {
  const data = await getDateInfo(uid, date);

  return {
    waterInOunces: data.waterInOunces,
    waterInCups: data.waterInCups,
  };
};

// medication stuff
export const getMedsFromDB = async (uid) => {
  const data = []

  const q = query(collection(db, "users", uid, "meds"), orderBy("name"));

  const medSnapshot = await getDocs(q);

  medSnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    data.push({
      ...doc.data(),
      id: doc.id
    })
  });

  return data
}

export const addMedToUserDB = async (uid, med) => {
  const medRef = doc(db, "users", uid, "meds", med.name);
  // need to make sure it doesn't exist already
  await getMedsFromDB(uid).then(async (data) => {
    if (!Object.keys(data).includes(med.name)) {
      await setDoc(medRef, med);
    } else {
      console.log("med already exists")
    }
  })
}

export const addMedToDates = async (uid, med, date, time) => {
  await setDoc(doc(db, "users", uid, "dates", date, `${time}Meds`, med.name), med)
}

export const addMedsToDates = async (uid, meds, date, time) => {
  const medData = []
  console.log("infirebase", meds)

  Object.keys(meds).forEach(async (medName) => {
    const medInfo = { ...meds[medName], id: meds[medName].name, taken: false, time: time }

    medData.push(medInfo)

    addMedToDates(uid, medInfo, date, time)
  })

  return medData
}

export const getMedDateInfo = async (uid, date, meds, time) => {
  let medData = []

  await getDocs(collection(db, "users", uid, "dates", date, `${time}Meds`)).then(async (data) => {
    if (data.empty) {
      medData = await addMedsToDates(uid, meds, date, time)
    } else {
      data.forEach((doc) => {
        medData.push({ ...doc.data(), id: doc.id })
      });
    }
  })

  return medData
};

export const toggleMedInDb = async (uid, med, date, time) => {
  const medRef = doc(db, "users", uid, "dates", date, `${time}Meds`, med.name);

  await updateDoc(medRef, { taken: med.taken })
}

export const deleteMedInDb = async (uid, med) => {
  const medRef = doc(db, "users", uid, "meds", med.name);
  await deleteDoc(medRef)
}


export const editMedInDb = async (uid, med, prevMed, date) => {
  if (med.name !== prevMed.name) {
    await deleteMedInDb(uid, prevMed)

    await addMedToUserDB(uid, med)

    med.times.forEach(async (time) => {
      console.log("you here?", time)
      await addMedToDates(uid, med, date, time)
    })
    return
  }

  const medForMeds = { ...med }

  delete medForMeds.taken

  const medRef = doc(db, "users", uid, "meds", med.name);

  await updateDoc(medRef, medForMeds).then(async () => {
    const medData = []

    const medForDates = { ...med }

    medForDates.times.forEach((time) => {
      medData.push({ ...medForDates, time: time })
    })

    medData.forEach(async (m) => {
      const medDateRef = doc(db, "users", uid, "dates", date, `${m.time}Meds`, med.name);

      await updateDoc(medDateRef, m)
    })
  })
}