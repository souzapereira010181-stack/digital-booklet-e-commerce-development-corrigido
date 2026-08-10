import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readStore, writeStore, nextId } from "@/db/local-store";
import { createAdminSession, SESSION_COOKIE } from "@/lib/admin-session";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "E-mail e senha são obrigatórios" }, { status: 400 });
    }

    const normalized = String(email).toLowerCase().trim();
    const store = await readStore();

    // Conta administrativa de demonstração preservada para o projeto.
    const isDemoAdmin =
  normalized === "souzapereira010181@gmail.com" &&
  password === "010181k";
    let user = store.users.find((u) => u.email.toLowerCase() === normalized);

    if (isDemoAdmin) {
      if (!user) {
        user = {
          id: nextId(store.users),
          name: "Kleber Admin",
          email: normalized,
          password: await bcrypt.hash(password, 10),
          role: "admin",
        };
        store.users.push(user);
      } else {
        user.name = user.name || "Kleber Admin";
        user.role = "admin";
        user.password = await bcrypt.hash(password, 10);
      }
      await writeStore(store);
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    }

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        purchasedIds: [],
      },
    });

    response.cookies.set(SESSION_COOKIE, user.role === "admin" ? createAdminSession(user.email) : "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro interno" },
      { status: 500 },
    );
  }
}
