const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const supabase = require("./supabaseClient");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) return res.json(error);

  res.json(data);
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id);

  if (error) return res.json(error);

  res.json(data);
});

app.get("/run-draw", (req, res) => {
  let drawNumbers = [];

  while (drawNumbers.length < 5) {
    const num = Math.floor(Math.random() * 45) + 1;

    if (!drawNumbers.includes(num)) {
      drawNumbers.push(num);
    }
  }

  res.json({
    message: "Draw generated successfully",
    drawNumbers
  });
});

app.get("/scores/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const { data, error } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user_id)
    .order("played_at", { ascending: false });

  if (error) return res.json(error);

  res.json(data);
});

app.get("/charities", async (req, res) => {
  const { data, error } = await supabase
    .from("charities")
    .select("*");

  if (error) return res.json(error);

  res.json(data);
});

app.get("/admin/users", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) return res.json(error);

  res.json(data);
});

app.get("/admin/scores", async (req, res) => {
  const { data, error } = await supabase
    .from("scores")
    .select("*");

  if (error) return res.json(error);

  res.json(data);
});

app.get("/admin/winners", (req, res) => {
  const winners = [
    {
      user: "Anuj",
      result: "4 Match Winner",
      status: "Pending"
    }
  ];

  res.json(winners);
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase.from("users").insert([
    {
      name,
      email,
      password: hashedPassword
    }
  ]);

  if (error) return res.json(error);

  res.json({
    message: "User created successfully",
    data
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (error || users.length === 0) {
    return res.json({ message: "User not found" });
  }

  const user = users[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token,
    user
  });
});

app.post("/add-score", async (req, res) => {
  const { user_id, score, played_at } = req.body;

  const { data: existingScores } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user_id)
    .order("played_at", { ascending: true });

  if (existingScores.length >= 5) {
    const oldestScore = existingScores[0];

    await supabase
      .from("scores")
      .delete()
      .eq("id", oldestScore.id);
  }

  const { data, error } = await supabase
    .from("scores")
    .insert([
      {
        user_id,
        score,
        played_at
      }
    ]);

  if (error) return res.json(error);

  res.json({
    message: "Score added successfully",
    data
  });
});

app.post("/select-charity", async (req, res) => {
  const { user_id, charity_id, charity_percentage } = req.body;

  const { data, error } = await supabase
    .from("users")
    .update({
      charity_id,
      charity_percentage
    })
    .eq("id", user_id);

  if (error) return res.json(error);

  res.json({
    message: "Charity selected successfully"
  });
});

app.post("/check-match", async (req, res) => {
  const { userScores, drawNumbers } = req.body;

  const matches = userScores.filter(score =>
    drawNumbers.includes(score)
  );

  let result = "No Prize";

  if (matches.length === 3) result = "3 Match Winner";
  if (matches.length === 4) result = "4 Match Winner";
  if (matches.length === 5) result = "5 Match Winner";

  res.json({
    matches,
    result
  });
});

app.post("/admin/payout", (req, res) => {
  res.json({
    message: "Payout marked completed"
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});