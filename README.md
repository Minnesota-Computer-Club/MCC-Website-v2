# Minnesota Computer Club Website (v2)
The Minnesota Computer Club (MCC) is a Discord-based community of students and teachers from all across Minnesota. This repository houses all of the code used to create and maintain the club's website: [https://mncomputerclub.com](https://mncomputerclub.com).

This is the repository for Version 2 (v2) of the site. If you are looking for v1, you can find that here: [https://github.com/Minnesota-Computer-Club/MCC-Website](https://github.com/Minnesota-Computer-Club/MCC-Website).

## Table of Contents
- [Built Using](#built-using)
- [Running Locally](#running-locally)
  - [Install Dependencies](#install-dependencies)
  - [Clone Repo](#clone-repo)
  - [Install npm Packages](#install-npm-packages)
  - [Create `.env` File for Environmental Secrets](#create-env-file-for-environmental-secrets)
  - [Run Project](#run-project)
  - [Additional Commands to Know](#additional-commands-to-know)
  - [Miscellaneous](#miscellaneous)
- [Contributing](#contributing)
- [References and Acknowledgements](#references-and-acknowledgements)

## Built Using
The Minnesota Computer Club website was built using:
- [Next.js](https://nextjs.org) (v13.0.0+)
- [Node.js](https://nodejs.org/en/) (v19.5.0+)
- [Tailwind CSS](https://tailwindcss.com) (v3.2.0+)

## Running Locally
It is easy to get a copy of of MCC website running locally.

### Install Dependencies
In order to run the website locally, the following will need to be installed on your development environment:
- [npm](https://www.npmjs.com) (required)
  - npm is used to manage the packages needed by the MCC Website to run on top of Node.js
  - **Installation Instructions:** [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Clone Repo
Navigate to the location on your development machine where you want to place this project's directory and clone the repository by running the following command:

    git clone https://github.com/Minnesota-Computer-Club/MCC-Website.git

### Install npm Packages
The MCC website requires several npm packages to be installed. Those packages can be installed by running:

    npm install

### Create `.env` File for Environmental Secrets
A major change with the v2 website is that all secrets are stored locally in a `.env` file that you need to create at the root of this project's directory. There is an example `.env.example` file included with this repository. You can copy its contents into a new `.env` file that you create and replace the temporary secrets with real values (as you need them).

**Note:** Depending on what you are attempting to accomplish, this step may or may not be necessary. If you have any questions, please raise them in the MCC Discord Server.

### Run Project
When you are ready to run the project locally, navigate to the directory with this repository's code on your local machine. 

Start the MCC website by running:

    npm run dev

This command is going to start a local development server for you to make changes locally.

### Additional Commands to Know
*All of the commands below should be run from the root directory of this project.*

There are several other commands defined in `package.json` that you should be familiar with:
- `npm run build`: This command can be run if you want to generate an optimized version of the website for production. Read more at [https://nextjs.org/docs/deployment](https://nextjs.org/docs/deployment).
- `NODE_ENV=production node index.js`: This command will start our custom Express server and run a production environment locally. **Note:** This requires that you have built a local production version of the server by running `npm run build`.

### Miscellaneous
Below are any miscellaneous notes that you should be aware of when attempting to run this project locally.

- All raw data that is used anywhere on the site (leaderboard data, form responses, etc.) are kept in a directory called `/generatedData` at the root level. This directory is being excluded (.gitignore-d) from this repository to protect personal information. You can create this directory at any time and create mock data `.json` files as needed to run a local development environment. If there are any questions about this, please raise those questions in the MCC Discord Server.

## Contributing
All contributions are welcome! 

First, open an issue to discuss what contributions you would like to make. 

Start by forking this repository and make all contributions in a `feature/` branch as a PR will be required before any changes are merged into the `main` branch.

## References and Acknowledgements
This project does use several SVGs from [https://heroicons.com/](https://heroicons.com/) and templates from [Tailwind UI](https://tailwindui.com/). These are great resources to use in your next project!
