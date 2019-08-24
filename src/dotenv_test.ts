import { config } from "dotenv"
import { resolve } from "path"

/**
 *  DotEnv情報を保持するクラス
 */
export class DotEnvDomain {
  data: any;
  constructor(envPath="../.env") {
    /**
     * config を持つだけのコンストラクタ
     */
    this.data = config({ path: resolve(__dirname, envPath) });
  }

  readDotenvTest(): void {
    /**
     * dotenvを読んでみるテスト
     */
    const testKeys: string[] = ['NAME', 'AIKOTOBA'];
    console.log(this.readAllDotenv(testKeys));
  }

  readAllDotenv(keys: string[]): { [key: string]: any } {
    /**
     * 与えられたkeyをもとにデータを返す
     */
    var envData: { [key: string]: any } = {}
    for(const key in keys) {
        const value = keys[key];
        envData[value] = process.env[value];
    }
    return envData;
  }
}
