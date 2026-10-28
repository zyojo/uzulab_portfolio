# uzulab portfolio

[ryotanakahara.jp](https://ryotanakahara.jp/) のポートフォリオサイト。
[EmDash](https://emdashcms.com/)（Astro ベースの CMS）で作り、Cloudflare Workers で動かしている。

- 作品・タグは EmDash の管理画面（`/_emdash/admin`）で編集する
- about ページの文面はコード（`src/lib/about.ts`）に直接書いている
- お問い合わせフォームは Amazon SES（東京リージョン）でメールを送る

## 構成

| 役割 | 使っているもの |
| --- | --- |
| 実行環境 | Cloudflare Workers（Worker 名 `uzulab-portfolio`） |
| データベース | Cloudflare D1 `uzulab-portfolio` |
| 画像 | Cloudflare R2 `uzulab-portfolio-media` |
| セッション | Cloudflare KV `uzulab-portfolio-session` |
| ドメイン | `ryotanakahara.jp`（`www` は Worker で `ryotanakahara.jp` に 301） |
| 管理画面のログイン | Cloudflare Access（ワンタイムコード）。`/_emdash/*` だけを保護し、画像の `/_emdash/api/media/*` と MCP 関連のパスは公開 |
| メール送信 | Amazon SES v2（送信元 `info@ryotanakahara.jp`） |

Cloudflare は個人アカウント（`info@ryotanakahara.jp`）を使う。`wrangler.jsonc` に `account_id` を固定している。

## ローカル開発

Node.js は `.node-version`（24 系）、pnpm は corepack で用意する。

```bash
corepack enable
pnpm install
pnpm dev
```

- サイト: http://localhost:4321
- 管理画面: http://localhost:4321/_emdash/admin
- 管理画面のログインは本番では Cloudflare Access だが、ローカルには Access が無い。先に http://localhost:4321/_emdash/api/setup/dev-bypass を開くと、開発用の管理者でログインした状態になる（初回はこのとき `seed/seed.json` の作品データも取り込む）
- ローカルのデータは `data.db` と `uploads/` に入る（git 管理外）

お問い合わせメールをローカルから実際に送るときだけ、`.dev.vars.example` を `.dev.vars` にコピーして AWS のキーを入れる。

型チェック:

```bash
pnpm typecheck
```

## MCP（AI から作品を編集する）

EmDash の MCP サーバー（`https://ryotanakahara.jp/_emdash/api/mcp`）に Claude Code などからつなぐと、作品・画像・タグを会話で読み書きできる。編集は本番のデータにそのまま反映される。

```bash
claude mcp add -s user --transport http uzulab https://ryotanakahara.jp/_emdash/api/mcp
```

Claude Code の `/mcp` で `uzulab` を選んで認証する。ブラウザで Access のワンタイムコードでログインし、EmDash の許可画面で必要な権限だけ残して許可する。

- MCP 本体（`/_emdash/api/mcp`）と OAuth のトークン発行・クライアント登録（`/_emdash/api/oauth/token`、`/_emdash/api/oauth/register`）は Access を Bypass にしている。どれも EmDash 側でトークンや PKCE を検証する
- 許可画面（`/_emdash/oauth/authorize`）と管理画面は Access で保護したまま

## デプロイ

### PR ごとのプレビュー

PR を作ると GitHub Actions（`.github/workflows/preview.yml`）が Worker Preview（`pr-<番号>`）を作り、URL を PR にコメントする。PR を閉じると削除する。

- URL は `https://pr-<番号>-uzulab-portfolio.ryotanakahara.workers.dev`（Cloudflare Access で保護）
- **データベース・画像・セッションは本番と共通。** プレビューで作品を編集すると本番も変わる
- Actions は GitHub の secret `CLOUDFLARE_API_TOKEN` を使う

### 本番

本番は手動でデプロイする。`main` にマージしても自動ではデプロイされない。

```bash
pnpm run deploy
```

ローカルの wrangler は、このディレクトリに個人アカウントの認証プロファイルを紐づけて使う（Micata など他のアカウントの認証はそのまま）。

```bash
pnpm exec wrangler auth create personal       # 初回のみ。ブラウザで個人アカウントにログイン
pnpm exec wrangler auth activate personal .
pnpm exec wrangler whoami                     # info@ryotanakahara.jp になっていることを確認
```

### シークレット

Cloudflare ダッシュボードの Worker → 設定 → 変数とシークレットで、種類を「シークレット」にして登録する。テキストで登録すると `wrangler deploy` のたびに消える。

| 名前 | 内容 |
| --- | --- |
| `EMDASH_ENCRYPTION_KEY` | EmDash がプラグインの秘密の設定を暗号化する鍵（`pnpm exec emdash secrets generate` で作る）。プレビュー用の設定にも同じ値を入れる |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | SES 送信用の IAM ユーザー（`ses:SendEmail` のみ許可）のキー |

その他の設定値（送信元アドレス、差出人名、Access の audience など）は `wrangler.jsonc` の `vars` にある。

## メール（SES）

- ドメイン `ryotanakahara.jp` を SES に登録済み（Easy DKIM、MAIL FROM `bounce.ryotanakahara.jp`、DMARC `p=none`）
- DNS は Cloudflare で管理。受信メールは iCloud+（MX は iCloud）なので、SPF・DKIM のレコードは iCloud 用と SES 用が両方ある
