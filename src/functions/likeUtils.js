import axios from "axios";

export const handleLike = async (id, user, refetch) => {
  try {
    await axios.put("/api/likes/like", {
      id: id,
      user: user._id,
    });
    refetch();
  } catch (error) {
    console.log(error);
    return "An error occurred. Try logging in again.";
  }
};

export const handleUnLike = async (id, user, refetch) => {
  try {
    await axios.put("/api/likes/unlike", {
      id: id,
      user: user._id,
    });
    refetch();
  } catch (error) {
    console.log(error);
    return "An error occurred. Try logging in again.";
  }
};

export const handleDisLike = async (id, user, refetch) => {
  try {
    await axios.put("/api/likes/dislike", {
      id: id,
      user: user._id,
    });

    refetch();
  } catch (error) {
    console.log(error);
    return "An error occurred. Try logging in again.";
  }
};

export const handleDisUnlike = async (id, user, refetch) => {
  try {
    await axios.put("/api/likes/disunlike", {
      id: id,
      user: user._id,
    });

    refetch();
  } catch (error) {
    console.log(error);
    return "An error occurred. Try logging in again.";
  }
};
