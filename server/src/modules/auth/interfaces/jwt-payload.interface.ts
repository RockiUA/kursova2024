export interface JwtPayload {
  sub: number;
  roles: string[];
}

export interface JwtPayloadWithRefreshToken extends JwtPayload {
  refreshToken: string;
}
