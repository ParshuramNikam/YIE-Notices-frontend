import React, { useState } from "react";
// import"./createNotice.css"
import { Link } from "react-router-dom";
import axios from "axios";
function CreateNotice() {
    const [input, setInput] = useState({ heading:"" ,recipients: "", description: "", date: "", className: "", department: "", info: "" });
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState("");

    // function that handle change of my file
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmitFile = () => {
        const data = new FormData();
        data.append('file', file);
        axios.post('//adrees', data)
            .then(data => console.log('Success', data))
            .then(error => console.log('Error', error))
    }

    console.log(file)
    // funcction that allow you to intaract with forms  
    const handleChange = (e) => {
        const newInput = { ...input };
        newInput[e.target.id] = e.target.value;
        setInput(newInput)
        console.log(newInput)
    }
    //  function that submit the store the data on
    const handleSubmit = (event) => {
        event.preventDefault();
        let fileData = new FormData();
        fileData.append('file', file);

        axios.post("http://localhost:5000/notice", {
            ...input, url, ...fileData, schoolId: 102
        }).then(res => {
            if(res.message){
                alert(res.message);
                return; 
            }
            alert('successfully created!')
            console.log(res.data)
            setInput({ recipients: "", description: "", date: "", className:"", department:"", info:"" });
        });
        handleSubmitFile();
    }

    return (
        <div className="p-8 w-full flex justify-center flex-col items-center">
            <form method="post" onSubmit={handleSubmit}>
                <div className="flex space-x-12 mb-6 m-2">
                    <select name="select_classes" className="px-20 text-lg"
                        onChange={(e) => { setInput({ ...input, className: e.target.value }); console.log(e.target.value); }}
                    >
                        <option>Select classes</option>
                        <option value="class1">class 1</option>
                        <option value="class2">class 2</option>
                        <option value="class3">class 3</option>
                        <option value="class4">class 4</option>
                    </select>
                    <p className="text-2xl">Or</p>
                    <select name="select_department" className="px-20 text-lg"
                        onChange={(e) => setInput({ ...input, department: e.target.value })}
                    >
                        <option>Select Department</option>
                        <option value="bcs">BCA</option>
                        <option value="nursen">Nursen</option>
                        <option value="btech">Btech</option>
                        <option value="phamarcy">Pharmacy</option>
                    </select>
                </div>
                <input type="text" placeholder="Notice heading"  className="w-full p-1 m-2 rounded"
                    value={input.heading} 
                    onChange={(e)=> setInput({...input, heading: e.target.value})}
                />
                <div className="flex">
                    <div>
                        <div className="ml-2">Enter <strong>','</strong> separated recipients.</div>
                        <textarea className="p-3 w-96 h-40 m-1" id="recipients" name="recipients" value={input.recipients} onChange={(e) => handleChange(e)} placeholder="Recipients"></textarea>
                    </div>
                    <div>
                        <div className="ml-2">Description:</div>
                    <textarea className="p-3 w-96 h-40 m-1" id="description" name="description" value={input.description} onChange={(e) => handleChange(e)} placeholder="Enter Description"></textarea>
                    </div>
                </div>
                <div className="flex space-x-4 my-6 ">
                    <div className="attach">
                        {/* <span className="attach">Attach a Link</span> */}
                        <input type="url" className="mr-2" placeholder="Attach a link" value={url} onChange={(e) => setUrl(e.target.value)} />
                        <input name="file" type="file" onChange={handleFile} />
                        <i className=" icons far fa-file-pdf"></i>
                    </div>
                    <div className="date">
                        <input type="date" value={input.date} onChange={(e) => handleChange(e)} name="date" id="date" />
                        <span className="select-date"><i className="icons far fa-calendar-alt"></i>Select Date</span>

                    </div>
                </div>
                <button className="py-2 px-20 text-lg bg-gray-600 text-white mb-7">Crate Notice</button>
            </form>
            <div className="flex justify-around w-full bt-7">
                <Link className="py-2 px-20 text-2xl bg-gray-600 text-white" to="/notice">Back</Link>
                <button className="py-2 px-20 text-2xl bg-gray-600 text-white">Send Individually ID</button>
            </div>
        </div>
    )
}

export default CreateNotice;