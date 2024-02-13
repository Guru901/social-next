import axios from "axios";

const getLoggedInUser = async () => {
  const { data } = await axios.post("/api/user/me");
  return data;
};

export default getLoggedInUser;
