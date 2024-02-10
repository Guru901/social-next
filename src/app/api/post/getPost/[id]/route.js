import { connect } from "@/dbconfig/connect";
import Post from "@/models/postModel";
export async function POST(request, response) {
  connect();

  const req = await request.json();

  const { postid } = req;

  const post = await Post.findById(postid);

  return Response.json(post);
}
