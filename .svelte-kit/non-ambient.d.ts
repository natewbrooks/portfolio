
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
		RouteId(): "/" | "/api" | "/api/github" | "/api/github/current-streak" | "/api/github/last-commit-repo" | "/api/github/monthly-commits" | "/api/mail" | "/api/mail/send" | "/api/spotify" | "/api/spotify/callback" | "/api/spotify/login" | "/api/spotify/now-playing" | "/api/spotify/podcast" | "/api/spotify/recent" | "/api/spotify/top-month" | "/api/spotify/top-week" | "/cv" | "/mail";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/api": Record<string, never>;
			"/api/github": Record<string, never>;
			"/api/github/current-streak": Record<string, never>;
			"/api/github/last-commit-repo": Record<string, never>;
			"/api/github/monthly-commits": Record<string, never>;
			"/api/mail": Record<string, never>;
			"/api/mail/send": Record<string, never>;
			"/api/spotify": Record<string, never>;
			"/api/spotify/callback": Record<string, never>;
			"/api/spotify/login": Record<string, never>;
			"/api/spotify/now-playing": Record<string, never>;
			"/api/spotify/podcast": Record<string, never>;
			"/api/spotify/recent": Record<string, never>;
			"/api/spotify/top-month": Record<string, never>;
			"/api/spotify/top-week": Record<string, never>;
			"/cv": Record<string, never>;
			"/mail": Record<string, never>
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/github" | "/api/github/" | "/api/github/current-streak" | "/api/github/current-streak/" | "/api/github/last-commit-repo" | "/api/github/last-commit-repo/" | "/api/github/monthly-commits" | "/api/github/monthly-commits/" | "/api/mail" | "/api/mail/" | "/api/mail/send" | "/api/mail/send/" | "/api/spotify" | "/api/spotify/" | "/api/spotify/callback" | "/api/spotify/callback/" | "/api/spotify/login" | "/api/spotify/login/" | "/api/spotify/now-playing" | "/api/spotify/now-playing/" | "/api/spotify/podcast" | "/api/spotify/podcast/" | "/api/spotify/recent" | "/api/spotify/recent/" | "/api/spotify/top-month" | "/api/spotify/top-month/" | "/api/spotify/top-week" | "/api/spotify/top-week/" | "/cv" | "/cv/" | "/mail" | "/mail/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/NathanielBrooksResume.pdf" | "/images/Nate_Brooks_Resume.pdf" | "/images/bombsniffer.webp" | "/images/caption-creators.webp" | "/images/chess.webp" | "/images/dimf.webp" | "/images/grubguessr.webp" | "/images/joust.webp" | "/images/lexicalanalyzer.webp" | "/images/linganoreumc.webp" | "/images/lizsite.webp" | "/images/management_tool.webp" | "/images/mrfox.GIF" | "/images/nate.png" | "/images/optimized/bombsniffer.webp" | "/images/optimized/caption-creators.webp" | "/images/optimized/chess.webp" | "/images/optimized/dimf.webp" | "/images/optimized/grubguessr.webp" | "/images/optimized/joust.webp" | "/images/optimized/lexicalanalyzer.webp" | "/images/optimized/linganoreumc.webp" | "/images/optimized/lizsite.webp" | "/images/optimized/management_tool.webp" | "/images/optimized/nate.webp" | "/images/optimized/optimized/bombsniffer.webp" | "/images/optimized/optimized/caption-creators.webp" | "/images/optimized/optimized/chess.webp" | "/images/optimized/optimized/dimf.webp" | "/images/optimized/optimized/grubguessr.webp" | "/images/optimized/optimized/joust.webp" | "/images/optimized/optimized/lexicalanalyzer.webp" | "/images/optimized/optimized/linganoreumc.webp" | "/images/optimized/optimized/lizsite.webp" | "/images/optimized/optimized/management_tool.webp" | "/images/optimized/optimized/portfolioSite.webp" | "/images/optimized/optimized/ppro.webp" | "/images/optimized/optimized/rate-my-slippi.webp" | "/images/optimized/optimized/spark-dating.webp" | "/images/optimized/optimized/termdleImg.webp" | "/images/optimized/optimized/tu.webp" | "/images/optimized/optimized/updatedPortfolio.webp" | "/images/optimized/portfolioSite.webp" | "/images/optimized/ppro.webp" | "/images/optimized/rate-my-slippi.webp" | "/images/optimized/spark-dating.webp" | "/images/optimized/termdleImg.webp" | "/images/optimized/tu.webp" | "/images/optimized/updatedPortfolio.webp" | "/images/portfolioSite.webp" | "/images/ppro.webp" | "/images/rate-my-slippi.webp" | "/images/spark-dating.webp" | "/images/termdleImg.webp" | "/images/tu.webp" | "/images/updatedPortfolio.webp" | "/robots.txt" | string & {};
	}
}