import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Eye, EyeOff, Shield } from "lucide-react";

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToRegister: () => void;
}

export const SignInModal = ({ open, onOpenChange, onSwitchToRegister }: SignInModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const { signIn } = useAuth();

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

    try {
      await signIn(email, password);
      
      onOpenChange(false);
      toast({
        title: "Welcome back! 🎉",
        description: "You've been signed in successfully.",
      });
      
      // Redirect based on user role will be handled by auth state
    } catch (error: any) {
      if (error.message.includes('Invalid login credentials')) {
        setError("Invalid email or password. Please try again.");
      } else if (error.message.includes('Email not confirmed')) {
        setError("Please check your email and confirm your account.");
      } else {
        toast({
          title: "Demo Credentials",
          description: "For demo: admin@nerdshive.com / admin123 or user@nerdshive.com / user123",
        });
        setError("Invalid credentials. Try the demo accounts above.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
    setShowPassword(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <LogIn className="h-6 w-6 text-primary" />
            Welcome Back
          </DialogTitle>
          <DialogDescription>
            Sign in to access your Nerdshive dashboard
          </DialogDescription>
        </DialogHeader>

        {/* Demo Credentials */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-2 text-sm">
          <p className="font-semibold text-accent">Demo Credentials:</p>
          <div className="space-y-1">
            <p><strong>Admin:</strong> admin@nerdshive.com / admin123</p>
            <p><strong>User:</strong> user@nerdshive.com / user123</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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

          <Button 
            type="submit" 
            className="w-full" 
            variant="gradient"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Let's Go!"}
          </Button>
        </form>

        <div className="text-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            New here?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={onSwitchToRegister}
            >
              Join Nerdshive
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};