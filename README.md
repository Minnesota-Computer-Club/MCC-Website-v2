# Minnesota Computer Club Website (v2)
The Minnesota Computer Club (MCC) is a Discord-based community of students and teachers from all across Minnesota. This repository houses all of the code used to create and maintain the club's website: [https://mncomputerclub.com](https://mncomputerclub.com).

This is the repository for Version 2 (v2) of the site. If you are looking for v1, you can find that here: [https://github.com/Minnesota-Computer-Club/MCC-Website](https://github.com/Minnesota-Computer-Club/MCC-Website).

## Table of Contents
- [Built Using](#built-using)
- [Running Locally](#running-locally)
  - [Install Dependencies](#install-dependencies)
  - [Clone Repo](#clone-repo)
  - [Install npm Packages](#install-npm-packages)
  - [Run Project](#run-project)
  - [Additional Commands to Know](#additional-commands-to-know)
  - [Obtaining Environmental Variables](#obtaining-environmental-variables)
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
- `npm run start`: This command will start and run a production environment locally. **Note:** This requires that you have built a local production version of the server by running `npm run build`.

### Obtaining Environmental Variables
Some parts of this repository require certain environmental variables to be set. Most commonly, you will run into this with the cron jobs found in `jobs/`.

If you are looking for these environmental variables, please reach out to a website administrator in the MCC Discord Server. We will help understand what you are attempting to accomplish and help set up your local development environment. **Note: The scripts in the `jobs/` directory are only intended to be run on our production server, so you should never need to touch anything in this directory.**

### Miscellaneous
Below are any miscellaneous notes that you should be aware of when attempting to run this project locally.

- All raw data that is used anywhere on the site (leaderboard data, form responses, etc.) are kept in a directory called `/generatedData` at the root level. This directory is being excluded (.gitignore-d) from this repository to protect personal information. You can create this directory at any time and create mock data `.json` files as needed to run a local development environment. If there are any questions about this, please raise those questions in the MCC Discord Server and we will help get you set up.
- Any miscellaneous notes or files that you want to keep locally can be put in a directory called `scratchpad` at the root of the project. This directory has been gitignore'd as a way for local developers to keep their own thoughts and files while ensuring that nothing is checked into the source repository.

## Contributing
All contributions are welcome! The ultimate goal is that the students of the club will run and maintain the site. Help is always available from mentors in the club.

To get started with a contribution, [open an issue on GitHub](https://github.com/Minnesota-Computer-Club/MCC-Website-v2/issues) to discuss what contribution(s) you would like to make. Then fork this repository and make all contributions in a `feature/` branch as a PR will be required before any changes are merged into the `main` branch. 

**If you need help getting started, please ask for help in the MCC Discord server! We would love to help get you working on something that you find interesting!**

## References and Acknowledgements
This project does use several SVGs from [https://heroicons.com/](https://heroicons.com/) and templates from [Tailwind UI](https://tailwindui.com/). These are great resources to use in your next project!
