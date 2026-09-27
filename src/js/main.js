/* ==========================================================================
   main.js — the ONE script every page loads
   index.html, about.html, and problem-set-visualizer.html all end with:

     <script type="module" src="./js/main.js"></script>

   type="module" matters, it turns on three things:
   - import/export work, so code can be split across files (see below).
   - The script waits until the HTML is fully parsed before running, so
     every element already exists when document.querySelector() looks.
   - Variables and functions stay private to their file. Nothing becomes a
     global, which is why onclick="myFunction()" in the HTML cannot see
     functions defined here. Hook up behavior from JS instead.

   HOW THE PIECES FIT:
     HTML element with a class  →  main.js finds it  →  calls that
     (e.g. class="typewriter")     with querySelector    module's init function

   ADDING A NEW SCRIPT FILE (e.g. js/clock.js):
   1. Create js/clock.js and export a function from it:
        export function initClock(root) { ... }
   2. Import it at the top of this file:
        import { initClock } from "./clock.js";
      The "./" and ".js" are required. Browsers do not guess extensions.
   3. Inside main() below, find the element and call the function:
        const clock = document.querySelector(".clock");
        if (clock) initClock(clock);
   4. Add class="clock" to an element in the HTML.
   You never add another <script> tag. main.js is the only entry point.

   DEBUGGING: console.log("anything", someVariable) prints to the browser's
   DevTools console (Cmd+Option+J in Chrome, Cmd+Option+C in Safari).
   Errors show up there in red too. Check it first when nothing happens.
   ========================================================================== */

/* 1. Imports -------------------------------------------------------------- */
/* Pull in the init function each module exports. The name in { } must match
   the name after "export function" in that file exactly. */
import { initTypewriter } from "./typewriter.js";

/* 2. Wiring --------------------------------------------------------------- */
/* "async" only exists so the visualizer can be loaded with "await import"
   at the bottom. Everything else here runs top to bottom as normal. */
async function main() {
  /* document.querySelector(selector) returns the FIRST element that matches
     a CSS selector, or null if there is none. Same selectors as in CSS:
       ".typewriter"  → class="typewriter"
       "#hero-title"  → id="hero-title"
       "h1"           → the first <h1>
     Need every match? document.querySelectorAll(".card") returns a list
     you can loop over with for (const card of cards) { ... }. */
  const typewriter = document.querySelector(".typewriter");
  const visualizer = document.querySelector(".visualizer");

  /* Every page runs this file, but not every page has every component.
     The if-check skips modules whose element is not on this page, so
     about.html does not crash looking for a typewriter it lacks. */
  if (typewriter) {
    initTypewriter(typewriter);
  }

  /* Only the visualizer page pays for the visualizer's modules. import()
     with parentheses downloads the file on demand, only when this runs. */
  if (visualizer) {
    const { initVisualizer } = await import("./visualizer/app.js");
    initVisualizer(visualizer);
  }
}

/* 3. Run ------------------------------------------------------------------ */
/* Defining a function does nothing on its own. This line actually runs it. */
main();
