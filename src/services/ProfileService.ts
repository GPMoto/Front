import { useAuth } from "@/context/AuthContext";
import ProfileFetcher from "@/fetcher/ProfileFetcher";
import { ProfileResponse } from "@/model/ProfileResponse";
import { UserData } from "@/model/UserLogin";

class ProfileService {
  private profileFetcher: ProfileFetcher;

  constructor() {
    this.profileFetcher = new ProfileFetcher();
  }

  async get(token: string): Promise<ProfileResponse> {
    console.log("Fazendo requisição para o profileFetcher()")
    const response = await this.profileFetcher.get(token);
    console.log("Objeto resposta para o profile service:")
    console.log(response)
    return response
  }
}

export default ProfileService;
