import { DotEnvBase } from "./dotenv-domain";

/**
 * お弁当注文用のDotenv管理用クラス
 */
export class ObentoOrderDotenv extends DotEnvBase {
    constructor(envPath="../../.env") {
        super(envPath);
    }
}
