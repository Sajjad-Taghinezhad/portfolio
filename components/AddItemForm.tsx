"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type AddItemFormProps = {
  onAddItem: (item: { type: string; title: string; description: string; date: string }) => void
}

export default function AddItemForm({ onAddItem }: AddItemFormProps) {
  const [type, setType] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [details, setDetails] = useState("")
  const [date, setDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (type && title && description && date) {
      onAddItem({ type, title, description, date })
      setType("")
      setTitle("")
      setDescription("")
      setDate("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-repeat-round p-6 rounded-lg">
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
        <Label htmlFor="detiles">Details</Label>
        <Textarea
          id="detiles"
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
      <Button type="submit">Add Item</Button>
    </form>
  )
}

