import { getDateDifference } from "@/functions/getDate";
import { Loader2 } from "lucide-react";
import { FaUser } from "react-icons/fa6";

export default function Comments({ comments, isCommentsLoading }) {
  return (
    <div className="w-[96vw] max-w-xl">
      {isCommentsLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        comments.map((comment, index) => (
          <div
            className="flex border-solid border-white p-2 gap-4 items-center justify-start"
            key={comment._id || index}
          >
            <div className="flex items-start">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                {comment.avatar ? (
                  <img
                    src={comment.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full">
                    <FaUser size={60} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between w-full">
                <h1 className="font-bold text-xl break-words">
                  {comment.user ? comment.user : "Ni Batu :)"}
                </h1>
                <h1 className="text-sm font-semibold">
                  {getDateDifference(comment?.createdAt)}
                </h1>
              </div>
              <h1 className="break-words">{comment.text}</h1>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
