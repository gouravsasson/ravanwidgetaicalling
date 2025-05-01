import React, { useState, useEffect, useRef } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import axios from "axios";
import { useRetellStore } from "../utils/useRetellStore";

const AiAvatar: React.FC<{
  start: boolean;
  stop: boolean;
  agent_code: number;
  quick_campaign_id: string;
}> = ({ start, stop, agent_code, quick_campaign_id }) => {
  const retellWebClient = new RetellWebClient();
  const [transcripts, setTranscripts] = useState([]);
  const onestart = useRef(false);

  useEffect(() => {
    const state = useRetellStore.getState() as {
      setRetellWebClient: (client: RetellWebClient) => void;
    };
    state.setRetellWebClient(retellWebClient);
  }, []);

  useEffect(() => {
    if (!agent_code || !quick_campaign_id) {
      return;
    }
    if (agent_code === 174) {
      retellWebClient.stopCall();
    }
    const startagent = async () => {
      try {
        const res = await axios.post(
          "https://app.closerx.ai/api/ravan-ai-start/",
          {
            schema_name: "voizerfreeaccount",
            agent_code: agent_code,
            quick_campaign_id: quick_campaign_id,
            phone: 99911293960,
            name: "Ravan",
            email: "ravan@gmail.com",
            country: "India",
          }
        );

        const accessToken = res.data.response.access_token;
        const newCallId = res.data.response.call_id;

        retellWebClient.startCall({
          accessToken: accessToken,
        });
      } catch (err) {
        console.error("Form error:", err);
      }
    };

    startagent();
    // }
  }, [agent_code, quick_campaign_id]);

  const stopagent = () => {
    retellWebClient.stopCall();
  };

  return (
    <div className="w-28 h-28 rounded-full bg-white border-2 border-primary flex justify-center items-center relative shadow-lg shadow-primary/15 mx-auto mb-6 transform-gpu">
      {/* Pulsing rings */}
      <div className="absolute w-[150%] h-[150%] rounded-full border border-primary/20 animate-pulse-slow"></div>
      <div className="absolute w-[180%] h-[180%] rounded-full border border-primary/10 animate-pulse-slower"></div>

      {/* AI face */}
      <div className="w-16 h-16 relative transform-gpu">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-primary/30 shadow-inner relative">
          {/* Eyes */}
          <div className="absolute w-full top-1/3 flex justify-around z-10">
            <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 relative overflow-hidden">
              <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-0.5 left-0.5 opacity-80"></div>
            </div>
            <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 relative overflow-hidden">
              <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-0.5 left-0.5 opacity-80"></div>
            </div>
          </div>

          {/* Mouth */}
          <div className="absolute w-8 h-1.5 bg-primary bottom-1/4 left-1/2 -translate-x-1/2 rounded-full shadow-sm animate-talk"></div>
        </div>
      </div>
    </div>
  );
};

export default AiAvatar;
