import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../apiInterceptor";
import { toast } from "sonner";
import { AppData } from "../context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuth, setUser } = AppData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const email = localStorage.getItem("email");
    try {
      const { data } = await api.post(`/api/v1/verify`, { email, otp });

      toast.success(data.message);
      setIsAuth(true);
      setUser(data.user);
      localStorage.removeItem("email");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground px-4">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Two-Step Verification
          </CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={submitHandler}
            className="flex flex-col items-center space-y-6"
          >
            <div className="space-y-4">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={btnLoading || otp.length !== 6}
            >
              {btnLoading ? "Verifying..." : "Verify OTP"}
            </Button>

            <Link
              to="/login"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 underline"
            >
              Back to Login
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;
