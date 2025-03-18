
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { EyeOff, Lock, Mail, Save, User, Eye } from 'lucide-react';
import { toast } from 'sonner';

const ProfilePage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password changed successfully!');
  };
  
  const handleNotificationSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Notification settings updated!');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold mb-1">John Doe</h1>
              <p className="text-gray-500 mb-3">@johndoe</p>
              <p className="text-gray-600 mb-3">Learning enthusiast passionate about web development and design.</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="bg-brand-100 text-brand-600 text-xs font-medium px-2.5 py-0.5 rounded-full">7-Day Streak</span>
                <span className="bg-brand-100 text-brand-600 text-xs font-medium px-2.5 py-0.5 rounded-full">Course Creator</span>
                <span className="bg-brand-100 text-brand-600 text-xs font-medium px-2.5 py-0.5 rounded-full">Clan Admin</span>
              </div>
            </div>
          </div>
        </section>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details and profile information.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input id="username" placeholder="Username" defaultValue="johndoe" className="pl-10" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input id="email" type="email" placeholder="Email" defaultValue="john.doe@example.com" className="pl-10" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input id="display-name" placeholder="Display Name" defaultValue="John Doe" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio" 
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Tell us about yourself"
                        defaultValue="Learning enthusiast passionate about web development and design."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="profile-picture">Profile Picture</Label>
                      <Input id="profile-picture" type="file" accept="image/*" />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and account security.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="current-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Current password" 
                          className="pl-10" 
                        />
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="sm" 
                          className="absolute right-1 top-1 h-7 w-7 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? 
                            <EyeOff className="h-4 w-4" /> : 
                            <Eye className="h-4 w-4" />
                          }
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="new-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="New password" 
                          className="pl-10" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="confirm-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Confirm new password" 
                          className="pl-10" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how and when you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNotificationSettings} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Course Updates</h3>
                        <p className="text-sm text-gray-500">Get notified about updates to your enrolled courses</p>
                      </div>
                      <Switch id="course-updates" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Community Activity</h3>
                        <p className="text-sm text-gray-500">Notifications about replies to your posts and clan activity</p>
                      </div>
                      <Switch id="community-activity" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Marketing Emails</h3>
                        <p className="text-sm text-gray-500">Receive emails about new features and promotions</p>
                      </div>
                      <Switch id="marketing-emails" />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
