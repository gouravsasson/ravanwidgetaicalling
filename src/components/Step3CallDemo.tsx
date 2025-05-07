import React, { useState, useEffect, useRef } from "react";
import { StepProps } from "../types";
import Button from "./Button";
import { ArrowRight, Phone } from "lucide-react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useCallResultStore } from "../utils/useCallResultStore";

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
  const [quickid, setQuickid] = useState(null);

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
  const [buttonText, setButtonText] = useState("Complete Demo");
  const [isLoading, setIsLoading] = useState(false);
  const quick_camp_result_id = localStorage.getItem("quick_camp_result_id");
  const { setCallResult } = useCallResultStore();
  useEffect(() => {
    setQuickid(quick_camp_result_id);
  }, [quick_camp_result_id]);

  const { data: callDemoData } = useQuery({
    queryKey: ["call-demo", quick_camp_result_id],
    queryFn: () =>
      axios.post("https://app.closerx.ai/api/quick-campaign-results/", {
        quick_camp_result_id,
        "Company-Name": "voizerfreeaccount",
      }),
    enabled: !!quick_camp_result_id,
    refetchInterval: (data) => {
      const status = data?.state?.data?.data?.data?.status;
      return status === "user_hangup" || status === "error" ? false : 1000;
    },
  });

  useEffect(() => {
    const status = callDemoData?.data?.data?.status;

    const isLoadingStatus = ["initiated", "queued"];
    const isCompletedStatus = [
      "user_hangup",
      "error",
      "inactivity",
      "agent_hangup",
      "Disconnection",
      "voicemail_reached",
    ];

    if (isCompletedStatus.includes(status)) {
      setButtonText("Complete Demo");
      setIsLoading(false);
      setCallResult(callDemoData?.data);
    } else if (isLoadingStatus.includes(status)) {
      setButtonText("Call in Progress");
      setIsLoading(true);
    }
  }, [callDemoData?.data?.data?.status]);

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
        icon={
          isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <ArrowRight size={18} />
          )
        }
        className={`w-full mx-auto ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default Step3CallDemo;
