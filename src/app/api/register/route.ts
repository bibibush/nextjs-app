import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, name, password } = body;
  const hashedPassword = bcrypt;
}
