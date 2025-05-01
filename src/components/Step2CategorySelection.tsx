import React, { useState, useEffect, useRef } from "react";
import { StepProps } from "../types";
import AiAvatar from "./AiAvatar";
import Button from "./Button";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
import { useRetellStore } from "../utils/useRetellStore";
import axios from "axios";
import { useTranscriptStore } from "../utils/useTranscriptStore";

// Business categories
const categories = [
  {
    agent_code: 164,
    name: "Real Estate",
  },
  {
    agent_code: 165,
    name: "financial services",
  },
  {
    agent_code: 166,
    name: "tourism",
  },
  {
    agent_code: 167,
    name: "Healthcare & Clinics",
  },
  {
    agent_code: 168,
    name: "Marketing",
  },
  {
    agent_code: 169,
    name: "IT & Software",
  },
  {
    agent_code: 170,
    name: "insurance",
  },
  {
    agent_code: 171,
    name: "education",
  },
  {
    agent_code: 172,
    name: "E-commerce",
  },
];

const Step2CategorySelection: React.FC<StepProps> = ({
  userData,
  setUserData,
  onNext,
}) => {
  console.log(userData);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [selectedagent, setSelectedagent] = useState(164);
  const transcripts = useTranscriptStore((state) => state.transcripts);
  console.log(selectedagent);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Update wheel rotation when selected category changes
  useEffect(() => {
    const anglePerCategory = 360 / categories.length;
    setWheelRotation(-userData.selectedCategory * anglePerCategory);
  }, [userData.selectedCategory]);

  const handleCategorySelect = (index: number, agent_code: number) => {
    setUserData({ ...userData, selectedCategory: index });
    setSelectedagent(agent_code);
  };

  const rotateWheel = (direction: "up" | "down") => {
    const totalCategories = categories.length;
    let newIndex;

    if (direction === "up") {
      newIndex =
        (userData.selectedCategory - 1 + totalCategories) % totalCategories;
    } else {
      newIndex = (userData.selectedCategory + 1) % totalCategories;
    }

    handleCategorySelect(newIndex, categories[newIndex].agent_code);
  };

  const handleStop = () => {
    const state = useRetellStore.getState() as { stopAgent: () => void };
    state.stopAgent();
  };

  const handleNext = async () => {
    try {
      handleStop();
      const response = await axios.post(
        `https://app.closerx.ai/api/testcall/voizerfreeaccount/`,
        {
          email: userData.email,
          receiver_number: userData.phone,
          name: userData.fullName,
          new_agent: selectedagent,
          access_key: "testmycall",
          calling_number: "+18582520325",
        }
      );
      console.log("Form submitted:", allFormData);
      // alert("Request sent! We will contact you shortly.");
    } catch (error) {
      // alert("An error occurred. Please try again later.");
    }
    onNext();
  };

  return (
    <div className="max-w-xl mx-auto">
      <AiAvatar
        start={true}
        stop={false}
        agent_code={174}
        quick_campaign_id="quickcamp581dd7a0"
      />

      <div className="bg-white rounded-2xl p-6 shadow-md mb-6 relative">
        {/* Message pointer */}
        <div className="absolute w-5 h-5 bg-white border-l border-t border-gray-50 -top-2.5 left-1/2 -translate-x-1/2 rotate-45"></div>

        <p className="text-lg text-gray-800 leading-relaxed">{transcripts}</p>
      </div>

      {/* 3D Wheel Container */}
      <div className="w-full h-80 relative perspective-[1500px] my-8 overflow-visible">
        <div className="w-full h-full absolute flex justify-center items-center transform-gpu">
          {/* Wheel highlight */}
          <div className="absolute w-[95%] h-[75px] border-2 border-primary rounded-2xl top-1/2 left-[2.5%] -translate-y-1/2 shadow-lg shadow-primary/20 pointer-events-none z-10 opacity-50">
            {/* Highlight indicators */}
            <div className="absolute w-10 h-1.5 rounded-sm bg-primary top-1/2 -translate-y-1/2 -left-5"></div>
            <div className="absolute w-10 h-1.5 rounded-sm bg-primary top-1/2 -translate-y-1/2 -right-5"></div>
          </div>

          {/* Category wheel */}
          <div
            ref={wheelRef}
            className="transform-gpu w-[90%] h-[300px] relative transition-transform duration-800 ease-out"
            style={{
              transform: `translateZ(-180px) rotateX(${wheelRotation}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {categories.map((category, index) => {
              const angle = (360 / categories.length) * index;
              const isSelected = index === userData.selectedCategory;

              return (
                <div
                  key={index}
                  className={`absolute w-full h-16 left-0 top-1/2 -mt-8 flex justify-center items-center 
                    bg-white rounded-xl cursor-pointer transition-all duration-300 select-none
                    ${
                      isSelected
                        ? "bg-gradient-to-r from-primary to-primary-dark text-white z-10 shadow-lg shadow-primary/25 scale-105"
                        : "border border-gray-100 text-gray-800 shadow-md"
                    }`}
                  style={{
                    transform: `rotateX(${angle}deg) translateZ(180px)`,
                    transformOrigin: "center",
                    backfaceVisibility: "hidden",
                  }}
                  onClick={() =>
                    handleCategorySelect(index, category.agent_code)
                  }
                >
                  <span className="text-lg font-medium">{category.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wheel controls */}
      <div className="flex justify-center gap-10 mb-6">
        <button
          onClick={() => rotateWheel("up")}
          className="w-14 h-14 rounded-full bg-white border border-gray-200 flex justify-center items-center 
            shadow-md hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20
            transition-all duration-300 text-gray-600"
          aria-label="Scroll up"
        >
          <ChevronUp size={24} />
        </button>
        <button
          onClick={() => rotateWheel("down")}
          className="w-14 h-14 rounded-full bg-white border border-gray-200 flex justify-center items-center 
            shadow-md hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20
            transition-all duration-300 text-gray-600"
          aria-label="Scroll down"
        >
          <ChevronDown size={24} />
        </button>
      </div>

      <Button
        onClick={handleNext}
        icon={<ArrowRight size={18} />}
        className="w-full mx-auto mt-4"
      >
        Continue to AI Call Demo
      </Button>
    </div>
  );
};

export default Step2CategorySelection;
