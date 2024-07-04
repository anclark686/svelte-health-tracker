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