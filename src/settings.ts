import { DotEnvDomain } from "./dotenvDomain";

/**
 * スクレイピングに必要な設定を読み込む
 */
export function puppeteerSettings(): { [key: string]: string | number } {
  // なんか結果的にデフォルトでセットしておきたい値がなくなってしまった
  var defaultSettings: { [key: string]: string | number } = {};

  // add env settings
  const readEnvArray: string[] = [
    "LOGIN_PAGE",
    "DOM_KOUTEI",
    "KOUTEI",
    "DOM_ANATANO_NAME",
    "ANATANO_NAME",
    "DOM_AIKOTOBA",
    "AIKOTOBA"
  ];
  return addEnvSettings(defaultSettings, readEnvArray);
}

/**
 * envからデータを引き抜いてsettingsに足して返すやつ
 * @param settings デフォルトのセッティング値
 * @param envKeys envから足したいセッティングのkey
 */
function addEnvSettings(
  settings: { [key: string]: string | number },
  envKeys: string[]
): { [key: string]: string | number } {
  const dotenvSettings = new DotEnvDomain().readAllDotenv(envKeys);
  for (let key in dotenvSettings) {
    settings[key] = dotenvSettings[key];
  }
  return settings;
}