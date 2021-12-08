import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

// import "./notice.css"
function Notice() {

    const [notices, setNotices] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/notice')
            .then((res) => setNotices(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <div className="w-full p-6">
                <div className="p-6 mb-14 border-solid border border-gray-500">
                    {
                        notices.map((notice, index) =>
                            <p className="text-2xl" key={index}>{notice.heading}</p>
                        )
                    }
                </div>
                <Link className="py-2 px-20 text-2xl bg-gray-600 text-white " to="/create_notice">Create Notice</Link>
            </div>
        </div>
    )
}

export default Notice;