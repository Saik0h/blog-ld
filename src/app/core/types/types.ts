export type LoginPayload = { username: string; password: string };
export type Tokens = { accessToken: string; refreshToken: string }
export type RegisterPayload = {firstname: string, lastname: string, username: string, password: string}
export type User = { id: string, firstname: string, lastname: string, username: string, role: string }