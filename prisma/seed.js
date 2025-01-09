const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.createMany({
    data: [{ username: "user1" }, { username: "user2" }, { username: "user3" }],
  });

  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 5; j++) {
      await prisma.playlist.create({
        data: {
          name: `Playlist ${j} for User ${i}`,
          description: `Description for Playlist ${j}`,
          ownerId: i,
        },
      });
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
