import React, { useState } from "react";
import { UserData } from "../types";
import ProgressBar from "./ProgressBar";
import Step1Form from "./Step1Form";
import Step2CategorySelection from "./Step2CategorySelection";
import Step3CallDemo from "./Step3CallDemo";
import Step4Success from "./Step4Success";
import { CheckIcon, Phone, ChevronLeft } from "lucide-react";

// Decorative circle component for visual interest
const DecorativeCircle = ({ className }: { className: string }) => (
  <div className={`absolute rounded-full opacity-30 ${className}`}></div>
);

interface RavanExperienceProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const RavanExperience: React.FC<RavanExperienceProps> = ({
  userData,
  setUserData,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
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

  // Define the steps and their respective components
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
          onNext={resetDemo}
        />
      ),
      icon: currentStep > 2 ? <CheckIcon size={16} /> : "3",
    },
    // {
    //   component: (
    //     <Step4Success
    //       userData={userData}
    //       setUserData={setUserData}
    //       onNext={resetDemo}
    //     />
    //   ),
    //   icon: currentStep > 3 ? <CheckIcon size={16} /> : "4",
    // },
  ];

  return (
    <div className="w-full max-w-4xl relative bg-gradient-to-tr from-white to-gray-50 rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      {/* Decorative elements */}
      <DecorativeCircle className="w-72 h-72 -top-36 -right-20 bg-primary/20 blur-3xl" />
      <DecorativeCircle className="w-60 h-60 -bottom-10 -left-10 bg-green-500/10 blur-3xl" />

      {/* Back button (not shown on first or last step) */}
      {currentStep > 0 && currentStep < 3 && (
        <button
          onClick={goToPreviousStep}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 shadow-sm transition-all"
          aria-label="Go back"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
      )}

      {/* Progress indicator */}
      <div className="relative z-10 pt-8">
        <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      </div>

      {/* Step content */}
      <div className="p-6 pb-10">{steps[currentStep].component}</div>
    </div>
  );
};

export default RavanExperience;
