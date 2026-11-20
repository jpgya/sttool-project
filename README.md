# Streammate Studio

配信者向けの素材・スケジュール・活動チェックをまとめたWindowsデスクトップアプリです。HTML / CSS / JavaScript と Electron で動作します。

## 起動方法

Node.js がインストールされた環境で、プロジェクトフォルダーから以下を実行します。

```powershell
npm install
npm start
```

## Windowsインストーラーの作成

```powershell
npm run dist:win
```

`release` フォルダーにWindows用セットアップファイルが作成されます。

配信スケジュール、お気に入り、チェックリストはアプリを使っている端末内に保存されます。

## Twitchログイン

1. [Twitch Developer Console](https://dev.twitch.tv/console/apps) でアプリを登録し、Client IDを取得します。
2. アプリの「Twitchに接続」からClient IDを一度だけ入力し、安全に保存します。設定後、画面やソースには表示されません。
3. Twitchで認証し、画面に表示されたコードとフォロワー閲覧の許可を確認します。

Windowsデスクトップ向けのDevice Code Grant Flowを使うため、Client SecretとOAuthコールバックURLは使用しません。Twitch Developer ConsoleでOAuth Redirect URLの入力が必須の場合は `http://localhost:3000` を登録できますが、このアプリのログイン処理では使用されません。Client IDと認証トークンはElectronの安全な端末内ストレージに暗号化して保存し、起動時と1時間ごとにトークンの有効性を確認します。なお、Twitch上のClient IDは公開クライアント識別子であり、秘密情報としての保証はありません。

成長レポートはTwitchの公開アーカイブとフォロワーAPIから取得できる実データのみを表示します。フォロワー数の取得には `moderator:read:followers` の許可が必要です。

## アップデート通知

更新通知を使うには、HTTPSで公開したJSONフィードを「設定」画面に登録します。`update-feed.example.json` をコピーし、バージョン・タイトル・更新内容・インストーラーのダウンロードURLを更新してください。起動時と1日ごとに確認し、新しいバージョンがあればアプリ内でお知らせします。アプリはダウンロードページを開きますが、自動インストールは行いません。

## 素材ライブラリ

同梱素材はカードの「ダウンロード」から保存できます。ライブラリにはBOOTH上の無料・有料素材も掲載し、公式商品ページをブラウザーで開きます。BOOTHの商品データはアプリに転載していません。価格・配布状況・利用条件は各商品ページで確認してください。SVGの画面素材はOBSの画像／ブラウザーソース、HTMLのガイドはブラウザー、CSVのテンプレートは表計算ソフトで利用できます。
