import { Plugin } from 'obsidian';
import { CalloutPickerPluginSettingsTab, CalloutPickerPluginSettings, DEFAULT_SETTINGS } from './settings'
import { CalloutEditorSuggest } from 'callout-editor-suggest';
import { CalloutManager } from "callout-manager"

export class CalloutPickerPlugin extends Plugin {
    public settings: CalloutPickerPluginSettings;
    public calloutManager: CalloutManager;
    private calloutEditorSuggest: CalloutEditorSuggest;

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new CalloutPickerPluginSettingsTab(this.app, this));
        this.calloutEditorSuggest = new CalloutEditorSuggest(app, this);
        this.registerEditorSuggest(this.calloutEditorSuggest);
        this.calloutManager = new CalloutManager(app, this);
        // periodically check if the obsidian-callout-manager is installed
        this.registerInterval(window.setInterval(() => this.calloutManager.handleObsidianCalloutManagerInstallationStatus(), 1000));
    }

    async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings)
            .then(() => this.calloutEditorSuggest.setTriggerExpression(this.settings.triggerPhrase));
	}
}


