import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const TrainingcenterCCUploadModal = ({ open, handleClose, handleSubmit, course }) => {
  const [file, setFile] = useState(null);
  const [nomineeId, setNomineeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    if (!nomineeId) {
      setError('Please enter nominee ID');
      return;
    }

    setLoading(true);
    try {
      await handleSubmit({
        file,
        nomineeId
      });
    } catch (err) {
      setError(err.message || 'Failed to upload certificate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle>Course Completion Certificate Upload</DialogTitle>
  <form onSubmit={onSubmit}>
    <DialogContent>
      <TextField
        fullWidth
        label="Document Name"
        margin="normal"
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Document Type</InputLabel>
        <Select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          label="Document Type"
        >
          <MenuItem value="PDF">PDF</MenuItem>
          <MenuItem value="Image">Image</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Nominee ID *"
        margin="normal"
        value={nomineeId}
        onChange={(e) => setNomineeId(e.target.value)}
        required
      />

      <FormControl fullWidth margin="normal">
        <input
          accept=".pdf,.doc,.docx,image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="outlined" component="span" fullWidth>
            {file ? file.name : 'Upload File'}
          </Button>
        </label>
      </FormControl>

      {error && (
        <div style={{ color: 'red', marginTop: 8 }}>{error}</div>
      )}
    </DialogContent>

    <DialogActions>
      <Button onClick={handleClose} disabled={loading}>
        Cancel
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>
    </DialogActions>
  </form>
</Dialog>

  );
};

export default TrainingcenterCCUploadModal;