"use client"

import { useState } from "react"
import {
  Search,
  MapPin,
  Bell,
  User,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Clock,
  DollarSign,
  Briefcase,
  Zap,
  Calendar,
  CalendarDays,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { PostGigModal } from "@/components/post-gig-modal"
import { NotificationsModal } from "@/components/notifications-modal"
import { ProfileModal } from "@/components/profile-modal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const mockJobs = [
  {
    id: 1,
    title: "Food Delivery Driver Needed",
    company: "QuickEats",
    location: "Downtown, 2.3 km away",
    pay: "$18/hour + tips",
    duration: "3-4 hours",
    type: "Instant",
    category: "Delivery",
    description: "Looking for reliable delivery drivers for evening shift. Must have own vehicle and smartphone.",
    requirements: ["Age: 18+", "Valid driver's license", "Own vehicle"],
    postedTime: "2 hours ago",
    likes: 12,
    comments: 3,
    urgent: true,
    workType: "instant",
  },
  {
    id: 2,
    title: "House Cleaning Assistant",
    company: "CleanPro Services",
    location: "Suburbs, 5.1 km away",
    pay: "$150/day",
    duration: "Full day",
    type: "Daily",
    category: "Cleaning",
    description: "Help with residential cleaning. Experience preferred but training provided for the right candidate.",
    requirements: ["Age: 16+", "Reliable transportation", "Background check"],
    postedTime: "4 hours ago",
    likes: 8,
    comments: 1,
    urgent: false,
    workType: "daily",
  },
  {
    id: 3,
    title: "Math Tutor for High School",
    company: "EduConnect",
    location: "City Center, 1.8 km away",
    pay: "$25/hour",
    duration: "2-3 hours/day",
    type: "Weekly",
    category: "Tutoring",
    description:
      "Seeking experienced math tutor for high school student. Flexible schedule, can be done online or in-person.",
    requirements: ["Age: 18+", "High school diploma", "Math proficiency"],
    postedTime: "6 hours ago",
    likes: 15,
    comments: 5,
    urgent: false,
    workType: "weekly",
  },
  {
    id: 4,
    title: "Event Setup Crew",
    company: "EventMasters",
    location: "Convention Center, 3.2 km away",
    pay: "$20/hour",
    duration: "6-8 hours",
    type: "Daily",
    category: "Event Staff",
    description: "Help set up for corporate event this weekend. Physical work involved, team environment.",
    requirements: ["Age: 18+", "Physically fit", "Weekend availability"],
    postedTime: "1 day ago",
    likes: 6,
    comments: 2,
    urgent: true,
    workType: "daily",
  },
  {
    id: 5,
    title: "Pet Walking Service",
    company: "PetCare Plus",
    location: "Park Area, 1.5 km away",
    pay: "$15/hour",
    duration: "1-2 hours",
    type: "Hourly",
    category: "Pet Care",
    description: "Walk friendly dogs in the morning or evening. Perfect for animal lovers!",
    requirements: ["Age: 16+", "Love for animals", "Flexible schedule"],
    postedTime: "3 hours ago",
    likes: 20,
    comments: 8,
    urgent: false,
    workType: "hourly",
  },
  {
    id: 6,
    title: "Data Entry Specialist",
    company: "TechCorp",
    location: "Remote/Office, 4.2 km away",
    pay: "$18/hour",
    duration: "20 hours/week",
    type: "Weekly",
    category: "Data Entry",
    description: "Enter customer data into our system. Can work remotely or in office. Training provided.",
    requirements: ["Age: 18+", "Basic computer skills", "Attention to detail"],
    postedTime: "5 hours ago",
    likes: 11,
    comments: 4,
    urgent: false,
    workType: "weekly",
  },
]

