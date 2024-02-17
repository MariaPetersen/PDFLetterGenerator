const { query } = require("./database");
import { IUser } from "../../interfaces/IUser";

exports.getOneUser = async (email: string) => {
  const getoneUserQuery =
    "SELECT user_id, email, password FROM users WHERE email = $1";
  try {
    const result = await query(getoneUserQuery, [email]);
    const user: Array<IUser> = result.rows;
    return user[0];
  } catch (e) {
    console.error(e + "Could not retrieve user");
  }
};

exports.getUserById = async (userId: string) => {
  const getUserByIdQuery =
    "SELECT user_id, email, password FROM users WHERE user_id = $1";
  try {
    const result = await query(getUserByIdQuery, [userId]);
    const user: Array<IUser> = result.rows;
    return user[0];
  } catch (e) {
    console.error(e + "Could not retrieve user");
  }
};

exports.createUser = async (email: string, hashedPassword: string) => {
  const createUserQuery =
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
  try {
    const result = await query(createUserQuery, [email, hashedPassword]);
    const user: Array<IUser> = result.rows;
    return user[0];
  } catch (e) {
    console.error(e + "Could not create user");
  }
};
