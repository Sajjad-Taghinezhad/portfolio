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
    // In a real application, you would fetch this data from an API or database
    const dummyData: PortfolioItem[] = [
      {
        id: 1,
        type: "certificate",
        title: "Web Development Certification",
        description: "Completed an intensive web development bootcamp",
        date: "2023-05-15",
        image: "/placeholder.svg?height=400&width=600",
        details: "This certification covers HTML, CSS, JavaScript, and React.",
      },
      {
        id: 2,
        type: "achievement",
        title: "First Place Hackathon",
        description: "Won first place in a 48-hour coding challenge",
        date: "2023-03-20",
        image: "/placeholder.svg?height=400&width=600",
        details: "Developed an innovative app for sustainable urban planning.",
      },
      {
        id: 3,
        type: "honor",
        title: "Dean's List",
        description: "Achieved academic excellence for the Fall 2023 semester",
        date: "2023-12-20",
        details: "Maintained a GPA of 3.8 or higher throughout the semester.",
      },
      {
        id: 4,
        type: "skill",
        title: "React.js",
        description: "Proficient in building modern web applications with React",
        date: "2023-01-01",
        details: "Experience with hooks, context API, and state management libraries.",
      },
      {
        id: 5,
        type: "certificate",
        title: "AWS Certified Developer",
        description: "Obtained AWS Certified Developer - Associate certification",
        date: "2023-08-10",
        image: "/placeholder.svg?height=400&width=600",
        details: "Demonstrates proficiency in developing, deploying, and debugging cloud-based applications using AWS.",
      },
    ]
    setItems(dummyData)
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
      <div className="relative w-full max-w-6xl h-full aspect-video bg-card rounded-lg shadow-lg overflow-hidden">
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

