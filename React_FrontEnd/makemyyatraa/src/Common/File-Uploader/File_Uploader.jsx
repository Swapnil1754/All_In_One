import React, { useState } from "react";
import {async, reject} from "q";
const FileUpload = () => {
    const [textContent, setTextContent] = useState('');
    const [showDialog, setDialog] = useState(false);
    const [showDef, setShowDef] = useState(false);
    const [message, setMessage] = useState('');
    const [readOnly, setReadOnly] = useState(false);
    const fileReader = async (event) => {
        const files = event.target.files[0];
        if(files) {
            try{
            const text = await readFile(files);
            setTextContent(text);
            setReadOnly(true);
            setDialog(true);
            setMessage("Hello Toaster is Successfull...!!!")
        } catch (error) {
        console.error("Error reading file:", error);
    }
    }
}
const handleText = (e) => {
    setReadOnly(false);
    setTextContent(e.target.value);
}
const toggleButton = () => {
    setShowDef(!showDef);
}
const closeDialog = () => {
    setDialog(false)
    console.log("Reaching", showDialog)
}
    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            }
            reader.onerror = (errors) => {
                reject(errors.target.error)
            };
            reader.readAsText(file);
        });
    }
    return(
        <div>
            <div>
                {showDef ? (
                    <><p>Show Definition here...</p>
                    <button onClick={toggleButton}>Hide</button></>
                ):(
                    <><h2>Term</h2><button onClick={toggleButton}>Show</button></>
                )}
            </div>
            
                <div>
                    <input type="text" placeholder="Enter Text" rows="4" cols="50" value={textContent} readOnly={readOnly} onChange={handleText}/>
                    <input type="file" accept=".txt" onChange={(e) => fileReader(e)}/>
                </div>
                <div className="center-align">
                    <Modal show={showDialog} onHide={closeDialog}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Success...!!!
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        File uploaded Successfully and converted to Text
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={closeDialog}>
                            Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Toaster message={message}/>
            
        </div>
    )
}