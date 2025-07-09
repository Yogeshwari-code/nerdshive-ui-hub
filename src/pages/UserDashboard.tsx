import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  MessageSquare, 
  FileText, 
  Clock,
  Calendar,
  Wifi,
  Coffee,
  CheckCircle,
  AlertCircle,
  Send,
  Upload,
  History,
  Bell,
  Users,
  Home,
  Copy,
  QrCode
} from "lucide-react";

// Mock data
const plans = [
  {
    id: "daily",
    name: "Daily",
    price: "₹299",
    period: "+ GST",
    features: [
      "8 hours access",
      "High-speed Wi-Fi",
      "Basic amenities",
      "Common area access"
    ]
  },
  {
    id: "weekly", 
    name: "Weekly",
    price: "₹1,400",
    period: "+ GST",
    features: [
      "Unlimited access",
      "High-speed Wi-Fi", 
      "All amenities",
      "Priority booking",
      "Meeting room access"
    ],
    popular: true
  },
  {
    id: "monthly",
    name: "Monthly", 
    price: "₹4,600",
    period: "+ GST",
    features: [
      "24/7 access",
      "Dedicated desk option",
      "All premium amenities",
      "Private cabin booking",
      "Business address"
    ]
  }
];

const mockQueries = [
  {
    id: 1,
    question: "What are the working hours for the coworking space?",
    submittedAt: "2024-01-15",
    status: "answered",
    response: "Our coworking space is open Monday to Saturday from 9 AM to 10 PM. Sunday hours are 10 AM to 8 PM."
  },
  {
    id: 2,
    question: "Can I book a private cabin for a meeting?",
    submittedAt: "2024-01-14", 
    status: "answered",
    response: "Yes, private cabins can be booked in advance. Please contact the front desk or use our booking system."
  }
];

const communityRules = [
  "Maintain silence in designated quiet zones 🤫",
  "Clean up after yourself in common areas ✨", 
  "No outside food in meeting rooms 🚫🍕",
  "Register guests at the front desk 📋",
  "Respect others' workspace and belongings 🤝",
  "Keep phone conversations brief in common areas 📱"
];

const guideContent = `🌟 Your Nerdshive Guide

🚀 Getting Started:
• Check in at the front desk with your membership
• Collect your access card and locker key
• Download our mobile app for bookings

🏢 Facilities:
• Meeting rooms (bookable via app)
• Phone booths for private calls
• Printing station (₹2 per page)
• Coffee & snacks available 24/7

⏰ Operating Hours:
Monday - Saturday: 9 AM - 10 PM
Sunday: 10 AM - 8 PM

📱 Need Help?
Contact our friendly staff at the front desk or use the Query Panel! 😊`;

const wifiInfo = `📶 WiFi Information

Network: NERDSHIVE_GUEST
Password: Welcome2024!

🔐 Secure Network: NERDSHIVE_MEMBERS
Password: Member@2024 (For monthly members only)

📡 Speeds:
• Guest Network: Up to 100 Mbps
• Members Network: Up to 500 Mbps

💡 Pro Tips:
• Use the Members network for video calls
• Guest network is perfect for browsing
• Contact IT support for any connectivity issues`;

