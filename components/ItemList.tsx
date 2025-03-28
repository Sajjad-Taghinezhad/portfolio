import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

type PortfolioItem = {
  id: number
  type: string
  title: string
  description: string
  date: string
}

type ItemListProps = {
  items: PortfolioItem[]
  onItemClick: (index: number) => void
  onItemSelect: (item: PortfolioItem) => void
}

export default function ItemList({ items, onItemClick, onItemSelect }: ItemListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 overflow-auto p-4"
    >
      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-lg shadow p-4 cursor-pointer hover:bg-accent transition-colors"
            onClick={() => onItemClick(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <Badge variant="outline">{item.type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            <p className="text-xs text-muted-foreground mt-2">{new Date(item.date).toLocaleDateString()}</p>
            <button
              className="mt-2 text-sm text-primary hover:underline"
              onClick={(e) => {
                e.stopPropagation()
                onItemSelect(item)
              }}
            >
              View Details
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

