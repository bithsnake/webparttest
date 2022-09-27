import * as React from "react";
import styles from "./CustomTextBox.module.scss";
import { ICustomTextBoxProps } from "./ICustomTextBoxProps";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";

// const elementId: string = "_chosencolor";
export default class CustomTextBox extends React.Component<ICustomTextBoxProps, {}> {

  public textBoxElementId: string = "_textBoxId";
  public richTextId : string = "richTextId";
  public textBoxText: string = "";
  public backgroundColor: string | void = "";
  public htmlContent : string;
  public currentBackgroundColor: string = "white";

  public SetColor(): void {
    this.backgroundColor = this.currentBackgroundColor;
    document.documentElement.style.setProperty('--backgroundColor', this.backgroundColor);
  }
  
  public PageIsInEditMode = (): boolean => {
    console.log("is in edit mode: ", document.location.href.indexOf('Mode=Edit') !== 1);
    return document.location.href.indexOf('Mode=Edit') !== 1;
  }

  componentDidMount(): void {
    this.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--backgroundColor');
  }

  componentDidUpdate(prevProps : ICustomTextBoxProps) : void {
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
    } = this.props;

    // toggle show options
    // let toggleShowExtraOptions: boolean = false;
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

    // const ChangeBackgGroundColorKeyDownHandler = (): void => this.SetColor();
    
    // const ChangeBackgroundColorClickHandler = (): void => {
    //   this.backgroundColor = this.currentBackgroundColor;
    //   document.documentElement.style.setProperty('--backgroundColor', this.backgroundColor);
    // };

    // /** Returns the typed in color in the input field*/
    // const ChosenColor = (): void => {
    //   const InputElement: HTMLInputElement = document.getElementById(elementId) as HTMLInputElement;
    //   this.currentBackgroundColor = InputElement.value;
    //   console.log("Changed color from ChosenColor: ", this.currentBackgroundColor);
    // }
    
    // function ToggleShowExtraOptions(): void {
    //   toggleShowExtraOptions = !toggleShowExtraOptions;
    //   document.getElementById("input-form").style.display = toggleShowExtraOptions ? "block" : "none";
    // }
    
    // Edit color on webpart box
  //   const editBoxElement = <div id="edit-background-color">
  //   <button className="cursor-pointer" onClick={ToggleShowExtraOptions}>
  //     Show extra options
  //   </button>
  
  //   <div style={{ display: "none" }} className="hide-form" id="input-form">
  //     <h2> Change background color</h2>
  //       <input
          
  //       defaultValue={"#6A0DAD"}
  //       placeholder="#6A0DAD"
  //       title="this is not a proper HTML color code"
  //       pattern="^#(?:[0-9a-fA-F]{3}){1,2}$"
  //       id={elementId}
  //       type="changecolor"
  //         onChange={ChosenColor}
  //         onKeyDown={ChangeBackgGroundColorKeyDownHandler}
  //     />
  //     <button onClick={ChangeBackgroundColorClickHandler}>Set new BG Color</button>
  //   </div>
  // </div>;
  
    return (
      <>
        {/* {this.PageIsInEditMode() ? editBoxElement : <></>} */}
        <section>
          <div className={`${styles.customTextBox} ${hasTeamsContext ? styles.teams : ""}`}>
              <RichText
                className={styles.customBackgroundColor}
                onChange={(text: string) => onTextChange(text)}
                value={htmlContent}
                isEditMode={true}/>
          </div>
        </section>
      </>
    );
  
  }
}