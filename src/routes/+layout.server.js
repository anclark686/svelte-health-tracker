export function load({ cookies }) {
  let darkmode = false;
  let darkmodeInCookie = false;

  if (cookies.get("darkmode")) {
    darkmode = cookies.get("darkmode") === "dark" ? true : false;
    darkmodeInCookie = true;
  }

  return {
    darkmode,
    darkmodeInCookie,
  };
}
