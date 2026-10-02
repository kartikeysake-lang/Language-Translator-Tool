const inputText = document.getElementById("inputText");
const counter = document.getElementById("counter");


// Character Counter
inputText.addEventListener("input", function () {
    counter.innerText = inputText.value.length + " Characters";
});


// Translation Function
async function translateText() {

    const text = inputText.value.trim();
    const source = document.getElementById("sourceLang").value;
    const target = document.getElementById("targetLang").value;
    const loader = document.getElementById("loader");
    const output = document.getElementById("outputText");

    // Empty input
    if (text === "") {
        alert("Please enter text");
        return;
    }

    // Same language
    if (source === target) {
        alert("Source and target language cannot be same");
        return;
    }

    loader.style.display = "block";
    output.value = "";

    try {

        const url =
            "https://api.mymemory.translated.net/get?q=" +
            encodeURIComponent(text) +
            "&langpair=" +
            source +
            "|" +
            target;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("API Error: " + response.status);
        }

        const data = await response.json();

        console.log("API Response:", data);

        if (data.responseStatus !== 200) {
            throw new Error(
                data.responseDetails || "Translation failed"
            );
        }

        output.value = data.responseData.translatedText;

    } catch (error) {

        console.error("Translation Error:", error);

        alert("Translation failed: " + error.message);

    } finally {

        loader.style.display = "none";
    }
}


// Copy Function
function copyText() {

    const output = document.getElementById("outputText");

    if (output.value === "") {
        alert("Nothing to copy");
        return;
    }

    navigator.clipboard.writeText(output.value);

    alert("Copied Successfully");
}