
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/spotify" | "/api/spotify/callback" | "/api/spotify/login" | "/api/spotify/now-playing" | "/api/spotify/podcast" | "/api/spotify/recent" | "/api/spotify/top-month" | "/api/spotify/top-week" | "/cv";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/api": Record<string, never>;
			"/api/spotify": Record<string, never>;
			"/api/spotify/callback": Record<string, never>;
			"/api/spotify/login": Record<string, never>;
			"/api/spotify/now-playing": Record<string, never>;
			"/api/spotify/podcast": Record<string, never>;
			"/api/spotify/recent": Record<string, never>;
			"/api/spotify/top-month": Record<string, never>;
			"/api/spotify/top-week": Record<string, never>;
			"/cv": Record<string, never>
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/spotify" | "/api/spotify/" | "/api/spotify/callback" | "/api/spotify/callback/" | "/api/spotify/login" | "/api/spotify/login/" | "/api/spotify/now-playing" | "/api/spotify/now-playing/" | "/api/spotify/podcast" | "/api/spotify/podcast/" | "/api/spotify/recent" | "/api/spotify/recent/" | "/api/spotify/top-month" | "/api/spotify/top-month/" | "/api/spotify/top-week" | "/api/spotify/top-week/" | "/cv" | "/cv/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/NathanielBrooksResume.pdf" | "/images/Nate_Brooks_Resume.pdf" | "/images/bombsniffer.webp" | "/images/caption-creators.webp" | "/images/chess.webp" | "/images/dimf.webp" | "/images/grubguessr.webp" | "/images/joust.webp" | "/images/lexicalanalyzer.webp" | "/images/linganoreumc.webp" | "/images/lizsite.webp" | "/images/management_tool.webp" | "/images/mrfox.GIF" | "/images/portfolioSite.webp" | "/images/ppro.webp" | "/images/rate-my-slippi.webp" | "/images/spark-dating.webp" | "/images/termdleImg.webp" | "/images/updatedPortfolio.webp" | "/robots.txt" | string & {};
	}
}