const UserDashboard = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [queries, setQueries] = useState(mockQueries);
  const [newQuery, setNewQuery] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const { toast } = useToast();

  const UPI_ID = "nerdshive@paytm";

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast({
      title: "UPI ID Copied! 📋",
      description: "UPI ID has been copied to clipboard.",
    });
  };

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    const selectedPlanName = plans.find(p => p.id === planId)?.name;
    toast({
      title: "Great choice! 🎉",
      description: `You've selected the ${selectedPlanName} plan. Now upload your payment details below!`,
    });
  };

  const handleSubmitQuery = () => {
    if (!newQuery.trim()) return;

    const query = {
      id: queries.length + 1,
      question: newQuery,
      submittedAt: new Date().toISOString().split('T')[0],
      status: "pending" as const,
      response: ""
    };

    setQueries(prev => [query, ...prev]);
    setNewQuery("");
    
    toast({
      title: "Question Submitted! ✨",
      description: "We'll get back to you soon with an answer.",
    });
  };

  const handlePaymentSubmit = () => {
    if (!selectedPlan || !paymentScreenshot || !transactionId) {
      toast({
        title: "Oops! 🤔",
        description: "Please select a plan, upload payment screenshot, and enter transaction ID.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Payment Submitted! 💸",
      description: "Done? We'll notify you once your payment is verified.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentScreenshot(file);
      toast({
        title: "Screenshot Uploaded! 📸",
        description: "Great! Now enter your transaction ID.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header with Bee */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/lovable-uploads/93beee19-74d5-4559-b722-c34c139a12cb.png" 
              alt="Nerdshive Bee" 
              className="w-16 h-16 animate-bounce"
            />
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to Nerdshive, Arjun Singh! 😊</h1>
              <p className="text-muted-foreground">We're glad to have you here. Let's make your coworking experience amazing!</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 gap-1">
            <TabsTrigger value="plans" className="flex items-center gap-2 text-xs">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Plans</span>
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center gap-2 text-xs">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Rules</span>
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center gap-2 text-xs">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Guide</span>
            </TabsTrigger>
            <TabsTrigger value="wifi" className="flex items-center gap-2 text-xs">
              <Wifi className="h-4 w-4" />
              <span className="hidden sm:inline">WiFi</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 text-xs">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="queries" className="flex items-center gap-2 text-xs">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Ask Us</span>
            </TabsTrigger>
          </TabsList>

          {/* Plan Selection Tab */}
          <TabsContent value="plans">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Choose Your Perfect Plan 🎯
                  </CardTitle>
                  <CardDescription>
                    Select a plan that matches your workflow and let's get started!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {plans.map((plan) => (
                      <Card 
                        key={plan.id} 
                        className={`relative hover-lift cursor-pointer transition-all ${
                          selectedPlan === plan.id 
                            ? 'ring-2 ring-primary shadow-glow' 
                            : 'hover:shadow-lift'
                        } ${plan.popular ? 'border-primary' : ''}`}
                        onClick={() => handlePlanSelection(plan.id)}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-gradient-primary">⭐ Most Popular</Badge>
                          </div>
                        )}
                        
                        <CardHeader className="text-center">
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                          <div className="space-y-1">
                            <div className="text-3xl font-bold text-primary">{plan.price}</div>
                            <div className="text-sm text-muted-foreground">{plan.period}</div>
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <ul className="space-y-2">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-success" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          
                          <Button 
                            className="w-full mt-4" 
                            variant={selectedPlan === plan.id ? "default" : "outline"}
                            size="lg"
                          >
                            {selectedPlan === plan.id ? "✅ Selected" : "Select Plan"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* UPI Payment Info */}
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-green-800">
                        <QrCode className="h-6 w-6" />
                        Payment Information 💳
                      </CardTitle>
                      <CardDescription className="text-green-700">
                        Use this UPI ID to make your payment
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-700 font-medium">UPI ID for payments:</p>
                          <p className="text-xl font-bold text-green-800">{UPI_ID}</p>
                        </div>
                        <Button 
                          onClick={copyUpiId}
                          variant="outline"
                          size="sm"
                          className="bg-white hover:bg-green-50 border-green-300"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy UPI ID
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Upload Section */}
                  {selectedPlan && (
                    <Card className="border-2 border-primary/20 bg-primary/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Upload className="h-5 w-5 text-primary" />
                          Upload Payment Details 💳
                        </CardTitle>
                        <CardDescription>
                          Almost there! Upload your payment screenshot and transaction ID.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="screenshot">Payment Screenshot</Label>
                          <Input
                            id="screenshot"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="mt-1"
                          />
                          {paymentScreenshot && (
                            <p className="text-sm text-success mt-1">✅ {paymentScreenshot.name}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="txnId">Transaction ID</Label>
                          <Input
                            id="txnId"
                            placeholder="Enter your transaction ID"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="mt-1"
                          />
                        </div>

                        <Button 
                          onClick={handlePaymentSubmit}
                          className="w-full"
                          variant="gradient"
                          size="lg"
                        >
                          Submit Payment 🚀
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rules & Regulations Tab */}
          <TabsContent value="rules">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Community Rules & Regulations 📋
                </CardTitle>
                <CardDescription>
                  Let's keep our space awesome for everyone! Here are our friendly guidelines.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {communityRules.map((rule, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed">{rule}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guide Tab */}
          <TabsContent value="guide">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Your Nerdshive Guide 📖
                </CardTitle>
                <CardDescription>
                  Everything you need to know to make the most of your time here!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap leading-relaxed font-sans">
                    {guideContent}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* WiFi Info Tab */}
          <TabsContent value="wifi">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-primary" />
                  WiFi Information 📶
                </CardTitle>
                <CardDescription>
                  Stay connected with our high-speed internet!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap leading-relaxed font-sans">
                    {wifiInfo}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Usage History 📊
                </CardTitle>
                <CardDescription>
                  Track your Nerdshive journey and plan usage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    🎉 Welcome new member! Your usage history will appear here once you start using our services.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Query Panel Tab */}
          <TabsContent value="queries">
            <div className="space-y-6">
              {/* Submit New Query */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Ask a Question ❓
                  </CardTitle>
                  <CardDescription>
                    Have a question or need assistance? We're here to help! 😊
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="What's on your mind? Ask us anything..."
                      value={newQuery}
                      onChange={(e) => setNewQuery(e.target.value)}
                      rows={4}
                    />
                    <Button 
                      onClick={handleSubmitQuery}
                      disabled={!newQuery.trim()}
                      variant="gradient"
                      className="w-full"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Ask Question
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Previous Queries */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Questions 💭</CardTitle>
                  <CardDescription>
                    Track your conversations with our team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {queries.length === 0 ? (
                    <Alert>
                      <AlertDescription>✨ No questions yet. Feel free to ask us anything!</AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-4">
                      {queries.map((query) => (
                        <Card key={query.id} className="p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <Badge variant={query.status === "answered" ? "default" : "secondary"}>
                                  {query.status === "answered" ? (
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                  ) : (
                                    <Clock className="h-3 w-3 mr-1" />
                                  )}
                                  {query.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {query.submittedAt}
                                </span>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-muted rounded-lg">
                              <p className="text-sm font-medium mb-1">Your Question:</p>
                              <p className="text-sm">{query.question}</p>
                            </div>

                            {query.status === "answered" && query.response && (
                              <div className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                                <p className="text-sm font-medium mb-1">💬 Our Response:</p>
                                <p className="text-sm">{query.response}</p>
                              </div>
                            )}

                            {query.status === "pending" && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <AlertCircle className="h-4 w-4" />
                                <span>We're working on your answer... ⏰</span>
                              </div>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;