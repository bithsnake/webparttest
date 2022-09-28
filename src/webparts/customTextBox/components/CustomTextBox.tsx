import * as React from "react";
import styles from "./CustomTextBox.module.scss";
import { ICustomTextBoxProps } from "./ICustomTextBoxProps";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";

export default class CustomTextBox extends React.Component<ICustomTextBoxProps, {}> {
  private textBoxText: string = "";
  private backgroundColor: string | void = "";
  private currentBackgroundColor: string = "white";

  public SetColor(): void {
    this.backgroundColor = this.currentBackgroundColor;
    document.documentElement.style.setProperty('--backgroundColor', this.backgroundColor);
  }
  
  public PageIsInEditMode = (): boolean => {
    const isInEditMode = document.location.href.indexOf('Mode=Edit');
    return isInEditMode === 1 ? true : false;
  }

  override componentDidMount(): void {
    this.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--backgroundColor');
  }

  override componentDidUpdate(prevProps : ICustomTextBoxProps) : void {
    if (this.props.bgColor !== prevProps.bgColor) {
      document.documentElement.style.setProperty('--backgroundColor', this.props.bgColor as string);
    }
  }

  public render(): React.ReactElement<ICustomTextBoxProps> {    
    // Sharepoint Pane properties
    const {
      hasTeamsContext,
      bgColor,
      htmlContent,
      changeHtmlContent,
      isInEditMode,
    } = this.props;

    this.backgroundColor = bgColor;
  
    // changes the the variable that holds the value for the background color
    document.documentElement.style.setProperty('--backgroundColor', bgColor);

     const onTextChange = (newText: string): string => {
      newText = newText.replace(" bold ", " <strong>bold</strong> ");
      newText = newText.replace(" italic ", " <i>italic</i> ");
      this.textBoxText = newText;
       /* eslint-disable */
      changeHtmlContent(this.textBoxText);
      return newText;
    }

    return (
      <>
        <section>
          <div className={`${styles.customTextBox} ${hasTeamsContext ? styles.teams : ""}`}>

              <RichText
                className={styles.customBackgroundColor}
                onChange={(text: string) => onTextChange(text)}
                value={htmlContent}
                isEditMode={isInEditMode}/>
          </div>
        </section>
      </>
    );
  
  }
}