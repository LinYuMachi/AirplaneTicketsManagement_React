import axios from "axios";

export default class MockApiClient {
  constructor() {}
  listTestTable() {
    return Promise.resolve( [{"id": "mockId1", "name": "mockName1"}, {"id": "mockId2", "name": "mockName2"}]);
  }

  insertTestTable(name) {
    return Promise.resolve('SUCCESS');
  }
}