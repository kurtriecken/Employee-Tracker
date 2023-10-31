const figlet = require('figlet');

async function printWelcome() {
    await figlet("Welcome to the...\nEmployee Manager!", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(data);
});
};

module.exports = printWelcome;