import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Settings,
  Languages,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Edit
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();

  const userInfo = {
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@gmail.com',
    location: 'Village Khairpur, District Muzaffarnagar, UP'
  };

  const menuItems = [
    { icon: Settings, label: 'Account Settings', path: '/settings' },
    { icon: Languages, label: 'Language / भाषा', path: '/language' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Shield, label: 'Privacy & Security', path: '/privacy' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-sm border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/home')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-agriculture-earth ml-4">Profile</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-agriculture-green text-white text-xl font-bold">
                  RK
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-agriculture-earth">{userInfo.name}</h2>
                <p className="text-sm text-muted-foreground">Farmer & AgriSmart User</p>
              </div>
              <Button variant="outline" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-agriculture-earth">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <Phone className="w-5 h-5 text-agriculture-green" />
              <div>
                <p className="text-sm font-medium">Phone Number</p>
                <p className="text-sm text-muted-foreground">{userInfo.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <Mail className="w-5 h-5 text-agriculture-green" />
              <div>
                <p className="text-sm font-medium">Email Address</p>
                <p className="text-sm text-muted-foreground">{userInfo.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <MapPin className="w-5 h-5 text-agriculture-green" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{userInfo.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Farm Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-agriculture-earth">Farm Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-agriculture-wheat/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-agriculture-earth">12.5</p>
                <p className="text-xs text-muted-foreground">Acres</p>
              </div>
              <div className="p-3 bg-agriculture-wheat/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-agriculture-earth">Rice</p>
                <p className="text-xs text-muted-foreground">Main Crop</p>
              </div>
            </div>
            
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium">Soil Type</p>
              <p className="text-sm text-muted-foreground">Alluvial soil, pH 6.8</p>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card>
          <CardContent className="p-0">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-muted/30 cursor-pointer border-b last:border-b-0"
                  onClick={() => navigate(item.path)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-agriculture-green" />
                    <span className="font-medium text-agriculture-earth">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Card>
          <CardContent className="p-4">
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => navigate('/')}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;