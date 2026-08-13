import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

async function main() {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error(
      "ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD are required in .env.local",
    );
  }

  if (password.length < 10) {
    throw new Error("ADMIN_PASSWORD must be at least 10 characters long.");
  }

  const bcrypt = await import("bcryptjs");
  const { connectDB } = await import("../lib/db/connect");
  const { AdminUser } = await import("../models/AdminUser");

  await connectDB();

  const normalizedEmail = email.trim().toLowerCase();

  const existingAdmin = await AdminUser.findOne({
    email: normalizedEmail,
  });

  if (existingAdmin) {
    throw new Error(
      `An admin with ${normalizedEmail} already exists.`,
    );
  }

  const passwordHash = await bcrypt.default.hash(password, 12);

  await AdminUser.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: "ADMIN",
    active: true,
  });

  console.log(`Admin created successfully: ${normalizedEmail}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error: unknown) => {
    console.error(
      error instanceof Error
        ? error.message
        : "Failed to create admin.",
    );

    process.exit(1);
  });