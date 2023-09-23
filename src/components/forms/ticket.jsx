import React, { useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Autocomplete,
} from "@mui/material";
import { useRef, useState, useContext } from "react";

// API imports
import { ApiContext } from "../../App";
import { useParams } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Ticket(props) {
  const apiClient = useContext(ApiContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [isOneway, setIsOneway] = useState(false);
  const [loading, setLoading] = useState(false);

  // API call to retrieve flight data flight agency data
  const [flights, setFlights] = useState([]);
  const [flightAgencies, setFlightAgencies] = useState([]);

  // Autocomplete labels
  const [agencyOptions, setAgencyOptions] = useState([]);
  const [flightOptions, setFlightOptions] = useState([]);

  // Keep tracks of returnFlight displaying value
  const [returnFlightValue, setReturnFlightValue] = useState([]);

  useEffect(() => {
    setLoading(true);
    apiClient.listFlights().then((data) => {
      setFlights(data.flights);
      // Autocomplete labels
      setFlightOptions(
        data.flights.map((flight) => ({ label: flight.flightNumber }))
      );
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    apiClient.listFlightAgencies().then((data) => {
      setFlightAgencies(data.flightAgencies);
      // Autocomplete labels
      setAgencyOptions(
        data.flightAgencies.map((agency) => ({ label: agency.name }))
      );
      setLoading(false);
    });
  }, []);

  const handleAutocompleteChange = (e, values) => {
    if (formikRef.current) {
      formikRef.current.setFieldValue(
        "returnFlight",
        values.label
      );
      setReturnFlightValue(values.label)
    }
  }

  const formikRef = useRef();

  const onSubmit = (values) => {
    console.log(values);
    props.closeModal();
  };

  return (
    <>
      <Formik
        innerRef={formikRef}
        onSubmit={onSubmit}
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
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                overflow: "auto",
                maxHeight: "80vh",
              }}
            >
              <Autocomplete
                options={agencyOptions}
                sx={{ gridColumn: "span 1" }}
                renderInput={(params) => (
                  <TextField {...params} label="代理名称" />
                )}
                onChange={(e, value) => {
                  if (value === null) {
                    value = { label: "" };
                  }
                  if (formikRef.current) {
                    formikRef.current.setFieldValue("agencyName", value.label);
                  }
                }}
                loading
              />
              <FormControl>
                <InputLabel id="trip-select-label">行程</InputLabel>
                <Select
                  labelId="trip-select-label"
                  value={values.triptype}
                  onChange={(e) => {
                    if (formikRef.current) {
                      formikRef.current.setFieldValue(
                        "triptype",
                        e.target.value
                      );
                    }
                    if (e.target.value === "oneway") {
                      formikRef.current.setFieldValue("returnFlight", "");
                      setIsOneway(true);
                      setReturnFlightValue("");
                    } else if (e.target.value === "roundtrip") {
                      setIsOneway(false);
                    }
                  }}
                  name="triptype"
                >
                  <MenuItem value={"oneway"}>单程</MenuItem>
                  <MenuItem value={"roundtrip"}>往返</MenuItem>
                </Select>
              </FormControl>
              <Autocomplete
                options={flightOptions}
                sx={{ gridColumn: "span 1" }}
                renderInput={(params) => (
                  <TextField {...params} label="去程航班" />
                )}
                onChange={(e, value) => {
                  if (value === null) {
                    value = { label: "" };
                  }
                  if (formikRef.current) {
                    formikRef.current.setFieldValue(
                      "departureFlight",
                      value.label
                    );
                  }
                }}
              />
              <Autocomplete
                options={flightOptions}
                sx={{ gridColumn: "span 1" }}
                renderInput={(params) => (
                  <TextField {...params} label="回程航班" />
                )}
                onChange={handleAutocompleteChange}
                disabled={isOneway}
                value={returnFlightValue}
              />
              <FormControl>
                <InputLabel id="ticket-class-select-label">舱位</InputLabel>
                <Select
                  labelId="ticket-class-select-label"
                  value={values.ticketClass}
                  onChange={(e) => {
                    console.log(e.target.value);
                    if (formikRef.current) {
                      formikRef.current.setFieldValue(
                        "ticketClass",
                        e.target.value
                      );
                    }
                  }}
                  name="ticketClass"
                  sx={{ gridColumn: "span 1" }}
                >
                  <MenuItem value={"economy"}>经济舱</MenuItem>
                  <MenuItem value={"business"}>商务舱</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="结算价格"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="婴儿的随行成人"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.infantAdult}
                name="infantAdult"
                error={!!touched.infantAdult && !!errors.infantAdult}
                helperText={touched.infantAdult && errors.infantAdult}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="中文姓"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.chineseLastname}
                name="chineseLastname"
                error={!!touched.chineseLastname && !!errors.chineseLastname}
                helperText={touched.chineseLastname && errors.chineseLastname}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="中文名"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.chineseFirstname}
                name="chineseFirstname"
                error={!!touched.chineseFirstname && !!errors.chineseFirstname}
                helperText={touched.chineseFirstname && errors.chineseFirstname}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="英文姓"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.englishLastname}
                name="englishLastname"
                error={!!touched.englishLastname && !!errors.englishLastname}
                helperText={touched.englishLastname && errors.englishLastname}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="英文名"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.englishFirstname}
                name="englishFirstname"
                error={!!touched.englishFirstname && !!errors.englishFirstname}
                helperText={touched.englishFirstname && errors.englishFirstname}
                sx={{ gridColumn: "span 1" }}
              />
              <RadioGroup
                row
                name="gender"
                value={values.gender}
                sx={{ gridColumn: "span 1" }}
                onChange={(e) => {
                  console.log(values);
                  if (formikRef.current) {
                    formikRef.current.setFieldValue("gender", e.target.value);
                  }
                }}
              >
                <FormControlLabel value="male" control={<Radio />} label="男" />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="女"
                />
              </RadioGroup>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="生日"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.birthDate}
                InputLabelProps={{
                  shrink: true,
                }}
                name="birthDate"
                error={!!touched.birthDate && !!errors.birthDate}
                helperText={touched.birthDate && errors.birthDate}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="国籍"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nationality}
                name="nationality"
                error={!!touched.nationality && !!errors.nationality}
                helperText={touched.nationality && errors.nationality}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="出生地"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.birthPlace}
                name="birthPlace"
                error={!!touched.birthPlace && !!errors.birthPlace}
                helperText={touched.birthPlace && errors.birthPlace}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="签发地"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.placeOfIssue}
                name="placeOfIssue"
                error={!!touched.placeOfIssue && !!errors.placeOfIssue}
                helperText={touched.placeOfIssue && errors.placeOfIssue}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="证件类型"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.documentType}
                name="documentType"
                error={!!touched.documentType && !!errors.documentType}
                helperText={touched.documentType && errors.documentType}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="护照编号"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.passportNumber}
                name="passportNumber"
                error={!!touched.passportNumber && !!errors.passportNumber}
                helperText={touched.passportNumber && errors.passportNumber}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="签发日期"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateOfIssue}
                InputLabelProps={{
                  shrink: true,
                }}
                name="dateOfIssue"
                error={!!touched.dateOfIssue && !!errors.dateOfIssue}
                helperText={touched.dateOfIssue && errors.dateOfIssue}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="有效期至"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.validUntil}
                InputLabelProps={{
                  shrink: true,
                }}
                name="validUntil"
                error={!!touched.validUntil && !!errors.validUntil}
                helperText={touched.validUntil && errors.validUntil}
                sx={{ gridColumn: "span 1" }}
              />
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ gridColumn: "span 1" }}
              >
                护照原件上传
                <VisuallyHiddenInput type="file" />
              </Button>
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

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// Language regex pattern
const englishRegex = /^[A-Za-z]+$/;
const chineseRegex = /[\u4e00-\u9fa5]/;

