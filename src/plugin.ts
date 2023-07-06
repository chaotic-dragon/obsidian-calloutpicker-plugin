import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { CalloutPickerPluginSettingsTab, CalloutPickerPluginSettings } from './settings'
import { CalloutEditorSuggest } from 'suggest';
import { CalloutManager, getApi } from "obsidian-callout-manager";

const DEFAULT_SETTINGS: CalloutPickerPluginSettings = {
 	mySetting: 'default'
}

export class CalloutPickerPluginManager extends Plugin {
    settings: CalloutPickerPluginSettings;
    public calloutManager?: CalloutManager<true> | undefined;

    async onload() {
        await this.loadSettings();
        
        this.addSettingTab(new CalloutPickerPluginSettingsTab(this.app, this));
        
        this.registerEditorSuggest(new CalloutEditorSuggest(app, this));
        
        this.app.workspace.onLayoutReady(async () => {
            this.calloutManager = await getApi(this);
        });
    }

    onunload() {
    }

    async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}


}