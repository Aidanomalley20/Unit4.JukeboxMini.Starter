const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { playlists: true },
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

app.post("/users/:id/playlists", async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { name, description } = req.body;

  try {
    const playlist = await prisma.playlist.create({
      data: { name, description, ownerId: userId },
    });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({ error: "Unable to create playlist" });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
