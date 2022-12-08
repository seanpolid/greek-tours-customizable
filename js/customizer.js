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
        const themeOption = document.createElement("div");
        themeOption.appendChild(document.createTextNode("Dark Theme"));
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
        let fontSizeOptions = document.createElement("div");
        let smallFontOption = document.createElement("div");
        let mediumFontOption = document.createElement("div");
        let largeFontOption = document.createElement("div");

        smallFontOption.appendChild(document.createTextNode("A"));
        mediumFontOption.appendChild(document.createTextNode("A"));
        largeFontOption.appendChild(document.createTextNode("A"));

        smallFontOption.addEventListener('click', this.resizeFonts(0), false);
        mediumFontOption.addEventListener('click', this.resizeFonts(1), false);
        largeFontOption.addEventListener('click', this.resizeFonts(2), false);

        smallFontOption.classList.add("smallFontOption");
        mediumFontOption.classList.add("mediumFontOption");
        largeFontOption.classList.add("largeFontOption");
    
        fontSizeOptions.append(smallFontOption, mediumFontOption, largeFontOption);
        return fontSizeOptions;
    },

    resizeFonts : function(newFontOption) {
        console.log("scaling fonts");
        const elementsToAdjust = document.querySelectorAll("h1[class*=fontSize], a[class*=fontSize], p[class*=fontSize]");
        for (const element of elementsToAdjust) {
            const currentStyle = this.getCurrentStyle(element);
            const newStyle = this.getNewStyle(currentStyle, newFontOption);
            element.classList.remove(currentStyle);
            element.classList.add(newStyle);
        }
        this.currentFontOption = newFontOption;
    },

    getCurrentStyle : function(element) {
        for (const style of element.classList) {
            if (style.contains("fontSize")) {
                return style;
            }
        }
    },

    getNewStyle : function(currentStyle, newFontOption) {
        const currentFontSize = this.findCurrentFontSize(currentStyle);
        const nextFontSize = this.findNextFontSize(currentFontSize, newFontOption);
        return this.convertToStyle(nextFontSize);
    },

    findCurrentFontSize : function(currentSize) {
        const fontSizeIndex = parseInt(currentSize.split("fontSize")[1]) - 1;
        return this.uniqueFontSizes[fontSizeIndex];
    },

    findNextFontSize : function(currentFontSize, newFontOption) {
        for (const row of this.fontSizeScalingMatrix) {
            if (row[this.currentFontOption] === currentFontSize) {
                return row[newFontOption];
            }
        }
    },

    convertToStyle : function(nextFontSize) {
        const fontSizeIndex = this.uniqueFontSizes.indexOf(nextFontSize);
        return `fontSize${fontSizeIndex + 1}`;
    }
    
}

customizer.init();