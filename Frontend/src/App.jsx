import { useState, useEffect } from 'react'
import Prism from 'prismjs'
import Editor from 'react-simple-code-editor'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState('')
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
    } catch (error) {
      setReview('Error fetching review. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className="heading">CODEWISE - AI-POWERED CODE REVIEWER</h1>

      <main>
        <div className="left">
          <div className="code-container">
            {code === '' && (
              <div className="editor-placeholder">Enter your code to review</div>
            )}
            <Editor
              value={code}
              onValueChange={newCode => setCode(newCode)}
              highlight={code =>
                Prism.highlight(code, Prism.languages.javascript, 'javascript')
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 14,
                borderRadius: '10px',
                width: '100%',
                backgroundColor: '#1a1a2e',
                color: '#fff',
                outline: 'none',
                minHeight: '100%'
              }}
            />
          </div>

          <div
            onClick={reviewCode}
            className="review"
            style={{
              backgroundColor: loading ? '#ccc' : 'rgb(220, 221, 237)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Reviewing...' : 'Review Code'}
          </div>
        </div>

        <div className="right">
          {review ? (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          ) : (
            <div className="placeholder-text">Your code will be reviewed here</div>
          )}
        </div>
      </main>
    </>
  )
}

export default App
