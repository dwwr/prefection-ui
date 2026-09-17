/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, type ReactNode } from 'react'

const shellStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;
  box-sizing: border-box;
  padding-top: 10rem;
  background-color: #f0c94a;
  color: #161616;
  font-family: var(--font-din);
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const controlsStyle = css`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  display: flex;
  gap: 0.5rem;

  button {
    appearance: none;
    border: 0;
    border-radius: 999px;
    padding: 0.4rem 0.85rem;
    background: #161616;
    color: #f0c94a;
    font: inherit;
    letter-spacing: 0.12em;
    cursor: pointer;
  }

  button:hover {
    background: #2a2a2a;
  }
`

export const StoryPlayground = ({ children }: { children: ReactNode }) => {
  const [play, setPlay] = useState(0)

  return (
    <div css={shellStyle}>
      <div css={controlsStyle}>
        <button type="button" onClick={() => setPlay(n => n + 1)}>
          Play
        </button>
      </div>
      <div key={play} style={{ marginLeft: '-3rem' }}>
        {children}
      </div>
    </div>
  )
}
