import React, { useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import Header from "../../components/Header";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ApiContext } from "../../App";

export default function FlightForm(props) {
  const apiClient = useContext(ApiContext);
  const [submitting, setSubmitting] = React.useState(false);

  const submitFlightForm = (inputObject) => {
    setSubmitting(true);
    const outputObject = {
      flightNumber: inputObject.flightNumber,
      origin: inputObject.origin.toUpperCase(), // Convert origin to uppercase
      destination: inputObject.destination.toUpperCase(), // Convert destination to uppercase
      departureTime: `${inputObject.departureDate}T${inputObject.departureTime}:00+02:00`, // Combine date and time
      arrivalTime: `${inputObject.departureDate}T${inputObject.arrivalTime}:00+02:00`, // Combine date and time
      charterCost: inputObject.charterCost.toString(), // Convert to string
      tax: inputObject.tax.toString(), // Convert to string
      economyCount: inputObject.economyCount.toString(), // Convert to string
      economyAdultPrice: inputObject.economyAdultPrice.toString(), // Convert to string
      economyChildPrice: inputObject.economyChildPrice.toString(), // Convert to string
      economyInfantPrice: inputObject.economyInfantPrice.toString(), // Convert to string
      businessCount: inputObject.businessCount.toString(), // Convert to string
      businessAdultPrice: inputObject.businessAdultPrice.toString(), // Convert to string
      businessChildPrice: inputObject.businessChildPrice.toString(), // Convert to string
      businessInfantPrice: inputObject.businessInfantPrice.toString(), // Convert to string
    };
    console.log(inputObject);
    console.log(outputObject);
    apiClient.insertFlights(outputObject).then((resp) => {
      console.log(resp);
      setSubmitting(false);
      props.onClose();
    });
    console.log("Successful!");
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "35vw",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <Header title="输入新航班" subtitle="在这里输入航班" />
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
        <Formik
          onSubmit={submitFlightForm}
          initialValues={props.initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container sx={{ flexGrow: 1 }}>
                <Grid container xs={12} rowGap={3}>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    label="航班号"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.flightNumber}
                    name="flightNumber"
                    error={!!touched.flightNumber && !!errors.flightNumber}
                    helperText={touched.flightNumber && errors.flightNumber}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    label="起飞地点"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.origin}
                    name="origin"
                    inputProps={{
                      maxLength: 3,
                    }}
                    error={!!touched.origin && !!errors.origin}
                    helperText={touched.origin && errors.origin}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    label="降落地点"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.destination}
                    name="destination"
                    inputProps={{
                      maxLength: 3,
                    }}
                    error={!!touched.destination && !!errors.destination}
                    helperText={touched.destination && errors.destination}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="date"
                    label="出发日期"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.departureDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="departureDate"
                    error={!!touched.departureDate && !!errors.departureDate}
                    helperText={touched.departureDate && errors.departureDate}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    label="起飞时间"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.departureTime}
                    name="departureTime"
                    inputProps={{
                      maxLength: 5,
                    }}
                    error={!!touched.departureTime && !!errors.departureTime}
                    helperText={touched.departureTime && errors.departureTime}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    label="降落时间"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.arrivalTime}
                    name="arrivalTime"
                    inputProps={{
                      maxLength: 5,
                    }}
                    error={!!touched.arrivalTime && !!errors.arrivalTime}
                    helperText={touched.arrivalTime && errors.arrivalTime}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="包机成本"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.charterCost}
                    name="charterCost"
                    error={!!touched.charterCost && !!errors.charterCost}
                    helperText={touched.charterCost && errors.charterCost}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="税费"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.tax}
                    name="tax"
                    error={!!touched.tax && !!errors.tax}
                    helperText={touched.tax && errors.tax}
                  />
                </Grid>
                <Grid container xs={12} rowGap={1} marginTop={6}>
                  <Typography>经济舱信息</Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="总位数"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.economyCount}
                    name="economyCount"
                    error={!!touched.economyCount && !!errors.economyCount}
                    helperText={touched.economyCount && errors.economyCount}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="成人票价"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.economyAdultPrice}
                    name="economyAdultPrice"
                    error={
                      !!touched.economyAdultPrice && !!errors.economyAdultPrice
                    }
                    helperText={
                      touched.economyAdultPrice && errors.economyAdultPrice
                    }
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="儿童票价"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.economyChildPrice}
                    name="economyChildPrice"
                    error={
                      !!touched.economyChildPrice && !!errors.economyChildPrice
                    }
                    helperText={
                      touched.economyChildPrice && errors.economyChildPrice
                    }
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="婴儿票价"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.economyInfantPrice}
                    name="economyInfantPrice"
                    error={
                      !!touched.economyInfantPrice &&
                      !!errors.economyInfantPrice
                    }
                    helperText={
                      touched.economyInfantPrice && errors.economyInfantPrice
                    }
                  />
                </Grid>
                <Grid container xs={12} rowGap={1} marginTop={6}>
                  <Typography>商务舱信息</Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="总位数"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.businessCount}
                    name="businessCount"
                    error={!!touched.businessCount && !!errors.businessCount}
                    helperText={touched.businessCount && errors.businessCount}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="成人票价"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.businessAdultPrice}
                    name="businessAdultPrice"
                    error={
                      !!touched.businessAdultPrice &&
                      !!errors.businessAdultPrice
                    }
                    helperText={
                      touched.businessAdultPrice && errors.businessAdultPrice
                    }
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="儿童票价"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.businessChildPrice}
                    name="businessChildPrice"
                    error={
                      !!touched.businessChildPrice &&
                      !!errors.businessChildPrice
                    }
                    helperText={
                      touched.businessChildPrice && errors.businessChildPrice
                    }
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="婴儿票价"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.businessInfantPrice}
                    name="businessInfantPrice"
                    error={
                      !!touched.businessInfantPrice &&
                      !!errors.businessInfantPrice
                    }
                    helperText={
                      touched.businessInfantPrice && errors.businessInfantPrice
                    }
                  />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="end" mt="20px">
                <Stack direction="row" spacing={2}>
                  <Button
                    type="reset"
                    onClick={props.onClose}
                    color="error"
                    variant="contained"
                  >
                    取消
                  </Button>
                  <Button
                    // onClick={() => {
                    //   props.onClose();
                    // }}
                    type="submit"
                    color="secondary"
                    variant="contained"
                  >
                    录入
                  </Button>
                </Stack>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
}

