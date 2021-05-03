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

import { initializeIcons } from '@fluentui/react'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import * as T from './qd'
import { Tabs, XTabs } from './tabs'

const name = 'tabs'
const tabsProps: Tabs = { name, items: [{ name }] }

describe('Tabs.tsx', () => {
  beforeAll(() => initializeIcons())
  beforeEach(() => { T.wave.args[name] = null })

  it('Renders data-test attr', () => {
    const { queryByTestId } = render(<XTabs model={tabsProps} />)
    expect(queryByTestId(name)).toBeInTheDocument()
  })

  it('Does not display tabs when visible is false', () => {
    const { queryByTestId } = render(<XTabs model={{ ...tabsProps, visible: false }} />)
    expect(queryByTestId(name)).toBeInTheDocument()
    expect(queryByTestId(name)).not.toBeVisible()
  })

  it('Sets args and calls sync on click', () => {
    const syncMock = jest.fn()
    T.wave.sync = syncMock

    const { getByRole } = render(<XTabs model={tabsProps} />)
    fireEvent.click(getByRole('tab'))

    expect(T.wave.args[name]).toBe(name)
    expect(syncMock).toHaveBeenCalled()
  })
  it('Does not call sync on click - args not changed', () => {
    const syncMock = jest.fn()
    T.wave.sync = syncMock
    T.wave.args[name] = name

    const { getByRole } = render(<XTabs model={tabsProps} />)
    fireEvent.click(getByRole('tab'))

    expect(syncMock).toHaveBeenCalledTimes(0)
  })

})