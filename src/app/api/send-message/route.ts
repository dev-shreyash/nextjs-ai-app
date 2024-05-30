import { dbConnect } from "@/lib/dbConnector";
import UserModel from "@/model/user.model";
import { Message } from "@/model/user.model";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content, amount } = await request.json();
  console.log(username);
  console.log(content.toString());
  console.log(amount); // Log the amount for debugging

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
    }

    if (!user.isAcceptingMessage) {
      return new Response(JSON.stringify({ success: false, message: 'User not accepting messages' }), { status: 402 });
    }

    const newMessage = { content, createdAt: new Date(), amount }; // Include the amount
    user.messages.push(newMessage as Message);
    await user.save();

    return new Response(JSON.stringify({ success: true, message: 'Message sent successfully' }), { status: 202 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: "Something went wrong while sending message" }), { status: 500 });
  }
}
