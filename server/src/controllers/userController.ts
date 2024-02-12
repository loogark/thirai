import jwt from "jsonwebtoken";
import User from "../models/users";
import env from "../utils/validateEnv";

// Create JWT token
const createToken = (_id: string) => {
  return jwt.sign({ _id }, env.JWT_SECRET_KEY, { expiresIn: "30 days" });
};

// login
export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await (User as any).login(email, password);
    const token = await createToken(user._id);
    res
      .status(200)
      .json({ userId: user._id, firstName: user.firstName, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// register
export const registerUser = async (req: any, res: any) => {
  const { firstName, email, password } = req.body;

  try {
    const user = await (User as any).register(firstName, email, password);
    const token = await createToken(user._id);
    res
      .status(200)
      .json({ userId: user._id, firstName: user.firstName, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
