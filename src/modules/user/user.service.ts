import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO "user"(name, email, password, age) VALUES($1, $2, $3, $4)  RETURNING *
    `,
    [name, email, hashedPassword, age],
  );

  delete result.rows[0].password;

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await pool.query(`
      SELECT * FROM "user"
      `);

  result.rows.forEach((user) => {
    delete user.password;
  });

  return result;
};

const getSingleUserFromDB = async (id: number) => {
  const result = await pool.query(
    `
      SELECT * FROM "user" WHERE id=$1
      `,
    [id],
  );

  delete result.rows[0].password;

  return result;
};

const updateUserIntoDB = async (id: number, payload: Partial<IUser>) => {
  const { name, password, age, is_active } = payload;
  const result = await pool.query(
    `
    UPDATE "user" 
    SET 
    name =COALESCE($1, name), 
    password=COALESCE($2, password), 
    age=COALESCE($3, age), 
    is_active=COALESCE($4, is_active)

    WHERE id=$5 RETURNING *
    `,
    [name, password, age, is_active, id],
  );

  delete result.rows[0].password;

  return result;
};

const deleteUserFromBD = async (id: number) => {
  const result = await pool.query(
    `
      DELETE FROM "user" WHERE id=$1
      RETURNING *
      `,
    [id],
  );

  delete result.rows[0].password;

  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromBD,
};
