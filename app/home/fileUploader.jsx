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

            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.type === 'file_upload_response') {
                    const { presignedUrl, fileId } = message;
                    console.log('Received presigned URL:', presignedUrl);
                    console.log('Received file ID:', fileId);

                    // Upload the file to the presigned URL
                    const xhr = new XMLHttpRequest();
                    xhr.open('PUT', presignedUrl, true);
                    xhr.setRequestHeader('Content-Type', file.type);
                    xhr.send(file);

                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            console.log('File uploaded successfully');
                            
                            // Send the file ID to the server
                            ws.send(
                                JSON.stringify({
                                    type: 'file_upload_success',
                                    fileId,
                                })
                            );
                        } else {
                            console.error('Error uploading file');
                            alert('Error uploading file');
                        }
                    };

                    // remove the file from the state
                    setSelectedFile(null);
                }

                else if (message.type === 'file_upload_err') {
                    console.error('Error uploading file');
                    alert('Error uploading file');
                }
            };
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
