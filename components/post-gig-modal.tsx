"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface PostGigModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PostGigModal({ open, onOpenChange }: PostGigModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    jobType: "",
    payRate: "",
    duration: "",
    location: "",
    requirements: [] as string[],
    urgent: false,
  })
  const [newRequirement, setNewRequirement] = useState("")

  const jobTypes = ["Delivery", "Cleaning", "Tutoring", "Pet Care", "Handyman", "Event Staff", "Data Entry"]

  const addRequirement = () => {
    if (newRequirement.trim() && !formData.requirements.includes(newRequirement.trim())) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }))
      setNewRequirement("")
    }
  }

  const removeRequirement = (req: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((r) => r !== req),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Posting gig:", formData)
    alert("Gig posted successfully!")
    onOpenChange(false)
    // Reset form
    setFormData({
      title: "",
      description: "",
      jobType: "",
      payRate: "",
      duration: "",
      location: "",
      requirements: [],
      urgent: false,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post a New Gig</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Food Delivery Driver"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type *</Label>
              <Select
                value={formData.jobType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, jobType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the job requirements, responsibilities, and any important details..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payRate">Pay Rate *</Label>
              <Input
                id="payRate"
                placeholder="e.g., $18/hour"
                value={formData.payRate}
                onChange={(e) => setFormData((prev) => ({ ...prev, payRate: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                placeholder="e.g., 3-4 hours"
                value={formData.duration}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g., Downtown"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Requirements</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Add a requirement (e.g., Age: 18+)"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
              />
              <Button type="button" onClick={addRequirement} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.requirements.map((req, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <span>{req}</span>
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeRequirement(req)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="urgent"
              checked={formData.urgent}
              onChange={(e) => setFormData((prev) => ({ ...prev, urgent: e.target.checked }))}
              className="rounded"
            />
            <Label htmlFor="urgent">Mark as urgent (higher visibility)</Label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Post Gig
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
