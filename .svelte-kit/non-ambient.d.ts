
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
		RouteId(): "/" | "/cv";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/cv": Record<string, never>
		};
		Pathname(): "/" | "/cv" | "/cv/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/images/Nate_Brooks_Resume.pdf" | "/images/bombsniffer.webp" | "/images/caption-creators.webp" | "/images/chess.webp" | "/images/dimf.webp" | "/images/joust.webp" | "/images/lexicalanalyzer.webp" | "/images/linganoreumc.webp" | "/images/lizsite.webp" | "/images/management_tool.webp" | "/images/mrfox.GIF" | "/images/portfolioSite.webp" | "/images/ppro.webp" | "/images/rate-my-slippi.webp" | "/images/termdleImg.webp" | "/images/updatedPortfolio.webp" | "/robots.txt" | string & {};
	}
}