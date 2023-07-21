import { App } from "obsidian";
import { CalloutManager as ObsidianCalloutManager, getApi, isInstalled } from "obsidian-callout-manager";
import { CalloutPickerPlugin } from "plugin";

export interface Callout {
    id: string;
    color: string;
    icon: string;
    title: string;
}

/**
 * @summary Manages callouts. Uses obsidian-callout-manager if available, otherwise uses defaults.
 */
export class CalloutManager {
    private obsidianCalloutManager: ObsidianCalloutManager | undefined;
    private useObsidianCalloutManager: boolean;
    private callouts: Callout[] = [];

    constructor(private readonly app: App, private readonly plugin: CalloutPickerPlugin) { }

    /**
     * @summary Handler that checks if the obsidian-plugin-manager was installed or uninstalled and acts accordingly.
     */
    public handleObsidianCalloutManagerInstallationStatus(): void {
        // changed from isInstalled -> !isInstalled
        if (this.useObsidianCalloutManager && !isInstalled(this.plugin.app)) {
            this.obsidianCalloutManager = undefined;
            this.useObsidianCalloutManager = false;
            this.callouts = []; // Set to empty array, next get call will re-populate
        }
        // changed from !isInstalled -> isInstalled
        else if (!this.useObsidianCalloutManager && isInstalled(this.plugin.app)) {
            this.app.workspace.onLayoutReady(async () => {
                this.obsidianCalloutManager = await getApi(this.plugin);
                this.useObsidianCalloutManager = true;
                
            });
            this.callouts = []; // Set to empty array, next get call will re-populate
        }
    }

    private createCallouts(): void {
        // Create the list of callouts using obsidian-callout-manager
        if (this.useObsidianCalloutManager) {
            const ocmCallouts = this.obsidianCalloutManager?.getCallouts();

            ocmCallouts?.forEach(ocmCallout => {
                this.callouts.push({
                    id: ocmCallout.id,
                    color: ocmCallout.color,
                    icon: ocmCallout.icon,
                    // todo: use obsidian-callout-manager getTitle support when released
                    // for now just capitalize the titles
                    title: this.getTitle(ocmCallout.id)
                });
            });
        }
        else {
            // Create the default list of callouts
            this.callouts = this.createDefaultCallouts();
        }
    }

    /**
     * @summary Get an array of Callout objects.
     * @returns List of Callout objects
     */
    public getCallouts(): Callout[] {
        if (this.callouts.length == 0)
            this.createCallouts();

        return this.callouts;
    }

    private getTitle(id: string): string {
        let title: string = id;
        title = title.charAt(0).toUpperCase() + title.slice(1);

        // obsidian-callout-manager would allow dashes in the names, so we strip those
        // todo: fix when obsidian-callout-manager release gets getTitle support
        // no need to do this for default callouts
        if (this.useObsidianCalloutManager) {
            title.replace("-", " ");
        }

        return title;
    }

