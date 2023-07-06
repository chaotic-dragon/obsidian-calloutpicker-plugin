import { App, Editor, EditorPosition, EditorSuggest, EditorSuggestContext, EditorSuggestTriggerInfo, MarkdownRenderer, TFile } from "obsidian";
import { CalloutPickerPluginSettings } from "settings";
import { Callout, CalloutID } from "obsidian-callout-manager";
import { CalloutPickerPluginManager } from "plugin";

// interface SuggestInfo {
//     content: string | undefined,
//     calloutType: string,
//     context: EditorSuggestContext
// }

export class CalloutEditorSuggest extends EditorSuggest<string> {

    // group 1: any preceding text
    // group 2: the &&
    // group 3: anything after && but not whitespace
    private regex = (/(.*)(&&)(\S.*|())/);
    private plugin: CalloutPickerPluginManager;

    constructor(app: App, plugin: CalloutPickerPluginManager) {
        super(app);
        this.plugin = plugin;
    }
    

    onTrigger(cursor: EditorPosition, editor: Editor, file: TFile | null): EditorSuggestTriggerInfo | null {
        const line = editor.getLine(cursor.line);
        const match = this.regex.test(line);

        if (!match)
            return null;
        else
            return {
                start: {
                    ch: line.indexOf("&&"),
                    line: cursor.line
                },
                end: cursor,
                query: line.match(this.regex)?.[3] ?? ""
            };
    }

    getSuggestions(context: EditorSuggestContext): string[] | Promise<string[]> {

        // get the callouts
        let callouts = this.plugin.calloutManager?.getCallouts();
        let infos: string[] = ["test"];
        
        console.log(this.plugin.calloutManager);

        if(callouts) {
            callouts.forEach(callout => {
                infos.push(callout.id);
            });
        }

        // const line = context.editor.getLine(context.start.line);
        // const content = line.match(this.regex)?.[1];

        //const infos = ["test1", "test2", "test3"];

        // let infos: SuggestInfo[] = [
        //     { calloutType: "asdf", content: content, context: context },
        //     { calloutType: "qwer", content: content, context: context },
        //     { calloutType: "test", content: content, context: context },
        // ];

        // return a filtered list of suggestions
        return infos.filter(s => s.contains(context.query));
    }

    renderSuggestion(value: string, el: HTMLElement): void {
        el.setText(value);
    }

    selectSuggestion(value: string, evt: MouseEvent | KeyboardEvent): void {
        if (this.context) {
            const line = this.context.editor.getLine(this.context.start.line);
            const content = line.match(this.regex)?.[1];

            var linkResult = `> [!${value}]\n> `;

            if (content)
                linkResult += `${content}\n\n`

            this.context.editor.replaceRange(
                linkResult,
                {
                    ch: 0,
                    line: this.context.start.line
                },
                this.context.end
            );
        }

    }
}
