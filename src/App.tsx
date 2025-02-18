// import React from "react";
import NetworkingForm from "./components/NetworkingForm";
import Prompt from "./components/Prompt";
import ShowContacts from "./components/ShowContact";

export default function App(){
  return (
    <div>
      <h1>Netwerk!</h1>
      <p>The purpose of Netwerk! is to gamify and humanize the networking experience by providing prompts, setting scavenger-hunt-like challenges, and awarding badges during networking events and meetups. Check out the proof of concept below.</p>
      <Prompt></Prompt>
      <NetworkingForm></NetworkingForm>
      <ShowContacts></ShowContacts>
    </div>
  )
}