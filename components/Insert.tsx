"use client"

import { useState } from "react"
import AddItemForm from "./AddItemForm"

type PortfolioItem = {
  id: number
  type: string
  title: string
  description: string
  date: string
}

export default function InsertFrom() {
  const [items, setItems] = useState<PortfolioItem[]>([])

  const addItem = (newItem: Omit<PortfolioItem, "id">) => {
    setItems([...items, { ...newItem, id: Date.now() }])


  return (
    <div className="space-y-8">
      <AddItemForm onAddItem={addItem} />
    </div>
  )
}

