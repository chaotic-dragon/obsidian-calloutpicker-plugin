import {
    App,
    Editor,
    EditorPosition,
    EditorSuggest,
    EditorSuggestContext,
    EditorSuggestTriggerInfo,
    MarkdownRenderer,
    TFile,
} from "obsidian";
import { CalloutPickerPluginSettings } from "settings";

interface SuggestInfo {
    content: string | undefined,
    calloutType: string,
    context: EditorSuggestContext
}

export class CalloutSuggest extends EditorSuggest<SuggestInfo> {

    // group 1: any preceding text
    // group 2: the &&
    // group 3: anything after && but not whitespace
    private regex = (/(.*)(&&)(\S.*|())/);

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

    getSuggestions(context: EditorSuggestContext): SuggestInfo[] | Promise<SuggestInfo[]> {

        const line = context.editor.getLine(context.start.line);
        const content = line.match(this.regex)?.[1];

        let infos: SuggestInfo[] = [
            { calloutType: "asdf", content: content, context: context },
            { calloutType: "qwer", content: content, context: context },
            { calloutType: "test", content: content, context: context },
        ];

        // return a filtered list of suggestions
        return infos.filter(s => s.calloutType.contains(context.query));
    }

    renderSuggestion(value: SuggestInfo, el: HTMLElement): void {
        el.setText(value.calloutType);
    }

    selectSuggestion(value: SuggestInfo, evt: MouseEvent | KeyboardEvent): void {
        var linkResult = `> [!${value.calloutType}]\n> `;

        if (value.content)
            linkResult += `${value.content}\n\n`

        value.context.editor.replaceRange(
            linkResult,
            {
                ch: 0, 
                line: value.context.start.line
            },
            value.context.end
        );
    }

    private app: App;

    constructor(app: App, settings: CalloutPickerPluginSettings) {
        super(app);
        this.app = app;
    }
}
