import { DotEnvDomain } from "./dotenv_test";

export function puppeteerSettings(): {[key: string]: string | number} {
    var defaultSettings: {[key: string]: string | number} = {
        "site_url_base": "https://hogehogehogehogehogehogehogehogeho.com",
    }

    // add env settings
    const readEnvArray: string[] = ['NAME', 'AIKOTOBA'];
    const dotenvSettings = (new DotEnvDomain()).readAllDotenv(readEnvArray);
    for (let key in dotenvSettings) {
        defaultSettings[key] = dotenvSettings[key];
    }
    return defaultSettings;
}
