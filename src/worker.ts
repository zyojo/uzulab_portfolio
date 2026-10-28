import handler, { createScheduledHandler, PluginBridge } from "@emdash-cms/cloudflare/worker";

export { PluginBridge };

export default {
	...handler,
	fetch(request, env, ctx) {
		// www は ryotanakahara.jp に寄せる（パスとクエリはそのまま）
		const url = new URL(request.url);
		if (url.hostname === "www.ryotanakahara.jp") {
			url.hostname = "ryotanakahara.jp";
			return Response.redirect(url.toString(), 301);
		}
		return handler.fetch!(request, env, ctx);
	},
	scheduled: createScheduledHandler(),
} satisfies ExportedHandler<Env>;
