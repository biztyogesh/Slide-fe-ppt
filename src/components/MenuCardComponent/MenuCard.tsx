import SvgIcon, { SVGType } from "components/SvgIcon";
import "./style.scss";

function MenuCard({ title, desc, isBlur, svg, onClick }: any) {
  return (
    <div className={`${isBlur ? "blur-card" : "card"} flex flex-column flex-justify-center flex-align-center width-15 height-50`} onClick={onClick}>
      <div className="flex flex-column flex-justify-between flex-align-center height-60">
        {<SvgIcon svgType={SVGType.SEMANTIC} name={svg} size="big" />}
        <div className="flex flex-column flex-align-center ">
          <span className="card-title flex">{title}</span>
         
          <span className="card-text flex">{desc}</span>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;