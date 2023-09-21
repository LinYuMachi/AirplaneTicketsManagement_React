import axios from "axios";
import PermissionUtils from "../utils/PermissionUtils";

export default class ApiClient {
  client;

  constructor() {
    this.client = axios.create({
      baseURL:
          "https://iw3b7a08zb.execute-api.ap-southeast-2.amazonaws.com/prod",
    });
  }

  async send(method, url, data = {}, additionalHeaders = {}) {
    return this.client({
      method: method,
      url: url,
      data: data ?? {},
      headers: {
        Authorization: await PermissionUtils.getToken(),
        ...additionalHeaders,
      }
    })
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            PermissionUtils.redirectLogIn();
          } else {
            throw error;
          }
        });
  }

  async get(url, additionalHeaders = {}){
    return this.send('get', url, {}, additionalHeaders)
  }
  async post(url, data = {}, additionalHeaders = {}){
    return this.send('post', url, data, additionalHeaders)
  }
  async put(url, data = {}, additionalHeaders = {}){
    return this.send('put', url, data, additionalHeaders)
  }
  async delete(url, additionalHeaders = {}){
    return this.send('delete', url, {}, additionalHeaders)
  }

  test(id) {
    return this.get(`/test/${id}`);
  }

  listTestTable() {
    return this.get("test/insert");
  }

  insertTestTable(name) {
    return this.post("test/insert", {
          name: name,
        });
  }

  listFlights() {
    return this.get("/flight");
  }

  insertFlight(flight) {
    return this.post("/flight", {
          flight: flight,
        });
  }

  updateFlight(flight, updatedFlight) {
    return this.put(`/flight/${flight}`, {flight: updatedFlight});
  }

  deleteFlight(flight) {
    return this.delete(`/flight/${flight}`);
  }

  uploadPassportImage(extension, image) {
    return this.post('upload/passport');
  }
}
