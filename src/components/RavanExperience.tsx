import React, { useState } from "react";
import { UserData } from "../types";
import ProgressBar from "./ProgressBar";
import Step1Form from "./Step1Form";
import Step2CategorySelection from "./Step2CategorySelection";
import Step3CallDemo from "./Step3CallDemo";
import Step4Success from "./Step4Success";
import { CheckIcon, ChevronLeft, X } from "lucide-react";
import { useRetellStore } from "../utils/useRetellStore";

const DecorativeCircle = ({ className }) => (
  <div className={`absolute rounded-full opacity-30 ${className}`}></div>
);

interface RavanExperienceProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onClose: () => void;
}

const RavanExperience: React.FC<RavanExperienceProps> = ({
  userData,
  setUserData,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const handleStop = () => {
    const state = useRetellStore.getState() as { stopAgent: () => void };
    state.stopAgent();
    onClose();
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const resetDemo = () => {
    setUserData({
      fullName: "",
      email: "",
      phone: "",
      selectedCategory: 0,
    });
    setCurrentStep(0);
  };

  const steps = [
    {
      component: (
        <Step1Form
          userData={userData}
          setUserData={setUserData}
          onNext={goToNextStep}
        />
      ),
      icon: currentStep > 0 ? <CheckIcon size={16} /> : "1",
    },
    {
      component: (
        <Step2CategorySelection
          userData={userData}
          setUserData={setUserData}
          onNext={goToNextStep}
        />
      ),
      icon: currentStep > 1 ? <CheckIcon size={16} /> : "2",
    },
    {
      component: (
        <Step3CallDemo
          userData={userData}
          setUserData={setUserData}
          onNext={goToNextStep}
        />
      ),
      icon: currentStep > 2 ? <CheckIcon size={16} /> : "3",
    },
    {
      component: (
        <Step4Success
          userData={userData}
          setUserData={setUserData}
          onNext={resetDemo}
        />
      ),
      icon: currentStep > 3 ? <CheckIcon size={16} /> : "4",
    },
  ];

  return (
    <div className="w-full max-w-4xl relative bg-gradient-to-tr from-white to-gray-50 rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      {/* Decorative elements */}
      <DecorativeCircle className="w-72 h-72 -top-36 -right-20 bg-primary/20 blur-3xl" />
      <DecorativeCircle className="w-60 h-60 -bottom-10 -left-10 bg-green-500/10 blur-3xl" />

      {/* Close button */}
      <button
        onClick={handleStop}
        className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Close"
      >
        <X size={20} className="text-gray-600" />
      </button>

      {/* Back button - only shown on steps 1-2 */}
      {currentStep > 0 && currentStep < 3 && (
        <button
          onClick={goToPreviousStep}
          className="absolute top-4 left-4 z-10 p-4 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 shadow-sm transition-all"
          aria-label="Go back"
        >
          <ChevronLeft
            onClick={goToPreviousStep}
            size={30}
            className="text-gray-600"
          />
        </button>
      )}

      {/* Progress indicator */}
      <div className="relative z-10 pt-8">
        <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      </div>

      {/* Current step content */}
      <div className="p-6 pb-10">{steps[currentStep].component}</div>
    </div>
  );
};

export default RavanExperience;
