import React, { useState, useEffect, useRef } from "react";
import { StepProps } from "../types";
import Button from "./Button";
import { ArrowRight, Phone } from "lucide-react";

// Define conversation structure
interface Message {
  speaker: string;
  text: string;
}

const Step3CallDemo: React.FC<StepProps> = ({
  userData,
  setUserData,
  onNext,
}) => {
  const [transcript, setTranscript] = useState<Message[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Start call simulation when component mounts
  // useEffect(() => {
  //   startCallSimulation();
  // }, []);

  // Auto-scroll transcript to bottom when new messages are added
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  // const startCallSimulation = () => {
  //   // Get user info with fallbacks
  //   const name = userData.fullName.trim() || 'there';
  //   const category = categories[userData.selectedCategory] || 'business';

  //   // Define conversation
  //   // const conversation: Message[] = [
  //   //   {
  //   //     speaker: 'AI',
  //   //     text: `Hello ${name}, this is Ravan.ai calling. I noticed you were just looking at ${category} solutions on our website. Is this a good time to talk about how we can help grow your business?`
  //   //   },
  //   //   {
  //   //     speaker: 'Prospect',
  //   //     text: '...'
  //   //   },
  //   //   {
  //   //     speaker: 'AI',
  //   //     text: `Great! Based on your interests in ${category}, our system can help you capture leads 24/7 and automatically book qualified appointments for your team.`
  //   //   },
  //   //   {
  //   //     speaker: 'Prospect',
  //   //     text: '...'
  //   //   },
  //   //   {
  //   //     speaker: 'AI',
  //   //     text: `We've helped similar ${category} businesses increase their appointment bookings by over 300%. Would you be interested in seeing how it works specifically for your company?`
  //   //   }
  //   // ];

  //   // Clear existing transcript
  //   setTranscript([]);

  //   // Add first message immediately
  //   setTranscript([conversation[0]]);

  //   // Add remaining messages with delay
  //   let messageIndex = 1;
  //   const messageInterval = setInterval(() => {
  //     if (messageIndex < conversation.length) {
  //       setTranscript(prev => [...prev, conversation[messageIndex]]);
  //       messageIndex++;
  //     } else {
  //       clearInterval(messageInterval);
  //     }
  //   }, 2000);
  // };

  // Business categories (same as in Step2)
  const categories = [
    "Real Estate",
    "E-commerce",
    "Professional Services",
    "Healthcare",
    "Financial Services",
    "SaaS & Technology",
    "Education",
    "Hospitality",
    "Manufacturing",
    "Retail",
  ];

  return (
    <div className="max-w-xl mx-auto">
      {/* Call visual */}
      <div className="w-40 h-40 relative flex justify-center items-center mx-auto mb-5">
        {/* Animated rings */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-full rounded-full border-2 border-green-500 animate-call-ring"
            style={{ animationDelay: `${i * 0.5}s` }}
          ></div>
        ))}

        {/* Call icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 z-10 relative overflow-hidden">
          {/* Highlight effect */}
          <div className="absolute w-full h-full bg-radial-white opacity-50 top-[-50%] left-[-50%]"></div>
          <Phone className="w-10 h-10 text-white drop-shadow-md" />
        </div>
      </div>

      {/* Call status */}
      <div className="flex items-center gap-3 font-medium text-lg text-gray-800 py-2.5 px-6 bg-green-500/10 rounded-full shadow-sm mx-auto w-max mb-6">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50"></div>
        <span>AI Calling Demo in Progress</span>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
        <p className="text-lg text-gray-800 leading-relaxed">
          “Get ready! You’re about to receive a call from our AI Agent.” This is
          a live demo to show you exactly how it engages your leads in real
          time.
        </p>
      </div>

      {/* Transcript */}
      {/* <div 
        ref={transcriptRef}
        className="w-full bg-white border border-gray-100 rounded-2xl p-5 max-h-56 overflow-y-auto text-base text-gray-700 leading-relaxed shadow-md mb-6"
      >
        {transcript.length > 0 ? (
          transcript.map((message, index) => (
            <div key={index} className={`mb-4 pb-4 ${index < transcript.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <span className={`font-semibold ${message.speaker === 'AI' ? 'text-primary' : 'text-gray-800'}`}>
                {message.speaker}:
              </span> {message.text}
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">Loading transcript...</p>
        )}
      </div> */}

      <Button
        onClick={onNext}
        icon={<ArrowRight size={18} />}
        className="w-full mx-auto"
      >
        Complete Demo
      </Button>
    </div>
  );
};

export default Step3CallDemo;
