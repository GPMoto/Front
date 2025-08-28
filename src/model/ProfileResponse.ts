import { ErrorResponseApi } from "./ErrorResponseApi";
import { UserData } from "./UserLogin";

interface UserDataErrorResponse extends ErrorResponseApi {}

interface ProfileResponse {
  data: UserData | UserDataErrorResponse;
  status?: number;
  success: boolean;
  message?: string;
}

type ProfileData = ProfileResponse['data'];


export { ProfileResponse, UserDataErrorResponse, ProfileData };
