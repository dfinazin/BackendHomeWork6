import { verifyToken } from "../helpers/token.js";
import { User } from "../models/User.js";

export const authenticated = async (req, res, next) => {
  try {
    const tockenData = verifyToken(req.cookies.tocken);
    const user = await User.findOne({ _id: tockenData.id });

    if (!user) {
      res.send({ error: "Autenticated user not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.clearCookie("tocken").redirect("/login");
  }
};
