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

    const isArray = Array.isArray(files.file)
    if (!isArray) {
        files.file = [files.file]
    }
    const attachements = [];
    for (let i = 0; i < files.file.length; i++) {
        const file = files.file[i];
        const buffer = await fs.promises.readFile(file.filepath)
        const new_file = {
            name: file.originalFilename,
            datas: buffer.toString("base64"),
            res_model: 'hr.applicant'
        }
        attachements.push(new_file)
    }

    attachements.push({
        name: "detaills.txt",
        datas: create_description_file(fields.description, fields.links),
        res_model: 'hr.applicant'
    })

    const application_data = {
        name: fields.nom + " " + fields.prenom + " (chargé d'affaire, vient de site web)",
        partner_name: fields.nom + " " + fields.prenom,
        email_from: fields.email,
        partner_phone: fields.phone,
        job_id: process.env.ODOO_JOB_ID,
        type_id: process.env.ODOO_TYPE_ID,
        attachment_ids: attachements.map((file) => {
            return [0, 0, file]
        })
    }

    try {
        await create_job_application(application_data)
        logger("application created : " + application_data.name)
        res.status(200).json({ message: 'form submitted successfully' })
    } catch (error) {
        logger(JSON.stringify(error))
        res.status(400).json({ message: 'error while creating application' })
    }

}





function create_description_file(description, links) {
    const extra_file = `DESCRIPTION : 
${description}
 
LINKS : 
${JSON.parse(links).map(link => `${link.platform}    :    ${link.url}`).join("\n")}
`
    const extra_file_base64 = Buffer.from(extra_file).toString("base64")
    return extra_file_base64
}