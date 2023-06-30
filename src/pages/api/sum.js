
export default function handler(req, res) {
    if (req.method === "POST") {
        const { num1, num2 } = req.body
        const sum = num1 + num2
        res.status(200).json({ sum })
    } else {
        res.status(200).json({ message: 'sum api' })
    }
}
