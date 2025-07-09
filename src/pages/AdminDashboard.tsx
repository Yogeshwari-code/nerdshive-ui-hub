import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  UserCheck, 
  UserX, 
  MessageSquare, 
  FileText, 
  Activity,
  Wifi,
  Coffee,
  Edit,
  LogOut,
  Clock,
  CheckCircle,
  AlertTriangle,
  Send,
  Eye,
  CreditCard,
  Settings
} from "lucide-react";

// Mock data for pending requests
const mockRequests = [
  {
    id: 1,
    name: "Rahul Kumar",
    email: "rahul.k@email.com",
    plan: "Weekly",
    amount: "₹1,400",
    transactionId: "TXN123456789",
    paymentScreenshot: "payment_proof_1.jpg",
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
    paymentScreenshot: "payment_proof_2.jpg",
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
    paymentScreenshot: "payment_proof_3.jpg",
    submittedAt: "2024-01-18",
    status: "pending"
  }
];

// Mock data for all users
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@email.com",
    plan: "Monthly",
    status: "active",
    joinedAt: "2024-01-01",
    lastSeen: "2024-01-20"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@email.com",
    plan: "Weekly",
    status: "active",
    joinedAt: "2024-01-15",
    lastSeen: "2024-01-19"
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
  const [requests, setRequests] = useState(mockRequests);
  const [users, setUsers] = useState(mockUsers);
  const [queries, setQueries] = useState(mockQueries);
  const [content, setContent] = useState(editableContent);
  const [editingContent, setEditingContent] = useState({ type: "", value: "", open: false });
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [queryResponse, setQueryResponse] = useState("");
  const { toast } = useToast();

  const handleApproveUser = (requestId: number) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      // Add to users list
      const newUser = {
        id: users.length + 1,
        name: request.name,
        email: request.email,
        plan: request.plan,
        status: "active",
        joinedAt: new Date().toISOString().split('T')[0],
        lastSeen: new Date().toISOString().split('T')[0]
      };
      setUsers(prev => [...prev, newUser]);
      
      // Remove from requests
      setRequests(prev => prev.filter(r => r.id !== requestId));
      
      toast({
        title: "User Approved! ✅",
        description: `${request.name} has been approved and can now access the workspace.`,
      });
    }
  };

  const handleDeclineUser = (requestId: number) => {
    const request = requests.find(r => r.id === requestId);
    setRequests(prev => prev.filter(r => r.id !== requestId));
    
    toast({
      title: "Request Declined",
      description: `${request?.name}'s request has been declined.`,
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

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, Admin! 🔐</h1>
            <p className="text-muted-foreground">Your security is our top priority. Let's manage Nerdshive together!</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-1">
            <TabsTrigger value="requests" className="flex items-center gap-2 text-xs">
              <UserCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Requests</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2 text-xs">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Customers</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2 text-xs">
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="queries" className="flex items-center gap-2 text-xs">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Queries</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2 text-xs">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Logs</span>
            </TabsTrigger>
          </TabsList>

          {/* Requests Tab */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Pending User Requests 📋
                </CardTitle>
                <CardDescription>
                  You've got {requests.length} new user requests today! Let's take a look and verify their plans 🧐
                </CardDescription>
              </CardHeader>
              <CardContent>
                {requests.length === 0 ? (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      🎉 All caught up! No pending requests at the moment.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <Card key={request.id} className="p-4 border-l-4 border-l-primary">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{request.name}</h3>
                              <Badge variant="outline">{request.plan} Plan</Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p><strong>Email:</strong> {request.email}</p>
                                <p><strong>Amount:</strong> {request.amount}</p>
                                <p><strong>Submitted:</strong> {request.submittedAt}</p>
                              </div>
                              <div>
                                <p><strong>Transaction ID:</strong> {request.transactionId}</p>
                                <p><strong>Payment Screenshot:</strong> {request.paymentScreenshot}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 ml-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-3 w-3" />
                              View
                            </Button>
                            <Button 
                              onClick={() => handleApproveUser(request.id)}
                              variant="default" 
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <CheckCircle className="h-3 w-3" />
                              Approve
                            </Button>
                            <Button 
                              onClick={() => handleDeclineUser(request.id)}
                              variant="destructive" 
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <UserX className="h-3 w-3" />
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

          {/* Customer Management Tab */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Customer Management 👥
                </CardTitle>
                <CardDescription>
                  View and manage all user profiles and memberships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <Card key={user.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                          <Badge variant="outline">{user.plan}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Joined: {user.joinedAt}</span>
                          <span>•</span>
                          <span>Last seen: {user.lastSeen}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Update Content Tab */}
          <TabsContent value="content">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5 text-primary" />
                    Update Content 📝
                  </CardTitle>
                  <CardDescription>
                    Edit rules, guides, and WiFi information that users see
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Card className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">Rules & Regulations</h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingContent({ type: "rules", value: content.rules, open: true })}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Rules & Regulations</DialogTitle>
                            <DialogDescription>
                              Update the community rules that users will see
                            </DialogDescription>
                          </DialogHeader>
                          <Textarea
                            value={editingContent.value}
                            onChange={(e) => setEditingContent(prev => ({ ...prev, value: e.target.value }))}
                            rows={12}
                            className="font-mono"
                          />
                          <div className="flex gap-2">
                            <Button onClick={handleSaveContent}>Save Changes</Button>
                            <Button variant="outline" onClick={() => setEditingContent({ type: "", value: "", open: false })}>
                              Cancel
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {content.rules.substring(0, 100)}...
                    </p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">User Guide</h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingContent({ type: "guide", value: content.guide, open: true })}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit User Guide</DialogTitle>
                            <DialogDescription>
                              Update the guide that helps users navigate Nerdshive
                            </DialogDescription>
                          </DialogHeader>
                          <Textarea
                            value={editingContent.value}
                            onChange={(e) => setEditingContent(prev => ({ ...prev, value: e.target.value }))}
                            rows={12}
                            className="font-mono"
                          />
                          <div className="flex gap-2">
                            <Button onClick={handleSaveContent}>Save Changes</Button>
                            <Button variant="outline" onClick={() => setEditingContent({ type: "", value: "", open: false })}>
                              Cancel
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {content.guide.substring(0, 100)}...
                    </p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">WiFi Information</h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingContent({ type: "wifi", value: content.wifi, open: true })}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit WiFi Information</DialogTitle>
                            <DialogDescription>
                              Update WiFi credentials and information for users
                            </DialogDescription>
                          </DialogHeader>
                          <Textarea
                            value={editingContent.value}
                            onChange={(e) => setEditingContent(prev => ({ ...prev, value: e.target.value }))}
                            rows={12}
                            className="font-mono"
                          />
                          <div className="flex gap-2">
                            <Button onClick={handleSaveContent}>Save Changes</Button>
                            <Button variant="outline" onClick={() => setEditingContent({ type: "", value: "", open: false })}>
                              Cancel
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {content.wifi.substring(0, 100)}...
                    </p>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Query Panel Tab */}
          <TabsContent value="queries">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  User Queries 💬
                </CardTitle>
                <CardDescription>
                  View and respond to user questions and support requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {queries.map((query) => (
                    <Card key={query.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{query.userName}</h3>
                            <p className="text-sm text-muted-foreground">{query.submittedAt}</p>
                          </div>
                          <Badge variant={query.status === "answered" ? "default" : "secondary"}>
                            {query.status === "answered" ? "✅ Answered" : "⏳ Pending"}
                          </Badge>
                        </div>
                        
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm"><strong>Question:</strong> {query.question}</p>
                        </div>

                        {query.status === "answered" ? (
                          <div className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                            <p className="text-sm"><strong>Your Response:</strong> {query.response}</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Type your response here..."
                              value={queryResponse}
                              onChange={(e) => setQueryResponse(e.target.value)}
                              rows={3}
                            />
                            <Button 
                              onClick={() => handleRespondToQuery(query.id)}
                              disabled={!queryResponse.trim()}
                              variant="gradient"
                              size="sm"
                            >
                              <Send className="h-3 w-3 mr-1" />
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

          {/* Updates/Logs Tab */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity & Logs 📊
                </CardTitle>
                <CardDescription>
                  Track recent memberships, user actions, and system updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New Member Approved</p>
                      <p className="text-xs text-muted-foreground">Sarah Wilson joined with Weekly plan - 2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment Received</p>
                      <p className="text-xs text-muted-foreground">₹1,400 payment verified for Weekly plan - 4 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Content Updated</p>
                      <p className="text-xs text-muted-foreground">WiFi information was updated by admin - 6 hours ago</p>
                    </div>
                  </div>
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