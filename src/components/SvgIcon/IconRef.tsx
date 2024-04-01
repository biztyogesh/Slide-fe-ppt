import PlusCircleSVG from "./Icons/PlusCircle";
import ArrowDownSVG from "./Icons/ArrowDown";
import DeleteSVG from "./Icons/Delete";
import EditSVG from "./Icons/Edit";
import CaretUpSVG from "./Icons/CaretUp";
import CaretDownSVG from "./Icons/CaretDown";
import CrossSVG from "./Icons/Cross";
import EyeSVG from "./Icons/EyeIcon";
import Hamburger from "./Icons/Hamburger";
import NewEdit from "./Icons/NewEdit";
import PNGtoSVG from "./Icons/PNGtoSVG";

export enum CUSTOM_SVG_ICON {
  PlusCircle = "PlusCircleSVG",
  ArrowDown = "ArrowDownSVG",
  Delete = "DeleteSVG",
  Edit = "EditSVG",
  CaretUp = "CaretUpSVG",
  CaretDown = "CaretDownSVG",
  Cross = "CrossSVG",
  EyeSVG = "EyeSVG",
  Hamburger = "Hamburger",
  NewEdit = "NewEdit",
  PNGtoSVG = "PNGtoSVG"
}

export const CustomIconRef: any = {
  [CUSTOM_SVG_ICON.PlusCircle]: PlusCircleSVG,
  [CUSTOM_SVG_ICON.ArrowDown]: ArrowDownSVG,
  [CUSTOM_SVG_ICON.Delete]: DeleteSVG,
  [CUSTOM_SVG_ICON.Edit]: EditSVG,
  [CUSTOM_SVG_ICON.CaretUp]: CaretUpSVG,
  [CUSTOM_SVG_ICON.CaretDown]: CaretDownSVG,
  [CUSTOM_SVG_ICON.Cross]: CrossSVG,
  [CUSTOM_SVG_ICON.EyeSVG] : EyeSVG,
  [CUSTOM_SVG_ICON.Hamburger] : Hamburger,
  [CUSTOM_SVG_ICON.NewEdit] : NewEdit,
  [CUSTOM_SVG_ICON.PNGtoSVG] : PNGtoSVG
};