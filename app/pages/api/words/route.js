import connectMongoDB from "@/app/libs/mongodb";
import Word from "@/app/models/words";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { word, description } = await request.json();
  await connectMongoDB();

  await Word.create({ word, description });
  return NextResponse.json({ message: "Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const totalWords = await Word.find();
  return NextResponse.json({ totalWords });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Word.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
