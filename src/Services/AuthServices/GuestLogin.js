import axios from "axios";
import { successToast } from "../../Utils/ToastUtils";
import { errorToast } from "../../Utils/ToastUtils/errorToast";

const guestModeHandler = async (
  e,
  setToken,
  setUserData,
  setIsAuthenticated
) => {
  e.preventDefault();
  try {
    const userData = await axios.post("/api/auth/login", {
      email: "hiteshverma@gmail.com",
      password: "hitesh123",
    });
    setToken(userData.data.encodedToken);
    setIsAuthenticated(true);
    setUserData(userData.data.foundUser);
    setIsAuthenticated(true);
    successToast(`Welcome back ${userData.data.foundUser.firstName}!`);
  } catch (error) {
    errorToast("You are not registered, please sign up");
  }
};

export { guestModeHandler };
