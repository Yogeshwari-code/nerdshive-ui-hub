import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  UserCheck, 
  Users, 
  MessageSquare, 
  FileText, 
  Check, 
  X, 
  Search,
  Trash2,
  Plus,
  Settings,
  LogOut
} from "lucide-react";

// Mock data
const mockPendingUsers = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john@example.com",
    mobile: "9876543210",
    city: "Mumbai",
    occupation: "Software Developer",
    idType: "PAN",
    idNumber: "ABCDE1234F",
    submittedAt: "2024-01-15",
    needsReimbursement: true,
    organizationName: "Tech Corp",
    gstNumber: "27ABCDE1234F1Z5"
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane@example.com",
    mobile: "9876543211",
    city: "Delhi",
    occupation: "Designer",
    idType: "Aadhaar",
    idNumber: "123456789012",
    submittedAt: "2024-01-14",
    needsReimbursement: false
  }
];

const mockApprovedUsers = [
  {
    id: 3,
    fullName: "Alice Johnson",
    email: "alice@example.com",
    planType: "Monthly",
    status: "Active",
    joinedAt: "2024-01-10"
  },
  {
    id: 4,
    fullName: "Bob Wilson",
    email: "bob@example.com",
    planType: "Weekly",
    status: "Active", 
    joinedAt: "2024-01-12"
  }
];

