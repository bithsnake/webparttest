/*no-eslint */
// export function changeHTML(text : string): void {
  
// } 

export interface ICustomTextBoxProps {
  description?: string;
  isDarkTheme?: boolean;
  environmentMessage?: string;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
  htmlContent : string;
  bgColor?: string;
  value?: string;
   /* eslint-disable */
  changeHtmlContent : Function
}
