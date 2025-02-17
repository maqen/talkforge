import { db } from "./db";
import { InsertUser, users } from "./schema";
import bcrypt from "bcrypt";

const ROUNDS = 10;

async function seedUsers() {
  try {
    const newUsers: InsertUser[] = [
      {
        username: "mrtest1",
        password: await bcrypt.hash("testtest", ROUNDS),
      },
      {
        username: "testguy2",
        password: await bcrypt.hash("testtest", ROUNDS),
      },
    ];

    await db.insert(users).values(newUsers);
    console.log("✅ Added users");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  process.exit(0);
}

seedUsers();
