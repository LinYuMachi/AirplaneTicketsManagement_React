import axios from "axios";

export default class ApiClient {
  client;
  constructor() {
    this.client = axios.create({
      baseURL: 'https://iw3b7a08zb.execute-api.ap-southeast-2.amazonaws.com/prod'
    });
  }
  listTestTable() {
    return this.client.get('test/insert').then((resp) => resp.data);
  }

  insertTestTable(name) {
    return this.client.post('test/insert', {
      "name": name,
    }).then(resp => resp.data);
  }

  listFlights() {
    return this.client.get('flight').then(resp => resp?.data?.flights);
  }
}