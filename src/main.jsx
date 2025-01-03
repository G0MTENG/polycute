import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { Editor } from './react-test-1.jsx'
import { MarkdownEditor } from './react-test-2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MarkdownEditor />
  </StrictMode>,
)
