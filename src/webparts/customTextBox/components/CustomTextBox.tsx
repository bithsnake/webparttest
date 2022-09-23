import * as React from "react";
import styles from "./CustomTextBox.module.scss";
import { ICustomTextBoxProps } from "./ICustomTextBoxProps";
// import { escape } from "@microsoft/sp-lodash-subset";
import { RichText, } from "@pnp/spfx-controls-react/lib/RichText";
import {IPropertyPaneConfiguration,PropertyPaneTextField} from "@microsoft/sp-property-pane"
// import * as $ from "jquery";
// StyleOptions, IRichTextProps 

// interface IMessage {
//   message: string;
// }
/**
 * 
 * using jquery to select a class with wildcard
 * 
 * $("[class^='group1-']").click(function () {
    var groupNumber = $(this).attr('class').split('-')[1];
    alert('Yep, you clicked group1-' + groupNumber); 
});

 */
// #6A0DAD purple color
const elementId: string = "_chosencolor";
export default class CustomTextBox extends React.Component<ICustomTextBoxProps, {}> {
  // private onTextChange = (newText: string) => {
    //   newText = newText.replace(" bold ", " <strong>bold</strong> ");
    //   this.props.bgColor = newColor;
    //   return newText;
    // }
  
  public textBoxElementId: string = "_textBoxId";
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  public richTextId = "richTextId";
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  componentDidMount(){
    (document.getElementById(elementId) as HTMLInputElement).value = "#";
    document.getElementById("input-form").classList.add("hide-form");
  }
  
  public render(): React.ReactElement<ICustomTextBoxProps> {

    let currentBackgroundColor: string = "white";
    let toggleShowExtraOptions: boolean = false;

    const {
      hasTeamsContext,
      bgColor,
    } = this.props;
    
      const ChangeBackgGroundColor = (): void => {
      this.setState({ bgColor: currentBackgroundColor });
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
    
    return (
      <section>
        <div>
        
          <button className="cursor-pointer" onClick={ToggleShowExtraOptions}>
            Show extra options
          </button>

            <div style={{display: "none"}} className="hide-form" id="input-form">
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

        </div>

        <div className={`${styles.customTextBox} ${hasTeamsContext ? styles.teams : ""}`}>
            <div id={this.textBoxElementId} className={styles.welcome} style={{ backgroundColor: bgColor, color: "black" }}>
              <RichText value={this.props.value} isEditMode={true} />
            </div>
        </div>
        
      </section>
    );
  }
}

// export class ValidationError extends React.Component<IMessage, {}>{
//   public render() {
//     return (
//       <div>this is not a proper HTML color code</div>
//     )
//   }
// }