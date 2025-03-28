"use client"

import { useState } from "react"
import AddItemForm from "./AddItemForm"
import PortfolioSection from "./PortfolioSection"

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
  }

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const itemTypes = ["certificate", "achievement", "honor", "skill"]

  return (
    <div className="space-y-8">
      <AddItemForm onAddItem={addItem} />
      {itemTypes.map((type) => (
        <PortfolioSection
          key={type}
          title={type.charAt(0).toUpperCase() + type.slice(1) + "s"}
          items={items.filter((item) => item.type === type)}
          onDeleteItem={deleteItem}
        />
      ))}
    </div>
  )
}

