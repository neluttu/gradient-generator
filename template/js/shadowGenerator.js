document.addEventListener("DOMContentLoaded", function() {
    const xInput = document.getElementById("x-axis");
    const shadowXText = document.getElementById("range-x-axis-value");
    const yInput = document.getElementById("y-axis");
    const shadowYText = document.getElementById("range-y-axis-value");
    const blurInput = document.getElementById("blur");
    const blurText = document.getElementById("blur-value");
    const opacityInput = document.getElementById("opacity");
    const opacityText = document.getElementById("opacity-value");
    const shadowColorInputHex = document.getElementById("shadowColorHex");
    const shadowColorInput = document.getElementById("shadowColor");
    const cssResultText = document.getElementById("cssResult");
    const tailwindResult = document.getElementById("tailwindResult");
    const cssCode = document.getElementById("css-code");
    const tailwindCode = document.getElementById("tailwind-code");
    const container = document.getElementById("shadowContainer");

    document.getElementById("font").addEventListener("change", function () {
        let selectedFont = this.value;
        let shadowBox = document.getElementById("shadowBox");
        shadowBox.style.fontFamily = selectedFont;
    });
    
    function updateDropShadow() {
        const x = xInput.value + "px";
        const y = yInput.value + "px";
        const blur = blurInput.value + "px";
        const opacity = opacityInput.value;
        console.log(opacity);
        
        let color = event.target.value;

        if(event.target.id === 'shadowColorHex' || event.target.id === 'shadowColor') {
            event.target.id === 'shadowColorHex'
            ? (shadowColorInput.value = event.target.value)
            : (shadowColorInputHex.value = event.target.value);
        }
        else color = shadowColorInputHex.value;
        
        color = opacity != 1 ? hexToRGBA(color, opacity) : color;

        const boxShadowValue = `${x} ${y} ${blur} ${color}`;
        shadowBox.style.textShadow = boxShadowValue;

        shadowXText.textContent = xInput.value + ' px';
        shadowYText.textContent = yInput.value + ' px';
        blurText.textContent = blurInput.value + ' px';
        opacityText.textContent = opacity;
        
        var css = `text-shadow: ${x} ${y} ${blur} ${color};`;
        var tailwind = `[text-shadow:_${x}_${y}_${blur}_${color.replace(/ /g, "")}]`;

        cssResultText.textContent = css;
        tailwindResult.textContent = tailwind;

        cssCode.dataset.code = css;
        tailwindCode.dataset.code = tailwind;
    }

    function hexToRGBA(hex, alpha) {
        hex = hex.replace(/^#/, '');

        if (hex.length === 3) {
            hex = hex
                .split('')
                .map(char => char + char)
                .join('');
        }
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const a = alpha || 1.0;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    const inputElements = [xInput, yInput, blurInput, shadowColorInputHex, shadowColorInput, opacityInput];

    inputElements.forEach((input) => {
        input.addEventListener("input", updateDropShadow);
    });

    const cssCodeButtons = document.querySelectorAll("button[data-code]");
    cssCodeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const codeToCopy = this.getAttribute("data-code");
            const textArea = document.createElement("textarea");
            textArea.value = codeToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            const originalText = this.querySelector("span").textContent;
            this.querySelector("span").textContent = "Copied!";
            setTimeout(() => {
            this.querySelector("span").textContent = originalText;
            }, 3000);
        });
    });

});

function updateBackgroundColor(input) {
    const backgroundColor = input.value;
    const generatorWrap = document.getElementById("generator");
    generatorWrap.style.backgroundColor = backgroundColor;
    const relatedInput = input.id === 'backgroundHex' ? input.nextElementSibling : input.previousElementSibling;
    relatedInput.value = backgroundColor;
}


function updateTextColor(input) {
    const textColor = input.value;
    shadowBox.style.color = textColor;
    const relatedInput = input.id === 'textColorHex' ? input.nextElementSibling : input.previousElementSibling;
    relatedInput.value = textColor;
}

function changeTextSize() {
    const textSize = document.getElementById("textSize");
    const textSizeText = document.getElementById('textSize-value');
    const textSizeValue = textSize.value;
    shadowBox.style.fontSize = textSizeValue + 'px';
    textSizeText.textContent = textSizeValue + 'px';
}        


