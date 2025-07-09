import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard,
  UserPlus,
  MessageSquare, 
  Edit,
  LogOut,
  CheckCircle,
  AlertTriangle,
  Send,
  Eye,
  Activity,
  X,
  Copy,
  QrCode
} from "lucide-react";

// Mock data for payment verification
const mockPayments = [
  {
    id: 1,
    name: "Rahul Kumar",
    email: "rahul.k@email.com",
    plan: "Weekly",
    amount: "₹1,400",
    transactionId: "TXN123456789",
    paymentScreenshot: "/lovable-uploads/10dc8619-d90d-44d5-a68f-7022b5696552.png",
    submittedAt: "2024-01-20",
    status: "pending"
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.s@email.com",
    plan: "Monthly",
    amount: "₹4,600",
    transactionId: "TXN987654321",
    paymentScreenshot: "/lovable-uploads/10dc8619-d90d-44d5-a68f-7022b5696552.png",
    submittedAt: "2024-01-19",
    status: "pending"
  },
  {
    id: 3,
    name: "Amit Singh",
    email: "amit.singh@email.com",
    plan: "Daily",
    amount: "₹299",
    transactionId: "TXN456789123",
    paymentScreenshot: "/lovable-uploads/10dc8619-d90d-44d5-a68f-7022b5696552.png",
    submittedAt: "2024-01-18",
    status: "pending"
  }
];

// Mock data for join requests
const mockJoinRequests = [
  {
    id: 1,
    name: "Neha Gupta",
    email: "neha.gupta@email.com",
    phone: "+91 9876543210",
    profession: "Software Developer",
    reason: "Need a quiet workspace for coding and meetings",
    submittedAt: "2024-01-21",
    status: "pending"
  },
  {
    id: 2,
    name: "Vikram Patel",
    email: "vikram.p@email.com",
    phone: "+91 8765432109",
    profession: "Digital Marketer",
    reason: "Looking for a collaborative environment to work with other professionals",
    submittedAt: "2024-01-20",
    status: "pending"
  }
];

// Mock queries
const mockQueries = [
  {
    id: 1,
    userName: "Rahul Kumar",
    question: "What are the working hours?",
    submittedAt: "2024-01-20",
    status: "pending",
    response: ""
  },
  {
    id: 2,
    userName: "Priya Sharma",
    question: "Can I extend my membership?",
    submittedAt: "2024-01-19",
    status: "answered",
    response: "Yes, you can extend your membership by contacting us or through the app."
  }
];

// Content that admin can edit
const editableContent = {
  rules: `Community Rules & Regulations 📋

1. Maintain silence in designated quiet zones 🤫
2. Clean up after yourself in common areas ✨
3. No outside food in meeting rooms 🚫🍕
4. Register guests at the front desk 📋
5. Respect others' workspace and belongings 🤝
6. Keep phone conversations brief in common areas 📱`,

  guide: `🌟 Your Nerdshive Guide

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
Sunday: 10 AM - 8 PM`,

  wifi: `📶 WiFi Information

Network: NERDSHIVE_GUEST
Password: Welcome2024!

🔐 Secure Network: NERDSHIVE_MEMBERS
Password: Member@2024 (For monthly members only)

📡 Speeds:
• Guest Network: Up to 100 Mbps
• Members Network: Up to 500 Mbps`
};

