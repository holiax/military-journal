# Planning Guide

A personal military diary blog chronicling one soldier's journey through service, sharing authentic experiences, reflections, and growth through intimate journal-style entries.

**Experience Qualities**:
1. **Authentic** - Raw, honest storytelling that feels genuine and unfiltered, like reading someone's private journal
2. **Respectful** - Dignified presentation that honors military service while maintaining personal vulnerability  
3. **Immersive** - Clean, focused reading experience that draws visitors into the soldier's world and experiences

**Complexity Level**: Light Application (multiple features with basic state)
- Combines content showcase with interactive features like admin posting, but maintains simplicity in core functionality

## Essential Features

**Blog Post Display**
- Functionality: Display diary entries in chronological order with rich formatting
- Purpose: Share the soldier's journey and experiences with readers
- Trigger: User visits the main page
- Progression: Landing page → Browse posts → Read individual entries → Navigate between posts
- Success criteria: Posts load quickly, are easy to read, and maintain chronological context

**Admin Authentication**
- Functionality: Secure login system for post management
- Purpose: Allow authorized user to add new diary entries
- Trigger: Admin clicks login button
- Progression: Login button → Enter credentials → Authenticate → Access admin panel
- Success criteria: Only owner can access, secure authentication, clear access states

**Post Creation**
- Functionality: Rich text editor for creating new diary entries
- Purpose: Enable easy addition of new military experiences and reflections
- Trigger: Authenticated admin clicks "New Post"
- Progression: New Post → Enter title/content → Preview → Publish → View on blog
- Success criteria: Posts save reliably, formatting preserved, immediate visibility

**Post Management**
- Functionality: Edit and delete existing posts
- Purpose: Allow corrections and content management
- Trigger: Admin views post list or individual post
- Progression: View post → Edit button → Modify content → Save changes → Updated display
- Success criteria: Changes persist, no data loss, consistent formatting

## Edge Case Handling

- **Empty Blog State**: Welcome message encouraging first post creation with military-themed placeholder
- **Authentication Failure**: Clear error messages with retry options, no sensitive information exposure
- **Network Issues**: Graceful loading states and offline indicators for post reading
- **Long Content**: Proper text wrapping, scroll handling, and mobile-optimized reading experience
- **Invalid Data**: Form validation preventing empty posts, malformed content, or security issues

## Design Direction

The design should evoke strength, honor, and authenticity - feeling disciplined yet personal, like a well-kept military journal with clean typography and purposeful whitespace that respects both the gravity of service and the intimacy of personal reflection.

## Color Selection

Complementary (opposite colors) - Using deep military green paired with warm amber accents to create a sophisticated, service-oriented palette that feels both professional and warmly human.

- **Primary Color**: Deep Military Green (oklch(0.3 0.1 150)) - Communicates service, duty, and strength
- **Secondary Colors**: Muted slate grays (oklch(0.5 0.02 200)) for supporting text and backgrounds
- **Accent Color**: Warm Amber (oklch(0.75 0.15 70)) - Attention-grabbing highlight for CTAs and important elements like "New Post"
- **Foreground/Background Pairings**: 
  - Background White (oklch(0.98 0 0)): Dark charcoal text (oklch(0.15 0.02 200)) - Ratio 14.2:1 ✓
  - Primary Green (oklch(0.3 0.1 150)): White text (oklch(0.98 0 0)) - Ratio 11.8:1 ✓
  - Accent Amber (oklch(0.75 0.15 70)): Dark charcoal text (oklch(0.15 0.02 200)) - Ratio 8.9:1 ✓
  - Card Gray (oklch(0.95 0.01 200)): Dark charcoal text (oklch(0.15 0.02 200)) - Ratio 12.1:1 ✓

## Font Selection

Typography should convey clarity, reliability, and readability - characteristics essential for both military communication and personal journaling, using a clean serif for headings to add gravitas and a highly legible sans-serif for body content.

- **Typographic Hierarchy**: 
  - H1 (Blog Title): Playfair Display Bold/32px/tight letter spacing - commanding presence
  - H2 (Post Titles): Playfair Display Semibold/24px/normal spacing - dignified entry headers  
  - H3 (Section Headers): Inter Semibold/18px/slight letter spacing - clear organization
  - Body Text: Inter Regular/16px/1.6 line height - optimal reading comfort
  - Dates/Meta: Inter Medium/14px/subtle gray color - supporting information
  - Buttons: Inter Semibold/14px/slight letter spacing - clear actions

## Animations

Subtle and purposeful animations that enhance usability without distraction - reflecting military precision where every movement has intent, with smooth transitions that guide attention and confirm actions.

- **Purposeful Meaning**: Gentle fade-ins for posts loading, subtle hover states on interactive elements, smooth page transitions that maintain context
- **Hierarchy of Movement**: Admin actions (login, post creation) get slightly more prominent feedback, while reading interactions remain minimal and unobtrusive

## Component Selection

- **Components**: 
  - Cards for individual blog posts with subtle shadows
  - Dialog for login modal with secure styling
  - Button variants (primary for admin actions, secondary for navigation)
  - Form components with military-inspired styling
  - Badge for post dates and categories
  - Avatar for author representation
  - Textarea with enhanced styling for post creation
  - Alert for success/error states

- **Customizations**: 
  - Military-themed login form with refined styling
  - Custom post card with date formatting and read-time estimates
  - Enhanced textarea for post writing with auto-resize
  - Custom header with service branch styling

- **States**: 
  - Buttons: Rest (subtle), hover (gentle lift), active (pressed), focused (green ring), disabled (muted)
  - Inputs: Default border, focused (green accent), error (amber warning), success (subtle green)
  - Cards: Default (subtle shadow), hover (slight elevation)

- **Icon Selection**: 
  - Shield for security/admin features
  - BookOpen for reading posts
  - Edit for post management
  - Calendar for dates
  - User for profile/login
  - Plus for new content creation

- **Spacing**: 
  - Consistent 16px base unit
  - Post cards: 24px padding
  - Section gaps: 48px vertical
  - Form elements: 16px margins
  - Mobile: Reduced to 12px base with 16px padding

- **Mobile**: 
  - Single column layout with full-width cards
  - Collapsible navigation for admin functions
  - Touch-optimized button sizes (44px minimum)
  - Readable typography scaling
  - Simplified admin interface for small screens