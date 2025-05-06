import React from "react";
import clsx from "clsx";

interface Word {
  start: number;
  end: number;
  word: string;
}

interface Message {
  role: "agent" | "user";
  content: string;
  words: Word[];
  metadata?: {
    response_id: number;
  };
}

interface Props {
  messages: Message[];
}

const TranscriptChat: React.FC<Props> = ({ messages }) => {
  return (
    <div className="w-full max-w-2xl max-h-[200px] mx-auto mb-4 p-4 space-y-4 bg-gray-50 rounded-xl shadow-sm overflow-scroll">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={clsx(
            "flex items-start space-x-2",
            msg.role === "agent" ? "justify-start" : "justify-end"
          )}
        >
          {msg.role === "agent" && (
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
              A
            </div>
          )}

          <div
            className={clsx(
              "rounded-lg px-4 py-2 text-sm max-w-[75%]",
              msg.role === "agent"
                ? "bg-purple-100 text-gray-900"
                : "bg-green-100 text-gray-900"
            )}
          >
            {msg.content}
          </div>

          {msg.role === "user" && (
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
              U
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TranscriptChat;
