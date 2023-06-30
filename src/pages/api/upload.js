import logger from "@/log";
import formidable from "formidable";
import fs from "fs"

export const config = {
    api: {
        bodyParser: false,
    }
}




export default async function handeler(req, res) {
    const form = new formidable.IncomingForm({ multiples: true });

    const formData = new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject("error");
            }
            resolve({ fields, files });
        });
    });


    const { fields, files } = await formData;
    //convert "files.files.filepath" to base64 and send it back to the client
    fs.readFile(files.files.filepath, (err, data) => {
        if (err) throw err;
        const base64 = Buffer.from(data).toString('base64');
        logger(JSON.stringify({ fields, files, length: base64.length }));
        res.status(200).json({ fields, files, base64, length: base64.length });
    });

}

