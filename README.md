# お弁当の自動注文ツール
## 対象サイト

[おべんとね！っと](https://www.obentonet.jp/)

## お断り

* 内部的にブラウザを立ち上げて遷移させてるので、会社コード、利用者ID、パスワードを .env に書き込む必要があります
* 過度なアクセスをかけるのはやめましょう
* 時間外で注文できなかったときのエラー処理が割と雑です

## 使い方

1. このリポジトリ直下の `.env` ファイルに下記の内容を書き込みます

    ```
    CORP_ID="会社コード"
    ACCOUNT="利用者ID"
    PASS="パスワード"
    ```

1. 必要なライブラリをインストールしてください

    ```
    yarn install
    ```

1. `yarn run ts-node src/index.ts` を実行すると弁当の注文が完了します

1. （オプション・ほぼ自分用）各種ライブラリの動作を確認するためには、下記を試してください（主にリグレッションとかで使っています）

    ```
    yarn install --dev
    yarn run ts-node src/simple-execute/execute.ts -d # dotenvの読み込みテスト
    yarn run ts-node src/simple-execute/execute.ts -p # puppeteerでGoogle.comのスクショを取ります
    ```

## lambdaへのデプロイ

TBD

