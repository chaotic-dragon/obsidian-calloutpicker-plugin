import { App, Editor, EditorPosition, EditorSuggest, EditorSuggestContext, EditorSuggestTriggerInfo, TFile } from "obsidian";
import { CalloutPickerPlugin } from "plugin";
import { Callout } from "callout-manager";
import { CalloutPreviewRenderer as CalloutPreviewRenderer } from "callout-preview-renderer";

export class CalloutEditorSuggest extends EditorSuggest<Callout> {
    private triggerExpression: RegExp;
    // regular expression to match "> [!]"
    private calloutMarkdownExpression: RegExp = /^(> \[!(\S.*|())\])$/;
    private suggestionTrigger: string;

    constructor(app: App, private readonly plugin: CalloutPickerPlugin) {
        super(app);
        this.setTriggerExpression(this.plugin.settings.triggerPhrase);
    }

    setTriggerExpression(triggerPhrase: string) {
        // escape special characters
        triggerPhrase = triggerPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        this.triggerExpression = new RegExp("(.*)(" + triggerPhrase + ")(\\S.*|())");
    }

    onTrigger(cursor: EditorPosition, editor: Editor, file: TFile | null): EditorSuggestTriggerInfo | null {
        const line = editor.getLine(cursor.line);
        const match = this.triggerExpression.test(line)
        const markdownMatch = this.calloutMarkdownExpression.test(line);

        // matching on the trigger phrase results in 3 groups:
            // group 1: any preceding text
            // group 2: the trigger phrase
            // group 3: anything after the trigger phrase but not whitespace (the thing you can filter on)
        if (match) {
            return {
                start: {
                    ch: line.indexOf(this.suggestionTrigger),
                    line: cursor.line
                },
                end: cursor,
                query: line.match(this.triggerExpression)?.[3] ?? ""
            };
        }

        // The second group of the markdown styled match '> [!foo]' contains the the text after the exclamation
        // mark (foo) that you can filter on
        if (markdownMatch) {
            return {
                start: cursor,
                end: cursor,
                query: line.match(this.calloutMarkdownExpression)?.[2] ?? ""
            }
        }

        return null;
    }

    getSuggestions(context: EditorSuggestContext): Callout[] | Promise<Callout[]> {
        // get the callouts
        const callouts: Callout[] = this.plugin.calloutManager.getCallouts();

        return callouts.filter(callout => callout.id.startsWith(context.query));
    }

    renderSuggestion(callout: Callout, el: HTMLElement): void {
        CalloutPreviewRenderer.render(el, callout);
    }
    
    selectSuggestion(callout: Callout, evt: MouseEvent | KeyboardEvent): void {
        if (!this.context)
            return;

        const line = this.context.editor.getLine(this.context.start.line);
        const content = line.match(this.triggerExpression)?.[1];
        let result = `> [!${callout.id}]\r\n> `;

        if (content) {
            result += `${content}\n\n`;
        }

        // select & replace the whole line
        this.context.editor.setSelection(
            { ...this.context.start, ch: 0 },
            { ...this.context.end, ch: line.length }
        );
        this.context.editor.replaceSelection(result);
    }
}
