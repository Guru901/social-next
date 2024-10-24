import { getDateDifference } from "@/functions/getDate";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import Post from "@/models/postModel";
import Link from "next/link";
import VidPlayer from "@/Components/VidPlayer";
import Image from "next/image";
import { connect } from "@/dbconfig/connect";

const AllPosts = async () => {
  await connect();
  const posts = await Post.find();

  if (!posts) return;

  return (
    <div className="flex feedContainer flex-col justify-start gap-5 p-6 pb-16">
      {posts?.map((post) =>
        post.image ? (
          <div
            key={post._id}
            className="card max-w-96 bg-base-100 shadow-xl w-screen singlePost"
          >
            <>
              <figure>
                {post.image &&
                (post.image.endsWith(".mp4") || post.image.endsWith(".mkv")) ? (
                  <VidPlayer videoUrl={post.image} autoPlay={false} />
                ) : (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={256}
                    height={128}
                    className="w-full max-h-60 object-cover"
                  />
                )}
              </figure>
              <div className="card-body gap-1 p-4 flex-row justify-between">
                <div className="w-[14rem]">
                  <h2 className="card-title text-white font-bold">
                    Author - {post.username ? post.username : "User"}
                  </h2>
                  <h2 className="card-title">{post.title}</h2>
                  <p className="max-h-24 overflow-hidden">{post.body}</p>
                  <div className="flex gap-2 text-xl mt-4">
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                      <AiOutlineLike size={24} />

                      <h1>{post?.likes?.length}</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                      <AiOutlineDislike size={24} />
                      <h1>{post.dislikes?.length}</h1>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                  <Link href={`/post/${post._id}`}>
                    <button className="btn btn-neutral">See more</button>
                  </Link>
                  <div>
                    <h1 className="text-sm font-bold">
                      {getDateDifference(post?.createdAt)?.toLocaleString()}
                    </h1>
                  </div>
                </div>
              </div>
            </>
          </div>
        ) : (
          <div
            className="card max-w-96 w-[100vw] bg-base-100 shadow-xl singlePost"
            key={post._id}
          >
            <div className="card-body flex flex-col justify-between items-stretch p-4">
              <div className="flex flex-col gap-2">
                <h2 className="card-title text-white">
                  Author - {post.username ? post.username : "User"}
                </h2>
                <h2 className="card-title">{post.title}</h2>
                <div className="flex items-end">
                  <p className="max-h-24 overflow-hidden w-[17rem]">
                    {post.body}
                  </p>
                </div>
              </div>

              <div className="card-actions justify-between items-center">
                <div className="flex gap-2 text-xl mt-4">
                  <button>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex flex-col items-center justify-center">
                        <AiOutlineLike size={24} />

                        <h1>{post?.likes?.length}</h1>
                      </div>
                    </div>
                  </button>
                  <button>
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                      <AiOutlineDislike size={24} />
                      <h1>{post?.dislikes?.length}</h1>
                    </div>
                  </button>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                  <Link href={`/post/${post._id}`}>
                    <button className="btn btn-neutral">See more</button>
                  </Link>
                  <div>
                    <h1 className="text-sm font-bold">
                      {getDateDifference(post?.createdAt)?.toLocaleString()}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AllPosts;
