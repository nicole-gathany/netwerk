// import React from "react";
import NetworkingForm from "./components/NetworkingForm";
import Prompt from "./components/Prompt";
import ShowContacts from "./components/ShowContact";

export default function App(){
  return (
    <div>
      <Prompt></Prompt>
      <NetworkingForm></NetworkingForm>
      <ShowContacts></ShowContacts>
    </div>
  )
}