const AdminDashboard = () => {
  const [payments, setPayments] = useState(mockPayments);
  const [joinRequests, setJoinRequests] = useState(mockJoinRequests);
  const [queries, setQueries] = useState(mockQueries);
  const [content, setContent] = useState(editableContent);
  const [editingContent, setEditingContent] = useState({ type: "", value: "", open: false });
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [queryResponse, setQueryResponse] = useState("");
  const { toast } = useToast();

  const UPI_ID = "nerdshive@paytm";

  const handleApprovePayment = (paymentId: number) => {
    const payment = payments.find(p => p.id === paymentId);
    if (payment) {
      setPayments(prev => prev.filter(p => p.id !== paymentId));
      
      toast({
        title: "Payment Verified! ✅",
        description: `${payment.name}'s payment has been verified and they can now access the workspace.`,
      });
    }
  };

  const handleDeclinePayment = (paymentId: number) => {
    const payment = payments.find(p => p.id === paymentId);
    setPayments(prev => prev.filter(p => p.id !== paymentId));
    
    toast({
      title: "Payment Declined 🚫",
      description: `${payment?.name}'s payment has been declined.`,
      variant: "destructive"
    });
  };

  const handleApproveJoinRequest = (requestId: number) => {
    const request = joinRequests.find(r => r.id === requestId);
    setJoinRequests(prev => prev.filter(r => r.id !== requestId));
    
    toast({
      title: "Join Request Approved! ✅",
      description: `${request?.name} has been approved to join Nerdshive.`,
    });
  };

  const handleDeclineJoinRequest = (requestId: number) => {
    const request = joinRequests.find(r => r.id === requestId);
    setJoinRequests(prev => prev.filter(r => r.id !== requestId));
    
    toast({
      title: "Join Request Declined 🚫",
      description: `${request?.name}'s join request has been declined.`,
      variant: "destructive"
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    window.location.href = "/";
  };

  const handleSaveContent = () => {
    setContent(prev => ({
      ...prev,
      [editingContent.type]: editingContent.value
    }));
    setEditingContent({ type: "", value: "", open: false });
    
    toast({
      title: "Content Updated! 📝",
      description: "The content has been successfully updated.",
    });
  };

  const handleRespondToQuery = (queryId: number) => {
    if (!queryResponse.trim()) return;

    setQueries(prev => prev.map(q => 
      q.id === queryId 
        ? { ...q, status: "answered", response: queryResponse }
        : q
    ));
    
    setQueryResponse("");
    toast({
      title: "Response Sent! 💬",
      description: "Your response has been sent to the user.",
    });
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast({
      title: "UPI ID Copied! 📋",
      description: "UPI ID has been copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Welcome back, Admin! 🔐
            </h1>
            <p className="text-lg text-muted-foreground">
              Your security is our top priority. Let's manage Nerdshive beautifully! ✨
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>

        {/* UPI Payment Info Card */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-green-800">
              <QrCode className="h-6 w-6" />
              Payment Information 💳
            </CardTitle>
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

        <Tabs defaultValue="payment-verification" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-white/70 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
            <TabsTrigger 
              value="payment-verification" 
              className="flex items-center gap-2 text-sm py-3 px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment Verification</span>
            </TabsTrigger>
            <TabsTrigger 
              value="join-requests" 
              className="flex items-center gap-2 text-sm py-3 px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Join Requests</span>
            </TabsTrigger>
            <TabsTrigger 
              value="content" 
              className="flex items-center gap-2 text-sm py-3 px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger 
              value="queries" 
              className="flex items-center gap-2 text-sm py-3 px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Queries</span>
            </TabsTrigger>
          </TabsList>

          {/* Payment Verification Tab */}
          <TabsContent value="payment-verification">
            <Card className="shadow-xl bg-gradient-to-br from-white to-blue-50 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <CreditCard className="h-6 w-6" />
                  Payment Verification Center 💳
                </CardTitle>
                <CardDescription className="text-blue-100">
                  You've got {payments.length} payments waiting for verification! Let's check them out 🧐
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {payments.length === 0 ? (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      🎉 All caught up! No pending payments at the moment.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-6">
                    {payments.map((payment) => (
                      <Card key={payment.id} className="p-6 border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow bg-white">
                        <div className="flex justify-between items-start">
                          <div className="space-y-4 flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-bold text-lg text-gray-800">{payment.name}</h3>
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                                {payment.plan} Plan
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                              <div className="space-y-2">
                                <p><strong className="text-gray-700">Email:</strong> <span className="text-blue-600">{payment.email}</span></p>
                                <p><strong className="text-gray-700">Amount:</strong> <span className="text-green-600 font-semibold">{payment.amount}</span></p>
                                <p><strong className="text-gray-700">Submitted:</strong> {payment.submittedAt}</p>
                              </div>
                              <div className="space-y-2">
                                <p><strong className="text-gray-700">Transaction ID:</strong> <span className="font-mono text-purple-600">{payment.transactionId}</span></p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-3 ml-6">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border-blue-300"
                                  onClick={() => setSelectedPayment(payment)}
                                >
                                  <Eye className="h-4 w-4" />
                                  View Screenshot
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Payment Screenshot - {payment.name}</DialogTitle>
                                  <DialogDescription>
                                    Transaction ID: {payment.transactionId}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-center p-4">
                                  <img 
                                    src={payment.paymentScreenshot} 
                                    alt="Payment screenshot" 
                                    className="max-w-full max-h-96 rounded-lg shadow-lg"
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button 
                              onClick={() => handleApprovePayment(payment.id)}
                              variant="default" 
                              size="sm"
                              className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </Button>
                            <Button 
                              onClick={() => handleDeclinePayment(payment.id)}
                              variant="destructive" 
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              <X className="h-4 w-4" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Join Requests Tab */}
          <TabsContent value="join-requests">
            <Card className="shadow-xl bg-gradient-to-br from-white to-green-50 border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <UserPlus className="h-6 w-6" />
                  Join Requests 🚀
                </CardTitle>
                <CardDescription className="text-green-100">
                  {joinRequests.length} people want to join our amazing community! 🌟
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {joinRequests.length === 0 ? (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      🎉 All join requests have been processed!
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-6">
                    {joinRequests.map((request) => (
                      <Card key={request.id} className="p-6 border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow bg-white">
                        <div className="flex justify-between items-start">
                          <div className="space-y-4 flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-bold text-lg text-gray-800">{request.name}</h3>
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                {request.profession}
                              </Badge>
                            </div>
                            
                            <div className="space-y-3">
                              <p><strong className="text-gray-700">Email:</strong> <span className="text-blue-600">{request.email}</span></p>
                              <p><strong className="text-gray-700">Phone:</strong> <span className="text-gray-600">{request.phone}</span></p>
                              <p><strong className="text-gray-700">Submitted:</strong> {request.submittedAt}</p>
                              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <p><strong className="text-green-800">Why they want to join:</strong></p>
                                <p className="mt-1 text-gray-700 italic">"{request.reason}"</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-3 ml-6">
                            <Button 
                              onClick={() => handleApproveJoinRequest(request.id)}
                              variant="default" 
                              size="sm"
                              className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </Button>
                            <Button 
                              onClick={() => handleDeclineJoinRequest(request.id)}
                              variant="destructive" 
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              <X className="h-4 w-4" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Update Content Tab */}
          <TabsContent value="content">
            <div className="space-y-6">
              <Card className="shadow-xl bg-gradient-to-br from-white to-orange-50 border-orange-200">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Edit className="h-6 w-6" />
                    Update Content 📝
                  </CardTitle>
                  <CardDescription className="text-orange-100">
                    Edit rules, guides, and WiFi information that users see
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {[
                    { key: "rules", title: "Rules & Regulations", icon: "📋" },
                    { key: "guide", title: "User Guide", icon: "🌟" },
                    { key: "wifi", title: "WiFi Information", icon: "📶" }
                  ].map((item) => (
                    <Card key={item.key} className="p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <span>{item.icon}</span>
                          {item.title}
                        </h3>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="bg-orange-50 hover:bg-orange-100 border-orange-300"
                              onClick={() => setEditingContent({ type: item.key, value: content[item.key as keyof typeof content], open: true })}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit {item.title}</DialogTitle>
                              <DialogDescription>
                                Update the {item.title.toLowerCase()} that users will see
                              </DialogDescription>
                            </DialogHeader>
                            <Textarea
                              value={editingContent.value}
                              onChange={(e) => setEditingContent(prev => ({ ...prev, value: e.target.value }))}
                              rows={12}
                              className="font-mono"
                            />
                            <div className="flex gap-2">
                              <Button onClick={handleSaveContent} className="bg-orange-500 hover:bg-orange-600">
                                Save Changes
                              </Button>
                              <Button variant="outline" onClick={() => setEditingContent({ type: "", value: "", open: false })}>
                                Cancel
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 bg-gray-50 p-3 rounded-lg">
                        {content[item.key as keyof typeof content].substring(0, 150)}...
                      </p>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Query Panel Tab */}
          <TabsContent value="queries">
            <Card className="shadow-xl bg-gradient-to-br from-white to-pink-50 border-pink-200">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <MessageSquare className="h-6 w-6" />
                  User Queries 💬
                </CardTitle>
                <CardDescription className="text-pink-100">
                  View and respond to user questions and support requests
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {queries.map((query) => (
                    <Card key={query.id} className="p-6 shadow-md hover:shadow-lg transition-shadow bg-white">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800">{query.userName}</h3>
                            <p className="text-sm text-muted-foreground">{query.submittedAt}</p>
                          </div>
                          <Badge variant={query.status === "answered" ? "default" : "secondary"} className="px-3 py-1">
                            {query.status === "answered" ? "✅ Answered" : "⏳ Pending"}
                          </Badge>
                        </div>
                        
                        <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                          <p className="text-sm"><strong className="text-pink-800">Question:</strong> {query.question}</p>
                        </div>

                        {query.status === "answered" ? (
                          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <p className="text-sm"><strong className="text-green-800">Your Response:</strong> {query.response}</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Textarea
                              placeholder="Type your response here..."
                              value={queryResponse}
                              onChange={(e) => setQueryResponse(e.target.value)}
                              rows={3}
                              className="bg-white border-pink-200 focus:border-pink-400"
                            />
                            <Button 
                              onClick={() => handleRespondToQuery(query.id)}
                              disabled={!queryResponse.trim()}
                              className="bg-pink-500 hover:bg-pink-600"
                              size="sm"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Send Response
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;