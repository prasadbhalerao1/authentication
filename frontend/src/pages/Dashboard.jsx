import React, { useEffect, useState } from "react";
import api from "../apiIntercepter";
import { toast } from "sonner"; // Used sonner to match other pages
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ShieldCheck, ArrowLeft, Users, Activity } from "lucide-react"; // Assuming lucide-react is available or use standard SVGs

const Dashboard = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchAdminData() {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/v1/admin`, {
        withCredentials: true,
      });

      setContent(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch admin data"
      );
      navigate("/"); // Redirect to home if not admin (handled by backend 401/403 usually)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your application and view system status.
            </p>
          </div>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Status Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <ShieldCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">
                System is running normally
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Admin Access
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Authorized</div>
              <p className="text-xs text-muted-foreground">
                You have full permissions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                API Response
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-mono truncate">
                {loading ? "Loading..." : content || "No Data"}
              </div>
              <p className="text-xs text-muted-foreground">
                Message from Backend
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <Card className="min-h-[300px] flex items-center justify-center border-dashed">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">Admin Panel Content</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              This is a protected route. Only users with the role{" "}
              <code>'admin'</code> can view this page. The backend successfully
              verified your permissions.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
