Gameplay core/engine complete

Required dependancies: esm, keypress (to test in console). 
JQuery not utilized yet for engine but likely required for DOM. Axios likely required for backend implementation but not yet utilized in engine.

Gameplay functions as intended in console-- lots of hours spent testing and making things work! Works with a dynamic board size (defined in constructor).

Does not currently automatically move the board down due to inability to implement async functions in the core. This will require the DOM (Farris) to define an async function that moves the board down (move("down)) at a constant rate; recommend 300-500ms and see from there how fast that is.

Colors are currently implemented via one of six variables in the core that can be used in the DOM to set a color. Originally only used the variable x but decided that would be difficult for the DOM to determine which elements should be which color. This way, while it looks weird in the console, the DOM can use conditional statements for each color variable and actually assign a color to the page in HTML.
