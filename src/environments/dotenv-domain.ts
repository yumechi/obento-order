/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "dotenv";
import { resolve } from "path";

/**
 * DotEnv情報を扱うためのクラス
 */
export class DotEnvBase {
  data: any;

  /**
   * config を持つだけのコンストラクタ
   */
  constructor(envPath = "../../.env.develop") {
    this.data = config({ path: resolve(__dirname, envPath) });
  }

  /**
   * Dotenvからすべての設定を読み込む
   * overrideフラグでもともとの設定を書き換えるかを選択する
   */
  readAllDotenv(keys: string[] = [], override = false): { [key: string]: any } {
    const envData: { [key: string]: any } = {};
    for (const key in keys) {
      const value = keys[key];
      if (override || !envData[value]) {
        envData[value] = process.env[value];
      }
    }
    return envData;
  }
}

export class DotEnvTest extends DotEnvBase {
  readDotenvTest(): void {
    /**
     * dotenvから読み込むテスト
     * NAME, AISATSUは入力されてばOK、GOBIはundifiendならOK
     * { NAME: 'MINAMI_MIREI', GOBI: undefined, AISATSU: 'PRIPIRI_KASHIKOMA' }
     */
    const testKeys: string[] = ["NAME", "GOBI", "AISATSU"];
    console.log(this.readAllDotenv(testKeys));
  }
}
