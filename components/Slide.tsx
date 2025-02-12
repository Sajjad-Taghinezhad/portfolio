import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"

type PortfolioItem = {
  id: number
  type: string
  title: string
  description: string
  date: string
}

type SlideProps = {
  item: PortfolioItem
  onClick: () => void
}

export default function Slide({ item, onClick }: SlideProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center cursor-pointer"
        onClick={onClick}
      >
        <Badge variant="outline" className="mb-4">
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </Badge>
        <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
        <p className="text-lg mb-6">{item.description}</p>
        <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
      </motion.div>
    </AnimatePresence>
  )
}

