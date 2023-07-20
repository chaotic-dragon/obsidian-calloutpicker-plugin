# Obsidian Callout Picker Plugin

This is a callout picker plugin for Obsidian (https://obsidian.md).

## Introduction

This plugin allows you to add a callout anywhere at any time using a trigger sequence. The trigger sequence is configurable in the settings. The popup will also trigger when you use the default '> [!]' markup.

There are a few other plugins with similar functionality, but they did not work (anymore) or did not work like I wanted them to, so I decided to make my own.

This is my first plugin for Obsidian. I hope it's useful for someone else, too!

## Requirements
- Obsidian 1.3.5
  - I haven't tested this with older versions of Obsidian. It might work. 
- Obsidian Callout Manager (optional)
  - If you use the Obsidian Callout Manager, the callout suggestions will be loaded through its API; support is, for now, limited to using the ID's. Styling is done by Obsidian, so the custom glyphs and colors will work.

## Usage
There are 3 scenario's in which the suggestion popup is triggered;
1. When you type the trigger phrase on a new line;
2. When you type the trigger phrase on a line with text. In this case the prececing text is automatically set in the content of the callout.
3. When you type the default callout markup, i.e. '> [!]'

## Settings
TBD

## Demo
TBD, maybe.

## Installation
### Using the plugin browser
You can install the plugin via the Community Plugins tab within Obsidian.

### Manually
- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/obsidian-calloutpicker-plugin/`.

## Future development
Things I might add in the future:
- [ ] Add functionality select a callout after pressing a hotkey.

## Credits
Thanks to [eth-p](https://github.com/eth-p) for providing an API on [obsidian-callout-manager](https://github.com/eth-p/obsidian-callout-manager).

## Help me with my coffee addiction
Pls for send coffees.
