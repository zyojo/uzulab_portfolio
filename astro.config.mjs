import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { access, d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto", coalesce: true }),
			storage: r2({ binding: "MEDIA" }),
			// 管理画面のログインは Cloudflare Access に任せる（パスキーはドメインに紐づくため、ドメイン変更で使えなくなる）。
			// audience は wrangler.jsonc の CF_ACCESS_AUDIENCE から実行時に読む
			auth: access({
				teamDomain: "raspy-firefly-4abc.cloudflareaccess.com",
				// Access のポリシーで本人だけに絞っているので、ログインした人は管理者にする
				defaultRole: 50,
			}),
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Playfair Display",
			cssVariable: "--font-heading",
			weights: [400, 500, 600, 700],
			fallbacks: ["serif"],
		},
	],
	devToolbar: { enabled: false },
});
