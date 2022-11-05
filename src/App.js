import React, { useState } from 'react'

import parse from 'html-react-parser'
import close from './close.svg'

function App() {
  const [count, setCount] = useState(0)

  const [data, setData] = useState('')

  const [text, setText] = useState({ status: null, text: null })

  const fetchingData = async () => {
    const response = await fetch(
      `https://fish-text.ru/get?&type=${data}&number=${count}`
    ).then((response) => {
      return response.json()
    })

    setText({
      status: response.status,
      text: response.text.replace(/\\n/g, '<br />'),
    })
    setCount(0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetchingData()
    setData('')
  }

  return (
    <section className="section-center">
      <h3>TIRED OF BORING LOREM IPSUM?</h3>
      {!text.text && (
        <div className="section_btn">
          <button
            onClick={() => setData('sentence')}
            className=" button btn_list"
          >
            Sentences
          </button>
          <button
            onClick={() => setData('paragraph')}
            className="button btn_list-last"
          >
            Paras
          </button>
        </div>
      )}

      {data && (
        <form className="lorem-form" onSubmit={handleSubmit}>
          <label forhtml="number">{data}</label>
          <input
            id="number"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />

          <button>GENERATE</button>
        </form>
      )}

      <article>
        {text.text && (
          <>
            <img
              src={close}
              alt="img"
              className="cancel"
              onClick={() => setText({ status: null, text: null })}
            />
            <p className={text.status !== 'error' ? 'result' : 'error'}>
              {parse(text.text)}
            </p>
          </>
        )}
      </article>
    </section>
  )
}

export default App
