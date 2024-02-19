import React from "react";
import Conversation from "./Conversation";
import useGetConvo from "../../hooks/useGetConversations.js";

const Conversations = () => {
  const { loading, conversations } = useGetConvo();
  console.log("CONVERSATIONS:", conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};

export default Conversations;
