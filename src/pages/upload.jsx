import { useState } from "react";
import axios from "axios";

export default function UploadPage() {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [files, setFiles] = useState([]);
    const submitHandeler = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("city", city);
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        axios.post("/api/upload", formData).then((result) => {
            console.log(result.data)
        }).catch((err) => {
            console.log("err")
        }
        )
    }
    return (
        <>

            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            <input type="file" onChange={(e) => setFiles(e.target.files)} />
            <button onClick={submitHandeler} >something special</button>
        </>
    );
}