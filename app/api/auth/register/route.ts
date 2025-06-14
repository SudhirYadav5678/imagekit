import { NextRequest,NextResponse } from "next/server";
import { connectionToDatabase } from "@/lib/db";
import User from "@/model/User";

export async function POST(request: NextRequest) {
  const {email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  try {
    await connectionToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 }
      );
    }

    const newUser = await User.create({
      email,
      password,
    });


    return NextResponse.json({ message: "User registered successfully." }, { status: 201 });
    
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}