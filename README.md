# Snake
A browser-based TypeScript implementation of the classic retro game, Snake ([Wikipedia](https://en.wikipedia.org/wiki/Snake_(video_game_genre)))

**Play the game --> [here](https://frankray78.github.io/Snake/) <--**

### Features
Implemented so far are:
1. Mobile responsive layout
2. Keyboard / mouse / touch controls

### TODO
1. Make the Snake's length grow upon eating each apple
2. Collision detection of the snake upon itself
3. Unit testing (of TypeScript classes) [**In progress**]
4. GitHub post commit hook to execute unit tests
5. Persist high scores in a database with the help of a webapi service
6. Give the snake a timer and make it autonomous; redraw the htmlcanvas on browser screen refresh event

### Technical & Design Commentary
Types have been split out into separate ts files and loaded when needed through the requirejs framework (installed with NPM). These separate type files will / should allow good unit tests to be written against the TypeScript classes to validate the game logic (once a unit test framework is selected)

### Resources
The following resources came in handy when implementing the game:
##### Getting Started
* [Tutorial: Create an ASP.NET Core app with TypeScript in Visual Studio](https://docs.microsoft.com/en-us/visualstudio/javascript/tutorial-aspnet-with-typescript?view=vs-2019)
* [Getting the Right Set Up for TypeScript](https://www.stevefenton.co.uk/2013/01/getting-the-right-set-up-for-typescript/)
* [Multiple files making up Type Script project](https://stackoverflow.com/questions/15335474/multiple-files-making-up-type-script-project)
* [Can you create Typescript packages? like c# dlls](https://stackoverflow.com/questions/15664032/can-you-create-typescript-packages-like-c-sharp-dlls)
##### Interacting with HTML Elements
* [Canvas Animations in TypeScript](https://codeburst.io/canvas-animations-in-typescript-97ba0163cb19)
* [Using Touch Events with the HTML5 Canvas](http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html)
* [Event Creation and Handling Techniques in TypeScript](https://hackwild.com/article/event-handling-techniques/)
##### JavaScript file and module loading
* [HOW TO GET STARTED WITH REQUIREJS](https://requirejs.org/docs/start.html#examples)
* [Using RequireJS with Visual Studio](https://devblogs.microsoft.com/visualstudio/using-requirejs-with-visual-studio/)
* [What's the correct way to use requireJS with typescript?](https://stackoverflow.com/questions/20079464/whats-the-correct-way-to-use-requirejs-with-typescript)
* [How to use npm installed requireJS for browser](https://stackoverflow.com/questions/35405412/how-to-use-npm-installed-requirejs-for-browser)
##### Unit Testing
* [ts-jest](https://www.npmjs.com/package/ts-jest)
* [Unit Testing with Typescript and Jest](https://dev.to/muhajirdev/unit-testing-with-typescript-and-jest-2gln)
* [Jest - TypeScript Deep Dive](https://basarat.gitbook.io/typescript/intro-1/jest)
##### TypeScript Language Reference
* [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Credits
Royalty free Snake logo courtesy of [CLEANPNG](https://www.cleanpng.com/png-snakes-and-ladders-game-android-clip-art-animated-129978/)
