"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { User, Building, MapPin, Phone, Mail, Eye, EyeOff, Plus, X } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [userType, setUserType] = useState<"worker" | "employer">("worker")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [workerData, setWorkerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    dateOfBirth: "",
    skills: [] as string[],
    experience: "",
    bio: "",
    agreeToTerms: false,
  })

  const [employerData, setEmployerData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    companySize: "",
    industry: "",
    description: "",
    agreeToTerms: false,
  })

  const [newSkill, setNewSkill] = useState("")

  const skillOptions = [
    "Delivery",
    "Cleaning",
    "Tutoring",
    "Pet Care",
    "Handyman",
    "Event Staff",
    "Data Entry",
    "Customer Service",
    "Photography",
    "Writing",
    "Cooking",
    "Gardening",
  ]

  const addSkill = (skill: string) => {
    if (skill && !workerData.skills.includes(skill)) {
      setWorkerData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
    setNewSkill("")
  }

  const removeSkill = (skill: string) => {
    setWorkerData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleWorkerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (workerData.password !== workerData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    if (!workerData.agreeToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }
    console.log("Worker registration:", workerData)
    alert("Worker account created successfully!")
  }

  const handleEmployerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (employerData.password !== employerData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    if (!employerData.agreeToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }
    console.log("Employer registration:", employerData)
    alert("Employer account created successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-blue-600 mb-4 inline-block">
            GigOnGo
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join GigOnGo</h1>
          <p className="text-gray-600">Create your account and start your gig journey</p>
        </div>

        {/* Registration Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "worker" | "employer")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="worker" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>I'm looking for work</span>
                </TabsTrigger>
                <TabsTrigger value="employer" className="flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>I'm hiring</span>
                </TabsTrigger>
              </TabsList>

              {/* Worker Registration */}
              <TabsContent value="worker">
                <form onSubmit={handleWorkerSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={workerData.firstName}
                        onChange={(e) => setWorkerData((prev) => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={workerData.lastName}
                        onChange={(e) => setWorkerData((prev) => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          value={workerData.email}
                          onChange={(e) => setWorkerData((prev) => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="phone"
                          type="tel"
                          className="pl-10"
                          value={workerData.phone}
                          onChange={(e) => setWorkerData((prev) => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={workerData.password}
                          onChange={(e) => setWorkerData((prev) => ({ ...prev, password: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={workerData.confirmPassword}
                          onChange={(e) => setWorkerData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="location"
                          className="pl-10"
                          placeholder="City, State"
                          value={workerData.location}
                          onChange={(e) => setWorkerData((prev) => ({ ...prev, location: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={workerData.dateOfBirth}
                        onChange={(e) => setWorkerData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select
                      value={workerData.experience}
                      onValueChange={(value) => setWorkerData((prev) => ({ ...prev, experience: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-1 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                        <SelectItem value="experienced">Experienced (3-5 years)</SelectItem>
                        <SelectItem value="expert">Expert (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Skills & Services</Label>
                    <div className="flex space-x-2 mb-2">
                      <Select value={newSkill} onValueChange={setNewSkill}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select a skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {skillOptions.map((skill) => (
                            <SelectItem key={skill} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button type="button" onClick={() => addSkill(newSkill)} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {workerData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                          <span>{skill}</span>
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio (Optional)</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell employers about yourself, your experience, and what makes you great..."
                      value={workerData.bio}
                      onChange={(e) => setWorkerData((prev) => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="workerTerms"
                      checked={workerData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setWorkerData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                      }
                    />
                    <Label htmlFor="workerTerms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Create Worker Account
                  </Button>
                </form>
              </TabsContent>

              {/* Employer Registration */}
              <TabsContent value="employer">
                <form onSubmit={handleEmployerSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={employerData.companyName}
                        onChange={(e) => setEmployerData((prev) => ({ ...prev, companyName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactName">Contact Person *</Label>
                      <Input
                        id="contactName"
                        value={employerData.contactName}
                        onChange={(e) => setEmployerData((prev) => ({ ...prev, contactName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employerEmail">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="employerEmail"
                          type="email"
                          className="pl-10"
                          value={employerData.email}
                          onChange={(e) => setEmployerData((prev) => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="employerPhone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="employerPhone"
                          type="tel"
                          className="pl-10"
                          value={employerData.phone}
                          onChange={(e) => setEmployerData((prev) => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employerPassword">Password *</Label>
                      <div className="relative">
                        <Input
                          id="employerPassword"
                          type={showPassword ? "text" : "password"}
                          value={employerData.password}
                          onChange={(e) => setEmployerData((prev) => ({ ...prev, password: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="employerConfirmPassword">Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          id="employerConfirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={employerData.confirmPassword}
                          onChange={(e) => setEmployerData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employerLocation">Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="employerLocation"
                          className="pl-10"
                          placeholder="City, State"
                          value={employerData.location}
                          onChange={(e) => setEmployerData((prev) => ({ ...prev, location: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select
                        value={employerData.companySize}
                        onValueChange={(value) => setEmployerData((prev) => ({ ...prev, companySize: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      value={employerData.industry}
                      onValueChange={(value) => setEmployerData((prev) => ({ ...prev, industry: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Company Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell workers about your company, culture, and what makes you a great employer..."
                      value={employerData.description}
                      onChange={(e) => setEmployerData((prev) => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="employerTerms"
                      checked={employerData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setEmployerData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                      }
                    />
                    <Label htmlFor="employerTerms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Create Employer Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
