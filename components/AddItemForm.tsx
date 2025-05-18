"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddItemForm() {
  const [type, setType] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [details, setDetails] = useState("")
  const [date, setDate] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    if (type && title && description && date && details && file) {
      try {
        const formData = new FormData()
        formData.append("type", type)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("details", details)
        formData.append("date", date)
        formData.append("file", file)

        const response = await fetch("/api/insert", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Failed to add item")
        }

        setSuccess(true)
        setType("")
        setTitle("")
        setDescription("")
        setDetails("")
        setDate("")
        setFile(null)
      } catch (err: any) {
        setError(err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    } else {
      setError("All fields and file are required")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-repeat-round p-6 rounded-lg" encType="multipart/form-data">
      <div>
        <Label htmlFor="type">Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Select item type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="certificate">Certificate</SelectItem>
            <SelectItem value="achievement">Achievement</SelectItem>
            <SelectItem value="honor">Honor</SelectItem>
            <SelectItem value="skill">Skill</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        />
      </div>
      <div>
        <Label htmlFor="details">Details</Label>
        <Textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Enter details"
          required
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="file">Image or PDF</Label>
        <Input
          id="file"
          type="file"
          accept="image/jpeg,image/png,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
      </div>
      <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Item"}</Button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Item added successfully!</p>}
    </form>
  )
}

