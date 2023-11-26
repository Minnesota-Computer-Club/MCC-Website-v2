const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.PORT ? "http://localhost:" + process.env.PORT : "http://localhost:3000", // https://filiphric.com/cypress-basics-using-baseurl
  },
});
