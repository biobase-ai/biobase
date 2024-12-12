import React from 'react'
// import { AutoForm } from 'uniforms'
// @ts-ignore
import MarkdownExample from './../../lib/MarkdownSample.md'
import ReactMarkdown from 'react-markdown'
const gfm = require('remark-gfm')

import Typography from '.'
// @ts-ignore
import { Space } from '../../index'

const { Title, Text, Link } = Typography

export default {
  title: 'General/Typography',
  component: Typography,
}

export const article = () => (
  <Typography tag="article">
    <ReactMarkdown plugins={[gfm]} source={MarkdownExample} />
  </Typography>
)

export const Titles = () => (
  <React.Fragment>
    <Title level={1}>Hello world</Title>
    <Title level={2}>Hello world</Title>
    <Title level={3}>Hello world</Title>
    <Title level={4}>Hello world</Title>
    <Title level={5}>Hello world</Title>
  </React.Fragment>
)

export const Texts = () => (
  <>
    <Text>Biobase UI (default)</Text>
    <br />
    <Text type="secondary">Biobase UI (secondary)</Text>
    <br />
    <Text type="success">Biobase UI (success)</Text>
    <br />
    <Text type="warning">Biobase UI (warning)</Text>
    <br />
    <Text type="danger">Biobase UI (danger)</Text>
    <br />
    <Text disabled>Biobase UI (disabled)</Text>
    <br />
    <Text mark>Biobase UI (mark)</Text>
    <br />
    <Text code>Biobase UI (code)</Text>
    <br />
    <Text keyboard>Biobase UI (keyboard)</Text>
    <br />
    <Text underline>Biobase UI (underline)</Text>
    <br />
    <Text strikethrough>Biobase UI (strikethrough)</Text>
    <br />
    <Text strong>Biobase UI (strong)</Text>
    <br />
    <Link href="https://biobase.io" target="_blank">
      Biobase (Link)
    </Link>
  </>
)
