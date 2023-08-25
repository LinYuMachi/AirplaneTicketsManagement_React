import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import Form1 from "./form1";
import Form2 from "./form2";

const Form = (props) => {
  const [form, setForm] = useState(1);

  const handleFormChange = (e) => {
    console.log(e.target.value);
    setForm(e.target.value);
  };

  const handleFormSubmit = (values) => {
    console.log(values);
    props.onClose();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Header title="CREATE TICKET" subtitle="Create a New Ticket" />
      <FormControl sx={{ mb: 4 }}>
        <InputLabel id="form-select-label">Form</InputLabel>
        <Select
          labelId="form-select-label"
          id="form-select"
          value={form}
          label="Form"
          onChange={handleFormChange}
        >
          <MenuItem value={1}>First Form</MenuItem>
          <MenuItem value={2}>Second Form</MenuItem>
        </Select>
      </FormControl>
      {(() => {
        switch (form) {
          case 1:
            return <Form1 handleFormSubmit={handleFormSubmit} />;
          case 2:
            return <Form2 handleFormSubmit={handleFormSubmit} />;
          default:
            return <Form1 handleFormSubmit={handleFormSubmit} />;
        }
      })()}
    </Box>
  );
};

export default Form;
