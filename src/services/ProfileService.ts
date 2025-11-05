import { useAuth } from "@/context/AuthContext";
import ProfileFetcher from "@/fetcher/ProfileFetcher";
<<<<<<< HEAD
import { PushNotificationDto } from "@/model/dto/PushNotificationDTO";
import { Perfil } from "@/model/Perfil";
import { LanguagePreferenceResponse, ProfileResponse } from "@/model/User";
=======
import { Perfil } from "@/model/Perfil";
import { ProfileResponse } from "@/model/User";
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
import { UserData } from "@/model/User";

class ProfileService {
  private profileFetcher: ProfileFetcher;

  constructor(token: string | null) {
    this.profileFetcher = new ProfileFetcher(token);
  }

  async get(): Promise<UserData> {
    return await this.profileFetcher.get();
  }

<<<<<<< HEAD
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
=======
  async getPerfis() : Promise<Perfil[]> {
    return await this.profileFetcher.getPerfis();
  }

>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
}

export default ProfileService;
