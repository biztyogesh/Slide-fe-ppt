// interface for createSlide
export interface ISlide {
  slideName: string;
  metaType: string;
  optionsMeta: string;
  chatMeta: string;
  sequence: number;
}

export interface IColorOptions {
  Color1: string;
  Color2: string;
  Color3: string;
  Color4: string;
  Color5: string;
  Color6: string;
}

export enum Align_Positions {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
}

export const DEFAULT_THEME_COLOR: IColorOptions = {
  Color1: "color1",
  Color2: "color2",
  Color3: "color3",
  Color4: "color4",
  Color5: "color5",
  Color6: "color6",
};

export enum MetaTypeOptions {
  IMAGE = "image",
  SHAPE = "shape",
  TEXT = "text",
  TABLE = "table",
  CHART = "chart",
  LIST = "list",
}

export enum TableTypes {
  DEFAULT = "deafult",
  PIVOT = "pivot"
}

export enum TableStyles {
  DEFAULT = "default",
  CUSTOM = "custom"
}

export enum Arrowtypes {
  ARROW = "arrow",
  DIAMOND = "diamond",
  OVAL = "oval",
  STEALTH = "stealth",
  TRIANGLE = "triangle",
  NONE = "none"
}

export enum ChartType {
  AREA = 'area',
  BAR = 'bar',
  BAR3D = 'bar3D',
  BUBBLE = 'bubble',
  DOUGHNUT = 'doughnut',
  LINE = 'line',
  PIE = 'pie',
  RADAR = 'radar',
  SCATTER = 'scatter',
}

export enum lineDataSymbols {
 CIRCLE = "circle", 
 DASH = "dash",
 DIAMOND = "diamond",
 DOT =  "dot",
 NONE = "none",
 SQUARE = "square",
 TRIANGLE = "triangle",
}

export enum LegendPositions {
  RIGHT = "r",
  LEFT = "l",
  BOTTOM = "b",
  TOP = "t",
  TOP_RIGHT = "tr"
}

export enum FontFace {
  CENTURY_GOTHIC = "Century Gothic",
  ARIAL_ROUNDED = "Arial Rounded MT Bold",
  ARIAL_NOVA_LIGHT = "Arial Nova Light (Body)",
  CASCADIA_CODE = "Cascadia Code SemiBold",
  ARIAL_NOVA_COND = "Arial Nova Cond"
}

export const DEFAULT_VALUES = {
  name: "",
  postfix: "",
  rules: "",
  layers: [{ metaType: "", chatMeta: {}, optionsMeta: {} }],
};

export const colorOptions = [
  { label: "Select", value: undefined },
  { label: "Color 1", value: DEFAULT_THEME_COLOR.Color1 },
  { label: "Color 2", value: DEFAULT_THEME_COLOR.Color2 },
  { label: "Color 3", value: DEFAULT_THEME_COLOR.Color3 },
  { label: "Color 4", value: DEFAULT_THEME_COLOR.Color4 },
  { label: "Color 5", value: DEFAULT_THEME_COLOR.Color5 },
  { label: "Color 6", value: DEFAULT_THEME_COLOR.Color6 },
];

export const fontFaceOptions = [
  { label: "Select", value: undefined },
  { label: "Century Gothic", value: FontFace.CENTURY_GOTHIC },
  { label: "Arial Rounded MT Bold", value: FontFace.ARIAL_ROUNDED },
  { label: "Arial Nova Light (Body)", value: FontFace.ARIAL_NOVA_LIGHT },
  { label: "Cascadia Code SemiBold", value: FontFace.CASCADIA_CODE },
  { label: "Arial Nova Cond", value: FontFace.ARIAL_NOVA_COND },
];

export const borderTypeOptions = [
  { label: "Select", value: undefined },
  { label: "None", value: "none" },
  { label: "Solid", value: "solid" },
  { label: "Dash", value: "dash" },
];
export const VAlignOptions = [
  { label: "Select", value: "" },
  { label: "Top", value: "top" },
  { label: "Middle", value: "middle" },
  { label: "Bottom", value: "bottom" },
];

export const alignOptions = [
  { label: "Select", value: undefined },
  { label: "RIGHT", value: Align_Positions.RIGHT },
  { label: "LEFT", value: Align_Positions.LEFT },
  { label: "CENTER", value: Align_Positions.CENTER },
];

export const ChartTypeOptions = [
  { label: "Select", value: "" },
  { label: "AREA", value: ChartType.AREA },
  { label: "BAR", value: ChartType.BAR },
  { label: "BAR3D", value: ChartType.BAR3D },
  { label: "BUBBLE", value: ChartType.BUBBLE },
  { label: "LINE", value: ChartType.LINE },
  { label: "PIE", value: ChartType.PIE },
  { label: "DOUGHNUT", value: ChartType.DOUGHNUT },
  { label: "RADAR", value: ChartType.RADAR },
  { label: "SCATTER", value: ChartType.SCATTER },
];

export const dataSymbolOptions = [
  { label: "NONE", value: lineDataSymbols.NONE },
  { label: "CIRCLE", value: lineDataSymbols.CIRCLE },
  { label: "DIAMOND", value: lineDataSymbols.DIAMOND },
  { label: "DOT", value: lineDataSymbols.DOT },
  { label: "DASH", value: lineDataSymbols.DASH },
  { label: "TRIANGLE", value: lineDataSymbols.TRIANGLE },
];

export const legendPositionOptions = [
  { label: "Select", value: undefined },
  { label: "BOTTOM", value: LegendPositions.BOTTOM },
  { label: "LEFT", value: LegendPositions.LEFT },
  { label: "RIGHT", value: LegendPositions.RIGHT },
  { label: "TOP", value: LegendPositions.TOP },
  { label: "TOP_RIGHT", value: LegendPositions.TOP_RIGHT },

];