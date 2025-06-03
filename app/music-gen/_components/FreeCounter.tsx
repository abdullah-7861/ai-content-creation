"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNTS } from "@/constant";

import { Zap } from "lucide-react";
import { useState } from "react";

interface FreeCounterProps {
  userGenerationLimit: number;
}
function FreeCounter({ userGenerationLimit = 0 }: FreeCounterProps) {
  const [loading, setLoading] = useState(false);
  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log(error, "STRIPE_CLIENT_ERROR");
    } finally {
      setLoading(false);
    }
  };
  //   const [mounted, setMounted] = useState(false);

  //   useEffect(() => {
  //     setMounted(true);
  //   }, []);

  //   if (!mounted) {
  //     return null;
  //   }
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {userGenerationLimit} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className=" h-3 bg-white "
              value={(userGenerationLimit / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button
            className="w-full bg-blue-500 text-black hover:bg-slate-400 "
            onClick={onSubscribe}
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default FreeCounter;
