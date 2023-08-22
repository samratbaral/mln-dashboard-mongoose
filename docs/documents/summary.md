
##  [< Back](/README.md) to README File
# Code Organization

Code is organized under the following major files and directories:

```text
|
├── docs: some papers that might be relevant for the project
|    |
|    ├── Research: Relevant Research Paper
|    └── Documents-App: documentation for us, future developers, and the community
|       ├── gettingstarted.md: How to get Started with MLN Dashboard.
|       └── summary.md: Understand the file structure and MLN Dashboard overall.
|
├── src
|    |
|    |── Controller: Main implementaion for get,post,fetch,delete goes here.
|    |    |
|    |    ├── admin.js: [TODO]Implement Admin User
|    |    ├── auth.js: Authenticate User
|    |    ├── error.js: Handles Errors
|    |    └── mln-home.js : Handle the file system, layer |generation, set config, analysis & visualization
|    |
|    ├── Middleware: Handles all the Middle Ware between js application.
|    |    |
|    |    └── is-auth.js: redirects to log-in
|    |
|    ├── Models: Set the model/class for the system arch.
|    |    |
|    |    ├── analysis.js:  model/class for the analysis.
|    |    ├── backup.js: [TODO] Some backup for fetching data.
|    |    ├── generation.js: model/class for the generation layer.
|    |    └── user.js: model/class for the user.
|    |
|    ├── Public: static web resources. express.js requires this to be in the root
|    |    |
|    |    ├── css: all css file which support express.js
|    |    |   ├── auth.css: authentication css file which support express.js
|    |    |   ├── forums.css: Form css file which support express.js
|    |    |   └── main.css: main css file which support express.js
|    |    |
|    |    ├── image: all png file which support express.js
|    |    |   ├── favicon.png: MLN dashboard picture 1x
|    |    |   └── favicon2x.png: MLN dashboard picture 2x
|    |    |
|    |    └── js: javascript support to nodeJS
|    |        └── main.js: javascript which handles as NodeJS.
|    |
|    ├── Routes: Routes Javascript files that support express.js
|    |    |
|    |    ├── admin.js: Routes to [TODO]Implement Admin User
|    |    ├── auth.js: Routes to Authenticate User
|    |    └── mln-home.js : Routes to Handle the file system, layer generation, set config, analysis & visualization
|    |
|    ├── Utilities: Some Javascript Code that help utlitizing NodeJS app.
|    |    |
|    |    ├── database.js: [TODO] Implement users dictionary.
|    |    ├── file.js: Handles file system in javascript
|    |    └──  path.js: Handles path in javascript
|    |
|    └── Views: All express.JS goes here
|         |
|         ├── admin: source code goes here
|         |   |
|         |   ├── admins.ejs: [TODO] Needs Implementation
|         |   └── edit-admins.ejs: [TODO] Needs Implementation
|         |
|         ├── auth: source code goes here
|         |   |
|         |   ├── delete-user.ejs: express.js for deleting existing user
|         |   ├── homepage.ejs: express.js for landing page when user click on the url.
|         |   ├── login.ejs: express.js for logging new user.
|         |   ├── new-password.ejs: express.js for new password reset.
|         |   ├── reset.ejs: express.js for  reset password
|         |   └── signup.ejs: express.js for signing new user
|         |
|         ├── includes: source code goes here
|         |   |
|         |   ├── ends.ejs: express.js ends only
|         |   ├── head.ejs: express.js heads only
|         |   └──  navigation.ejs: express.js main dashboard
|         |
|         └── research: source code goes here
|             |
|             ├── analysis.ejs: [TODO] Needs Implementation
|             ├── create-file.ejs: [TODO] Needs Implementation
|             ├── genfile.ejs: [TODO] Needs Implementation
|             ├── user-directory.ejs: [TODO] Needs Implementation
|             └── cd.ejs: Implemented change direectory 
|             └── viewfile.ejs: Implemented Root User Directory
|             └── viewfilecontent.ejs: Implemented to View File Content.
|
├── .env: Set Environment Variable to set serect value and key.
|
├── 404.ejs: Page Not Found Error
|
├── 500.ejs: Error Handles when it cannot be debugged.
|
├── .gitignore: Git Ignore file while push/pull to GitHub.
|
├── app.js: NodeJS app Backend source code which runs the server.
|
├── app.py: Python Flask app Frontend source code which runs the server.
|
├── CITATION: source code goes here
|
├── CONTRIBUTION: source code goes here
|
├── LICENSE: MIT License
|
├── Test: [TODO] Needs Implementation
|    └──  test.js: [TODO]Implementation Needed.
|
├── README: Overview page for MLN-Dashboard
|
└── ... developer files (vscode, node_modules, git, npm, etc)
```

## Code Style

Code (mostly) adheres to [Google's JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html):

- camelCase is used for variable names and modularized css classes
- `const` instead of `var` or `let` is employed wherever possible
- jsdoc comments are / should be included for each function/class/etc.

While no hard formatting rules are enforced, eg, indentation level, tab vs. space, max length, etc., the code is formatted in a way that is easy to read and modify.
