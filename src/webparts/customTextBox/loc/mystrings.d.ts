declare interface ICustomTextBoxWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'CustomTextBoxWebPartStrings' {
  const strings: ICustomTextBoxWebPartStrings;
  export = strings;
}