    private createDefaultCallouts(): Callout[] {
        const cs: CSSStyleDeclaration = getComputedStyle(document.body);

        // todo: use obsidian-plugin-manager color.ts (or a different helper)
        const calloutDefaultColor = "rgb(" + cs.getPropertyValue("--callout-default") + ")";
        const calloutSummaryColor = "rgb(" + cs.getPropertyValue("--callout-summary") + ")";
        const calloutInfoColor = "rgb(" + cs.getPropertyValue("--callout-info") + ")";
        const calloutTodoColor = "rgb(" + cs.getPropertyValue("--callout-todo") + ")";
        const calloutImportantColor = "rgb(" + cs.getPropertyValue("--callout-important") + ")";
        const calloutTipColor = "rgb(" + cs.getPropertyValue("--callout-tip") + ")";
        const calloutSuccessColor = "rgb(" + cs.getPropertyValue("--callout-success") + ")";
        const calloutQuestionColor = "rgb(" + cs.getPropertyValue("--callout-question") + ")";
        const calloutWarningColor = "rgb(" + cs.getPropertyValue("--callout-warning") + ")";
        const calloutFailureColor = "rgb(" + cs.getPropertyValue("--callout-fail") + ")";
        const calloutErrorColor = "rgb(" + cs.getPropertyValue("--callout-error") + ")";
        const calloutBugColor = "rgb(" + cs.getPropertyValue("--callout-bug") + ")";
        const calloutExampleColor = "rgb(" + cs.getPropertyValue("--callout-example") + ")";
        const calloutQuoteColor = "rgb(" + cs.getPropertyValue("--callout-quote") + ")";

       
        return [
             // using getTitle here for the titles because possible fancy stuff or not capitalising or whatevers.
            { id: "default", color: calloutDefaultColor, icon: "lucide-pencil", title: this.getTitle("default") },
            //
            { id: "summary", color: calloutSummaryColor, icon: "lucide-clipboard-list", title: this.getTitle("summary") },
            { id: "abstract", color: calloutSummaryColor, icon: "lucide-clipboard-list", title: this.getTitle("abstract") },
            { id: "tldr", color: calloutSummaryColor, icon: "lucide-clipboard-list", title: this.getTitle("tldr") },
            //
            { id: "info", color: calloutInfoColor, icon: "lucide-info", title: this.getTitle("info") },
            //
            { id: "todo", color: calloutTodoColor, icon: "lucide-check-circle-2", title: this.getTitle("todo") },
            //
            { id: "important", color: calloutImportantColor, icon: "lucide-flame", title: this.getTitle("important") },
            //
            { id: "tip", color: calloutTipColor, icon: "lucide-flame", title: this.getTitle("tip") },
            { id: "hint", color: calloutTipColor, icon: "lucide-flame", title: this.getTitle("hint") },
            //
            { id: "success", color: calloutSuccessColor, icon: "lucide-check", title: this.getTitle("success") },
            { id: "check", color: calloutSuccessColor, icon: "lucide-check", title: this.getTitle("check") },
            { id: "done", color: calloutSuccessColor, icon: "lucide-check", title: this.getTitle("done") },
            //
            { id: "question", color: calloutQuestionColor, icon: "help-circle", title: this.getTitle("question") },
            { id: "help", color: calloutQuestionColor, icon: "help-circle", title: this.getTitle("help") },
            { id: "faq", color: calloutQuestionColor, icon: "help-circle", title: this.getTitle("faq") },
            //
            { id: "warning", color: calloutWarningColor, icon: "lucide-alert-triangle", title: this.getTitle("warning") },
            { id: "caution", color: calloutWarningColor, icon: "lucide-alert-triangle", title: this.getTitle("caution") },
            { id: "attention", color: calloutWarningColor, icon: "lucide-alert-triangle", title: this.getTitle("attention") },
            //
            { id: "failure", color: calloutFailureColor, icon: "lucide-x", title: this.getTitle("failure") },
            { id: "fail", color: calloutFailureColor, icon: "lucide-x", title: this.getTitle("fail") },
            { id: "missing", color: calloutFailureColor, icon: "lucide-x", title: this.getTitle("missing") },
            //
            { id: "danger", color: calloutErrorColor, icon: "lucide-zap", title: this.getTitle("danger") },
            { id: "error", color: calloutErrorColor, icon: "lucide-zap", title: this.getTitle("error") },
            //
            { id: "bug", color: calloutBugColor, icon: "lucide-bug", title: this.getTitle("bug") },
            //
            { id: "example", color: calloutExampleColor, icon: "lucide-list", title: this.getTitle("example") },
            //
            { id: "quote", color: calloutQuoteColor, icon: "quote-glyph", title: this.getTitle("quote") },
            { id: "cite", color: calloutQuoteColor, icon: "quote-glyph", title: this.getTitle("cite") },
        ]
    }
}



