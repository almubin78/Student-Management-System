const cron = require("node-cron");
const { createMonthData } = require("../controller/recordController");


// Run on the last day of every month at midnight

cron.schedule("0 0 28-31 * *", () => {
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  if (today.getDate() === lastDay) {
    createMonthData();
  }
});

// test corn
// cron.schedule("*/2 * * * * *", () => {
//   console.log(`Running createMonthData() for testing at ${new Date().toLocaleTimeString()}`);
//   createMonthData();
// });
