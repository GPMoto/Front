import IdentificadorFetcher from "@/fetcher/IdentificadorFetcher";
import { Identificador } from "@/model/Identificador";
import { PageableResponse } from "@/model/types/PageableResponse";
import { PhotoFile } from "@/model/types/PhotoFile";
import { ImagePickerResult } from "expo-image-picker";
import { Platform } from "react-native";
import * as FileSystem from 'expo-file-system';

export default class IdentificadorService {
  private identificadorFetcher: IdentificadorFetcher;

  constructor(token: string | null) {
    this.identificadorFetcher = new IdentificadorFetcher(token);
  }

  async findByFilial(
    idFilial: number
  ): Promise<PageableResponse<Identificador>> {
    return await this.identificadorFetcher.findByFilial(idFilial);
  }

  async uploadPhoto(result: ImagePickerResult) {
    const canceled = result.canceled;
    if (canceled) return;

    const uri = result.assets?.[0]?.uri;

    if (!uri) return;

    const filename =
      uri.split("/").pop() ??
      `photo.${Platform.OS === "android" ? "jpg" : "jpg"}`;
    const match = /\.(\w+)$/.exec(filename);
    const ext = match ? match[1] : "jpg";
    const mime = `image/${ext === "jpg" ? "jpeg" : ext}`;

    const file: PhotoFile = { uri, name: filename, type: mime };

    return await this.identificadorFetcher.uploadPhoto(file);
  }

  async readTextFromImage(uri: string): Promise<string[]> {
    const base64Data = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imageData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

    return await this.identificadorFetcher.readTextFromImage(imageData);
  }
}
