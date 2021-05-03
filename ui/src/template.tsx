// Copyright 2020 H2O.ai, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Handlebars from 'handlebars'
import React from 'react'
import { cards, substitute } from './layout'
import { MarkupCard, XMarkup } from './markup'
import { B, Model, Rec, S, unpack } from './qd'
import { bond } from './ui'

/** Render dynamic content using an HTML template.*/
export interface Template {
  /** The Handlebars template. https://handlebarsjs.com/guide/ */
  content: S
  /** Data for the Handlebars template */
  data?: Rec
  /** An identifying name for this component. */
  name?: S
  /** True if the component should be visible. Defaults to true. */
  visible?: B
}

/** Render dynamic content using an HTML template.*/
interface State {
  /** The title for this card.*/
  title: S
  /** The Handlebars template. https://handlebarsjs.com/guide/ */
  content: S
  /** Data for the Handlebars template. */
  data?: Rec
}

export const
  XTemplate = bond(({ model: m }: { model: Template }) => {
    const
      template = Handlebars.compile(m.content || ''),
      render = () => {
        const data = unpack(m.data)
        return <div data-test={m.name}><XMarkup model={{ content: template(data || {}), visible: m.visible }} /></div>
      }
    return { render }
  }),
  View = bond(({ name, state, changed }: Model<State>) => {
    const
      template = Handlebars.compile(state.content || ''),
      render = () => {
        const data = unpack(state.data)
        return <MarkupCard name={name} title={substitute(state.title, data)} content={template(data || {})} />
      }
    return { render, changed }
  })

cards.register('template', View)
