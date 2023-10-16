export const Provider: {
  GOOGLE: 'google';
} = {
  GOOGLE: 'google',
};

export type Provider = (typeof Provider)[keyof typeof Provider];