export default function FeedPage() {
  const [selectedWorkType, setSelectedWorkType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [likedJobs, setLikedJobs] = useState<number[]>([])
  const [savedJobs, setSavedJobs] = useState<number[]>([])

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

  const toggleLike = (jobId: number) => {
    setLikedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const toggleSave = (jobId: number) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedWorkType === "all" || job.workType === selectedWorkType
    return matchesSearch && matchesType
  })

  const getWorkTypeIcon = (type: string) => {
    switch (type) {
      case "instant":
        return <Zap className="h-4 w-4" />
      case "hourly":
        return <Clock className="h-4 w-4" />
      case "daily":
        return <Calendar className="h-4 w-4" />
      case "weekly":
        return <CalendarDays className="h-4 w-4" />
      default:
        return <Briefcase className="h-4 w-4" />
    }
  }

  const getWorkTypeColor = (type: string) => {
    switch (type) {
      case "instant":
        return "bg-red-100 text-red-700"
      case "hourly":
        return "bg-blue-100 text-blue-700"
      case "daily":
        return "bg-green-100 text-green-700"
      case "weekly":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

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
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
                <Link href="/feed" className="text-blue-600 font-medium">
                  Feed
                </Link>
                <Link href="/find-jobs" className="text-gray-600 hover:text-blue-600">
                  Find Jobs
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setShowUrgentFinder(true)}>
                <MapPin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(true)}>
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>}
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowPostGig(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Post Gig
              </Button>
              <Avatar className="h-8 w-8" onClick={() => setShowProfile(true)}>
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search jobs, companies, skills..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 px-8">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Work Type Tabs */}
        <Tabs value={selectedWorkType} onValueChange={setSelectedWorkType} className="mb-6">
          <TabsList className="grid w-full grid-cols-5 bg-white">
            <TabsTrigger value="all" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>All Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="instant" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Instant</span>
            </TabsTrigger>
            <TabsTrigger value="hourly" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Hourly</span>
            </TabsTrigger>
            <TabsTrigger value="daily" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Daily</span>
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center space-x-2">
              <CalendarDays className="h-4 w-4" />
              <span>Weekly</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedWorkType} className="mt-6">
            {/* Job Count */}
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredJobs.length} {selectedWorkType === "all" ? "" : selectedWorkType} jobs
              </p>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-blue-100 text-blue-600">{job.company.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                            <span className="mx-2">•</span>
                            {job.postedTime}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {job.urgent && <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Urgent</Badge>}
                        <Badge className={`${getWorkTypeColor(job.workType)} hover:${getWorkTypeColor(job.workType)}`}>
                          <span className="mr-1">{getWorkTypeIcon(job.workType)}</span>
                          {job.type}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center text-green-600 font-medium">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.pay}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.duration}
                        </div>
                        <Badge variant="secondary">{job.category}</Badge>
                      </div>
                    </div>

                    <Separator className="mb-4" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(job.id)}
                          className={likedJobs.includes(job.id) ? "text-red-500" : ""}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${likedJobs.includes(job.id) ? "fill-current" : ""}`} />
                          {job.likes + (likedJobs.includes(job.id) ? 1 : 0)}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {job.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSave(job.id)}
                          className={savedJobs.includes(job.id) ? "text-blue-500" : ""}
                        >
                          <Bookmark className={`h-4 w-4 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowPostGig(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Modals */}
      <PostGigModal open={showPostGig} onOpenChange={setShowPostGig} />
      <NotificationsModal
        open={showNotifications}
        onOpenChange={setShowNotifications}
        notifications={notifications}
        markNotificationAsRead={markNotificationAsRead}
      />
      <ProfileModal open={showProfile} onOpenChange={setShowProfile} />

      {/* Urgent Finder Modal */}
      <Dialog open={showUrgentFinder} onOpenChange={() => setShowUrgentFinder(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Urgent Gig Finder</DialogTitle>
          </DialogHeader>
          {!selectedUrgentType ? (
            <div className="grid grid-cols-2 gap-4">
              {urgentJobTypes.map((job) => (
                <button
                  key={job.type}
                  onClick={() => startUrgentSearch(job.type)}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl">{job.icon}</div>
                  <div className="font-medium">{job.type}</div>
                  <div className="text-sm text-gray-500">{job.description}</div>
                </button>
              ))}
            </div>
          ) : isSearching ? (
            <div className="text-center py-8">
              <div className="text-4xl animate-bounce mb-4">
                {urgentJobTypes.find((j) => j.type === selectedUrgentType)?.icon}
              </div>
              <p className="text-lg font-medium">Searching for a {selectedUrgentType}...</p>
              <p className="text-gray-500">Scanning nearby workers</p>
              <div className="mt-4">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className={`inline-block h-3 w-3 rounded-full bg-blue-500 mx-1 animate-pulse delay-${
                      i * 100
                    } ${searchAnimation % 4 === i ? "opacity-50" : "opacity-100"}`}
                  ></span>
                ))}
              </div>
              <Button variant="secondary" className="mt-6" onClick={cancelSearch}>
                Cancel Search
              </Button>
            </div>
          ) : foundWorker ? (
            <div className="text-center py-8">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarFallback>{foundWorker.avatar}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-medium">{foundWorker.name}</h3>
              <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
                <span>Rating: {foundWorker.rating}</span>
              </div>
              <p className="text-gray-500">
                {foundWorker.distance} - ETA: {foundWorker.eta}
              </p>
              <Button className="mt-6" onClick={confirmHire}>
                Hire Now
              </Button>
              <Button variant="secondary" className="mt-2" onClick={cancelSearch}>
                Cancel
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
