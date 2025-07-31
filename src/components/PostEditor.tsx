import { useState, useEffect } from 'react'
import { PencilSimple, FloppyDisk, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Post } from '@/types/Post'
import { toast } from 'sonner'

interface PostEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post?: Post | null
  onSave: (postData: Omit<Post, 'id' | 'createdAt'>) => void
}

export function PostEditor({ open, onOpenChange, post, onSave }: PostEditorProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [mood, setMood] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
      setLocation(post.location || '')
      setMood(post.mood || '')
    } else {
      setTitle('')
      setContent('')
      setLocation('')
      setMood('')
    }
  }, [post])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content')
      return
    }

    setIsLoading(true)
    
    try {
      onSave({
        title: title.trim(),
        content: content.trim(),
        location: location.trim() || undefined,
        mood: mood.trim() || undefined,
      })
      
      toast.success(post ? 'Entry updated successfully' : 'New entry created successfully')
      handleClose()
    } catch (error) {
      toast.error('Failed to save entry. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!post) {
      setTitle('')
      setContent('')
      setLocation('')
      setMood('')
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PencilSimple size={20} weight="bold" className="text-primary" />
            {post ? 'Edit Entry' : 'New Journal Entry'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4 overflow-hidden">
          <div className="space-y-2">
            <Label htmlFor="title">Entry Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Day 127: Life in the field..."
              disabled={isLoading}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Forward Operating Base Alpha"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mood">Mood (Optional)</Label>
              <Input
                id="mood"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="Determined, Homesick, Proud..."
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2 flex-1 flex flex-col">
            <Label htmlFor="content">Entry Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Today was challenging but rewarding. The morning started with..."
              disabled={isLoading}
              required
              className="flex-1 min-h-[200px] resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 gap-2"
            >
              <X size={16} />
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !title.trim() || !content.trim()}
              className="flex-1 gap-2"
            >
              <FloppyDisk size={16} />
              {isLoading ? 'Saving...' : post ? 'Update Entry' : 'Save Entry'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}