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

  // Salvar sessão quando fizer login
  setSession(token: string, user: UserData): void {
    this.currentToken = token;
    this.currentUser = user;
    this.sessions.set(token, user);
    console.log(`📝 Mock Session: Token ${token} associado ao usuário ${user.nmUsuario}`);
  }

  // Buscar usuário pelo token
  getUserByToken(token: string): UserData | null {
    const user = this.sessions.get(token);
    console.log(`🔍 Mock Session: Buscando usuário para token ${token}`, user ? `✅ Encontrado: ${user.nmUsuario}` : '❌ Não encontrado');
    return user || null;
  }

  // Verificar se token é válido
  isValidToken(token: string): boolean {
    const isValid = this.sessions.has(token);
    console.log(`🔐 Mock Session: Token ${token} é ${isValid ? 'válido' : 'inválido'}`);
    return isValid;
  }

  // Limpar sessão (logout)
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
    console.log(`🗑️ Mock Session: Sessão limpa`);
  }

  // Getter para sessão atual
  getCurrentUser(): UserData | null {
    return this.currentUser;
  }

  getCurrentToken(): string | null {
    return this.currentToken;
  }
}

export default MockSessionManager;
