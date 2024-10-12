import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

export const Options = ({ post, setPost }) => {
  const { user } = useUserStore();
  const router = useRouter();

  const deletePost = async () => {
    const { data } = await axios.post("/api/post/delete", {
      id: post._id,
    });

    if (data.success) {
      router.push("/feed");
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.put("/api/likes/like", {
        id: id,
        user: user?._id,
      });
      setPost((prevPost) => ({
        ...prevPost,
        likes: [...(prevPost?.likes || []), user?._id],
      }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnLike = async (id) => {
    try {
      await axios.put("/api/likes/unlike", {
        id: id,
        user: user?._id,
      });
      setPost((prevPost) => ({
        ...prevPost,
        likes: prevPost?.likes?.filter((like) => like !== user?._id),
      }));
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleDisLike = async (id) => {
    try {
      await axios.put("/api/likes/dislike", {
        id: id,
        user: user?._id,
      });
      setPost((prevPost) => ({
        ...prevPost,
        dislikes: [...(prevPost?.dislikes || []), user?._id],
      }));
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  const handleDisUnlike = async (id) => {
    try {
      await axios.put("/api/likes/disunlike", {
        id: id,
        user: user?._id,
      });
      setPost((prevPost) => ({
        ...prevPost,
        dislikes: prevPost?.dislikes?.filter(
          (dislike) => dislike !== user?._id
        ),
      }));
    } catch (error) {
      console.error("Error removing dislike from post:", error);
    }
  };

  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex gap-4  p-2 rounded-xl">
      <div className="flex items-center gap-1">
        {user && post?.likes?.includes(user?._id) ? (
          <div className="flex items-center justify-center gap-1">
            <AiFillLike
              size={28}
              onClick={() => handleUnLike(post._id)}
              className="cursor-pointer"
            />
            <h1 className="text-xl">{post?.likes?.length}</h1>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1">
            <AiOutlineLike
              size={28}
              onClick={() => handleLike(post._id)}
              className="cursor-pointer"
            />
            <h1 className="text-xl">{post?.likes?.length}</h1>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1  mt-1">
        {user && post?.dislikes?.includes(user?._id) ? (
          <div className="flex items-center justify-center gap-2">
            <AiFillDislike
              size={28}
              onClick={() => handleDisUnlike(post._id)}
              className="cursor-pointer"
            />
            <h1 className="text-xl">{post?.dislikes?.length}</h1>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <AiOutlineDislike
              size={28}
              onClick={() => handleDisLike(post._id)}
              className="cursor-pointer"
            />
            <h1 className="text-xl">{post?.dislikes?.length}</h1>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          className="btn rounded-lg flex items-center justify-center h-10 py-0 min-h-10"
          onClick={copyUrlToClipboard}
        >
          Share
        </button>
        {post?.user === user?._id && (
          <div>
            <button
              className="btn min-h-10 h-10"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Delete Post
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <p className="py-4">
                  Are you sure you want to delete this post
                </p>
                <div className="modal-action flex">
                  <button className="btn" onClick={deletePost}>
                    Yes
                  </button>
                  <form method="dialog">
                    <button className="btn">No</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        )}
      </div>
    </div>
  );
};
