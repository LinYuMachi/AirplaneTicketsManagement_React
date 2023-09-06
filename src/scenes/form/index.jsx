import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Header from "../../components/Header";
import Ticket from "../../components/forms/ticket";
import TicketVisaHousing from "../../components/forms/ticketvisahousing";
import TicketVisa from "../../components/forms/ticketvisa";
import TicketHousing from "../../components/forms/tickethousing";
import Visa from "../../components/forms/visa";
import Housing from  "../../components/forms/housing";
import HousingDiff from "../../components/forms/housingdiff";
import Reschedule from "../../components/forms/reschedule";
import Substitution from "../../components/forms/subsitution";
import Upgrade from "../../components/forms/upgrade";
import Loss from "../../components/forms/loss";
import Other from "../../components/forms/other";

const Form = (props) => {
  const [form, setForm] = useState("ticket");

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
      <Header title="输入新订单" subtitle="在这里选择表格输入订单" />
      <IconButton
        aria-label="close"
        onClick={props.onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <FormControl sx={{ mb: 4 }}>
        <InputLabel id="form-select-label">表格</InputLabel>
        <Select
          labelId="form-select-label"
          id="form-select"
          value={form}
          label="Form"
          onChange={handleFormChange}
        >
          <MenuItem value={"ticket"}>机票</MenuItem>
          <MenuItem value={"ticketvisahousing"}>
            机票+签证+住宿
          </MenuItem>
          <MenuItem value={"ticketvisa"}>机票+签证</MenuItem>
          <MenuItem value={"tickethousing"}>机票+住宿</MenuItem>
          <MenuItem value={"visa"}>单签证</MenuItem>
          <MenuItem value={"housing"}>单住宿</MenuItem>
          <MenuItem value={"housingdiff"}>单房差</MenuItem>
          <MenuItem value={"reschedule"}>改期</MenuItem>
          <MenuItem value={"substitution"}>换人</MenuItem>
          <MenuItem value={"upgrade"}>升舱</MenuItem>
          <MenuItem value={"loss"}>收损</MenuItem>
          <MenuItem value={"other"}>其他</MenuItem>
        </Select>
      </FormControl>
      {(() => {
        switch (form) {
          case "ticket":
            return <Ticket handleFormSubmit={handleFormSubmit} closeModal={props.onClose}/>;
          case "ticketvisahousing":
            return <TicketVisaHousing handleFormSubmit={handleFormSubmit} closeModal={props.onClose}/>;
          case "ticketvisa":
            return <TicketVisa handleFormSubmit={handleFormSubmit} closeModal={props.onClose}/>;
          case "tickethousing":
            return <TicketHousing handleFormSubmit={handleFormSubmit} closeModal={props.onClose}/>;
          case "visa":
            return <Visa handleFormSubmit={handleFormSubmit} closeModal={props.onClose}/>;
          case "housing":
            return <Housing handleFormSubmit={handleFormSubmit} closeModal={props.onClose}/>;
          case "housingdiff":
            return <HousingDiff handleFormSubmit={handleFormSubmit} closeModal={props.onClose}/>;
          case "reschedule":
            return <Reschedule handleFormSubmit={handleFormSubmit} closeModal={props.onClose}/>;
          case "substitution":
            return <Substitution handleFormSubmit={handleFormSubmit} closeModal={props.onClose}/>;
          case "upgrade":
            return <Upgrade handleFormSubmit={handleFormSubmit} closeModal={props.onClose}/>;
          case "loss":
            return <Loss handleFormSubmit={handleFormSubmit} closeModal={props.onClose}/>;
          case "other":
            return <Other handleFormSubmit={handleFormSubmit} closeModal={props.onClose}/>;
          default:
            return <Ticket handleFormSubmit={handleFormSubmit} closeModal={props.onClose}/>;
        }
      })()}
    </Box>
  );
};

export default Form;
