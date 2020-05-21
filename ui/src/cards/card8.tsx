import React from 'react';
import { stylesheet } from 'typestyle';
import { Card, decode, F, Rec, S } from '../delta';
import { cards, Format } from '../grid';
import { ProgressBar } from './progress_bar';
import { getTheme } from '../theme';
import bond from '../bond';

const
  theme = getTheme(),
  css = stylesheet({
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    title: {
      ...theme.font.s12,
      ...theme.font.w6,
    },
    values: {
      display: 'flex',
      alignItems: 'baseline',
    },
    value: {
      ...theme.font.s18,
      ...theme.font.w3,
    },
    aux_value: {
      ...theme.font.s13,
      color: theme.colors.text7,
      flexGrow: 1,
      marginLeft: 5,
    }
  })

interface Opts {
  title: S
  value: S
  aux_value: S
  progress: F
  plot_color: S
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
          <div className={css.card}>
            <div className={css.title}>
              <Format data={data} format={s.title} />
            </div>
            <div className={css.values}>
              <div className={css.value}>
                <Format data={data} format={s.value} />
              </div>
              <div className={css.aux_value}>
                <Format data={data} format={s.aux_value} />
              </div>
            </div>
            <ProgressBar thickness={2} color={s.plot_color} value={s.progress} />
          </div>
        )
      }
    return { render, changed }
  })

cards.register('card8', View)
