export type TW_BaseColorName =
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose";

export type TW_BaseShade =
    | 50
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900;

export type TW_Color = `${TW_BaseColorName}-${TW_BaseShade}`;

export type TW_Opacity = `${number}`;

export type TW_ColorWithOpacity = `${TW_Color}/${TW_Opacity}`;

export type TW_SemanticColor =
    | "foreground"
    | "background"
    | "border"
    | "accent"
    | "accent-foreground"
    | "muted"
    | "muted-foreground"
    | "primary"
    | "primary-foreground"
    | "secondary"
    | "secondary-foreground"
    | "destructive"
    | "destructive-foreground";

export type TW_ArbitraryColor = `[${string}]`;

export type TW_SimpleColor = "black" | "white" | "transparent";

// Allow opacity versions like "white/50"
export type TW_SimpleColorWithOpacity = `${TW_SimpleColor}/${number}`;

export type Color =
    | TW_SimpleColor
    | TW_SimpleColorWithOpacity
    | TW_Color
    | TW_ColorWithOpacity
    | TW_SemanticColor
    | TW_ArbitraryColor;
