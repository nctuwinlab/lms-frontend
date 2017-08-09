# lms-frontend

## Requirements
lms is built upon a npm module [webpack](https://webpack.js.org/), a tool that enables the rapid development of components, templates and pages, so this project requires [Node.js](https://nodejs.org/) v6.11.2+ to be installed locally. A global install of Webpack is also recommended.

## Installation
To get the project up and running, and view components in the browser, complete the following steps:

1. Download and install Node: <https://nodejs.org/>
2. Clone this repo: `git@github.com:nctuwinlab/lms-frontend.git` (SSH) or `https://github.com/nctuwinlab/lms-frontend.git` (HTTPS)
3. [Optional] Install Webpack globally: `npm install webpack -g`
4. [Optional] Install Webpack Dev Server globally: `npm install webpack-dev-server -g`
5. Install project dependancies: `npm install`
6. Create the build folder: `mkdir build`
7. Start the development environment: `npm run dev`
8. Open your browser and visit <http://localhost:8080>

## Development
When developing components, you may want assets automatically compiled and the browser to refresh automatically. To do this, run the following task:

* `npm run dev`

## Creating a static build
To create a static instance of this project, run the following task:

* `npm run build`

This will create a bundle file called `index.bundle.js`, into which the required files will be created.

## Repo structure
Sometimes it’s helpful to know what all these different files are for…

```
/
├─ app/
│  ├─ index.jsx      # Base component of routers and redux
│  │
│  ├─ Actions/       # Redux actions
│  │
│  ├─ Components/    # Components
│  │  ├─ App.jsx     # …that render root component
│  │  ├─ Login/      # …that render component login form
│  │  ├─ Nav/        # …that render component navbar
│  │  ├─ Routes/     # …that govern route to every page
│  │  └─ Pages/      # …that render every single page
|  |
│  ├─ Reducers/      # Redux reducers
|  |
│  └─ css/           # SCSS files
│     ├─ Login/      # css mixin of login form
│     └─ Nav/        # css mixin of navbar
|
├─ node_modules/     # Files required for dynamic builds, created by npm (ignored by Git)
├─ build/            # Public build (ignored by Git)
│
├─ index.html        # entry HTML
├─ .gitignore        # List of files and folders not tracked by Git
├─ webpack.config.js # Configuration for Gulp tasks
├─ package.json      # Project manifest
└─ README.md         # This file
```
