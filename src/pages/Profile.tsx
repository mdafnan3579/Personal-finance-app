import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Camera, Save, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '',
    monthlyBudget: '5000',
    currency: 'USD',
    joinDate: '2024-01-01'
  })

  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    // In a real app, you'd reset the form data here
  }

  const stats = [
    { label: 'Total Expenses', value: '$12,450', period: 'This year' },
    { label: 'Average Monthly', value: '$3,490', period: 'Last 3 months' },
    { label: 'Categories Used', value: '8', period: 'Active' },
    { label: 'Transactions', value: '156', period: 'This month' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Information */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileData.avatar} alt={profileData.name} />
                  <AvatarFallback className="text-lg">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{profileData.name}</h3>
                  <p className="text-sm text-muted-foreground">Member since {new Date(profileData.joinDate).toLocaleDateString()}</p>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Camera className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                  )}
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Monthly Budget</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={profileData.monthlyBudget}
                    onChange={(e) => setProfileData({ ...profileData, monthlyBudget: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={profileData.currency}
                    onChange={(e) => setProfileData({ ...profileData, currency: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your dashboard experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive spending alerts and monthly summaries</p>
                </div>
                <Badge variant="secondary">Enabled</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dark Mode</h4>
                  <p className="text-sm text-muted-foreground">Use dark theme for the interface</p>
                </div>
                <Badge variant="outline">Disabled</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Export</h4>
                  <p className="text-sm text-muted-foreground">Export your financial data</p>
                </div>
                <Button variant="outline" size="sm">Export</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>Your financial activity overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.period}</p>
                    {index < stats.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">Download Report</Button>
              <Button className="w-full" variant="outline">Reset Budget</Button>
              <Button className="w-full" variant="outline">Clear Data</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile