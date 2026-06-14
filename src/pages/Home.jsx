import HomeGuest from "./HomeGuest"
import HomeUser from "./HomeUser"

function Home() {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true"

  return isLoggedIn
    ? <HomeUser />
    : <HomeGuest />
}

export default Home