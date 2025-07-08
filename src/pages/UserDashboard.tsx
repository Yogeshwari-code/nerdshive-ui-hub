import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  Send
} from "lucide-react";

// Mock data
const plans = [
  {
    id: "daily",
    name: "Daily Plan",
    price: "₹500",
    period: "per day",
    features: [
      "8 hours access",
      "High-speed Wi-Fi",
      "Basic amenities",
      "Common area access"
    ]
  },
  {
    id: "weekly", 
    name: "Weekly Plan",
    price: "₹3,000",
    period: "per week",
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
    name: "Monthly Plan", 
    price: "₹10,000",
    period: "per month",
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
  },
  {
    id: 3,
    question: "Is parking available at the facility?",
    submittedAt: "2024-01-16",
    status: "pending",
    response: ""
  }
];

const communityRules = [
  "Maintain silence in designated quiet zones",
  "Clean up after yourself in common areas", 
  "No outside food in meeting rooms",
  "Register guests at the front desk",
  "Respect others' workspace and belongings",
  "Keep phone conversations brief in common areas"
];

const welcomeInstructions = `Welcome to Nerdshive!

Wi-Fi SSID: NERDSHIVE
Password: 6DhE6RjFn$#hJkiD

🖨️ Printer is located near the main lounge
☕ Coffee station is on the 2nd floor  
💺 Please maintain designated seating arrangements
🔒 Ensure you log out from all systems before leaving

For any assistance, contact the front desk.`;

const UserDashboard = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [queries, setQueries] = useState(mockQueries);
  const [newQuery, setNewQuery] = useState("");
  const { toast } = useToast();

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    const selectedPlanName = plans.find(p => p.id === planId)?.name;
    toast({
      title: "Plan Selected",
      description: `You have selected the ${selectedPlanName}. Payment integration would be implemented here.`,
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
      title: "Query Submitted",
      description: "Your query has been submitted. You'll receive a response soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">Manage your coworking experience and stay connected</p>
        </div>

        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="plans" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Choose Plan
            </TabsTrigger>
            <TabsTrigger value="queries" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              My Queries
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Rules & Instructions
            </TabsTrigger>
          </TabsList>

          {/* Choose Plan Tab */}
          <TabsContent value="plans">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Plan</CardTitle>
                  <CardDescription>
                    Select a plan that best fits your working style and needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                            <Badge className="bg-gradient-primary">Most Popular</Badge>
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
                            {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {selectedPlan && (
                    <Alert className="mt-6">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        You have selected the {plans.find(p => p.id === selectedPlan)?.name}. 
                        Payment integration and plan activation would be implemented here.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Queries Tab */}
          <TabsContent value="queries">
            <div className="space-y-6">
              {/* Submit New Query */}
              <Card>
                <CardHeader>
                  <CardTitle>Submit a Query</CardTitle>
                  <CardDescription>
                    Have a question or need assistance? Ask us anything!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Type your question here..."
                      value={newQuery}
                      onChange={(e) => setNewQuery(e.target.value)}
                      rows={4}
                    />
                    <Button 
                      onClick={handleSubmitQuery}
                      disabled={!newQuery.trim()}
                      variant="gradient"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Query
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Previous Queries */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Queries</CardTitle>
                  <CardDescription>
                    Track your previous questions and responses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {queries.length === 0 ? (
                    <Alert>
                      <AlertDescription>No queries submitted yet.</AlertDescription>
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
                                <p className="text-sm font-medium mb-1">Admin Response:</p>
                                <p className="text-sm">{query.response}</p>
                              </div>
                            )}

                            {query.status === "pending" && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <AlertCircle className="h-4 w-4" />
                                <span>Waiting for admin response...</span>
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

          {/* Rules & Instructions Tab */}
          <TabsContent value="rules">
            <div className="grid gap-6">
              {/* Welcome Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5 text-primary" />
                    Welcome Instructions
                  </CardTitle>
                  <CardDescription>
                    Important information for your coworking experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-lg">
                    <pre className="text-sm font-mono whitespace-pre-wrap leading-relaxed">
                      {welcomeInstructions}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Community Rules */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Community Rules
                  </CardTitle>
                  <CardDescription>
                    Please follow these guidelines to maintain a productive environment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {communityRules.map((rule, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-relaxed">{rule}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Access */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-primary" />
                    Quick Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                      <Calendar className="h-6 w-6" />
                      <span className="text-sm">Book Meeting Room</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                      <Coffee className="h-6 w-6" />
                      <span className="text-sm">Café Menu</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                      <MessageSquare className="h-6 w-6" />
                      <span className="text-sm">Contact Support</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                      <FileText className="h-6 w-6" />
                      <span className="text-sm">Download Invoice</span>
                    </Button>
                  </div>
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