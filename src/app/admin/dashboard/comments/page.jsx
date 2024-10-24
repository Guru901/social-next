import { connect } from "@/dbconfig/connect";
import Comments from "@/models/commentModel";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";

const AllComments = async () => {
  await connect();
  const comments = await Comments.find({});

  if (!comments) return;

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex flex-col items-center">
        {comments?.map((comment, index) => (
          <Link key={comment._id || index} href={`/post/${comment.post}`}>
            <div className="flex border-solid border-white p-2 gap-4 items-center">
              <div className="flex items-start">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  {comment.avatar ? (
                    <img
                      src={comment.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full ">
                      <FaUser size={60} />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-xl w-[70vw] break-words">
                  {comment.user ? comment.user : "Ni Batu :)"}
                </h1>
                <h1 className="w-[70vw] break-words font-semibold ">
                  {comment.text}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllComments;
