import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type PortfolioItem = {
  id: number
  type: string
  title: string
  description: string
  date: string
}

type PortfolioSectionProps = {
  title: string
  items: PortfolioItem[]
  onDeleteItem: (id: number) => void
}

export default function PortfolioSection({ title, items, onDeleteItem }: PortfolioSectionProps) {
  if (items.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
              <p className="text-sm text-gray-500 mt-2">{item.date}</p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={() => onDeleteItem(item.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

