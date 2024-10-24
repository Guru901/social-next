import axios from "axios";
import { redirect } from "next/navigation";

const getLoggedInUser = async () => {
  try {
    const { data } = await axios.post("/api/user/me");
    if (!data) {
      redirect("/login");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getLoggedInUser;
