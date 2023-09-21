import React, {useContext, useState} from "react";
import {ApiContext} from "../../App";
import {Button} from "@mui/material";

export const ApiClientTest = () => {
  const apiClient = useContext(ApiContext);
  const [name, setName] = useState("");
  const [id, setId] = useState("1234");


  const [previewUrl, setPreviewUrl] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes('image') && file.size <= 5000000) {
      setIsValid(true);
      setPreviewUrl(URL.createObjectURL(file));
      const extension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
      console.log("a");
      const buffer = await file.arrayBuffer();
      console.log("b");
      apiClient.uploadPassportImage(extension, new Int8Array(buffer)).then((resp) => console.log(resp));
    } else {
      setIsValid(false);
    }
  };

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
        <div>
          <p>id: </p>
          <input type="text" value={id} onChange={(event) => setId(event.target.value)} />
          <Button type="submit" color="secondary" variant="contained" onClick={() => apiClient.test(id).then(resp => console.log(resp))}>
            Test
          </Button>
        </div>
        <div>
          <input type="file" accept=".jpg,.png,.jpeg" onChange={handleFileChange} />
          {!isValid && <p>Please select a valid image (jpg, png) with size up to 5MB.</p>}
          {previewUrl && <img src={previewUrl} alt="Selected" style={{ width: '100%' }} />}
        </div>
      </>
  )
}