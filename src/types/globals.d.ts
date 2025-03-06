export {};

export type Roles = "admin" | "candidate" | "company";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
