
export default function handler(req, res) {

    res.status(200).json({ msg: 'hello mouayed keziz', env: process.env })
}
