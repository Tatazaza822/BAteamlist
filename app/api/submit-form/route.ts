import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate required fields
    const { name, Skill1, Skill2, Skill3, Skill4, Star, Level, E1, E2, E3 } = data;
    if (!name || !Skill1 || !Skill2 || !Skill3 || !Skill4 || !Star || !Level || !E1 || !E2 || !E3) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    // Insert data into the database using Prisma
    await prisma.student.create({
      data: { name, Skill1, Skill2, Skill3, Skill4, Star, Level, E1, E2, E3 },
    });

    return NextResponse.json(
      { success: true, message: "Student added successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json(
      { success: false, message: "Error inserting data" },
      { status: 500 }
    );
  }
}
