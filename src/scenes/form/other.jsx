import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, TextField, Stack } from "@mui/material";

export default function Other(props) {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <>
      <Formik
        onSubmit={props.handleFormSubmit}
        initialValues={initialValues}
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
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(8, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                fullHeight
                variant="filled"
                type="text"
                label="其他"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 16" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Stack direction="row" spacing={2}>
                <Button
                  type="reset"
                  onClick={props.closeModal}
                  color="error"
                  variant="contained"
                >
                  取消
                </Button>
                <Button type="submit" color="secondary" variant="contained">
                  录入
                </Button>
              </Stack>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  saleDate: "",
  flightDate: "",
};
