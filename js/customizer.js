"use strict";

const customizer = {

    currentFontSize : "regular",
    currentTheme : "light",

    init : function() {
        this.createControls();
    },

    createControls : function() {
        const mainContainer = document.querySelector(".container");
        const header = document.getElementsByTagName("header")[0];

        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("optionsContainer");
        optionsContainer.setAttribute("aria-hidden", "true");

        const themeOption = this.createThemeOption();
        const fontSizeOptions = this.createFontOptions();
        
        optionsContainer.append(themeOption, fontSizeOptions);
        mainContainer.insertBefore(optionsContainer, header);
    },

    createThemeOption : function() {
        const themeOption = document.createElement("input");
        themeOption.setAttribute("type", "button");
        themeOption.setAttribute("value", "Dark Theme");
        themeOption.addEventListener('click', this.changeTheme, false);
        themeOption.classList.add("themeOption", "regular");
        return themeOption;
    },

    changeTheme : function() {
        console.log("Changing theme");
        let newTheme, newValue;
        if (customizer.currentTheme === 'light') {
            newTheme = "dark";
            newValue = "Light Theme";
        } else {
            newTheme = "light";
            newValue = "Dark Theme";
        }
        document.querySelector(".themeOption").setAttribute("value", newValue);
        
        const elementsToAdjust = document.querySelectorAll("[class*=light], [class*=dark]");
        for (let element of elementsToAdjust) {
            element.classList.remove(customizer.currentTheme);
            element.classList.add(newTheme);
        }
        customizer.currentTheme = newTheme;
    },

    createFontOptions : function() {
        let fontOptions = document.createElement("div");
        fontOptions.classList.add("fontSizeOptions")

        const smallFontOption = customizer.createFontOption('Regular Text Size', 'regularFontOption');
        const mediumFontOption = customizer.createFontOption('Larger Text Size', 'largerFontOption');
        const largeFontOption = customizer.createFontOption('Largest Text Size', 'largestFontOption');

        smallFontOption.classList.add("selected");

        fontOptions.addEventListener('click', this.selectFontSizeOption, false);
        fontOptions.addEventListener('click', this.resizeFonts, false);
        fontOptions.append(smallFontOption, mediumFontOption, largeFontOption);
        return fontOptions;
    },

    createFontOption : function(title, classIdentifier) {
        let fontSizeOption = document.createElement("a");
        fontSizeOption.appendChild(document.createTextNode("A"));
        fontSizeOption.setAttribute("href", "#");
        fontSizeOption.setAttribute("title", title);
        fontSizeOption.classList.add(classIdentifier, "regular");
        fontSizeOption.addEventListener('click', event => {
            event.preventDefault();
        }, false);
        return fontSizeOption;
    },

    selectFontSizeOption : function(event) {
        const selectedFontSizeOption = document.querySelector(".selected");
        if (selectedFontSizeOption) {
            selectedFontSizeOption.classList.remove("selected");
        }
        if (customizer.getNewFontSize(event) !== undefined) {
            event.target.classList.add("selected");
        }
    },

    resizeFonts : function(event) {
        const currentFontSize = customizer.currentFontSize;
        const newFontSize = customizer.getNewFontSize(event);
        if (newFontSize == undefined || newFontSize === currentFontSize) {
            return;
        }
 
        const elementsToAdjust = document.querySelectorAll(`.${currentFontSize}`);
        for (const element of elementsToAdjust) {
            element.classList.remove(currentFontSize);
            element.classList.add(newFontSize);
        }
        customizer.currentFontSize = newFontSize;
    },

    getNewFontSize : function(event) {
        const targetClassList = event.target.classList;
        if (targetClassList.contains("regularFontOption")) {
            return "regular";
        } else if (targetClassList.contains("largerFontOption")) {
            return "larger";
        } else if (targetClassList.contains("largestFontOption")) {
            return "largest";
        } 
    },
    
}

customizer.init();