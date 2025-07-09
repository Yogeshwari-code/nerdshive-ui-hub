// Demo data and utilities for Nerdshive application
export const DEMO_CREDENTIALS = {
  admin: {
    email: 'admin@nerdshive.com',
    password: 'admin123',
    twoFA: '123456'
  },
  user: {
    email: 'user@nerdshive.com', 
    password: 'user123'
  }
};

export const UPI_PAYMENT_INFO = {
  upiId: 'nerdshive@paytm',
  qrCode: '/lovable-uploads/qr-code-placeholder.png', // You can add actual QR code image
  instructions: [
    'Open your UPI app (PhonePe, Google Pay, Paytm, etc.)',
    'Scan the QR code or enter the UPI ID manually',
    'Enter the amount as per your selected plan',
    'Complete the payment',
    'Take a screenshot of the payment confirmation',
    'Upload the screenshot along with transaction ID'
  ]
};

export const CONTACT_INFO = {
  phone: '+91 98765 43210',
  email: 'support@nerdshive.com',
  address: 'Nerdshive Coworking Space, Bangalore, Karnataka',
  emergencyContact: '+91 98765 43211',
  techSupport: 'tech@nerdshive.com'
};

export const OPERATING_HOURS = {
  weekdays: '9:00 AM - 10:00 PM',
  saturday: '9:00 AM - 10:00 PM', 
  sunday: '10:00 AM - 8:00 PM',
  monthlyMembers: '24/7 Access Available'
};

export const WIFI_NETWORKS = {
  guest: {
    ssid: 'NERDSHIVE_GUEST',
    password: 'Welcome2024!',
    speed: '100 Mbps',
    usage: 'General browsing, emails'
  },
  members: {
    ssid: 'NERDSHIVE_MEMBERS',
    password: 'Member@2024',
    speed: '500 Mbps', 
    usage: 'Video calls, large downloads',
    access: 'Monthly members only'
  }
};

export const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Welcome to Nerdshive! 🎉',
    message: 'Your account has been approved. Start exploring our facilities!',
    type: 'success',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 2,
    title: 'Payment Verified ✅',
    message: 'Your monthly plan payment has been verified successfully.',
    type: 'info',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    id: 3,
    title: 'Networking Event Tomorrow 🤝',
    message: 'Join us for our weekly networking session at 6 PM.',
    type: 'event',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
  }
];

export const FACILITY_FEATURES = [
  {
    icon: '🌐',
    title: 'High-Speed Internet',
    description: 'Fiber optic connection up to 500 Mbps'
  },
  {
    icon: '🏢',
    title: 'Meeting Rooms',
    description: 'Bookable private spaces for meetings'
  },
  {
    icon: '☕',
    title: 'Complimentary Beverages',
    description: 'Free coffee, tea, and refreshments'
  },
  {
    icon: '🖨️',
    title: 'Printing Services',
    description: 'High-quality printing and scanning'
  },
  {
    icon: '🔒',
    title: 'Secure Lockers',
    description: 'Personal storage for your belongings'
  },
  {
    icon: '📞',
    title: 'Phone Booths',
    description: 'Private spaces for important calls'
  },
  {
    icon: '🅿️',
    title: 'Parking Available',
    description: 'Secure parking for cars and bikes'
  },
  {
    icon: '🛡️',
    title: '24/7 Security',
    description: 'CCTV monitoring and access control'
  }
];

export const MEMBERSHIP_BENEFITS = {
  daily: [
    '8 hours workspace access',
    'High-speed WiFi',
    'Basic amenities',
    'Common area access',
    'Reception services'
  ],
  weekly: [
    'Unlimited workspace access',
    'Priority WiFi network',
    'Meeting room booking',
    'Printing credits included',
    'Networking event access',
    'Business address usage'
  ],
  monthly: [
    '24/7 workspace access',
    'Dedicated desk option',
    'Private cabin booking',
    'Unlimited printing',
    'Mail handling services',
    'Priority support',
    'Guest access privileges',
    'Event hosting permissions'
  ]
};

export const FAQ_DATA = [
  {
    question: 'What are the operating hours?',
    answer: 'Monday-Saturday: 9 AM - 10 PM, Sunday: 10 AM - 8 PM. Monthly members get 24/7 access.'
  },
  {
    question: 'Is parking available?',
    answer: 'Yes, we provide secure parking for both cars and motorcycles at no additional cost.'
  },
  {
    question: 'Can I bring guests?',
    answer: 'Yes, members can bring guests. Please register them at the front desk upon arrival.'
  },
  {
    question: 'Are meeting rooms included?',
    answer: 'Meeting rooms can be booked by weekly and monthly members. Daily members can book at additional cost.'
  },
  {
    question: 'What about food and beverages?',
    answer: 'We provide complimentary coffee, tea, and light snacks. Outside food is allowed in designated areas.'
  },
  {
    question: 'Is there a dress code?',
    answer: 'We maintain a business casual environment. Please dress appropriately for a professional workspace.'
  }
];