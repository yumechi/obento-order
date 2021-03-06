/* eslint-disable @typescript-eslint/no-use-before-define */
import { ObentoOrderDotenv } from "./obent-order";

/**
 * スクレイピングに必要な設定を読み込む
 */
export function puppeteerSettings(): { [key: string]: string | number } {
  const defaultSettings: { [key: string]: string | number } = {
    loginUrl: "https://www.obentonet.jp/login.html"
  };

  // add env settings
  const readEnvArray: string[] = ["CORP_ID", "ACCOUNT", "PASS"];
  return addEnvSettings(defaultSettings, readEnvArray);
}

/**
 * envからデータを引き抜いてsettingsに足して返すやつ
 * @param settings デフォルトのセッティング値
 * @param envKeys envから足したいセッティングのkey
 * @param override 既存設定を書き換えるフラグ
 */
function addEnvSettings(
  settings: { [key: string]: string | number },
  envKeys: string[],
  override = true
): { [key: string]: string | number } {
  const dotenvSettings = new ObentoOrderDotenv().readAllDotenv(envKeys);
  for (const key in dotenvSettings) {
    if (override || !settings[key]) {
      settings[key] = dotenvSettings[key];
    }
  }
  return settings;
}
