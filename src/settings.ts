import { App, PluginSettingTab, Setting } from 'obsidian';
import { CalloutPickerPlugin } from './plugin';

export interface CalloutPickerPluginSettings {
	triggerPhrase: string;
}

export const DEFAULT_SETTINGS: CalloutPickerPluginSettings = {
    triggerPhrase: '>!',
}

export class CalloutPickerPluginSettingsTab extends PluginSettingTab {
	plugin: CalloutPickerPlugin;

	constructor(app: App, plugin: CalloutPickerPlugin) {
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
	}
}