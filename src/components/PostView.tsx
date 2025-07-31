import { format } from 'date-fns'
import { MapPin, ArrowLeft, Edit, Trash2 } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Post } from '@/types/Post'

interface PostViewProps {
  post: Post
  isAuthenticated: boolean
  onEdit: () => void
  onDelete: () => void
  onBack: () => void
}

export function PostView({ post, isAuthenticated, onEdit, onDelete, onBack }: PostViewProps) {
  const formattedDate = format(new Date(post.createdAt), 'MMMM d, yyyy')
  const readTime = Math.max(1, Math.ceil(post.content.split(' ').length / 200))

  return (
    <article className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={18} />
              Back to Journal
            </Button>
            
            {isAuthenticated && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onEdit}
                  className="flex items-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDelete}
                  className="flex items-center gap-2 text-destructive hover:text-destructive"
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Post Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Post Header */}
          <header className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.createdAt} className="font-medium">
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
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {post.mood}
              </Badge>
            )}
          </header>

          {/* Post Body */}
          <div className="prose prose-lg prose-neutral max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() ? (
                <p key={index} className="mb-6 last:mb-0 text-foreground/90 leading-relaxed">
                  {paragraph}
                </p>
              ) : (
                <div key={index} className="h-4" />
              )
            ))}
          </div>
        </div>
      </main>
    </article>
  )
}