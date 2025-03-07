interface IButtton {
  text: string;
  IsWhite: boolean;
  width?: string;
}

interface ILogo {
  logoSize?: number;
  fontSize?: string;
}

interface ICardId {
  cardId: "category" | "perks";
}

interface ICards {
  icon?: React.ElementType;
  subicons?: React.ElementType;
  title?: string;
  subtitle?: string;
  text?: string;
}
export type { IButtton, ILogo, ICards, ICardId };
