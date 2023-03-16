<h1 align="center"> Noter </h1>

<p align="center">
    <img src="./src/../client/src/images/logo.png" alt="logo" width="125px" height="125px" />
  <br><br>
  <i> Text Editor
    <br> Progressive Web Application (PWA) </i>
  <br>
</p>
<br>

<div align="center">

![Node.js](https://img.shields.io/badge/node.js-87CEFA?logo=node.js)
![Express](https://img.shields.io/badge/express-87CEFA?logo=express)
![Webpack](https://img.shields.io/badge/webpack-87CEFA?logo=webpack)

</div>

---

## Description

Noter is a user-friendly and reliable text editor designed for coders. With Noter, you can easily create and manage your notes and code snippets with or without an internet connection. Whether you need to quickly jot down an idea, write a complex code snippet, or organize your thoughts and projects, Noter provides you with a seamless and intuitive experience. 

## Table of Contents

- [Description](#description)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [Cloning the Repository](#cloning-the-repository)
  - [Setting Up](#setting-up)
- [Mock-Up](#mock-up)
- [Usage](#usage)
- [Questions](#questions)
- [Contributing](#contributing)
  - [Contributing Guidelines](#contributing-guidelines)
  - [Code of Conduct](#code-of-conduct)
- [Credits](#credits)
  - [Acknowledgements](#acknowledgements)
  - [Links](#links)
- [License](#license)

## Installation

### Cloning the Repository

Click `<> code` - the green button. After clicking, in the local tab, copy the SSH key. Open the terminal in your Macbook or [git bash](https://git-scm.com/downloads), if you have Windows/Linux, and type:

```bash
git clone [paste ssh key]
```

### Setting Up

Open the project in VS Code and make sure you are in the directory of this application before installing the dependencies. To install it, type the commands below on your terminal:

```bash
npm i
```

Once you run this, npm will begin the installation process of all of the current project's dependencies.

## Mock-Up

The following animation demonstrates the application functionality:

![Noter](/assets/Noter.gif)

The following image shows the application's manifest.json file:

![manifest.json file](/assets/manifest.png)

The following image shows the application's registered service worker:

![Registered service worker](/assets/service-worker.png)

The following image shows the application's IndexedDB storage:

![ndexedDB storage](/assets/indexed-db.png)

## Usage

Launch the application by entering the command below on your terminal:

```bash
npm run start
```

Afterward, a similar output should appear in your terminal:

![Terminal code](/assets/terminal-code.png)

After bundling the files, a newly created folder named `dist` should be visible to you.

![dist folder](/assets/client-dist.png)

At this point, the Service Worker ought to be registered within the scope, enabling access to **Noter** through the following URL: http://localhost:3001/. 

However, if you happen to access the application via its official website, you can effortlessly proceed to the enjoyable part and create any content you desire, without the need for an internet connection.

Furthermore, **Noter** offers the option to install the application on your device. To proceed with the installation, click on the "install" button located in the upper left-hand corner of the screen, and immerse yourself in the experience!

## Questions

For questions and support feel free to contact me via:

<a href="mailto:larigens@gmail.com">📧 Email </a>

<a href="https://github.com/larigens">🐈‍⬛ GitHub </a>

## Contributing

### Contributing Guidelines

Want to report a bug, contribute some code, request a new feature, or improve the documentation? You can submit an issue and I will gladly welcome you as a contributor, but before submitting an issue, please search the issue tracker, as it may already exist!

### Code of Conduct

Our Code of Conduct follows the same principles as the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/), version 2.1.

## Credits

### Acknowledgements

- [Learn PWA](https://web.dev/learn/pwa/)
- [Chrome Developers - Service Worker](https://developer.chrome.com/docs/workbox/service-worker-overview/)
- [Invisible Heroes](https://gist.github.com/larigens/1ebfc077fe3e92d3b2b2430ce35f1207)
- [MDN Web Docs for Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Service Worker Overview](https://developer.chrome.com/docs/workbox/service-worker-overview/)
- [Service Workers in Javascript](https://www.geeksforgeeks.org/service-workers-in-javascript/)
- [What Are Service Workers and How to Use Them?](https://rajat-m.medium.com/what-are-service-workers-and-how-to-use-them-e993c1f497e6)
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Express.js](https://expressjs.com/en/4x/api.html)
- [Webpack](https://webpack.js.org/concepts/)
- [Workbox](https://developer.chrome.com/docs/workbox/)
- [Manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)
- [How to Deploy Vue PWA on Heroku](https://dev.to/mungaigikure/deploy-vue-pwa-on-heroku-11o2)

### Links

[![Linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lari-gui/)
[![Twitter](https://img.shields.io/badge/twitter-1DA1F2?style=flat&logo=twitter&logoColor=white)](https://twitter.com/coffeebr_eak)

## License

Please refer to the [LICENSE](https://choosealicense.com/licenses/apache-2.0/) in the repo.