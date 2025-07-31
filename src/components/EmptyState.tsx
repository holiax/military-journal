import { BookOpen, PencilSimple } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface EmptyStateProps {
  isAuthenticated: boolean
  onCreateFirst: () => void
}

export function EmptyState({ isAuthenticated, onCreateFirst }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-12 pb-8 px-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={32} className="text-muted-foreground" />
          </div>
          
          <h2 className="text-xl font-serif font-semibold text-foreground mb-3">
            Welcome to Service Journal
          </h2>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            This is where a soldier's journey unfolds through personal diary entries. 
            Each post captures moments, reflections, and experiences from military service.
          </p>

          {isAuthenticated ? (
            <Button onClick={onCreateFirst} className="gap-2">
              <PencilSimple size={16} weight="bold" />
              Write First Entry
            </Button>
          ) : (
            <div className="text-sm text-muted-foreground">
              No entries have been posted yet. Check back soon for the first journal entry.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}