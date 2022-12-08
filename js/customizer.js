"use strict";

const customizer = {

    fontSizeScalingMatrix : [[0.875, 1, 1.25],
                            [1, 1.25, 1.5],
                            [1.125, 1.4, 1.65],
                            [1.375, 1.6, 1.85],
                            [1.625, 1.85, 2.1],
                            [2.125, 2.25, 2.5],
                            [2.5, 2.75, 3]],
    uniqueFontSizes : [],
    currentFontOption : 0, // 0, 1, 2 = small, medium, large
    currentTheme : "light",

    init : function() {
        this.uniqueFontSizes = this.getUniqueFontSizes();
        this.createControls();
    },

    getUniqueFontSizes : function() {
        let allFontSizes = [];
        for (const row of this.fontSizeScalingMatrix) {
            for (const fontSize of row) {
                allFontSizes.push(fontSize);
            }
        }
        const uniqueFontSizes = new Set(allFontSizes.sort());
        return Array.from(uniqueFontSizes);
    },

    createControls : function() {
        const mainContainer = document.querySelector(".container");
        const header = document.getElementsByTagName("header")[0];
        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("optionsContainer");
        const themeOption = this.createThemeOption();
        const fontSizeOptions = this.createFontSizeOptions();

        optionsContainer.append(themeOption, fontSizeOptions);
        mainContainer.insertBefore(optionsContainer, header);
    },

    createThemeOption : function() {
        const themeOption = document.createElement("input");
        themeOption.setAttribute("type", "button");
        themeOption.setAttribute("value", "Dark Theme");
        themeOption.addEventListener('click', this.changeTheme, false);
        themeOption.classList.add("themeOption");
        return themeOption;
    },

    changeTheme : function() {
        console.log("Changing theme");
        let newTheme;
        if (this.currentTheme === 'light') {
            newTheme = "dark";
        } else {
            newTheme = "light";
        }
        const elementsToAdjust = document.querySelectorAll(`body`)
        for (const element of elementsToAdjust) {
            element.classList.remove(this.currentTheme);
            element.classList.add(newTheme);
        }
    },

    createFontSizeOptions : function() {
        let fontSizeOptions = document.createElement("ul");
        fontSizeOptions.classList.add("fontSizeOptions")
        let smallFontOption = document.createElement("a");
        let mediumFontOption = document.createElement("a");
        let largeFontOption = document.createElement("a");

        smallFontOption.appendChild(document.createTextNode("A"));
        mediumFontOption.appendChild(document.createTextNode("A"));
        largeFontOption.appendChild(document.createTextNode("A"));

        smallFontOption.classList.add(this.convertToStyle(0.875), "smallFontOption");
        mediumFontOption.classList.add(this.convertToStyle(1), "mediumFontOption");
        largeFontOption.classList.add(this.convertToStyle(1.125), "largeFontOption");

        fontSizeOptions.addEventListener('click', this.resizeFonts, false);
    
        fontSizeOptions.append(smallFontOption, mediumFontOption, largeFontOption);
        return fontSizeOptions;
    },

    resizeFonts : function(event) {
        const newFontOption = customizer.getNewFontOption(event);
        if (newFontOption == undefined || newFontOption === customizer.currentFontOption) {
            return;
        }
 
        const selector = "h1[class*=fontSize], a[class*=fontSize], p[class*=fontSize], body";
        const elementsToAdjust = document.querySelectorAll(selector);
        for (const element of elementsToAdjust) {
            const currentStyle = customizer.getCurrentStyle(element);
            const newStyle = customizer.getNewStyle(currentStyle, newFontOption);
            element.classList.remove(currentStyle);
            element.classList.add(newStyle);
        }
        customizer.currentFontOption = newFontOption;
    },

    getNewFontOption : function(event) {
        const targetClassList = event.target.classList;
        if (targetClassList.contains("smallFontOption")) {
            return 0;
        } else if (targetClassList.contains("mediumFontOption")) {
            return 1;
        } else if (targetClassList.contains("largeFontOption")) {
            return 2;
        }
    },

    getCurrentStyle : function(element) {
        for (const style of element.classList) {
            if (style.includes("fontSize")) {
                return style;
            }
        }
    },

    getNewStyle : function(currentStyle, newFontOption) {
        const currentFontSize = customizer.findCurrentFontSize(currentStyle);
        const nextFontSize = customizer.findNextFontSize(currentFontSize, newFontOption);
        return customizer.convertToStyle(nextFontSize);
    },

    findCurrentFontSize : function(currentSize) {
        const fontSizeIndex = parseInt(currentSize.split("fontSize")[1]) - 1;
        return customizer.uniqueFontSizes[fontSizeIndex];
    },

    findNextFontSize : function(currentFontSize, newFontOption) {
        for (const row of customizer.fontSizeScalingMatrix) {
            if (row[customizer.currentFontOption] === currentFontSize) {
                return row[newFontOption];
            }
        }
    },

    convertToStyle : function(nextFontSize) {
        const fontSizeIndex = customizer.uniqueFontSizes.indexOf(nextFontSize);
        return `fontSize${fontSizeIndex + 1}`;
    }
    
}

customizer.init();