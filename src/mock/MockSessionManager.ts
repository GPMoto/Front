import { UserData } from "@/model/User";

class MockSessionManager {
  private static instance: MockSessionManager;
  private currentToken: string | null = null;
  private currentUser: UserData | null = null;
  private sessions: Map<string, UserData> = new Map();

  private constructor() {}

  static getInstance(): MockSessionManager {
    if (!MockSessionManager.instance) {
      MockSessionManager.instance = new MockSessionManager();
    }
    return MockSessionManager.instance;
  }

  setSession(token: string, user: UserData): void {
    this.currentToken = token;
    this.currentUser = user;
    this.sessions.set(token, user);
  }

  getUserByToken(token: string): UserData | null {
    const user = this.sessions.get(token);
    return user || null;
  }

  isValidToken(token: string): boolean {
    const isValid = this.sessions.has(token);
    return isValid;
  }

  clearSession(token?: string): void {
    if (token) {
      this.sessions.delete(token);
      if (this.currentToken === token) {
        this.currentToken = null;
        this.currentUser = null;
      }
    } else {
      this.sessions.clear();
      this.currentToken = null;
      this.currentUser = null;
    }
  }

  getCurrentUser(): UserData | null {
    return this.currentUser;
  }

  getCurrentToken(): string | null {
    return this.currentToken;
  }
}

export default MockSessionManager;
