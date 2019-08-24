import { config } from "dotenv"

/**
 *  DotEnv情報を保持するクラス
 */
export class DotEnvDomain {
  data: any;
  constructor() {
    this.data = config();
  }

  readDotenvTest(): void {
    console.log(this.readAllDotenv());
  }

  readAllDotenv(): { [key: string]: any } {
    return {
      host: process.env.AIKOTOBA,
      username: process.env.NAME
    };
  }
}
