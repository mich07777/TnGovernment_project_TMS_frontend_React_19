import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Select,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  pt: 3,
  pb: 5,
};

const DirecterateCCUploadModal = ({ open, handleClose, handleSubmit }) => {
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files)); // Convert FileList to array
  };

  const onSubmit = () => {
    if (  docType && docName && files.length > 0) {
      const formData = new FormData();
     
      formData.append('documentName', docName);
      formData.append('documentType', docType);
      files.forEach((file, index) => {
        formData.append('files', file); // backend should expect an array with field name "files"
      });
      handleSubmit(formData);

      // Reset
     
      setDocName('');
      setDocType('');
      setFiles([]);
      handleClose();
    } else {
      alert('Please fill all fields and upload at least one file.');
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} position="relative">
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" className="title-clr" gutterBottom>
          Upload Document
        </Typography>
        <TextField
          label="Document Name"
          fullWidth
          margin="normal"
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
        />

       

        <FormControl fullWidth margin="normal">
          <InputLabel id="doc-type-label">Document Type</InputLabel>
          <Select
            labelId="doc-type-label"
            value={docType}
            label="Document Type"
            onChange={(e) => setDocType(e.target.value)}
          >
            <MenuItem value="PDF">Nomination Call Letter</MenuItem>
            <MenuItem value="DOC">HoPF Letter</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          Upload Files
          <input type="file" hidden multiple onChange={handleFileChange} />
        </Button>
        {files.length > 0 && (
          <Box sx={{ mt: 1 }}>
            {files.map((file, idx) => (
              <Typography variant="body2" key={idx}>
                {file.name}
              </Typography>
            ))}
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default DirecterateCCUploadModal;
