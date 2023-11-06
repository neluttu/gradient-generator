document.addEventListener("DOMContentLoaded", function() {
    const selectedColor = document.querySelectorAll('input[type="radio"][name="userColor"]');

    const userColorFromText = document.getElementById('userColorFromText');
    const userColorViaText = document.getElementById('userColorViaText');
    const userColorToText = document.getElementById('userColorToText');

    const fromLabel = document.getElementById('from-label');
    const toLabel = document.getElementById('to-label');
    const viaLabel = document.getElementById('via-label');
    const gradientBox = document.getElementById('gradientBox');
    const tabSelect = document.querySelectorAll('input[type="radio"][name="color"]');
    let selectedTab = null;
    const useVia = document.getElementById('useVia');
    
    const gradientDirection = document.getElementById('gradientDirection');
    const gradientFrom = document.getElementById('gradientFrom');
    const gradientVia = document.getElementById('gradientVia');
    const gradientTo = document.getElementById('gradientTo');
    const directionInputs = document.querySelectorAll('input[type="radio"][name="direction"]');

    // CSS / TailwindCSS buttons + code
    const cssCode = document.getElementById("css-code");
    const tailwindCode = document.getElementById("tailwind-code");
    const cssResultText = document.getElementById("cssResult");
    const tailwindResult = document.getElementById("tailwindResult");

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
    
    selectedColor.forEach(twColor => {
        twColor.addEventListener('change', function () {
            // Fuck around and find out which tab si selected.
            tabSelect.forEach(twColor => {
                if (twColor.checked) 
                    selectedTab = twColor.value;
            });
            // Selected tab = selectedTab;
            
            if (this.checked) {
                if(selectedTab == 'from') {
                    userColorFromText.textContent = this.value;
                    gradientFrom.value = this.value;
                }
                else if (selectedTab == 'to') {
                    userColorToText.textContent = this.value;
                    gradientTo.value = this.value;
                }

                else if (selectedTab == 'via') {
                    userColorViaText.textContent = this.value;
                    gradientVia.value = this.value;
                }
            }
            updateGradientClasses();            
        });
    });                
   
    function updateGradientClasses() {
        const classes = gradientBox.classList;
        const prefixRegExp = /^(from-|bg-gradient-|to-|via-).*/;
        const filteredClasses = Array.from(classes).filter(className => !prefixRegExp.test(className));
        gradientBox.className = '';
        let viaValue = '';
        
        filteredClasses.forEach(className => {
            gradientBox.classList.add(className);
        });

        const classesToAdd = [
            'bg-gradient-to-' + gradientDirection.value,
            'from-' + gradientFrom.value
          ];
          
        if (useVia.checked) {
            classesToAdd.push('via-' + gradientVia.value);
            viaValue = 'via-' + gradientVia.value;
        }

          classesToAdd.push('to-' + gradientTo.value);
          gradientBox.classList.add(...classesToAdd);

          var tailwind = 'bg-gradient-to-' + gradientDirection.value + ' from-' + gradientFrom.value + ' ' + viaValue + ' to-' + gradientTo.value;
          tailwindResult.textContent = tailwind;
          tailwindCode.dataset.code = tailwind;
  
    }

    const radioInputs = document.querySelectorAll('input[name="color"]');

    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value == 'from') {
                fromLabel.classList.remove('tabInactive');
                fromLabel.classList.add('tabActive');
                viaLabel.classList.add('tabInactive');
                viaLabel.classList.remove('tabActive');
                toLabel.classList.add('tabInactive');
                toLabel.classList.remove('tabActive');
            }
            else if(this.value == 'to') {
                fromLabel.classList.add('tabInactive');
                fromLabel.classList.remove('tabActive');
                viaLabel.classList.add('tabInactive');
                viaLabel.classList.remove('tabActive');
                toLabel.classList.remove('tabInactive');
                toLabel.classList.add('tabActive');
            }

            else if(this.value == 'via') {
                fromLabel.classList.add('tabInactive');
                fromLabel.classList.remove('tabActive');
                viaLabel.classList.remove('tabInactive');
                viaLabel.classList.add('tabActive');
                toLabel.classList.add('tabInactive');
                toLabel.classList.remove('tabActive');
            }
        });
    });

    useVia.addEventListener('change', function() {
        viaLabel.classList.toggle('hidden');
        if(!useVia.checked) {
            updateGradientClasses();
            tabSelect[0].checked = true;
            fromLabel.classList.remove('tabInactive');
            fromLabel.classList.add('tabActive');
            toLabel.classList.remove('tabActive');
            toLabel.classList.add('tabInactive');

        }
    });

    directionInputs.forEach(radioButton => {
        radioButton.addEventListener('change', function() {
        if (this.checked) {
            gradientDirection.value = this.value;
            updateGradientClasses();
            }
        });
    });

});
