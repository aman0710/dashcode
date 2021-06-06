import React, { useState, useEffect } from 'react'
import Editor from './Editor'


function App() {


  const [html, setHtml] = useState(
    localStorage.getItem("dashcode-html") || ''
  )
  const [css, setCss] = useState(
    localStorage.getItem("dashcode-css") || ''
  )
  const [js, setJs] = useState(
    localStorage.getItem("dashcode-js") || ''
  )
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {

    const timeout = setTimeout(() => {

      setSrcDoc(`
        <html> 
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script> 
        </html >
      `)

    }, 250)

    localStorage.setItem("dashcode-html", html)
    localStorage.setItem("dashcode-js", js)
    localStorage.setItem("dashcode-css", css)

    return () => clearTimeout(timeout)

  }, [html, css, js])


  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JavaScript"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;
