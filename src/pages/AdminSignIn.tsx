import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Eye, EyeOff, Shield, Lock } from "lucide-react";

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTwoFA, setShowTwoFA] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate form
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // If 2FA is shown, validate 2FA code
    if (showTwoFA) {
      if (!twoFACode || twoFACode !== "123456") {
        setError("Invalid 2FA code. Try 123456 for demo.");
        setIsLoading(false);
        return;
      }
      
      toast({
        title: "Welcome back, Admin! 🔐",
        description: "Your security is our top priority.",
      });
      window.location.href = "/admin";
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials for admin
      if (email === "admin@nerdshive.com" && password === "admin123") {
        setShowTwoFA(true);
        setIsLoading(false);
        return;
      }
      
      setError("Invalid admin credentials. Please check your email and password.");
      setIsLoading(false);
      return;
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl glass-effect">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold text-gradient text-elegant">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-lg">
            Secure access for administrators only
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Demo Credentials */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 space-y-2 text-sm">
            <p className="font-semibold text-warning">Demo Admin Credentials:</p>
            <p><strong>Email:</strong> admin@nerdshive.com</p>
            <p><strong>Password:</strong> admin123</p>
            <p><strong>2FA Code:</strong> 123456</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {showTwoFA && (
              <div className="space-y-2">
                <Label htmlFor="twofa" className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Two-Factor Authentication Code
                </Label>
                <Input
                  id="twofa"
                  type="text"
                  placeholder="Enter 6-digit code (Demo: 123456)"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value)}
                  maxLength={6}
                  required
                  className="bg-white text-center font-mono text-lg"
                />
                <p className="text-xs text-muted-foreground text-center">
                  Welcome back, Admin! Your security is our top priority. 🔐
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              variant="gradient"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : showTwoFA ? "Verify & Access Dashboard" : "Secure Login"}
            </Button>
          </form>

          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Not an admin?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold text-primary"
                onClick={() => window.location.href = "/"}
              >
                Go to User Portal
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSignIn;