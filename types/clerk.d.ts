export {}

declare global {
  interface CustomJwtSessionClaims {
    public_metadata?: {
      role?: string
    }
  }
}