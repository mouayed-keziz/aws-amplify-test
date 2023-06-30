import { useState } from "react";
import axios from "axios"

export default function MyTestPage() {
    const [numb1, setNum1] = useState<string>("");
    const [numb2, setNum2] = useState<string>("");

    const submithandeler = () => {
        const num1 = parseInt(numb1);
        const num2 = parseInt(numb2);
        axios.post("/api/test", { num1, num2 }).then((result) => {
            console.log(result.data)
        }).catch((err) => {
            console.log("err")
        })
    }
    return (
        <>
            hello world
            <input type="text" value={numb1} onChange={(e) => setNum1(e.target.value)} />
            <input type="text" value={numb2} onChange={(e) => setNum2(e.target.value)} />
            <button onClick={submithandeler}>submit</button>
        </>
    );
}