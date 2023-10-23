const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", function () {
        if (button.id === "clear") {
            display.value = '';
        } else if (button.id === "equals") {
            try {
                const result = eval(display.value);
                display.value = result;
            } catch (error) {
                display.value = 'Error';
            }
        } else {
            display.value += button.textContent;
        }
    });
});
