import { Shield, BookOpen, Plus, LogOut } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface BlogHeaderProps {
  isAuthenticated: boolean
  onLoginClick: () => void
  onNewPostClick: () => void
  onLogout: () => void
}

export function BlogHeader({ 
  isAuthenticated, 
  onLoginClick, 
  onNewPostClick, 
  onLogout 
}: BlogHeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="text-primary-foreground" size={20} weight="bold" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-foreground">
                Service Journal
              </h1>
              <p className="text-sm text-muted-foreground">
                A Soldier's Diary
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button 
                  onClick={onNewPostClick}
                  className="gap-2"
                >
                  <Plus size={16} weight="bold" />
                  New Entry
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onLogout}
                  className="gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                onClick={onLoginClick}
                className="gap-2"
              >
                <Shield size={16} weight="bold" />
                Admin Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}