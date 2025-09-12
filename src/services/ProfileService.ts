import { useAuth } from "@/context/AuthContext";
import ProfileFetcher from "@/fetcher/ProfileFetcher";
import { Perfil } from "@/model/Perfil";
import { ProfileResponse } from "@/model/User";
import { UserData } from "@/model/User";

class ProfileService {
  private profileFetcher: ProfileFetcher;

  constructor(token: string | null) {
    this.profileFetcher = new ProfileFetcher(token);
  }

  async get(): Promise<UserData> {
    return await this.profileFetcher.get();
  }

  async getPerfis() : Promise<Perfil[]> {
    return await this.profileFetcher.getPerfis();
  }

}

export default ProfileService;
