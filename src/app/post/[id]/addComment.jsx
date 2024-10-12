import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { emojiSvg } from "../emojiSVG";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import axios from "axios";

export default function AddComment({ refetch, postID }) {
  const { user } = useUserStore();

  const [form, setForm] = useState({});
  const [picker, setPicker] = useState(false);

  const inpRef = useRef();
  const pickerRef = useRef();

  const selectEmoji = (e) => {
    e.preventDefault();
    setPicker(!picker);
  };

  const mutation = useMutation({
    mutationKey: ["comment"],
    mutationFn: async (comment) => {
      await axios.post("/api/post/comment", {
        comment: comment,
        postID: postID,
        username: user?.username,
        avatar: user?.avatar ? user?.avatar : "",
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPicker(false);
      mutation.mutate(form.comment);
      setForm({ comment: "" });
      refetch();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setForm({
      ...form,
      comment: `${form.comment || ""}${emoji.native}`,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <label className="relative w-[69vw] max-w-xl input input-bordered flex items-center gap-2 justify-between">
          <input
            type="text"
            value={form.comment || ""}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            ref={inpRef.current}
            name="comment"
            className="w-[90%] bg-transparent"
            placeholder="Enter Your Comment.."
          />
          <button onClick={selectEmoji}>{emojiSvg}</button>
        </label>
        <button className="btn" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Please wait
            </>
          ) : (
            "Comment"
          )}
        </button>
      </form>

      <div>
        {picker && (
          <div className="absolute right-0" ref={pickerRef}>
            <Picker
              theme={"dark"}
              data={data}
              onEmojiSelect={handleEmojiSelect}
              maxFrequentRows={0}
            />
          </div>
        )}
      </div>
    </div>
  );
}
