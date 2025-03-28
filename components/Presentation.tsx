"use client"

import { useState, useEffect } from "react"
import Slide from "./Slide"
import ItemList from "./ItemList"
import { Modal } from "./Modal"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, List, PresentationIcon } from "lucide-react"

type PortfolioItem = {
  id: number
  type: string
  title: string
  description: string
  date: string
  image?: string
  details?: string
}

export default function Presentation() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showList, setShowList] = useState(false)
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  useEffect(() => {
    // Fetch data from the backend API
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/portfolios') // Call the backend API
        if (!response.ok) {
          throw new Error('Failed to fetch items')
        }
        const data: PortfolioItem[] = await response.json()
        setItems(data)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }

    fetchItems()
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0))
  }

  const goToItem = (index: number) => {
    setCurrentIndex(index)
    setShowList(false)
  }

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  if (items.length === 0) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-full max-w-6xl h-full aspect-video bg-card rounded-lg shadow-2xl shadow-zinc-400 overflow-hidden">
        {showList ? (
          <ItemList items={items} onItemClick={goToItem} onItemSelect={openModal} />
        ) : (
          <Slide item={items[currentIndex]} onClick={() => openModal(items[currentIndex])} />
        )}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
          <Button variant="outline" size="icon" onClick={goToPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setShowList(!showList)}>
            {showList ? <PresentationIcon className="h-4 w-4" /> : <List className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={goToNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {!showList && (
        <div className="mt-4 flex space-x-2">
          {items.map((_, index) => (
            <div key={index} className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
      )}
      <Modal item={selectedItem} isOpen={!!selectedItem} onClose={closeModal} />
    </div>
  )
}

