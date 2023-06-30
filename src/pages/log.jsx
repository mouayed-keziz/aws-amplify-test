import axios from "axios";
import { useEffect, useState } from "react";

export default function LogPage() {
    const [logs, setlogs] = useState("");
    //run once when the page loads
    useEffect(() => {
        axios.get("/api/log").then((result) => {
            //setlogs(result.data);
            //replace \n with <br> tag
            setlogs(result.data.replace(/\n/g, "<br/><br/><br/>"));
        }).catch((err) => {
            console.log("err")
        })
    }, [])
    return (
        <>
            <h1>Logs</h1>

            {logs ? (
                <div dangerouslySetInnerHTML={{ __html: logs }} />
            ) : (
                <h3>loading...</h3>
            )
            }

        </>
    );
}