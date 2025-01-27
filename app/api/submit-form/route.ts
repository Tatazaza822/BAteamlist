import pool from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, skill1, skill2, skill3, skill4, star, level, e1, e2, e3}: {name: string, skill1: string, skill2: string, skill3: string, skill4: string, star: string, level: string, e1: string, e2: string, e3: string}= await req.json();
 
    // Check if all fields are provided
    if (!name || !skill1 || !skill2 || !skill3 || !skill4 || !star || !level || !e1 || !e2 || !e3) {
      return NextResponse.json(
        { success: false, message: 'Missing fields' },
        { status: 400 }
      );
    }
  
 
      // Insert data into the database
const query = 'INSERT INTO student (name, skill1, skill2, skill3, skill4 ,star, level, e1, e2, e3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
const values = [name, skill1, skill2, skill3, skill4 ,star, level, e1, e2, e3];

      // Execute the query using the connection pool
const [result] = await pool.execute(query, values);


return NextResponse.json(
  { success: true, message: 'Data inserted successfully!' },
  { status: 200 }
);
} catch (error) {
console.error('Error inserting data:', error);
return NextResponse.json(
  { success: false, message: 'Error inserting data' },
  { status: 500 }
);
}
}