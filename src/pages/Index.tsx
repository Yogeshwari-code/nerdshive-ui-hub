import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, Shield, Coffee, Users, Zap, HeartHandshake, Clock } from "lucide-react";
import { SignInModal } from "@/components/auth/SignInModal";
import { RegisterModal } from "@/components/auth/RegisterModal";

const Index = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const features = [
    {
      icon: Wifi,
      title: "24/7 High-Speed Wi-Fi",
      description: "Lightning-fast internet connectivity for seamless productivity"
    },
    {
      icon: Shield,
      title: "CCTV Security & Access Control",
      description: "Advanced security systems ensuring a safe working environment"
    },
    {
      icon: Coffee,
      title: "Complimentary Beverages",
      description: "Free coffee, tea, and refreshments to keep you energized"
    },
    {
      icon: Users,
      title: "Community Events & Networking",
      description: "Connect with like-minded professionals and grow your network"
    },
    {
      icon: Zap,
      title: "Power Backup",
      description: "Uninterrupted power supply for continuous work flow"
    },
    {
      icon: HeartHandshake,
      title: "Tech Support",
      description: "Dedicated technical assistance whenever you need it"
    },
    {
      icon: Clock,
      title: "Dedicated Workstations & Private Cabins",
      description: "Choose from open desks or private spaces based on your needs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="animate-logo-slide mb-8">
          <img 
            src="/lovable-uploads/10dc8619-d90d-44d5-a68f-7022b5696552.png" 
            alt="Nerdshive Logo" 
            className="h-24 w-auto mx-auto mb-8"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Smart coworking for{" "}
            <span className="text-gradient">creators</span> and{" "}
            <span className="text-gradient">professionals</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join a vibrant community of innovators, entrepreneurs, and creative professionals 
            in our modern coworking space designed for productivity and collaboration.
          </p>
        </div>

        <div className="animate-slide-up flex flex-col sm:flex-row gap-4 mb-16">
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => setShowRegister(true)}
            className="min-w-[200px]"
          >
            Join Nerdshive
          </Button>
          <Button 
            variant="outline" 
            size="xl"
            onClick={() => setShowSignIn(true)}
            className="min-w-[200px]"
          >
            Sign In
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Nerdshive?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide everything you need to focus on what matters most - your work and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="hover-lift animate-scale-in bg-card/80 backdrop-blur-sm border-0 shadow-soft"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modals */}
      <SignInModal 
        open={showSignIn} 
        onOpenChange={setShowSignIn}
        onSwitchToRegister={() => {
          setShowSignIn(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal 
        open={showRegister} 
        onOpenChange={setShowRegister}
        onSwitchToSignIn={() => {
          setShowRegister(false);
          setShowSignIn(true);
        }}
      />
    </div>
  );
};

export default Index;