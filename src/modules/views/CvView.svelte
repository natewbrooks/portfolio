<script lang="ts">
  import { getContext } from "svelte";
  import IconDownload from "~icons/mdi/download";
  import IconOpenNew from "~icons/mdi/open-in-new";
  import IconHome from "~icons/mdi/home";

  const pdfUrl = "NathanielBrooksResume.pdf";
  
  const navigateToHome = getContext<() => void>("navigateToHome");
</script>

<div class="relative py-4 px-4 h-full flex flex-col space-y-2 min-h-screen">
    <div class="sticky top-0 w-full flex items-center justify-end bg-darkest py-2 z-10">
        <div class="flex items-center space-x-4">
            <a 
                href={pdfUrl} 
                download="NathanielBrooksResume.pdf"
                class="text-green hover:text-green/80 transition-colors flex items-center space-x-1"
                aria-label="Download resume"
            >
                <IconDownload class="w-5 h-5" />
                <span class="hidden sm:inline text-sm">download</span>
            </a>
            <a 
                href={pdfUrl} 
                target="_blank"
                class="text-blue hover:text-blue/80 transition-colors flex items-center space-x-1"
                aria-label="Open resume in new tab"
            >
                <IconOpenNew class="w-5 h-5" />
                <span class="hidden sm:inline text-sm">open in new tab</span>
            </a>
            <button 
                onclick={() => navigateToHome?.()}
                class="text-pink hover:text-pink/80 transition-colors flex items-center space-x-1 cursor-pointer"
                aria-label="Return to home"
            >
                <IconHome class="w-5 h-5" />
                <span class="hidden sm:inline text-sm">return</span>
            </button>
        </div>
    </div>
    <embed src={pdfUrl} class="w-full flex-1 rounded-sm" style="min-height: 80vh;">
</div>
