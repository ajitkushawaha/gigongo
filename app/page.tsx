"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  MapPin,
  Bell,
  User,
  Plus,
  Zap,
  Users,
  ArrowRight,
  ChevronRight,
  Phone,
  CheckCircle,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { PostGigModal } from "@/components/post-gig-modal"
import { NotificationsModal } from "@/components/notifications-modal"
import { ProfileModal } from "@/components/profile-modal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const workTypes = [
  {
    type: "Instant Hiring",
    icon: "⚡",
    description: "Get hired in minutes",
    count: "234 available",
    examples: ["Delivery", "Quick Tasks", "Emergency Help"],
    bgLight: "bg-red-50",
    textColor: "text-red-600",
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
  },
  {
    type: "Hourly Work",
    icon: "🕒",
    description: "Flexible hourly gigs",
    count: "1,247 jobs",
    examples: ["Tutoring", "Cleaning", "Handyman"],
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
  },
  {
    type: "Daily Work",
    icon: "📅",
    description: "Full day projects",
    count: "567 jobs",
    examples: ["Event Staff", "Construction", "Moving"],
    bgLight: "bg-green-50",
    textColor: "text-green-600",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
  {
    type: "Weekly Work",
    icon: "📆",
    description: "Long-term commitments",
    count: "89 jobs",
    examples: ["Part-time", "Project Work", "Contracts"],
    bgLight: "bg-purple-50",
    textColor: "text-purple-600",
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
  },
]

const popularCategories = [
  { name: "Delivery", icon: "🚚", count: "1,200" },
  { name: "Cleaning", icon: "🧹", count: "800" },
  { name: "Repair", icon: "🔧", count: "600" },
  { name: "Construction", icon: "🔨", count: "400" },
  { name: "Customer Service", icon: "📞", count: "700" },
  { name: "IT Support", icon: "💻", count: "500" },
]

