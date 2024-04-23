import React, { useState } from 'react';

const ChatFileUploader = ({ ws }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Access filename and filesize properties of the File object
            const { name, size } = file;
            console.log('Selected file:', name, size);
            setSelectedFile(file);

            // send the upload_request_message to the server
            ws.send(
                JSON.stringify({
                    type: 'file_upload_request',
                    filename: name,
                    size,
                })
            );
        }
    };

    return (
        <div className="file-uploader">
            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*, .pdf" // Specify accepted file types
            />
        </div>
    );
};

export default ChatFileUploader;