const timeRegExp = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const checkoutSchema = yup.object().shape({
  flightNumber: yup.string().required("required"),
  origin: yup.string().required("required"),
  destination: yup.string().required("required"),
  departureDate: yup.string().required("required"),
  departureTime: yup
    .string()
    .matches(timeRegExp, "请用 小时:分钟 格式")
    .required("required"),
  arrivalTime: yup
    .string()
    .matches(timeRegExp, "请用 小时:分钟 格式")
    .required("required"),
  economyCount: yup.string().required("required"),
  economyAdultPrice: yup.string().required("required"),
  economyChildPrice: yup.string().required("required"),
  economyInfantPrice: yup.string().required("required"),
  businessCount: yup.string().required("required"),
  businessAdultPrice: yup.string().required("required"),
  businessChildPrice: yup.string().required("required"),
  businessInfantPrice: yup.string().required("required"),
});
// const initialValues = {
//   flightNumber: "",
//   origin: "",
//   destination: "",
//   departureDate: "",
//   departureTime: "",
//   arrivalTime: "",
//   charterCost: "",
//   tax: "",
//   economyCount: "",
//   economyAdultPrice: "",
//   economyChildPrice: "",
//   economyInfantPrice: "",
//   businessCount: "",
//   businessAdultPrice: "",
//   businessChildPrice: "",
//   businessInfantPrice: "",
// };
