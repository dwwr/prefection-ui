/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react'
import {
  creditStyle,
  glyphsStyle,
  guideDotStyle,
  guideItemStyle,
  guideLabelStyle,
  guideListStyle,
  headerStyle,
  kickerStyle,
  pageStyle,
  rowLabelStyle,
  rowStyle,
  scaleBody,
  scaleCaption,
  scaleDisplay,
  scaleHeading,
  scaleLabel,
  scaleTitle,
  sectionLabelStyle,
  sectionStyle,
  stackStyle,
  titleStyle,
  weightBold,
  weightRegular,
} from './styles'

const meta: Meta = {
  title: 'Typography',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
}

export default meta
type Story = StoryObj

const guideEntries = [
  { label: 'Foreword', color: '#5ec8e8' },
  { label: 'Hitchhiking', color: '#3ec6c9' },
  { label: 'Maps', color: '#3cbf6e' },
  { label: 'Guides', color: '#f0a03c' },
  { label: 'Useless Info', color: '#8fd14f' },
  { label: 'Don’t Panic', color: '#8a5aa8' },
] as const

const ScaleRow = ({
  label,
  style,
  children,
}: {
  label: string
  style: typeof scaleBody
  children: string
}) => (
  <div css={rowStyle}>
    <div css={rowLabelStyle}>{label}</div>
    <div css={style}>{children}</div>
  </div>
)

export const Specimen: Story = {
  render: () => (
    <div css={pageStyle}>
      <header css={headerStyle}>
        <div css={kickerStyle}>prefection-ui</div>
        <h1 css={titleStyle}>Alte DIN 1451</h1>
        <p css={creditStyle}>
          Peter Wiegel’s DIN 1451 Mittelschrift. Regular follows the standard;
          bold is the stamped / geprägt cut. SIL Open Font License.
        </p>
      </header>

      <section css={sectionStyle}>
        <div css={sectionLabelStyle}>Weights</div>
        <div css={stackStyle}>
          <div css={[scaleHeading, weightRegular]}>Regular — Don’t Panic</div>
          <div css={[scaleHeading, weightBold]}>Bold — Don’t Panic</div>
        </div>
      </section>

      <section css={sectionStyle}>
        <div css={sectionLabelStyle}>Scale</div>
        <ScaleRow label="Display" style={scaleDisplay}>
          So Long
        </ScaleRow>
        <ScaleRow label="Heading" style={scaleHeading}>
          What is it?
        </ScaleRow>
        <ScaleRow label="Title" style={scaleTitle}>
          Introduction: How we got here, & where we're going
        </ScaleRow>
        <ScaleRow label="Body" style={scaleBody}>
          The quick brown fox jumps over the lazy dog.
        </ScaleRow>
        <ScaleRow label="Label" style={scaleLabel}>
          Life, the Universe, and Everything
        </ScaleRow>
        <ScaleRow label="Caption" style={scaleCaption}>
          Who / What / Why / Where / When / How
        </ScaleRow>
      </section>

      <section css={sectionStyle}>
        <div css={sectionLabelStyle}>Glyphs</div>
        <div css={glyphsStyle}>
          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
          <br />
          a b c d e f g h i j k l m n o p q r s t u v w x y z
          <br />
          0 1 2 3 4 5 6 7 8 9
          <br />. , ; : ! ? ’ “ ” ( ) [ ] / & @ # %
        </div>
      </section>
    </div>
  ),
}

export const GuideLabels: Story = {
  render: () => (
    <div css={pageStyle}>
      <header css={headerStyle}>
        <div css={kickerStyle}>In use</div>
        <h1 css={titleStyle}>Guide labels</h1>
      </header>
      <div css={guideListStyle}>
        {guideEntries.map(({ label, color }) => (
          <div key={label} css={guideItemStyle}>
            <span css={guideLabelStyle}>{label}</span>
            <span css={guideDotStyle(color)} />
          </div>
        ))}
      </div>
    </div>
  ),
}
