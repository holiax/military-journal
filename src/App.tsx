import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { BlogHeader } from './components/BlogHeader'
import { PostCard } from './components/PostCard'
import { PostView } from './components/PostView'
import { LoginModal } from './components/LoginModal'
import { PostEditor } from './components/PostEditor'
import { EmptyState } from './components/EmptyState'
import { Post } from './types/Post'

type ViewState = 'list' | 'post'

function App() {
  const [posts, setPosts] = useKV<Post[]>('military-blog-posts', [])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [viewingPost, setViewingPost] = useState<Post | null>(null)
  const [currentView, setCurrentView] = useState<ViewState>('list')

  const handleCreatePost = (postData: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      id: Date.now().toString(),
      ...postData,
      createdAt: new Date().toISOString()
    }
    setPosts(current => [newPost, ...current])
    setShowEditor(false)
  }

  const handleEditPost = (postData: Omit<Post, 'id' | 'createdAt'>) => {
    if (!editingPost) return
    
    setPosts(current => 
      current.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...postData }
          : post
      )
    )
    setEditingPost(null)
    setShowEditor(false)
  }

  const handleDeletePost = (postId: string) => {
    setPosts(current => current.filter(post => post.id !== postId))
  }

  const startEdit = (post: Post) => {
    setEditingPost(post)
    setShowEditor(true)
  }

  const openPost = (post: Post) => {
    setViewingPost(post)
    setCurrentView('post')
  }

  const goBackToList = () => {
    setViewingPost(null)
    setCurrentView('list')
  }

  const handlePostViewEdit = () => {
    if (viewingPost) {
      setEditingPost(viewingPost)
      setShowEditor(true)
    }
  }

  const handlePostViewDelete = () => {
    if (viewingPost) {
      handleDeletePost(viewingPost.id)
      goBackToList()
    }
  }

  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'list' ? (
        <>
          <BlogHeader 
            isAuthenticated={isAuthenticated}
            onLoginClick={() => setShowLogin(true)}
            onNewPostClick={() => {
              setEditingPost(null)
              setShowEditor(true)
            }}
            onLogout={() => setIsAuthenticated(false)}
          />
          
          <main className="container mx-auto px-4 py-12 max-w-4xl">
            {posts.length === 0 ? (
              <EmptyState 
                isAuthenticated={isAuthenticated}
                onCreateFirst={() => {
                  setEditingPost(null)
                  setShowEditor(true)
                }}
              />
            ) : (
              <div className="space-y-8">
                {sortedPosts.map(post => (
                  <PostCard 
                    key={post.id}
                    post={post}
                    isAuthenticated={isAuthenticated}
                    onEdit={() => startEdit(post)}
                    onDelete={() => handleDeletePost(post.id)}
                    onReadMore={() => openPost(post)}
                  />
                ))}
              </div>
            )}
          </main>
        </>
      ) : (
        viewingPost && (
          <PostView 
            post={viewingPost}
            isAuthenticated={isAuthenticated}
            onEdit={handlePostViewEdit}
            onDelete={handlePostViewDelete}
            onBack={goBackToList}
          />
        )
      )}

      <LoginModal 
        open={showLogin}
        onOpenChange={setShowLogin}
        onAuthenticated={() => {
          setIsAuthenticated(true)
          setShowLogin(false)
        }}
      />

      <PostEditor 
        open={showEditor}
        onOpenChange={setShowEditor}
        post={editingPost}
        onSave={editingPost ? handleEditPost : handleCreatePost}
      />
    </div>
  )
}

export default App