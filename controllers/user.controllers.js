import tryCatch from "../middleware/tryCatch.js";

export const registerUser = tryCatch(async (req, res) => {
 
  const { name, email, password } = req.body;
  res.json({ name, email, password });
});
