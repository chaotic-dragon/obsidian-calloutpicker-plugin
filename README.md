# Obsidian Callout Picker Plugin
A callout picker plugin for Obsidian (https://obsidian.md) that helps you create callouts in your documents.

## Introduction
This plugin allows you to add a callout anywhere at any time using a trigger sequence. The trigger sequence is configurable in the settings. The popup will also trigger when you use the default '> [!]' markup.

There are a few other plugins with similar functionality but did not work like I wanted them to, so I decided to create my own plugin.

This is my first plugin for Obsidian. I hope it's useful for someone else, too!

## Requirements
- Obsidian 1.3.5
  - I haven't tested this with older versions of Obsidian. It might work, but you'll need to do a manual installation. 
- (Optional) [obsidian-callout-manager](https://github.com/eth-p/obsidian-callout-manager)
  - If you use the Obsidian Callout Manager, the callout suggestions will be loaded through its API; support is, for now, limited to using the ID's. Styling in the suggestion popup is done by using Obsidian style classes, and the custom glyphs created by the callout manager and colors will also be displayed correctly.
  - The callout picker plugin detects when [obsidian-callout-manager](https://github.com/eth-p/obsidian-callout-manager) is enabled / disabled. 

## Usage
There are 3 scenario's in which the suggestion popup is triggered.
1. When you type the trigger phrase on a new line. The default trigger phrase is `>!`.
2. When you type the trigger phrase on a line with text. In this case the prececing text on the current line is automatically set in the content of the callout.
3. When you type the default callout markup, as in when you type `> [!]`

### Limitations
* While it is possible to create nested callouts, this plugin does not support it directly because of the way the editor content is replaces when selecting a suggestion.
* If you add custom CSS styles for non-default callouts they will not be in the suggestion popup.

## Settings
You can configure the trigger phrase in the plugin settings.

The phrase will be part of a regular expression, special characters are encoded but it's probably best if you don't use a super weird trigger phrase :)

## Installation
### Using the plugin browser
You can install the plugin via the Community Plugins tab within Obsidian.

### Manually
- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/obsidian-calloutpicker-plugin/`.

## Future development
Things I might add in the future:
- [ ] Add functionality select a callout after pressing a hotkey.
- [ ] Add (simple) support for custom stylesheets when not using [obsidian-callout-manager](https://github.com/eth-p/obsidian-callout-manager).
      - I do NOT intend to re-create [obsidian-callout-manager](https://github.com/eth-p/obsidian-callout-manager) so if I add this functionality it will basic.
- [ ] Using the preceding block of text / paragraph as content.
- [ ] Allow nesting of callouts.

## Credits
Thanks to [eth-p](https://github.com/eth-p) for providing an API on their [obsidian-callout-manager](https://github.com/eth-p/obsidian-callout-manager).

## Help me with my coffee addiction
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/H2H3NF546)