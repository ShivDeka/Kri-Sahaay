import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Phone, Mail, Sprout } from "lucide-react";
import heroImage from "@/assets/agriculture-hero.jpg";
import appLogo from "@/assets/app-logo.png";

const Login = () => {
  const [loginType, setLoginType] = useState<"phone" | "email">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple validation - in real app would connect to backend
    if (loginType === "phone" && phoneNumber.length >= 10) {
      navigate("/home");
    } else if (loginType === "email" && email.includes("@")) {
      navigate("/home");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo and Tagline */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src={appLogo} alt="Kri-Sahaay" className="w-16 h-16 mr-3" />
            <div className="flex items-center">
              <Sprout className="w-8 h-8 text-agriculture-green mr-2" />
              <h1 className="text-3xl font-bold text-white">Kri-सहाय</h1>
            </div>
          </div>
          <p className="text-agriculture-wheat text-lg font-medium">
            Smart Farming for Better Tomorrow
          </p>
          <p className="text-white/90 text-sm mt-2">
            AI-powered agriculture guidance for farmers
          </p>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={loginType === "phone" ? "agriculture" : "ghost"}
                className="flex-1"
                onClick={() => setLoginType("phone")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </Button>
              <Button
                variant={loginType === "email" ? "agriculture" : "ghost"}
                className="flex-1"
                onClick={() => setLoginType("email")}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {loginType === "phone" ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
            )}

            <Button
              onClick={handleLogin}
              className="w-full"
              variant="agriculture"
              size="lg"
            >
              Continue to Kri-Sahaay
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                New to Kri-Sahaay?{" "}
                <button className="text-agriculture-green font-medium hover:underline">
                  Sign up now
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 text-center text-white/90 text-sm space-y-1">
          <p>🌾 AI Crop Recommendations</p>
          <p>📊 Market Price Insights</p>
          <p>🌤️ Weather Forecasts</p>
          <p>🗣️ Voice & Image Support</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
