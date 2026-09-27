/* ==========================================================================
   typewriter.js — types the hero heading out one letter at a time
   Hooked up by main.js, which finds the element with class="typewriter"
   (the <h1> in index.html) and passes it in as `root`.

   THE PLAN:
   1. Save the heading's full text, e.g. "Aloha, World!".
   2. Empty the heading so the page starts blank.
   3. Every ~100ms, add the next letter back.
   4. Stop once every letter is showing.
   ========================================================================== */

/**
 * Type out the text of `root` one character at a time.
 *
 * @param {HTMLElement} root The element whose text gets typed out.
 */
export function initTypewriter(root) {
  const fullText = root.textContent.trim();

  root.setAttribute("aria-label", fullText);
  root.textContent = "";

  const typed = document.createElement("span");
  const cursor = document.createElement("span");
  const rest = document.createElement("span");
  cursor.className = "typewriter__cursor";
  rest.className = "typewriter__rest";
  rest.textContent = fullText;

  for (const span of [typed, cursor, rest]) {
    span.setAttribute("aria-hidden", "true");
  }

  root.append(typed, cursor, rest);
  root.dataset.state = "typing";

  let count = 0;
  const timer = setInterval(() => {
    count++;
    typed.textContent = fullText.slice(0, count);
    rest.textContent = fullText.slice(count);

    if (count === fullText.length) {
      clearInterval(timer);
      root.dataset.state = "done";
    }
  }, 100);
}
