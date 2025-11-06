import { useAuth } from "@/context/AuthContext";
import ProfileFetcher from "@/fetcher/ProfileFetcher";
import { PushNotificationDto } from "@/model/dto/PushNotificationDTO";
import { Perfil } from "@/model/Perfil";
import { LanguagePreferenceResponse, ProfileResponse } from "@/model/User";
import { UserData } from "@/model/User";

class ProfileService {
  private profileFetcher: ProfileFetcher;

  constructor(token: string | null) {
    this.profileFetcher = new ProfileFetcher(token);
  }

  async get(): Promise<UserData> {
    return await this.profileFetcher.get();
  }

  async getPerfis(): Promise<Perfil[]> {
    return await this.profileFetcher.getPerfis();
  }

  async saveLanguagePreference(
    lang: string,
  ): Promise<LanguagePreferenceResponse> {
    return await this.profileFetcher.saveLanguagePreference(lang);
  }

  async savePushToken(token: string): Promise<PushNotificationDto> {
    return await this.profileFetcher.savePushToken(token);
  }
}

export default ProfileService;
