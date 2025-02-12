import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"

type PortfolioItem = {
  id: number
  type: string
  title: string
  description: string
  date: string
  image?: string
  details?: string
}

type ModalProps = {
  item: PortfolioItem | null
  isOpen: boolean
  onClose: () => void
}

export function Modal({ item, isOpen, onClose }: ModalProps) {
  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
          <DialogDescription>{item.type}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {item.image && (
            <div className="relative h-64 w-full">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
          )}
          <p className="text-sm text-muted-foreground">{item.description}</p>
          {item.details && <p className="text-sm">{item.details}</p>}
          <p className="text-sm text-muted-foreground">Date: {new Date(item.date).toLocaleDateString()}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

