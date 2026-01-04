import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { server } from "../main";
import Loading from "../Loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Verify = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();
  const [loading, setLoading] = useState(true);

  async function verifyUser() {
    try {
      const { data } = await axios.post(
        `${server}/api/v1/verify/${params.token}`
      );
      setSuccessMessage(data.message);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    verifyUser();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground px-4">
      <Card className="w-full max-w-md shadow-lg border-border text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Email Verification
          </CardTitle>
          <CardDescription>Account verification status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {successMessage && (
            <div className="space-y-4">
              <p className="text-green-600 font-medium text-lg">
                {successMessage}
              </p>
              <Button asChild className="w-full">
                <Link to="/login">Go to Login</Link>
              </Button>
            </div>
          )}
          {errorMessage && (
            <div className="space-y-4">
              <p className="text-destructive font-medium text-lg">
                {errorMessage}
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/login">Back to Login</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Verify;
