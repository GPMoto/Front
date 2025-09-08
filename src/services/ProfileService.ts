import { useAuth } from "@/context/AuthContext";
import ProfileFetcher from "@/fetcher/ProfileFetcher";
import { ProfileResponse } from "@/model/User";
import { UserData } from "@/model/User";

class ProfileService {
  private profileFetcher: ProfileFetcher;

  constructor(token: string) {
    this.profileFetcher = new ProfileFetcher(token);
  }

  async get(token: string): Promise<ProfileResponse> {
    console.log("Fazendo requisição para o profileFetcher()")
    const response = await this.profileFetcher.get();
    console.log("Objeto resposta para o profile service:")
    console.log(response)
    return response
  }

 
}

export default ProfileService;
