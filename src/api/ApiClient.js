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

  async send(method, url, data = {}, additionalHeaders = {}, withAuth = true) {
    return this.client({
      method: method,
      url: url,
      data: data ?? {},
      headers: withAuth ? {
        Authorization: await PermissionUtils.getToken(),
        ...additionalHeaders,
      } : additionalHeaders
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

  async get(url, additionalHeaders = {}, withAuth = true){
    return this.send('get', url, {}, additionalHeaders, withAuth)
  }
  async post(url, data = {}, additionalHeaders = {}, withAuth = true){
    return this.send('post', url, data, additionalHeaders, withAuth)
  }
  async put(url, data = {}, additionalHeaders = {}, withAuth = true){
    return this.send('put', url, data, additionalHeaders, withAuth)
  }
  async delete(url, additionalHeaders = {}, withAuth = true){
    return this.send('delete', url, {}, additionalHeaders, withAuth)
  }

  test(id) {
    return this.get(`test/${id}`);
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

  listFlightAgencies() {
    return this.get("/flightAgency");
  }

  // uploadPassportImage(extension, image) {
  //   return this.post('upload/passport');
  // }

  // signUp(username, password) {
  //   return this.post('signup', {
  //     username: username,
  //     password: password,
  //   })
  // }

  listChildren() {
    return this.get('children');
  }

  getPassportImageUploadLink(extension) {
    return this.get(`upload/passportImage/link/${extension}`);
  }

  async uploadImage(extension, file) {
    const { fileName, preSignedLink } = await this.getPassportImageUploadLink(extension);
    console.log(fileName, preSignedLink);
    await this.put(preSignedLink, file, { 'Content-Type': 'image/*' }, false);
  }
}
