import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { ResultSetHeader } from 'mysql2'; // Import ResultSetHeader for correct typing

export async function PUT(req: Request) {
  try {
    const {
      id,
      name,
      Skill1,
      Skill2,
      Skill3,
      Skill4,
      Star,
      Level,
      E1,
      E2,
      E3,
    } = await req.json();

    // Validate input
    if (!id || !name || !Skill1 || !Skill2 || !Skill3 || !Skill4 || !Star || !Level || !E1 || !E2 || !E3) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Update query
    const query = `
      UPDATE Student
      SET name = ?, Skill1 = ?, Skill2 = ?, Skill3 = ?, Skill4 = ?, Star = ?, Level = ?, E1 = ?, E2 = ?, E3 = ?
      WHERE id = ?
    `;
    const values = [name, Skill1, Skill2, Skill3, Skill4, Star, Level, E1, E2, E3, id];

    // Use execute to run the query and cast the result
    const [result] = await pool.execute<ResultSetHeader>(query, values);

    // Check the affectedRows property
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Student not found or no changes made' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Student updated successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ message: 'Error updating student' }, { status: 500 });
  }
}
