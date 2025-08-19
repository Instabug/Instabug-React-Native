export type ThemeConfig = {
  // Colors
  primaryColor?: string;
  backgroundColor?: string;
  titleTextColor?: string;
  subtitleTextColor?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  callToActionTextColor?: string;
  headerBackgroundColor?: string;
  footerBackgroundColor?: string;
  rowBackgroundColor?: string;
  selectedRowBackgroundColor?: string;
  rowSeparatorColor?: string;

  // Text Styles (Android only)
  primaryTextStyle?: 'bold' | 'italic' | 'normal';
  secondaryTextStyle?: 'bold' | 'italic' | 'normal';
  titleTextStyle?: 'bold' | 'italic' | 'normal';
  ctaTextStyle?: 'bold' | 'italic' | 'normal';

  // Fonts
  primaryFontPath?: string;
  primaryFontAsset?: string;
  secondaryFontPath?: string;
  secondaryFontAsset?: string;
  ctaFontPath?: string;
  ctaFontAsset?: string;

  // Legacy properties (deprecated)
  primaryTextType?: string;
  secondaryTextType?: string;
  ctaTextType?: string;
};
