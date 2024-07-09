export const convertWeightToKg = (weight) => {
  weight = parseFloat(weight);
  return (weight / 2.205).toFixed(2).toString();
};

export const convertHeightToCm = (height) => {
  const [feet, inches] = height.replace('"', "").split("'");
  height = parseFloat(feet) * 12 + parseFloat(inches);
  console.log(feet, inches, height);
  return (height * 2.54).toFixed(2).toString();
};

export const convertOzToCups = (oz) => {
  return (Math.round(parseInt(oz) / 8)).toString()
}

export const convertCupsToOz = (cups) => {
  return (parseInt(cups) * 8).toString()
}


export const getBasicData = (e) => {
  const formData = new FormData(e.target);
  const data = {};

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
    data[key] = value.toString();
  }

  return data;
};

export const capitalize = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export const getScoreDifferenceAndLeft = (weightData) => {
  const weightGoal = weightData.weightGoals

  const current = weightData.currWeight
  const goal = weightData.goalWeight
  const initial = weightData.initialWeight

  let score = ""
  let difference = ""
  let left = ""

  if (weightGoal === "Maintain Weight") {
    if (initial === current && current === goal) {
      // they've maintained weight and hit their goal
      score = "100%"
      difference = "0 lbs"
      left = "0 lbs"
    } else if (current > initial) {
      // they've gained weight
      score = `${Math.round((goal / current) * 100)}%`
      difference = `+${current - initial} lbs`
      left = `${current - goal} lbs`
    } else if (current < initial) {
      // they've lost weight
      score = `${Math.round((current / goal) * 100)}%`
      difference = `-${initial - current} lbs`
      left = `${goal - initial} lbs`
    }
  } else if (weightGoal.includes("Loss")) {
    if (current === initial) {
      // they've maintained weight
      score = `${(Math.round((goal / current) * 100))}%`
      difference = "0 lbs"
      left = `${initial - goal} lbs`
    } else if (goal === current || goal > current) {
      // they've hit their goal
      score = "100%"
      difference = `-${initial - goal} lbs`
      left = "0 lbs"
    } else if (current > initial) {
      // they've gained weight when they should have lost
      score = `${Math.round((goal / current) * 100)}%`
      difference = `+${current - initial} lbs`
      left = `${current - goal} lbs`
    } else {
      // they've lost weight when they should've
      score = `${Math.round((goal / current) * 100)}%`
      difference = `-${initial - current} lbs`
      left = `${current - goal} lbs`
    }
  } else {
    if (current === initial) {
      // they've maintained weight
      score = `${(Math.round((current / goal) * 100))}%`
      difference = "0 lbs"
      left = `${goal - initial} lbs`
    } else if (goal === current || goal > current) {
      // they've hit their goal
      score = "100%"
      difference = `+${goal - initial} lbs`
      left = "0 lbs"
    } else if (current > initial) {
      // they've gained weight when they should've
      score = `${Math.round((current / goal) * 100)}%`
      difference = `+${current - initial} lbs`
      left = `${goal - current} lbs`
    } else {
      // they've lost weight when they should've gained
      score = `${Math.round((current / goal) * 100)}%`
      difference = `-${initial - current} lbs`
      left = `${goal - current} lbs`
    }
  }

  return {score, difference, left}
}