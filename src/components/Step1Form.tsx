import React, { useState } from "react";
import { StepProps } from "../types";
import AiAvatar from "./AiAvatar";
import Button from "./Button";
import { User, Mail, Phone, ArrowRight } from "lucide-react";
import { useRetellStore } from "../utils/useRetellStore";
import { useTranscriptStore } from "../utils/useTranscriptStore";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

const Step1Form: React.FC<StepProps> = ({ userData, setUserData, onNext }) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const transcripts = useTranscriptStore((state) => state.transcripts);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!userData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!userData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      handleStop();
      const data = {
        email: userData.email,
        receiver_number: userData.phone,
        name: userData.fullName,
      };
      // allFormData(data);
      onNext();
    }
  };

  const handleStop = () => {
    const state = useRetellStore.getState() as { stopAgent: () => void };
    state.stopAgent();
  };

  return (
    <div className="max-w-xl mx-auto">
      <AiAvatar
        start={true}
        stop={false}
        agent_code={173}
        quick_campaign_id="quickcamp257c78ec"
      />

      <div className="bg-white rounded-2xl p-6 shadow-md mb-6 relative">
        {/* Message pointer */}
        <div className="absolute w-5 h-5 bg-white border-l border-t border-gray-50 -top-2.5 left-1/2 -translate-x-1/2 rotate-45"></div>

        <p className="text-lg text-gray-800 leading-relaxed">{transcripts}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Your Full Name"
            className={`w-full p-4 pl-12 bg-white border ${
              errors.fullName ? "border-red-500" : "border-gray-200"
            } 
              rounded-xl shadow-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 
              transition-all duration-300 placeholder:text-gray-400 placeholder:transition-all 
              focus:placeholder:translate-x-1 focus:placeholder:opacity-70 text-gray-800`}
            value={userData.fullName}
            onChange={(e) =>
              setUserData({ ...userData, fullName: e.target.value })
            }
          />
          <User
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 
            peer-focus:text-primary transition-colors"
            size={20}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="email"
            placeholder="Your Email Address"
            className={`w-full p-4 pl-12 bg-white border ${
              errors.email ? "border-red-500" : "border-gray-200"
            } 
              rounded-xl shadow-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 
              transition-all duration-300 placeholder:text-gray-400 placeholder:transition-all 
              focus:placeholder:translate-x-1 focus:placeholder:opacity-70 text-gray-800`}
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 
            peer-focus:text-primary transition-colors"
            size={20}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="relative">
          <PhoneInput
            containerClass="w-full h-[58px]"
            inputClass=" !h-[58px] !w-full !rounded-xl !pl-[100px]"
            dropdownClass="bottom-10 z-50"
            // buttonClass=" !w-[58px] "
            dropdownStyle={{ zIndex: 1000 }}
            inputProps={{
              name: "phone",
              required: true,
            }}
            // country={"us"}
            value={userData.phone}
            onChange={(phone) => {
              setUserData({ ...userData, phone });
            }}
            enableSearch={true}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <Button
          type="submit"
          icon={<ArrowRight size={18} />}
          className="w-full mt-6"
        >
          Continue to Select Business Type
        </Button>
      </form>
    </div>
  );
};

export default Step1Form;
