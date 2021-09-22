import {
  IStackStyles,
  mergeStyles,
  AnimationStyles,
  IStackTokens,
  ITextStyles,
} from '@fluentui/react';

const rootStyles: Partial<IStackStyles> = {
  root: {
    background: '#F8F8F8 linear-gradient(to right, #F8F8F8, #F8F8F9);',
    height: '100%',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const slideLeft = mergeStyles(AnimationStyles.slideLeftIn20);

let loginStyles: Partial<IStackStyles> = {
  root: {
    background: '#fff',
    padding: 40,
    borderRadius: 5,
    width: 450,
    boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;`,
  },
};

const loginStylesClassname = mergeStyles(loginStyles.root, {
  '@media(max-width: 600px)': {
    width: '75%',
  },
});

const stackTokens: IStackTokens = {
  childrenGap: 20,
};

const loginHeadingStyles: Partial<IStackStyles> = {
  root: {
    fontWeight: 600,
    fontSize: 23,
    fontFamily: 'Segoe UI',
  },
};

const emailInputStyles: Partial<IStackStyles> = {
  root: {
    fontSize: 20,
  },
};

const passwordResetTextStyles: ITextStyles = {
  root: {
    fontSize: 11,
  },
};

export {
  rootStyles,
  slideLeft,
  loginStylesClassname,
  stackTokens,
  loginHeadingStyles,
  emailInputStyles,
  passwordResetTextStyles,
};
