import { pool } from "../../db";

const createProfileIntoDB = async (payload: any) => {
  // console.log(payload)
  const { user_id, bio, address, phone, gender } = payload;

  //   first check if the user is exists
  const user = await pool.query(
    `
    SELECT * FROM "user" WHERE id=$1
    `,
    [user_id],
  );

  if (user.rows.length === 0) {
    throw new Error("User not found");
  }

  const result = await pool.query(
    `
      INSERT INTO profiles(user_id, bio, address, phone, gender) VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [user_id, bio, address, phone, gender],
  );

  return result;
};

const getAllUserProfileFromDB = async () => {
  const result = await pool.query(`
    SELECT * FROM profiles
    `);

  return result;
};

const getSingleUserProfileFromDB = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM profiles WHERE id=$1
    `,
    [id],
  );

  return result;
};

const updateUserProfileIntoDB = async (id: string, payload: any) => {
  const { bio, address, phone, gender } = payload;
  console.log(bio, "Bio");

  const result = await pool.query(
    `
    UPDATE profiles
    SET 
    bio =COALESCE($1, bio), 
    address=COALESCE($2, address), 
    phone=COALESCE($3, phone), 
    gender=COALESCE($4, gender)

    WHERE id=$5 RETURNING *
    `,
    [bio, address, phone, gender, id],
  );

  return result;
};

const deleteUserProfileFromDB = async (id: string) => {
  const result = await pool.query(
    `
      DELETE FROM profiles WHERE id=$1
       RETURNING *
    `,
    [id],
  );

  return result;
};

export const ProfileService = {
  createProfileIntoDB,
  getAllUserProfileFromDB,
  getSingleUserProfileFromDB,
  updateUserProfileIntoDB,
  deleteUserProfileFromDB,
};
