# Snake
A browser-based TypeScript implementation of the classic retro game, Snake ([Wikipedia](https://en.wikipedia.org/wiki/Snake_(video_game_genre)))

**[Click here to play the game](http://frankray.net/Snake/)**

Game features implemented so far are:
1. Mobile responsive layout
2. Keyboard / mouse / touch controls

### Technical Design
A non-UML class diagram for the Snake game is as follows:

![Class diagram for Snake game](https://github.com/FrankRay78/Snake/blob/master/documentation/Class%20diagram%20-%20cropped%20-%20resized%20800%20width.png)

| Class      | Description |
| ----------- | ----------- |
| Apple | Is given a location on the board and remains static until the snake eats it by running into the same square. The user's score is incremented and another apple placed on the board for the snake to eat. |
| Snake | Moves around the board 'eating' apples. Each apple eaten results in the snake growing in length, making it harder to remain in the game because the snake cannot run across itself or hit the edge of the board. |
| Game | A container for holding the Apple and Snake objects. Also responsible for handling user events (keyboard / mouse / touch), snake events (snake has eaten an apple, snake has run into itself, snake has fallen off the board) and game events ( game over). |
| GameRenderer | Responsible for rendering the game state at point of redraw. Converts the relative locations of Snake and Apple into pixel coordinates for rendering to an Html canvas element it contains a reference to. |

The game was implemented in HTML, CSS and TypeScript using Visual Studio 2019 as the development IDE.  

### Unit Testing
A comprehensive suite of unit tests have been written against the Apple and Snake classes to validate a lot of the game logic. Classes have been split out into separate TS files and loaded when needed through the [RequireJS](https://requirejs.org/) framework. The use of separate type files have allowed unit tests to be easily written against individual classes. [Jest](https://jestjs.io/) unit test framework was selected and remains a good choice due to ease of use and breadth of functionality. Both RequireJS and Jest were installed with [NPM (Node Package Manager)](https://docs.npmjs.com/about-npm).

### Development Backlog
1. ~~Make the Snake's length grow upon eating each apple~~ [Done - 21 January 2021]
2. ~~Collision detection of the snake upon itself~~ [Done - 21 January 2021]
3. ~~Unit testing (of TypeScript classes)~~ [Done - 20 January 2021]
4. GitHub post commit hook to execute unit tests
5. Persist high scores in a database with the help of a ASP.Net Web API service
6. Give the snake a timer and make it autonomous; redraw the Html canvas on browser screen refresh event
7. Implement a proper config file option ([example](https://stackoverflow.com/questions/41467801/how-to-create-an-application-specific-config-file-for-typescript))

### Resources
The following resources came in handy when implementing the game:
##### Getting started
* [Tutorial: Create an ASP.NET Core app with TypeScript in Visual Studio](https://docs.microsoft.com/en-us/visualstudio/javascript/tutorial-aspnet-with-typescript?view=vs-2019)
* [Getting the Right Set Up for TypeScript](https://www.stevefenton.co.uk/2013/01/getting-the-right-set-up-for-typescript/)
* [Multiple files making up Type Script project](https://stackoverflow.com/questions/15335474/multiple-files-making-up-type-script-project)
* [Can you create Typescript packages? like c# dlls](https://stackoverflow.com/questions/15664032/can-you-create-typescript-packages-like-c-sharp-dlls)
##### Interacting with HTML elements
* [Canvas Animations in TypeScript](https://codeburst.io/canvas-animations-in-typescript-97ba0163cb19)
* [Using Touch Events with the HTML5 Canvas](http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html)
* [Event Creation and Handling Techniques in TypeScript](https://hackwild.com/article/event-handling-techniques/)
##### JavaScript file and module loading
* [HOW TO GET STARTED WITH REQUIREJS](https://requirejs.org/docs/start.html#examples)
* [Using RequireJS with Visual Studio](https://devblogs.microsoft.com/visualstudio/using-requirejs-with-visual-studio/)
* [What's the correct way to use requireJS with typescript?](https://stackoverflow.com/questions/20079464/whats-the-correct-way-to-use-requirejs-with-typescript)
* [How to use npm installed requireJS for browser](https://stackoverflow.com/questions/35405412/how-to-use-npm-installed-requirejs-for-browser)
##### Unit testing
* [ts-jest](https://www.npmjs.com/package/ts-jest)
* [Unit Testing with Typescript and Jest](https://dev.to/muhajirdev/unit-testing-with-typescript-and-jest-2gln)
* [Jest - TypeScript Deep Dive](https://basarat.gitbook.io/typescript/intro-1/jest)
##### TypeScript language & development environment
* [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [Using ESLint with TypeScript in 2019](https://43081j.com/2019/02/using-eslint-with-typescript)
* [How to upgrade the version of ESLint used in Visual Studio 2019?](https://stackoverflow.com/questions/59422834/how-to-upgrade-the-version-of-eslint-used-in-visual-studio-2019)
* [Custom error class in TypeScript](https://stackoverflow.com/questions/31626231/custom-error-class-in-typescript)
* [How do I cast a JSON Object to a TypeScript class?](https://stackoverflow.com/questions/22875636/how-do-i-cast-a-json-object-to-a-typescript-class)
* [JavaScript Obfuscator Tool](https://obfuscator.io/)

### Credits
Royalty free Snake logo courtesy of [CLEANPNG](https://www.cleanpng.com/png-snakes-and-ladders-game-android-clip-art-animated-129978/)
