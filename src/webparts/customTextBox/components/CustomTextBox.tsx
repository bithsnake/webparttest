import * as React from "react";
import styles from "./CustomTextBox.module.scss";
import { ICustomTextBoxProps } from "./ICustomTextBoxProps";
// import { escape } from "@microsoft/sp-lodash-subset";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";

// #6A0DAD purple color
const elementId: string = "_chosencolor";
let checkOnce: boolean = true;

export default class CustomTextBox extends React.Component<ICustomTextBoxProps, {}> {


    public textBoxElementId: string = "_textBoxId";
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    
    public richTextId = "richTextId";
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  
  // componentDidMount(): void {
  //     const editElement = document.getElementById("edit-background-color");
  //     const inputElement = (document.getElementById(elementId) as HTMLInputElement);
  //     if (inputElement === undefined || inputElement === null) {
  //       console.log("can not find input element");
  //       return;
  //     }

  //     inputElement.value = "#";
              
  //     if (this.PageIsInEditMode()) {
  //       if (editElement === undefined || editElement === null) {
  //         console.log("can not find edit element");
  //         return;
  //       }
  //         document.getElementById("edit-background-color").classList.add("hide-form");
  //     }
  //   }
  
  private PageIsInEditMode(): boolean {
    return document.location.href.indexOf('Mode=Edit') !== 1;
  }
  public render(): React.ReactElement<ICustomTextBoxProps> {

    let currentBackgroundColor: string = "white";
    let toggleShowExtraOptions: boolean = false;
    
    const {
      hasTeamsContext,
      bgColor,
    } = this.props;
    
    const ChangeBackgGroundColor = (): void => {
      this.setState(({bgColor : currentBackgroundColor}));
      // this.state = {
        //   bgColor : currentBackgroundColor
        // }
        const element = document.getElementById(this.textBoxElementId);
        element.style.backgroundColor = currentBackgroundColor;
      };
      
      /** Returns the typed in color in the input field*/
      const ChosenColor = (): void => {
        const InputElement: HTMLInputElement = document.getElementById(elementId) as HTMLInputElement;
        currentBackgroundColor = InputElement.value;
      }
      
      function ToggleShowExtraOptions(): void {
        toggleShowExtraOptions = !toggleShowExtraOptions;
        document.getElementById("input-form").style.display = toggleShowExtraOptions ? "block" : "none";
      }
      
      const editBoxElement = <div id="edit-background-color">
      <button className="cursor-pointer" onClick={ToggleShowExtraOptions}>
        Show extra options
      </button>
    
      <div style={{ display: "none" }} className="hide-form" id="input-form">
        <h2> Change background color</h2>
        <input
          defaultValue={"#6A0DAD"}
          placeholder="#6A0DAD"
          title="this is not a proper HTML color code"
          pattern="^#(?:[0-9a-fA-F]{3}){1,2}$"
          id={elementId}
          type="changecolor"
          onChange={ChosenColor}
        />
        <button onClick={ChangeBackgGroundColor}>Set new BG Color</button>
      </div>
    </div>;
    return (
      <>
        {
              checkOnce ?
            () => {
              checkOnce = false;
              const editElement = document.getElementById("edit-background-color");
              const inputElement = (document.getElementById(elementId) as HTMLInputElement);
              if (inputElement === undefined || inputElement === null) {
                console.log("can not find input element");
                return;
              }
              
              inputElement.value = "#";
              
              if (this.PageIsInEditMode()) {
                if (editElement === undefined || editElement === null) {
                  console.log("can not find edit element");
                  return;
                }
                document.getElementById("edit-background-color").classList.add("hide-form");
              }
              console.log("check once: ", checkOnce);
            }
            : editBoxElement
        }
        <section>

          <div className={`${styles.customTextBox} ${hasTeamsContext ? styles.teams : ""}`}>
              <div id={this.textBoxElementId} className={styles.welcome} style={{ backgroundColor: bgColor, color: "black" }}>
                <RichText value={this.props.value} isEditMode={true} />
              </div>
          </div>
        
      </section>
        </>
      );
    
    
  }
}