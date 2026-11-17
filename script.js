// Get HTML elements
const numberInput = document.getElementById("number");
const fromBase = document.getElementById("fromBase");
const toBase = document.getElementById("toBase");
const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");

// Convert button
convertBtn.addEventListener("click", function () {

    const number = numberInput.value.trim();
    const from = Number(fromBase.value);
    const to = Number(toBase.value);

    // Check empty input
    if (number === "") {
        result.textContent = "Please enter a number";
        return;
    }

    // Check valid digits
    const digits = "0123456789ABCDEF";
    const validDigits = digits.slice(0, from);

    const upperNumber = number.toUpperCase();

    for (const digit of upperNumber) {
        if (!validDigits.includes(digit)) {
            result.textContent = "Invalid number for selected base";
            return;
        }
    }

    // Convert input into decimal using BigInt
    let decimal = 0n;

    for (const digit of upperNumber) {
        decimal = decimal * BigInt(from)
                + BigInt(digits.indexOf(digit));
    }

    // Convert decimal into target base
    const answer = decimal.toString(to).toUpperCase();

    // Display answer
    result.textContent = answer;
});

// Clear button
clearBtn.addEventListener("click", function () {

    numberInput.value = "";
    result.textContent = "Your answer will appear here";

});
// Copy result button
copyBtn.addEventListener("click", async function () {

    const answer = result.textContent;

    if (
        answer === "Your answer will appear here" ||
        answer === "Please enter a number" ||
        answer === "Invalid number for selected base"
    ) {
        result.textContent = "Convert a number first!";
        return;
    }

    try {
        await navigator.clipboard.writeText(answer);

        copyBtn.textContent = "Copied!";

        setTimeout(function () {
            copyBtn.textContent = "Copy Result";
        }, 1500);

    } catch (error) {
        result.textContent = "Copy unavailable. Try using localhost or HTTPS.";
    }

});
// Register Binora X service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => {
        console.log("Binora X offline support is ready.");
      })
      .catch((error) => {
        console.error("Service worker registration failed:", error);
      });
  });
}