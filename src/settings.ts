import { App, PluginSettingTab, Setting } from 'obsidian';
import { CalloutPickerPluginManager } from './plugin';

export interface CalloutPickerPluginSettings {
	triggerPhrase: string;
}

export class CalloutPickerPluginSettingsTab extends PluginSettingTab {
	plugin: CalloutPickerPluginManager;

	constructor(app: App, plugin: CalloutPickerPluginManager) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Settings for Callout Picker.' });

		new Setting(containerEl)
			.setName('Trigger phrase')
			.setDesc('The trigger phrase to show the callout selection popup')
			.addText(text => text
				.setPlaceholder('Enter the trigger phrase')
				.setValue(this.plugin.settings.triggerPhrase)
				.onChange(async (value) => {
					this.plugin.settings.triggerPhrase = value;
					await this.plugin.saveSettings();
				}));

		// new Setting(containerEl)
		// 	.setName('Capitalize callout titles')
		// 	.setDesc('Indicate if callout titles should be capitalized or not')
		// 	.addToggle(toggle => toggle
		// 		.setValue(this.plugin.settings.capitalizeCalloutTitles)
		// 		.onChange(async (value) => { 
		// 			this.plugin.settings.capitalizeCalloutTitles = value; 
		// 			await this.plugin.saveSettings(); 
		// 		}));
	}
}