export {};

export type Roles = "admin" | "candidate" | "company";
/*export enum Role {
  ADMIN = "admin",
  COMPANY = "company",
  CANDIDATE = "candidate",
}*/

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
