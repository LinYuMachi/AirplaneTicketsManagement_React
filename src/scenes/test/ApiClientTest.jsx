import React, {useContext, useState} from "react";
import {ApiContext} from "../../App";
import {Button} from "@mui/material";

export const ApiClientTest = () => {
  const apiClient = useContext(ApiContext);
  const [name, setName] = useState("")
  return (
      <>
        <div>
          <Button type="submit" color="secondary" variant="contained" onClick={() => apiClient.listTestTable().then(resp => console.log(resp))}>
          List Test Table
          </Button>
        </div>
        <div>
          <p>name: </p>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          <Button type="submit" color="secondary" variant="contained" onClick={() => apiClient.insertTestTable(name).then(resp => console.log(resp))}>
            Insert into TestTable
          </Button>
        </div>
      </>
  )
}