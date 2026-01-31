import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../apiInterceptor";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await api.post(`/api/v1/login`, {
        email,
        password,
      });
      toast.success(data.message);
      localStorage.setItem("email", email);
      navigate("/verifyotp");
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.error && Array.isArray(errorData.error)) {
        // Handle Zod validation errors
        errorData.error.forEach((err) => toast.error(err.message));
      } else {
        // Handle generic errors
        toast.error(errorData?.message || "Something went wrong");
      }
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground px-4">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full" disabled={btnLoading}>
              {btnLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Separator className="my-4" />
            <span className="text-muted-foreground">
              Don&apos;t have an account?{" "}
            </span>
            <Link
              to="/register"
              className="font-medium text-primary hover:underline hover:brightness-110"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
