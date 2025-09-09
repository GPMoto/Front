import { useAuth } from "@/context/AuthContext";
import ProfileFetcher from "@/fetcher/ProfileFetcher";
import { ProfileResponse } from "@/model/User";
import { UserData } from "@/model/User";

class ProfileService {
  private profileFetcher: ProfileFetcher;

  constructor(token: string) {
    this.profileFetcher = new ProfileFetcher(token);
  }

  async get(): Promise<UserData> {
    return await this.profileFetcher.get();
  }

}

export default ProfileService;
