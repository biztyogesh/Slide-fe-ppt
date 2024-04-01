import classNames from "classnames";
import { Loader } from "semantic-ui-react";
import "./Loading.scss";

interface Props {
  isGlobal?: boolean;
  inverted?: boolean;
  centered?: any;
}

function Loading({ isGlobal, inverted, centered }: Props) {
  return (
    <div className={classNames(["loading-container width-100 height-20", { "global height-100": isGlobal, "inverted": inverted }, {"flex flex-align-center flex-justify-center height-100" : centered}])}>
      <Loader active inline="centered" />
    </div>
  )

}
export default Loading;