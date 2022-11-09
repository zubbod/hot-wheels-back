export class Auth {
  static token(authHeader: string): string {
    try {
      return authHeader.split(' ')[1];
    } catch (e) {
      throw new Error(e);
    }
  }

  static bearer(authHeader: string): string {
    try {
      return authHeader.split(' ')[0];
    } catch (e) {
      throw new Error(e);
    }
  }
}
