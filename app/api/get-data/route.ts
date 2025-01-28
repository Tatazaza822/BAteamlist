import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);

    const [rows] = await connection.execute('SELECT * FROM Student');
    await connection.end();

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch data', error: error.message }, { status: 500 });
  }
}
