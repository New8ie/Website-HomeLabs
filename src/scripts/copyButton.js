// src/scripts/copyButton.js

document.addEventListener("DOMContentLoaded", () => {
  const codeBlocks = document.querySelectorAll("pre");

  codeBlocks.forEach((codeBlock) => {
    if (codeBlock.classList.contains("mermaid")) {
      return;
    }

    const textToCopy = codeBlock.textContent;
    if (!textToCopy) {
      return;
    }

    codeBlock.style.position = "relative";

    const button = document.createElement("button");
    button.className = "copy-button";
    button.innerText = "Copy";
    codeBlock.appendChild(button);

    button.addEventListener("click", () => {
      navigator.clipboard
        .writeText(textToCopy.trim())
        .then(() => {
          button.innerText = "Copied!";
          button.classList.add("copied");
          setTimeout(() => {
            button.innerText = "Copy";
            button.classList.remove("copied");
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          fallbackCopyText(textToCopy.trim());
        });
    });
  });

  function fallbackCopyText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
    document.body.removeChild(textarea);
  }
});
