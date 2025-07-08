import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, ChevronLeft, ChevronRight, Upload, Camera, CheckCircle } from "lucide-react";

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignIn: () => void;
}

interface FormData {
  // Step 1: Basic Information
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  
  // Step 2: Personal Details
  gender: string;
  mobile: string;
  city: string;
  location: string;
  occupation: string;
  
  // Step 3: Government ID
  idType: string;
  idNumber: string;
  idFile: File | null;
  
  // Step 4: Organizational Details
  needsReimbursement: boolean;
  organizationName: string;
  gstNumber: string;
  organizationLocation: string;
}

export const RegisterModal = ({ open, onOpenChange, onSwitchToSignIn }: RegisterModalProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    mobile: "",
    city: "",
    location: "",
    occupation: "",
    idType: "",
    idNumber: "",
    idFile: null,
    needsReimbursement: false,
    organizationName: "",
    gstNumber: "",
    organizationLocation: ""
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
        break;

      case 2:
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
        else if (!/^[6-9]\d{9}$/.test(formData.mobile)) newErrors.mobile = "Please enter a valid 10-digit Indian mobile number";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.occupation.trim()) newErrors.occupation = "Occupation is required";
        break;

      case 3:
        if (!formData.idType) newErrors.idType = "ID type is required";
        if (!formData.idNumber.trim()) newErrors.idNumber = "ID number is required";
        else {
          // Validate ID number based on type
          if (formData.idType === "aadhaar" && !/^\d{12}$/.test(formData.idNumber)) {
            newErrors.idNumber = "Aadhaar number must be 12 digits";
          } else if (formData.idType === "pan" && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.idNumber)) {
            newErrors.idNumber = "Please enter a valid PAN number";
          }
        }
        if (!formData.idFile) newErrors.idFile = "Please upload your ID document";
        break;

      case 4:
        if (formData.needsReimbursement) {
          if (!formData.organizationName.trim()) newErrors.organizationName = "Organization name is required";
          if (!formData.gstNumber.trim()) newErrors.gstNumber = "GST number is required";
          else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
            newErrors.gstNumber = "Please enter a valid 15-character GST number";
          }
          if (!formData.organizationLocation.trim()) newErrors.organizationLocation = "Organization location is required";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitted(true);
      toast({
        title: "Registration Submitted!",
        description: "You will be notified after admin approval.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, idFile: "Please upload a JPG, PNG, or PDF file" }));
        return;
      }

      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, idFile: "File size must be less than 5MB" }));
        return;
      }

      updateFormData('idFile', file);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSubmitted(false);
    setErrors({});
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      mobile: "",
      city: "",
      location: "",
      occupation: "",
      idType: "",
      idNumber: "",
      idFile: null,
      needsReimbursement: false,
      organizationName: "",
      gstNumber: "",
      organizationLocation: ""
    });
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Registration Submitted!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for registering with Nerdshive. You will be notified after admin approval.
            </p>
            <Button 
              onClick={() => {
                resetForm();
                onSwitchToSignIn();
              }}
              variant="gradient"
              size="lg"
            >
              Back to Sign In
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                placeholder="Create a password"
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => updateFormData('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter 10-digit mobile number"
              />
              {errors.mobile && <p className="text-sm text-destructive">{errors.mobile}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateFormData('city', e.target.value)}
                placeholder="Enter your city"
              />
              {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                placeholder="Enter your location/address"
              />
              {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation *</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => updateFormData('occupation', e.target.value)}
                placeholder="Enter your occupation"
              />
              {errors.occupation && <p className="text-sm text-destructive">{errors.occupation}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idType">ID Type *</Label>
              <Select value={formData.idType} onValueChange={(value) => updateFormData('idType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pan">PAN Card</SelectItem>
                  <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                  <SelectItem value="voter">Voter ID</SelectItem>
                  <SelectItem value="driving">Driver's License</SelectItem>
                </SelectContent>
              </Select>
              {errors.idType && <p className="text-sm text-destructive">{errors.idType}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number *</Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => updateFormData('idNumber', e.target.value.toUpperCase())}
                placeholder={
                  formData.idType === 'aadhaar' ? "Enter 12-digit Aadhaar number" :
                  formData.idType === 'pan' ? "Enter PAN number (e.g., ABCDE1234F)" :
                  "Enter ID number"
                }
              />
              {errors.idNumber && <p className="text-sm text-destructive">{errors.idNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label>Upload ID Document *</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="file"
                    id="id-upload"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('id-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => toast({ title: "Camera", description: "Camera functionality would be implemented here" })}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Use Camera
                </Button>
              </div>
              {formData.idFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {formData.idFile.name}
                </p>
              )}
              {errors.idFile && <p className="text-sm text-destructive">{errors.idFile}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="reimbursement">Do you need reimbursement from your organization?</Label>
                <p className="text-sm text-muted-foreground">Toggle if you need organizational billing</p>
              </div>
              <Switch
                id="reimbursement"
                checked={formData.needsReimbursement}
                onCheckedChange={(checked) => updateFormData('needsReimbursement', checked)}
              />
            </div>

            {formData.needsReimbursement && (
              <div className="space-y-4 border-t pt-4">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => updateFormData('organizationName', e.target.value)}
                    placeholder="Enter organization name"
                  />
                  {errors.organizationName && <p className="text-sm text-destructive">{errors.organizationName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number *</Label>
                  <Input
                    id="gstNumber"
                    value={formData.gstNumber}
                    onChange={(e) => updateFormData('gstNumber', e.target.value.toUpperCase())}
                    placeholder="Enter 15-character GST number"
                    maxLength={15}
                  />
                  {errors.gstNumber && <p className="text-sm text-destructive">{errors.gstNumber}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationLocation">Organization Location *</Label>
                  <Input
                    id="organizationLocation"
                    value={formData.organizationLocation}
                    onChange={(e) => updateFormData('organizationLocation', e.target.value)}
                    placeholder="Enter organization address"
                  />
                  {errors.organizationLocation && <p className="text-sm text-destructive">{errors.organizationLocation}</p>}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    "Basic Information",
    "Personal Details", 
    "Government ID",
    "Organizational Details"
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <UserPlus className="h-6 w-6 text-primary" />
            Join Nerdshive
          </DialogTitle>
          <DialogDescription>
            Step {step} of 4: {stepTitles[step - 1]}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="w-full bg-secondary rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{stepTitles[step - 1]}</CardTitle>
            <CardDescription>
              {step === 1 && "Let's start with your basic information"}
              {step === 2 && "Tell us more about yourself"}
              {step === 3 && "Upload your government ID for verification"}
              {step === 4 && "Optional organizational details for billing"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={step === 1 ? onSwitchToSignIn : handlePrevious}
            disabled={isLoading}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {step === 1 ? "Sign In" : "Previous"}
          </Button>

          {step < 4 ? (
            <Button onClick={handleNext} variant="gradient">
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              variant="gradient"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Registration"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};