import fs from "fs";


function gettime() {
    const date = new Date(Date.now());
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${day}/${month}/${year}:${hours}:${minutes}:${seconds} : `;
}
// create a function that appends a line (log.txt in the root of this nextjs app)
function logger(text) {
    fs.appendFile('log.txt', gettime() + text + "\n", function (err) {
        if (err) throw err;
    });
}

export default logger;