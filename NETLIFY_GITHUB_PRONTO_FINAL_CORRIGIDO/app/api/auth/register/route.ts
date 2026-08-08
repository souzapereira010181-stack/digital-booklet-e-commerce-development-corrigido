import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readStore, writeStore, nextId } from "@/db/local-store";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
    }
    if (String(password).length < 6) {
      return NextResponse.json({ error: "Senha deve ter pelo menos 6 caracteres" }, { status: 400 });
    }

    const normalized = String(email).toLowerCase().trim();
    const store = await readStore();

    if (store.users.some((u) => u.email.toLowerCase() === normalized)) {
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 409 });
    }

    const user = {
      id: nextId(store.users),
      name: String(name).trim(),
      email: normalized,
      password: await bcrypt.hash(String(password), 10),
      role: "customer" as const,
    };

    store.users.push(user);
    await writeStore(store);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        purchasedIds: [],
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro interno" },
      { status: 500 },
    );
  }
}
