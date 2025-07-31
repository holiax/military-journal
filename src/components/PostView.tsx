import { format } from 'date-fns'
import { MapPin, X, Edit, Trash2 } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Post } from '@/types/Post'

interface PostViewProps {
  post: Post | null
  open: boolean
  onOpenChange: (open: boolean) => void
  isAuthenticated: boolean
  onEdit: () => void
  onDelete: () => void
}

export function PostView({ post, open, onOpenChange, isAuthenticated, onEdit, onDelete }: PostViewProps) {
  if (!post) return null

  const formattedDate = format(new Date(post.createdAt), 'MMMM d, yyyy')
  const readTime = Math.max(1, Math.ceil(post.content.split(' ').length / 200))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex-row items-start justify-between space-y-0 pb-4">
          <div className="space-y-3 flex-1 pr-8">
            <DialogTitle className="text-2xl font-serif font-semibold text-foreground leading-tight">
              {post.title}
            </DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.createdAt}>
                {formattedDate}
              </time>
              <span>•</span>
              <span>{readTime} min read</span>
              {post.location && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{post.location}</span>
                  </div>
                </>
              )}
            </div>
            {post.mood && (
              <Badge variant="secondary" className="w-fit">
                {post.mood}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onEdit()
                    onOpenChange(false)
                  }}
                  className="h-8 w-8 p-0"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onDelete()
                    onOpenChange(false)
                  }}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0"
            >
              <X size={16} />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed">
          {post.content.split('\n').map((paragraph, index) => (
            paragraph.trim() ? (
              <p key={index} className="mb-6 last:mb-0">
                {paragraph}
              </p>
            ) : (
              <br key={index} />
            )
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}