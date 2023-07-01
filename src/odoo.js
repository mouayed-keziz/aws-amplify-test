import Odoo from "odoo-await"

const odoo_config = {
    baseUrl: process.env.ODOO_URL,
    db: process.env.ODOO_DB,
    username: process.env.ODOO_USERNAME,
    password: process.env.ODOO_PASSWORD
}

async function create_job_application(job_application_data) {
    const odoo = new Odoo(odoo_config)
    await odoo.connect()

    const application_id = await odoo.create('hr.applicant', job_application_data);
    return application_id;
}


async function create_contact(contact_data) {
    const odoo = new Odoo(odoo_config)
    await odoo.connect()

    const partnerId = await odoo.create('crm.lead', contact_data);
    return partnerId;

}

export { create_job_application, create_contact };