import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { env } from "@/app/config/env.config";

const cookies = new Cookies();

interface JwtClaims {
  exp?: number;
}

const cookieOptions = () => ({
  path: "/",
  sameSite: "lax" as const,
  secure: env.SSL_ENABLED,
});

const expiryFromToken = (token: string): Date | undefined => {
  try {
    const { exp } = jwtDecode<JwtClaims>(token);
    return exp ? new Date(exp * 1000) : undefined;
  } catch {
    return undefined;
  }
};

export const getAccessToken = (): string | undefined => cookies.get(env.ACCESS_TOKEN_ALIAS);

export const getRefreshToken = (): string | undefined => cookies.get(env.REFRESH_TOKEN_ALIAS);

export const setTokens = (accessToken: string, refreshToken: string): void => {
  cookies.set(env.ACCESS_TOKEN_ALIAS, accessToken, {
    ...cookieOptions(),
    expires: expiryFromToken(accessToken),
  });
  cookies.set(env.REFRESH_TOKEN_ALIAS, refreshToken, {
    ...cookieOptions(),
    expires: expiryFromToken(refreshToken),
  });
};

export const clearTokens = (): void => {
  cookies.remove(env.ACCESS_TOKEN_ALIAS, { path: "/" });
  cookies.remove(env.REFRESH_TOKEN_ALIAS, { path: "/" });
};

export const hasSession = (): boolean => Boolean(getAccessToken());
