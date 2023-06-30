import logger from "@/log";
import fs from "fs"

export default function handler(req, res) {
    //read the log file and return all its content
    fs.readFile('log.txt', (err, data) => {
        if (err) throw err;
        res.status(200).json(data.toString());
    })
}