const checkoutSchema = yup.object().shape({
  agencyName: yup.string().required(),
  triptype: yup.string().required(),
  departureFlight: yup.string().required(),
  returnFlight: yup.string().when("triptype", {
    is: (triptype) => triptype === "roundtrip",
    then: () => yup.string().required(),
    otherwise: () => yup.string().notRequired(),
  }),
  ticketClass: yup.string().required(),
  price: yup.number().required(),
  chineseLastname: yup
    .string()
    .matches(chineseRegex, "请输入正确的中文姓")
    .required(),
  chineseFirstname: yup
    .string()
    .matches(chineseRegex, "请输入正确的中文名")
    .required(),
  englishFirstname: yup
    .string()
    .matches(englishRegex, "请输入英文名")
    .required(),
  gender: yup.string().required(),
  birthDate: yup.date().required(),
  nationality: yup.string().required(),
  birthPlace: yup.string().required(),
  placeOfIssue: yup.string().required(),
  documentType: yup.string().required(),
  passportNumber: yup.string().required(),
  dateOfIssue: yup.date().required(),
  validUntil: yup.date().required(),
});

const initialValues = {
  triptype: "",
  agencyName: "",
  departureFlight: "",
  returnFlight: "",
  infantAdult: "",
  ticketClass: "",
  price: "",
  chineseLastname: "",
  chineseFirstname: "",
  englishLastname: "",
  englishFirstname: "",
  gender: "",
  birthDate: "",
  nationality: "",
  birthPlace: "",
  placeOfIssue: "",
  documentType: "",
  passportNumber: "",
  dateOfIssue: "",
  validUntil: "",
};