const mockQueries = [
  {
    id: 1,
    userEmail: "alice@example.com",
    question: "What are the working hours for the coworking space?",
    submittedAt: "2024-01-15",
    response: "",
    status: "pending"
  },
  {
    id: 2,
    userEmail: "bob@example.com",
    question: "Can I book a private cabin for a meeting?",
    submittedAt: "2024-01-14",
    response: "Yes, private cabins can be booked in advance. Please contact the front desk.",
    status: "answered"
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState(mockPendingUsers);
  const [approvedUsers, setApprovedUsers] = useState(mockApprovedUsers);
  const [queries, setQueries] = useState(mockQueries);
  const [rules, setRules] = useState([
    "Maintain silence in designated quiet zones",
    "Clean up after yourself in common areas",
    "No outside food in meeting rooms",
    "Register guests at the front desk"
  ]);
  const [welcomeInstructions, setWelcomeInstructions] = useState(
    `Welcome to Nerdshive!

Wi-Fi SSID: NERDSHIVE
Password: 6DhE6RjFn$#hJkiD

🖨️ Printer is located near the main lounge
☕ Coffee station is on the 2nd floor
💺 Please maintain designated seating arrangements
🔒 Ensure you log out from all systems before leaving

For any assistance, contact the front desk.`
  );
  
  const [newRule, setNewRule] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleLogout = () => {
    navigate("/");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleManageUser = (userId: number, newStatus: string) => {
    setApprovedUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast({
      title: "User Updated",
      description: "User status has been updated successfully.",
    });
  };

  const handleApproveUser = (userId: number) => {
    const user = pendingUsers.find(u => u.id === userId);
    if (user) {
      setPendingUsers(prev => prev.filter(u => u.id !== userId));
      setApprovedUsers(prev => [...prev, {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        planType: "Not Selected",
        status: "Active",
        joinedAt: new Date().toISOString().split('T')[0]
      }]);
      
      toast({
        title: "User Approved",
        description: `${user.fullName} has been approved and notified via WhatsApp.`,
      });
    }
  };

  const handleRejectUser = (userId: number) => {
    const user = pendingUsers.find(u => u.id === userId);
    if (user) {
      setPendingUsers(prev => prev.filter(u => u.id !== userId));
      toast({
        title: "User Rejected",
        description: `${user.fullName}'s application has been rejected.`,
        variant: "destructive",
      });
    }
  };

  const handleQueryResponse = (queryId: number, response: string) => {
    setQueries(prev => prev.map(q => 
      q.id === queryId 
        ? { ...q, response, status: "answered" }
        : q
    ));
    
    toast({
      title: "Response Sent",
      description: "Your response has been sent to the user.",
    });
  };

  const addRule = () => {
    if (newRule.trim()) {
      setRules(prev => [...prev, newRule.trim()]);
      setNewRule("");
      toast({
        title: "Rule Added",
        description: "New rule has been added successfully.",
      });
    }
  };

  const removeRule = (index: number) => {
    setRules(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Rule Removed",
      description: "Rule has been removed successfully.",
    });
  };

  const saveWelcomeInstructions = () => {
    toast({
      title: "Instructions Updated",
      description: "Welcome instructions have been saved successfully.",
    });
  };

  const filteredUsers = approvedUsers.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, approvals, and coworking space operations</p>
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

        <Tabs defaultValue="approvals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="approvals" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Approval Requests
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="queries" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Query Management
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Rules & Instructions
            </TabsTrigger>
          </TabsList>

          {/* Approval Requests Tab */}
          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approval Requests</CardTitle>
                <CardDescription>
                  Review and approve new user registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingUsers.length === 0 ? (
                  <Alert>
                    <AlertDescription>No pending approval requests.</AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    {pendingUsers.map((user) => (
                      <Card key={user.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-4">
                              <h3 className="font-semibold text-lg">{user.fullName}</h3>
                              <Badge variant="outline">Pending</Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Email:</span> {user.email}
                              </div>
                              <div>
                                <span className="font-medium">Mobile:</span> {user.mobile}
                              </div>
                              <div>
                                <span className="font-medium">City:</span> {user.city}
                              </div>
                              <div>
                                <span className="font-medium">Occupation:</span> {user.occupation}
                              </div>
                              <div>
                                <span className="font-medium">ID Type:</span> {user.idType}
                              </div>
                              <div>
                                <span className="font-medium">ID Number:</span> {user.idNumber}
                              </div>
                            </div>

                            {user.needsReimbursement && (
                              <div className="border-t pt-2 mt-2">
                                <h4 className="font-medium mb-2">Organization Details:</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium">Company:</span> {user.organizationName}
                                  </div>
                                  <div>
                                    <span className="font-medium">GST:</span> {user.gstNumber}
                                  </div>
                                </div>
                              </div>
                            )}

                            <p className="text-xs text-muted-foreground">
                              Submitted on {user.submittedAt}
                            </p>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApproveUser(user.id)}
                              className="text-success hover:bg-success hover:text-success-foreground"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectUser(user.id)}
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
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

          {/* User Management Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Approved Users</CardTitle>
                <CardDescription>
                  Manage all approved and active users
                </CardDescription>
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{user.fullName}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                              {user.status}
                            </Badge>
                            <span className="text-sm">Plan: {user.planType}</span>
                            <span className="text-sm text-muted-foreground">
                              Joined: {user.joinedAt}
                            </span>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-1" />
                              Manage
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Manage User: {user.fullName}</DialogTitle>
                              <DialogDescription>
                                Update user status and plan details
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Email:</span> {user.email}
                                </div>
                                <div>
                                  <span className="font-medium">Plan:</span> {user.planType}
                                </div>
                                <div>
                                  <span className="font-medium">Joined:</span> {user.joinedAt}
                                </div>
                                <div>
                                  <span className="font-medium">Current Status:</span> {user.status}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Update Status</Label>
                                <Select 
                                  defaultValue={user.status}
                                  onValueChange={(value) => handleManageUser(user.id, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                    <SelectItem value="Suspended">Suspended</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Query Management Tab */}
          <TabsContent value="queries">
            <Card>
              <CardHeader>
                <CardTitle>User Queries</CardTitle>
                <CardDescription>
                  Respond to user questions and concerns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {queries.map((query) => (
                    <Card key={query.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{query.userEmail}</h4>
                            <p className="text-sm text-muted-foreground">
                              {query.submittedAt}
                            </p>
                          </div>
                          <Badge variant={query.status === "answered" ? "default" : "secondary"}>
                            {query.status}
                          </Badge>
                        </div>
                        
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">{query.question}</p>
                        </div>

                        {query.status === "answered" ? (
                          <div className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                            <p className="text-sm">{query.response}</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Label>Your Response</Label>
                            <Textarea
                              placeholder="Type your response here..."
                              onChange={(e) => {
                                const updatedQueries = queries.map(q =>
                                  q.id === query.id ? { ...q, response: e.target.value } : q
                                );
                                setQueries(updatedQueries);
                              }}
                            />
                            <Button
                              size="sm"
                              onClick={() => handleQueryResponse(query.id, query.response)}
                              disabled={!query.response?.trim()}
                            >
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

          {/* Rules & Instructions Tab */}
          <TabsContent value="rules">
            <div className="grid gap-6">
              {/* Community Rules */}
              <Card>
                <CardHeader>
                  <CardTitle>Community Rules</CardTitle>
                  <CardDescription>
                    Manage rules that all users must follow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a new rule..."
                        value={newRule}
                        onChange={(e) => setNewRule(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addRule()}
                      />
                      <Button onClick={addRule} disabled={!newRule.trim()}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {rules.map((rule, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="text-sm">{rule}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRule(index)}
                            className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Welcome Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Instructions</CardTitle>
                  <CardDescription>
                    Instructions shown to users in their dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      value={welcomeInstructions}
                      onChange={(e) => setWelcomeInstructions(e.target.value)}
                      rows={12}
                      className="font-mono text-sm"
                    />
                    <Button onClick={saveWelcomeInstructions} variant="gradient">
                      Save Instructions
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

export default AdminDashboard;