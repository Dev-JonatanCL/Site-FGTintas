import { hash, compare } from "bcryptjs";
import { verifyToken, getTokenFromRequest, type TokenPayload } from "./jwt";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function getCurrentUser(request: Request): Promise<TokenPayload | null> {
  const token = await getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}

export async function requireAuth(
  request: Request,
  requiredRole?: "admin" | "professional"
): Promise<{ user: TokenPayload } | { error: string; status: number }> {
  const user = await getCurrentUser(request);

  if (!user) {
    return { error: "Nao autorizado", status: 401 };
  }

  if (requiredRole && user.role !== requiredRole) {
    return { error: "Acesso negado", status: 403 };
  }

  return { user };
}
