import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../../assets/css/excelUploader.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Typography } from '@mui/material';
import { BASE_URL } from '../../utils/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadIFHRMSDataForm() {
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [uploadDone, setUploadDone] = useState(false);
  const [invalidFileName, setInvalidFileName] = useState(null);

  const simulateProgress = (target) => {
    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      if (current >= target) {
        clearInterval(interval);
        setProgress(100);
        setUploadDone(true);
      } else {
        setProgress(current);
      }
    }, 50);
  };

  const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setFileName(file.name);
  setProgress(0);
  setUploadDone(false);

  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch(`${BASE_URL}/file/filesUpload`, {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      toast.error(result.message || 'Upload failed');
    } else {
      toast.success('Upload successful!');
      simulateProgress(100);
     if (result?.data?.downloadLink) {
  const cleanedLink = result.data.downloadLink.trim();
  setInvalidFileName(cleanedLink);
}
    }
  } catch (error) {
    console.error("Upload Error:", error);
    toast.error('Unable to upload data');
  }
};


  return (
    <main className="pt-3">
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-12 mb-3">
            <div className="card bg-white">
              <div className="card-header">
                <h4 className='title-clr'>
                  <i className="bi bi-table me-2"></i> Upload IFHRMS Data
                </h4>
              </div>
              <div className="card-body">
                <div className="row justify-content-center p-3">
                  <div className="col-md-5 text-center mt-3">
                    <Button
                      className="mb-3"
                      variant="contained"
                      component="label"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Upload Files
                      <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileUpload} />
                    </Button>

                    {fileName && (
                      <h5 className="title-clr">
                        Success!! <strong>{fileName}</strong> Uploaded Successfully.
                      </h5>
                    )}

                    <div
                      className="progress-circle mx-auto my-4"
                      style={{
                        background: `conic-gradient(#0d6efd ${progress}%, #e9ecef ${progress}%)`,
                      }}
                    >
                      {!uploadDone ? (
                        <span>{progress}%</span>
                      ) : (
                        <CheckCircleIcon style={{ fontSize: "80px", color: "white" }} />
                      )}
                    </div>

                    <div className='mt-5'>
                    {invalidFileName && (
  <button
    type="button"
    className="btn btn-outline-success btn-sm"
    onClick={() => window.open(invalidFileName, '_blank')}
  >
    Download Invalid Records
  </button>
)}
                    </div>

                    <div className="mt-5">
                      <p>
                        <strong>Note:</strong> First time all data will be uploaded. From
                        second time it will check the database and upload only the delta.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UploadIFHRMSDataForm;


