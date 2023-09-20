import axios from "axios";

export default class ApiClient {
  client;
  constructor() {
    this.client = axios.create({
      baseURL:
        "https://iw3b7a08zb.execute-api.ap-southeast-2.amazonaws.com/prod",
    });
  }
  listTestTable() {
    return this.client.get("test/insert").then((resp) => resp.data);
  }

  insertTestTable(name) {
    return this.client
      .post("test/insert", {
        name: name,
      })
      .then((resp) => resp.data);
  }

  listFlights() {
    return this.client.get("/flight").then((resp) => resp.data);
  }

  insertFlight(flight) {
    return this.client
      .post("/flight", {
        flight: flight,
      })
      .then((resp) => resp.data);
  }

  updateFlight(flight, updatedFlight) {
    return this.client
      .put(`/flight/${flight}`, { flight: updatedFlight })
      .then((resp) => {});
  }

  deleteFlight(flight) {
    return this.client.delete(`/flight/${flight}`).then((resp) => {});
  }
}
