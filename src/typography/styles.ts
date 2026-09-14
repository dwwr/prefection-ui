import { css } from '@emotion/react'

export const pageStyle = css`
  min-height: 100vh;
  box-sizing: border-box;
  padding: 3rem 2.5rem 4rem;
  background-color: #f0c94a;
  color: #161616;
  font-family: var(--font-din);
`

export const headerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 2.5rem;
`

export const kickerStyle = css`
  font-size: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

export const titleStyle = css`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

export const creditStyle = css`
  max-width: 40rem;
  font-size: 1rem;
  letter-spacing: 0.02em;
`

export const sectionStyle = css`
  margin-top: 2.5rem;
`

export const sectionLabelStyle = css`
  margin-bottom: 0.85rem;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`

export const rowStyle = css`
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 1rem;
  align-items: baseline;
  padding: 0.65rem 0;
  border-top: 1px solid rgba(22, 22, 22, 0.18);
`

export const rowLabelStyle = css`
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

export const scaleDisplay = css`
  font-size: 4.5rem;
  line-height: 1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

export const scaleHeading = css`
  font-size: 2.25rem;
  line-height: 1.1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`

export const scaleTitle = css`
  font-size: 1.5rem;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

export const scaleBody = css`
  font-size: 1rem;
  line-height: 1.45;
  letter-spacing: 0.02em;
`

export const scaleLabel = css`
  font-size: 0.875rem;
  line-height: 1.3;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

export const scaleCaption = css`
  font-size: 0.75rem;
  line-height: 1.3;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`

export const stackStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`

export const weightRegular = css`
  font-weight: 400;
`

export const weightBold = css`
  font-weight: 700;
`

export const glyphsStyle = css`
  font-size: 1.35rem;
  line-height: 1.7;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`

export const guideListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  max-width: 28rem;
`

export const guideItemStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
`

export const guideLabelStyle = css`
  font-size: 0.95rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`

export const guideDotStyle = (color: string) => css`
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background-color: ${color};
  flex-shrink: 0;
`
