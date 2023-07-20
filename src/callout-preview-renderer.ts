import { getIcon, setIcon } from "obsidian";
import { Callout } from "callout";

export class CalloutPreviewRenderer {
    private static readonly DEFAULT_ICON: string = "lucide-pencil";
    
    static render(el: HTMLElement, callout: Callout): void {
        // build the elements
        const calloutDiv: HTMLDivElement = el.createDiv();
        const titleContainer: HTMLElement = calloutDiv.createDiv();
        const iconDiv: HTMLDivElement = titleContainer.createDiv();
        const titleDiv: HTMLDivElement = titleContainer.createDiv();
        
        calloutDiv.addClass("callout");
        calloutDiv.setAttribute("data-callout", callout.id);
        calloutDiv.style.margin = "0px";
        calloutDiv.style.padding = "8px";
        calloutDiv.style.width = "256px";
        
        titleContainer.addClass("callout-title");
        iconDiv.addClass("callout-icon");    
        titleDiv.addClass("callout-title-inner");    
        
        // Set the icon, set a pencil if not found
        const icon = getIcon(callout.icon);
        if(icon != null) {
            setIcon(iconDiv, callout.icon);
        }
        else {
            setIcon(iconDiv,this.DEFAULT_ICON)
        }

        titleDiv.setText(callout.title);
    }
}