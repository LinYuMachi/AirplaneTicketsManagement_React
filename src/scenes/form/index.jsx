import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const initialValues = {
  firstName: "",
  lastName: "",
  saleDate: "",
  flightDate: "",
  documentationNumber: "",
  flightNumber: "",
  saleAmount: "",
};

const phoneRegEx =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const dateRegEx =
  /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

const userSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid email"),
  contact: yup
    .string()
    .matches(phoneRegEx, "Phone number is not valid")
    .required("required"),
  saleDate: yup
    .string()
    .matches(dateRegEx, "Date value is not valid")
    .required("required"),
  flightDate: yup
    .string()
    .matches(dateRegEx, "Date value is not valid")
    .required("required"),
  documentationNumber: yup.string().required("required"),
  flightNumber: yup.string().required("required"),
  saleAmount: yup.string().required("required"),
});

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE TICKET" subtitle="Create a New Airplane Ticket" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
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
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Sale Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.saleDate}
                InputLabelProps={{
                  shrink: true,
                }}
                name="saleDate"
                error={!!touched.saleDate && !!errors.saleDate}
                helperText={touched.saleDate && errors.saleDate}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Flight Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.flightDate}
                InputLabelProps={{
                  shrink: true,
                }}
                name="flightDate"
                error={!!touched.flightDate && !!errors.flightDate}
                helperText={touched.flightDate && errors.flightDate}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Flight Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.flightNumber}
                name="flightNumber"
                error={!!touched.flightNumber && !!errors.flightNumber}
                helperText={touched.flightNumber && errors.flightNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Documentation Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.documentationNumber}
                name="documentationNumber"
                error={
                  !!touched.documentationNumber && !!errors.documentationNumber
                }
                helperText={
                  touched.documentationNumber && errors.documentationNumber
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Sale Amount $"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.saleAmount}
                name="saleAmount"
                error={!!touched.saleAmount && !!errors.saleAmount}
                helperText={touched.saleAmount && errors.saleAmount}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
