"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Star, MapPin, Phone, Mail, Edit, Save, X } from "lucide-react"

interface ProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "Downtown, New York",
    bio: "Experienced delivery driver and handyman. Available for quick gigs and urgent tasks.",
    skills: ["Delivery", "Handyman", "Cleaning"],
    rating: 4.8,
    completedGigs: 127,
    responseRate: 95,
  })

  const [editedProfile, setEditedProfile] = useState(profile)

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Profile updated:", editedProfile)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const recentGigs = [
    { id: 1, title: "Food Delivery", company: "QuickEats", date: "2 days ago", rating: 5 },
    { id: 2, title: "House Cleaning", company: "CleanPro", date: "1 week ago", rating: 5 },
    { id: 3, title: "Furniture Assembly", company: "HomeHelp", date: "2 weeks ago", rating: 4 },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Profile</DialogTitle>
            <Button variant="ghost" size="sm" onClick={isEditing ? handleCancel : () => setIsEditing(true)}>
              {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="text-lg">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, name: e.target.value }))}
                      className="font-semibold text-lg"
                    />
                    <Textarea
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, bio: e.target.value }))}
                      rows={2}
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">{profile.name}</h2>
                    <p className="text-gray-600">{profile.bio}</p>
                  </>
                )}
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{profile.rating}</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-600">{profile.completedGigs} gigs completed</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Contact Information</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{profile.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Phone</Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Skills</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Statistics</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{profile.completedGigs}</div>
                    <div className="text-sm text-gray-600">Gigs Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{profile.rating}</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{profile.responseRate}%</div>
                    <div className="text-sm text-gray-600">Response Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isEditing && (
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Recent Gigs</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentGigs.map((gig) => (
                    <div key={gig.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{gig.title}</h4>
                        <p className="text-sm text-gray-600">{gig.company}</p>
                        <p className="text-xs text-gray-500">{gig.date}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{gig.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