const recentJobs = [
  {
    id: 1,
    title: "Delivery Driver",
    company: "QuickEats",
    location: "Downtown, New York",
    type: "Freelance",
    pay: "$15/hour",
    urgent: true,
  },
  {
    id: 2,
    title: "Cleaner",
    company: "CityClean",
    location: "Midtown, New York",
    type: "Part-time",
    pay: "$12/hour",
    urgent: false,
  },
  {
    id: 3,
    title: "Handyman",
    company: "FixItFast",
    location: "Uptown, New York",
    type: "Seasonal",
    pay: "$20/hour",
    urgent: true,
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showPostGig, setShowPostGig] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [userLocation, setUserLocation] = useState<string>("Getting location...")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New gig posted nearby",
      message: "Delivery driver needed - 0.5km away",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Application accepted",
      message: "QuickEats accepted your application",
      time: "1 hour ago",
      unread: true,
    },
    { id: 3, title: "Payment received", message: "$45 payment for cleaning job", time: "3 hours ago", unread: false },
  ])

  const [showUrgentFinder, setShowUrgentFinder] = useState(false)
  const [selectedUrgentType, setSelectedUrgentType] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [foundWorker, setFoundWorker] = useState<any>(null)
  const [searchAnimation, setSearchAnimation] = useState(0)

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation("Downtown, New York")
        },
        (error) => {
          setUserLocation("Location unavailable")
        },
      )
    } else {
      setUserLocation("Location not supported")
    }
  }

  const markNotificationAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, unread: false } : notif)))
  }

  const unreadCount = notifications.filter((n) => n.unread).length

  const urgentJobTypes = [
    { type: "Driver", icon: "🚗", description: "Delivery & Transport" },
    { type: "Cleaner", icon: "🧹", description: "Immediate Cleaning" },
    { type: "Handyman", icon: "🔧", description: "Quick Repairs" },
    { type: "Helper", icon: "👷", description: "General Labor" },
  ]

  const startUrgentSearch = (jobType: string) => {
    setSelectedUrgentType(jobType)
    setIsSearching(true)
    setFoundWorker(null)

    const interval = setInterval(() => {
      setSearchAnimation((prev) => prev + 1)
    }, 500)

    setTimeout(
      () => {
        clearInterval(interval)
        setFoundWorker({
          name: "Alex Johnson",
          rating: 4.8,
          distance: "1.2 km away",
          eta: "5 mins",
          avatar: "AJ",
        })
        setIsSearching(false)
      },
      Math.random() * 5000 + 3000,
    )
  }

  const cancelSearch = () => {
    setIsSearching(false)
    setFoundWorker(null)
    setShowUrgentFinder(false)
    setSearchAnimation(0)
  }

  const confirmHire = () => {
    setShowUrgentFinder(false)
    setFoundWorker(null)
    setIsSearching(false)
    alert(`${foundWorker?.name} has been notified and is on the way!`)
  }

  const useEffect = () => {
    getUserLocation()
  }

  useEffect()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                GigOnGo
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="text-blue-600 font-medium">
                  Home
                </Link>
                <Link href="/feed" className="text-gray-600 hover:text-blue-600">
                  Feed
                </Link>
                <Link href="/find-jobs" className="text-gray-600 hover:text-blue-600">
                  Find Jobs
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={getUserLocation}>
                <MapPin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(true)}>
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowPostGig(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Post Gig
              </Button>
              <Avatar className="h-8 w-8 cursor-pointer" onClick={() => setShowProfile(true)}>
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Work That Fits
              <br />
              <span className="text-blue-200">Your Schedule</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              From instant gigs to weekly commitments - discover flexible work opportunities in your area
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex items-center bg-white rounded-full p-2 shadow-lg">
                <Search className="h-5 w-5 text-gray-500 ml-4" />
                <Input
                  placeholder="Search for gigs, skills, or locations..."
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-8">Search</Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">2,157</div>
                <div className="text-blue-200">Active Gigs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">$23</div>
                <div className="text-blue-200">Average Hourly Pay</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">94%</div>
                <div className="text-blue-200">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Types Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Work Style</h2>
            <p className="text-xl text-gray-600">Find opportunities that match your availability and goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workTypes.map((workType, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-2 hover:border-blue-200"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`${workType.bgLight} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                  >
                    <div className={workType.textColor}>{workType.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{workType.type}</h3>
                  <p className="text-gray-600 mb-3">{workType.description}</p>
                  <Badge variant="secondary" className="mb-4">
                    {workType.count}
                  </Badge>
                  <div className="space-y-1 mb-4">
                    {workType.examples.map((example, idx) => (
                      <div key={idx} className="text-sm text-gray-500">
                        {example}
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full ${workType.color} ${workType.hoverColor} text-white group-hover:shadow-md`}
                  >
                    Explore Jobs
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
            <Link href="/find-jobs" className="text-blue-600 hover:text-blue-700 flex items-center">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.count} jobs</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Opportunities</h2>
            <Link href="/feed" className="text-blue-600 hover:text-blue-700 flex items-center">
              View All Jobs
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    {job.urgent && <Badge className="bg-red-100 text-red-700">Urgent</Badge>}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{job.type}</Badge>
                      <span className="font-semibold text-green-600">{job.pay}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Working?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of workers finding flexible opportunities every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Users className="h-5 w-5 mr-2" />
              Find Work
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Plus className="h-5 w-5 mr-2" />
              Post a Gig
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">GigOnGo</h3>
              <p className="text-gray-400">Connecting workers with flexible opportunities</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Workers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Find Jobs</li>
                <li>How it Works</li>
                <li>Success Stories</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Post a Gig</li>
                <li>Pricing</li>
                <li>Resources</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Safety</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GigOnGo. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Urgent Hire Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowUrgentFinder(true)}
          className="h-16 w-16 rounded-full bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse"
          size="icon"
        >
          <Zap className="h-8 w-8 text-white" />
        </Button>
      </div>

      {/* Urgent Finder Modal */}
      <Dialog open={showUrgentFinder} onOpenChange={setShowUrgentFinder}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-red-500" />
              <span>Find Urgent Help</span>
            </DialogTitle>
          </DialogHeader>

          {!isSearching && !foundWorker && (
            <div className="space-y-4">
              <p className="text-gray-600">What type of help do you need right now?</p>
              <div className="grid grid-cols-2 gap-3">
                {urgentJobTypes.map((job) => (
                  <Button
                    key={job.type}
                    variant="outline"
                    className="h-20 flex-col space-y-2 hover:bg-red-50 hover:border-red-200"
                    onClick={() => startUrgentSearch(job.type)}
                  >
                    <span className="text-2xl">{job.icon}</span>
                    <div className="text-center">
                      <div className="font-medium">{job.type}</div>
                      <div className="text-xs text-gray-500">{job.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {isSearching && (
            <div className="text-center py-8 space-y-4">
              <div className="relative">
                <div
                  className={`w-20 h-20 mx-auto rounded-full border-4 border-red-500 ${searchAnimation % 2 === 0 ? "animate-ping" : ""}`}
                >
                  <div className="w-full h-full rounded-full bg-red-100 flex items-center justify-center">
                    <Phone className={`h-8 w-8 text-red-500 ${searchAnimation % 2 === 0 ? "animate-bounce" : ""}`} />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Finding {selectedUrgentType}...</h3>
                <p className="text-gray-600">Ringing nearby {selectedUrgentType.toLowerCase()}s</p>
                <div className="flex justify-center mt-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((dot) => (
                      <div
                        key={dot}
                        className={`w-2 h-2 bg-red-500 rounded-full ${
                          searchAnimation % 3 === dot - 1 ? "animate-bounce" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={cancelSearch} className="mt-4">
                Cancel Search
              </Button>
            </div>
          )}

          {foundWorker && (
            <div className="text-center py-4 space-y-4">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-green-600">Worker Found!</h3>
                <div className="bg-green-50 rounded-lg p-4 mt-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-green-100 text-green-600">{foundWorker.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-medium">{foundWorker.name}</div>
                      <div className="text-sm text-gray-600">⭐ {foundWorker.rating} rating</div>
                      <div className="text-sm text-gray-600">
                        {foundWorker.distance} • ETA: {foundWorker.eta}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={cancelSearch} className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Decline
                </Button>
                <Button onClick={confirmHire} className="flex-1 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Hire
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modals */}
      <PostGigModal open={showPostGig} onOpenChange={setShowPostGig} />
      <NotificationsModal
        open={showNotifications}
        onOpenChange={setShowNotifications}
        notifications={notifications}
        onMarkAsRead={markNotificationAsRead}
      />
      <ProfileModal open={showProfile} onOpenChange={setShowProfile} />
    </div>
  )
}
