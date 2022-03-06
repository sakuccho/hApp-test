import 'styled-components';
import { css } from 'styled-components';

export const theme = {
  media: {
    sm: (...args) => css`
      @media (max-width: 560px) {
        ${css(...args)}
      }
    `,

    tab: (...args) => css`
      @media (min-width: 561px) and (max-width: 1024px) {
        ${css(...args)}
      }
    `,

    pc: (...args) => css`
      @media (min-width: 1024px) {
        ${css(...args)}
      }
    `,

  },
};