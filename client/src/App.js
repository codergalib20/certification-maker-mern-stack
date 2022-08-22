/* eslint-disable import/first */
import React from 'react';
import { useForm } from "react-hook-form";
import "./App.css";
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5000/api"
import FileSaver from "file-saver";
// 
const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    axios.post("/post-data", data)
      .then(() => axios.get("/get-certificate", { responseType: "blob" }))
      .then(res => {
        console.log(res);
        var file = new File([res.data], "certified.pdf", { type: "application/pdf" });
        FileSaver.saveAs(file);
      })
      .catch(error => console.log(error));
  };
  function sayHello() {
    var blob = new Blob(["Hello, world!"], {
      type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(blob, "hello world.pdf");
  }
  return (
    <div>
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* include validation with required or other standard HTML validation rules */}
          <input {...register("name", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>Name field is required</span>}
          <input type="submit" />
        </form>
        <div onClick={sayHello} class="whitebutton">
          <button>Download</button><br />
          <span class="up">click to Download</span><br />
          {/* <span class="down">1.6MB .rar</span> */}
        </div>
      </div>
    </div>
  );
};

export default App;