const figlet = require('figlet');

function printWelcome() {
    figlet("Radical, Dude!\nLet's Party!", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(data);
});
};

module.exports = printWelcome;