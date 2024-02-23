const debounce = (callback, time) => {
    let timeoutId = null;

    return (...args) => {
        window.clearTimeout(timeoutId);

        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, time);
    };
};

const scuffed = (text) => {
    let newString = "";
    let lowercase = false;

    for (let index = 0; index < text.length; index++) {
        let char = text.charAt(index);
        char = lowercase ? char.toLowerCase() : char.toUpperCase();
        newString = newString + char;
        lowercase = !lowercase;
    }

    return newString;
};

const textBox = document.getElementById("textBox");

const handleInput = debounce(async (event) => {
    const text = scuffed(event.target.value);
    textBox.value = text;

    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error(error.message);
    }
}, 250);

textBox.addEventListener("input", handleInput);
