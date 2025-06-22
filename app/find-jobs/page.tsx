"use client"

import { useState } from "react"
import {
  Search,
  MapPin,
  Bell,
  User,
  Plus,
  Clock,
  Briefcase,
  Zap,
  Calendar,
  CalendarDays,
  SlidersHorizontal,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

const jobCategories = [
  "All Categories",
  "Delivery & Transport",
  "Cleaning Services",
  "Tutoring & Education",
  "Handyman & Repairs",
  "Pet Care",
  "Event Staff",
  "Data Entry",
  "Customer Service",
  "Photography",
  "Writing & Content",
]

const workTypes = ["All Types", "Instant", "Hourly", "Daily", "Weekly"]
const experienceLevels = ["All Levels", "Entry Level", "Intermediate", "Experienced", "Expert"]
const locations = ["All Locations", "Downtown", "Suburbs", "City Center", "Uptown", "Westside"]

const mockJobs = [
  {
    id: 1,
    title: "Urgent Food Delivery Driver",
    company: "QuickEats",
    location: "Downtown",
    distance: "2.3 km",
    pay: 18,
    payType: "hour",
    duration: "3-4 hours",
    workType: "Instant",
    category: "Delivery & Transport",
    rating: 4.8,
    reviews: 234,
    description: "Immediate start available. Evening shift delivery driver needed.",
    urgent: true,
    featured: true,
  },
  {
    id: 2,
    title: "Weekly Math Tutor",
    company: "EduConnect",
    location: "City Center",
    distance: "1.8 km",
    pay: 25,
    payType: "hour",
    duration: "10 hours/week",
    workType: "Weekly",
    category: "Tutoring & Education",
    rating: 4.9,
    reviews: 156,
    description: "Teach high school mathematics. Flexible schedule.",
    urgent: false,
    featured: false,
  },
  {
    id: 3,
    title: "House Cleaning Service",
    company: "CleanPro",
    location: "Suburbs",
    distance: "5.1 km",
    pay: 150,
    payType: "day",
    duration: "Full day",
    workType: "Daily",
    category: "Cleaning Services",
    rating: 4.7,
    reviews: 89,
    description: "Professional cleaning service for residential homes.",
    urgent: false,
    featured: true,
  },
  {
    id: 4,
    title: "Pet Walking Service",
    company: "PetCare Plus",
    location: "Uptown",
    distance: "3.2 km",
    pay: 15,
    payType: "hour",
    duration: "1-2 hours",
    workType: "Hourly",
    category: "Pet Care",
    rating: 4.6,
    reviews: 67,
    description: "Walk friendly dogs in the morning or evening.",
    urgent: false,
    featured: false,
  },
  {
    id: 5,
    title: "Event Setup Crew",
    company: "EventMasters",
    location: "Downtown",
    distance: "2.8 km",
    pay: 20,
    payType: "hour",
    duration: "6-8 hours",
    workType: "Daily",
    category: "Event Staff",
    rating: 4.5,
    reviews: 123,
    description: "Help set up for corporate events and conferences.",
    urgent: true,
    featured: false,
  },
  {
    id: 6,
    title: "Data Entry Specialist",
    company: "TechCorp",
    location: "City Center",
    distance: "4.1 km",
    pay: 18,
    payType: "hour",
    duration: "20 hours/week",
    workType: "Weekly",
    category: "Data Entry",
    rating: 4.4,
    reviews: 45,
    description: "Remote data entry work with flexible hours.",
    urgent: false,
    featured: false,
  },
]

export default function FindJobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedWorkType, setSelectedWorkType] = useState("All Types")
  const [selectedExperience, setSelectedExperience] = useState("All Levels")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [payRange, setPayRange] = useState([10, 50])
  const [showUrgentOnly, setShowUrgentOnly] = useState(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [isLocationEnabled, setIsLocationEnabled] = useState(false)

  const handleLocationToggle = () => {
    setIsLocationEnabled(!isLocationEnabled)
    if (!isLocationEnabled) {
      alert("Location Services Enabled - We will now use your location to find jobs near you.")
    } else {
      alert("Location Services Disabled")
    }
  }

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All Categories" || job.category === selectedCategory
    const matchesWorkType = selectedWorkType === "All Types" || job.workType === selectedWorkType
    const matchesLocation = selectedLocation === "All Locations" || job.location === selectedLocation
    const matchesPay = job.pay >= payRange[0] && job.pay <= payRange[1]
    const matchesUrgent = !showUrgentOnly || job.urgent
    const matchesFeatured = !showFeaturedOnly || job.featured

    return (
      matchesSearch &&
      matchesCategory &&
      matchesWorkType &&
      matchesLocation &&
      matchesPay &&
      matchesUrgent &&
      matchesFeatured
    )
  })

  const getWorkTypeColor = (type: string) => {
    switch (type) {
      case "Instant":
        return "bg-red-100 text-red-700"
      case "Hourly":
        return "bg-blue-100 text-blue-700"
      case "Daily":
        return "bg-green-100 text-green-700"
      case "Weekly":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getWorkTypeIcon = (type: string) => {
    switch (type) {
      case "Instant":
        return <Zap className="h-3 w-3" />
      case "Hourly":
        return <Clock className="h-3 w-3" />
      case "Daily":
        return <Calendar className="h-3 w-3" />
      case "Weekly":
        return <CalendarDays className="h-3 w-3" />
      default:
        return <Briefcase className="h-3 w-3" />
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
                <Link href="/feed" className="text-gray-600 hover:text-blue-600">
                  Feed
                </Link>
                <Link href="/find-jobs" className="text-blue-600 font-medium">
                  Find Jobs
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <MapPin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Gig
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Post a New Gig</DialogTitle>
                    <DialogDescription>
                      Create a new job posting to find the perfect freelancer for your needs.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input id="title" defaultValue="Food Delivery Driver" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea id="description" className="col-span-3" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={() => alert("Gig posted successfully!")}>Post Gig</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <h3 className="font-semibold">Filters</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Keywords, skills..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {jobCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Work Type */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Work Type</Label>
                  <Select value={selectedWorkType} onValueChange={setSelectedWorkType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {workTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pay Range */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Pay Range: ${payRange[0]} - ${payRange[1]}/hr
                  </Label>
                  <Slider value={payRange} onValueChange={setPayRange} max={100} min={5} step={5} className="w-full" />
                </div>

                {/* Quick Filters */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Quick Filters</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgent"
                      checked={showUrgentOnly}
                      onCheckedChange={(checked) => setShowUrgentOnly(checked as boolean)}
                    />
                    <Label htmlFor="urgent" className="text-sm">
                      Urgent jobs only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={showFeaturedOnly}
                      onCheckedChange={(checked) => setShowFeaturedOnly(checked as boolean)}
                    />
                    <Label htmlFor="featured" className="text-sm">
                      Featured jobs only
                    </Label>
                  </div>
                </div>

                {/* Location Services */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Enable Location Services
                    </Label>
                    <Switch id="location" checked={isLocationEnabled} onCheckedChange={handleLocationToggle} />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Find jobs near you by enabling location services.</p>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All Categories")
                    setSelectedWorkType("All Types")
                    setSelectedLocation("All Locations")
                    setPayRange([10, 50])
                    setShowUrgentOnly(false)
                    setShowFeaturedOnly(false)
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Find Jobs</h1>
                <p className="text-gray-600 mt-1">
                  {filteredJobs.length} jobs found {searchQuery && `for "${searchQuery}"`}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Label className="text-sm">Sort by:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="pay-high">Pay: High to Low</SelectItem>
                    <SelectItem value="pay-low">Pay: Low to High</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Results */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-blue-100 text-blue-600">{job.company.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            {job.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                            {job.urgent && <Badge className="bg-red-100 text-red-700">Urgent</Badge>}
                          </div>
                          <p className="text-gray-600 mb-2">{job.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {job.location} • {job.distance}
                            </div>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 mr-1 text-yellow-500 fill-current" />
                              {job.rating} ({job.reviews} reviews)
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          ${job.pay}
                          <span className="text-sm text-gray-500">/{job.payType}</span>
                        </div>
                        <Badge className={`${getWorkTypeColor(job.workType)} mb-2`}>
                          <span className="mr-1">{getWorkTypeIcon(job.workType)}</span>
                          {job.workType}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.duration}
                        </div>
                        <Badge variant="outline">{job.category}</Badge>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button variant="outline">Save</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                      </div>
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
                  <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("All Categories")
                      setSelectedWorkType("All Types")
                      setSelectedLocation("All Locations")
                      setPayRange([10, 50])
                      setShowUrgentOnly(false)
                      setShowFeaturedOnly(false)
                    }}
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
