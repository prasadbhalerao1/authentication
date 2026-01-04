import React from "react";
import { AppData } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  const { logoutUser, user } = AppData();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground px-4 py-8">
      <Card className="w-full max-w-md shadow-2xl border-border bg-card">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-24 h-24 mb-4 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-lg">
            <span className="text-3xl font-bold text-primary">
              {getInitials(user?.name)}
            </span>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Welcome, {user?.name}!
          </CardTitle>
          <CardDescription className="text-base mt-2">
            You are successfully logged in
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 mt-4">
          <div className="space-y-4 rounded-lg border border-border p-4 bg-secondary/20">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Email Address
              </span>
              <span className="text-sm font-semibold">{user?.email}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Account Role
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/50 capitalize">
                {user?.role || "User"}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Member Since
              </span>
              <span className="text-sm font-semibold">
                {formatDate(user?.createdAt)}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 pt-2">
          {user && user.role === "admin" && (
            <Link to="/dashboard" className="w-full">
              <Button variant="default" className="w-full h-10 text-base">
                Access Admin Dashboard
              </Button>
            </Link>
          )}

          <Button
            variant={user?.role === "admin" ? "outline" : "default"}
            className={`w-full h-10 text-base ${
              user?.role !== "admin"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
            }`}
            onClick={() => logoutUser(navigate)}
          >
            Log Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
