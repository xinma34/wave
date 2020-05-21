import React from 'react';
import { stylesheet } from 'typestyle';
import { Card, decode, Rec, S } from '../delta';
import { cards, Format } from '../grid';
import { getTheme } from '../theme';
import bond from '../bond';

const
  theme = getTheme(),
  css = stylesheet({
    item: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    left: {
      flexDirection: 'column',
    },
    right: {
      flexDirection: 'column',
    },
    title: {
      ...theme.font.s12,
      ...theme.font.w6,
    },
    caption: {
      ...theme.font.s13,
      color: theme.colors.text5,
    },
    value: {
      ...theme.font.s12,
    },
    aux_value: {
      ...theme.font.s13,
      color: theme.colors.text5,
    },
  })

interface Opts {
  title: S
  caption: S
  value: S
  aux_value: S
  data: S | Rec
}

type State = Partial<Opts>

const defaults: State = {
  title: 'Untitled',
}

const
  View = bond(({ state, changed }: Card<State>) => {
    const
      render = () => {
        const
          s = theme.merge(defaults, state),
          data = decode(s.data)

        return (
          <div className={css.item}>
            <div className={css.left}>
              <div className={css.title}>
                <Format data={data} format={s.title} />
              </div>
              <div className={css.caption}>
                <Format data={data} format={s.caption} />
              </div>
            </div>
            <div className={css.right}>
              <div className={css.value}>
                <Format data={data} format={s.value} />
              </div>
              <div className={css.aux_value}>
                <Format data={data} format={s.aux_value} />
              </div>
            </div>
          </div>
        )
      }
    return { render, changed }
  })

cards.register('list_item1', View)


