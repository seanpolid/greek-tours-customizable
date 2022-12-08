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
    currentFontScale : 0, // 0, 1, 2 = small, medium, large
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
        return new Set(allFontSizes.sort());
    },

    createControls : function() {
        const mainContainer = document.querySelector("container");
        const optionsContainer = document.createElement("div");
        
        const themeOption = this.createThemeOption();
        const fontSizeOptions = this.createFontSizeOptions();

        optionsContainer.append(themeOption, fontSizeOptions);
        mainContainer.insertBefore('afterbegin', optionsContainer);
    },

    createThemeOption : function() {
        const themeOption = document.createElement("div");
        themeOption.appendChild(document.createTextNode("Dark Theme"));
        themeOption.addEventListener('click', this.changeTheme, false);
        themeOption.classList.add("themeOption");
        return themeOption;
    },

    changeTheme : function() {
        let newTheme;
        if (this.currentTheme === 'light') {
            newTheme = "dark";
        } else {
            newTheme = "light";
        }
        const elementsToAdjust = document.querySelectorAll(`class^=${this.currentTheme}`)
        for (const element of elementsToAdjust) {
            element.classList.remove(this.currentTheme);
            element.classList.add(newTheme);
        }
    },

    createFontSizeOptions : function() {
        const fontSizeOptions = document.createElement("div");
        const smallFontSize = document.createElement("div");
        const mediumFontSize = document.createElement("div");
        const largeFontSize = document.createElement("div");
        
        const exampleText = document.createTextNode("A");
        smallFontSize.appendChild(exampleText);
        mediumFontSize.appendChild(exampleText);
        largeFontSize.appendChild(exampleText);

        smallFontSize.addEventListener('click', this.scaleAllFonts(0), false);
        mediumFontSize.addEventListener('click', this.scaleAllFonts(1), false);
        largeFontSize.addEventListener('click', this.scaleAllFonts(2), false);

        return fontSizeOptions;
    },

    scaleAllFonts : function(newFontScale) {
        const elementsToAdjust = document.querySelectorAll("class^=fontSize");
        for (const element of elementsToAdjust) {
            const currentStyle = this.getCurrentStyle(element);
            const newStyle = this.getNewStyle(currentStyle, newFontScale);
            element.classList.remove(currentStyle);
            element.classList.add(newStyle);
        }
        this.prevScaleFactor = newFontScale;
    },

    getCurrentStyle : function(element) {
        for (const style of element.classList) {
            if (style.contains("fontSize")) {
                return style;
            }
        }
    },

    getNewStyle : function(currentStyle, newFontScale) {
        const currentFontSize = this.findCurrentFontSize(currentStyle);
        const nextFontSize = this.findNextFontSize(currentFontSize, newFontScale);
        return this.convertToStyle(nextFontSize);
    },

    findNextFontSize : function(currentFontSize, newFontScale) {
        const scaleDirection = newFontScale - this.currentFontScale;
        const nextFontSizeIndex = this.currentFontScale + scaleDirection;
        for (const row of this.fontSizeScalingMatrix) {
            if (row[this.currentFontScale] === currentFontSize) {
                return row[nextFontSizeIndex];
            }
        }
    },

    findCurrentFontSize : function(currentSize) {
        const fontSizeIndex = parseInt(currentSize.split("fontSize")[1]) - 1;
        return Array.from(this.uniqueFontSizes)[fontSizeIndex];
    },

    convertToStyle : function(nextFontSize) {
        const fontSizeIndex = Array.from(this.uniqueFontSizes).indexOf(nextFontSize);
        return `fontSize${fontSizeIndex + 1}`;
    }
    
}

customizer.init();