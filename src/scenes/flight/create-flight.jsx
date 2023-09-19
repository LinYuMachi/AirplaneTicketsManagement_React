import {useContext, useEffect, useState} from "react";
import {Button, TextField} from "@mui/material";
import ObjectUtils from "../../utils/ObjectUtils";
import Joi from "joi";
import FieldValidation from "../../utils/Validation";
import _ from "lodash";
import {DropDown} from "../../components/DropDown";
import {ApiContext} from "../../App";

const flightValidationSchema = Joi.object({
  flightNumber: Joi.string().required(),
  origin: Joi.string().min(3).max(3),
  destination: Joi.string().min(3).max(3),
});
const validation = new FieldValidation(flightValidationSchema);


export const CreateFlight = () => {
  const [flight, setFlight] = useState({
    "flightNumber": "ABC123",
    "origin": "ABC",
    "destination": "DEF",
    "departureTime": "2004-10-19T10:23:54+02:00",
    "arrivalTime": "2004-10-19T11:23:54+02:00",
    "charterCost": "12345.67",
    "tax": "32.1",
    "economyCount": "150",
    "economyAdultPrice": "1.1",
    "economyChildPrice": "2.2",
    "economyInfantPrice": "3.3",
    "businessCount": "160",
    "businessAdultPrice": "4.4",
    "businessChildPrice": "5.5",
    "businessInfantPrice": "6.6"
  });
  // validation errors
  const [errors, setErrors] = useState({});
  // selected dropdown
  const [selected, setSelected] = useState('');
  // dropdown options
  const [options, setOptions] = useState([]);
  // used to prefill the forms
  const [flightsMap, setFlightsMap] = useState({});

  const apiClient = useContext(ApiContext);

  useEffect(() => {
      apiClient.listFlights().then(flights => {
        setOptions(flights.map(flight => ({key: flight.id, value: flight.flightNumber})));
        // turn array into a map
        const transformedFlights = _.keyBy(flights, 'id');
        // ignores several fields that we don't want to prefill
        const filtered = _.mapValues(transformedFlights, (obj) => _.omit(obj, ['id', 'createdAt', 'createdBy']));
        setFlightsMap(filtered);
      });
  }, []);

  const onSubmit = () => {
    // allowUnkown is true here because we don't have full schema here, should usually be the default false
    const errs = validation.validate(flight, false, true);
    setErrors(errs);
    // no errors, ok to submit
    if (_.isEmpty(errs)) {
      // placeholder to api call to create the flight
      console.log(flight);
    }
  };

  return (
    <div>
      <TextField
          name="flightNumber"
          label="Flight Number"
          variant="outlined"
          value={flight.flightNumber}
          onChange={(e) => setFlight(ObjectUtils.assignPropertyCopy(flight, e.target.value, "flightNumber"))}
          error={ObjectUtils.hasProperty(errors, "flightNumber")}
          helperText={ObjectUtils.getProperty(errors, "flightNumber")}
      />
      <TextField
          name="origin"
          label="Origin"
          variant="outlined"
          value={flight.origin}
          onChange={(e) => setFlight(ObjectUtils.assignPropertyCopy(flight, e.target.value, "origin"))}
          error={ObjectUtils.hasProperty(errors, "origin")}
          helperText={ObjectUtils.getProperty(errors, "origin")}
      />
      <TextField
          name="destination"
          label="Destination"
          variant="outlined"
          value={flight.destination}
          onChange={(e) => setFlight(ObjectUtils.assignPropertyCopy(flight, e.target.value, "destination"))}
          error={ObjectUtils.hasProperty(errors, "destination")}
          helperText={ObjectUtils.getProperty(errors, "destination")}
      />
      <DropDown
          selectProps={{
            value: selected,
            onChange: (e) => {
              setSelected(e.target.value);
              const newFlight = flightsMap[e.target.value.key];
              if (!!newFlight) {
                setFlight(newFlight);
              }
            }
          }}
          options={options}
          loading={!options?.length}
      />
      <Button type="submit" variant="contained" color="primary" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  )
};