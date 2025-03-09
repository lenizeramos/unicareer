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
  cardId:
    | "category"
    | "perks"
    | "latestJob"
    | "recentApply"
    | "openPositions"
    | "featuredJob"
    | "jobUpdates";
}

interface ICards {
  icon?: React.ElementType;
  subicons?: React.ElementType;
  title?: string;
  subtitle?: string;
  text?: string;
  logo?: string;
  alt?: string;
  category?: string;
  cardId: string;
}

interface ProgressBarProps {
  totalLength: number;
  value: number;
}

export type { IButtton, ILogo, ICards, ICardId,ProgressBarProps };
