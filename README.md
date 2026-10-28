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
| 管理画面のログイン | Cloudflare Access（ワンタイムコード） |
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

## 移行メモ

旧サイト（Next.js + microCMS、Vercel）からの移行で使ったもの。

- `scripts/microcms-export.mjs`: microCMS の作品・タグを `.migration/microcms/` に書き出す（`node --env-file=.env scripts/microcms-export.mjs`、`.env` に `MICROCMS_API_KEY` が必要）
- `scripts/microcms-to-seed.mjs`: 書き出した JSON を `seed/seed.json` に変換する
- 旧 URL（`/work/<microCMS の id>`）は seed の `redirects` で新 URL に 301 する
- `vercel.json` は移行中に Vercel の自動デプロイを止めるためのもの。ドメインを切り替えたら Vercel のプロジェクトごと削除する
