export const convertWeightToKg = (weight) => {
  weight = parseFloat(weight)
  return (weight / 2.205).toFixed(2).toString()
}

export const convertHeightToCm = (height) => {
  const [feet, inches] = height.replace("\"", "").split("'")
  height = parseFloat(feet) * 12 + parseFloat(inches)
  console.log(feet, inches, height)
  return (height * 2.54).toFixed(2).toString()
}