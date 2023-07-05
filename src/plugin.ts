import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { CalloutPickerPluginSettingsTab, CalloutPickerPluginSettings } from './settings'
import { CalloutSuggest } from 'suggest';

const DEFAULT_SETTINGS: CalloutPickerPluginSettings = {
 	mySetting: 'default'
}

export class CalloutPickerPluginManager extends Plugin {
    settings: CalloutPickerPluginSettings

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new CalloutPickerPluginSettingsTab(this.app, this));
        this.registerEditorSuggest(new CalloutSuggest(app, this.settings));
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