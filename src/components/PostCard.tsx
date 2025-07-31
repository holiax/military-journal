import { format } from 'date-fns'
import { MapPin, Edit, Trash2, ArrowRight } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Post } from '@/types/Post'

interface PostCardProps {
  post: Post
  isAuthenticated: boolean
  onEdit: () => void
  onDelete: () => void
  onReadMore: () => void
}

export function PostCard({ post, isAuthenticated, onEdit, onDelete, onReadMore }: PostCardProps) {
  const formattedDate = format(new Date(post.createdAt), 'MMMM d, yyyy')
  const readTime = Math.max(1, Math.ceil(post.content.split(' ').length / 200))

  // Create a preview of the content (first 150 characters)
  const getPreview = (content: string) => {
    const preview = content.slice(0, 150)
    return preview.length === content.length ? preview : preview + '...'
  }

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-border/50 cursor-pointer" onClick={onReadMore}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-serif font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </h2>
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
          </div>
          
          {isAuthenticated && (
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit()
                }}
                className="h-8 w-8 p-0"
              >
                <Edit size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          )}
        </div>
        
        {post.mood && (
          <Badge variant="secondary" className="w-fit">
            {post.mood}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <p className="text-foreground/80 leading-relaxed">
            {getPreview(post.content)}
          </p>
          
          <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
            <span>Read full entry</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}