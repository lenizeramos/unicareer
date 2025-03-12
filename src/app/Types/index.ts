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
    | "dashboardCard"
    | "featuredJob"
    | "jobUpdates"
    | "latestJob"
    | "openPositions"
    | "allJobs"
    | "recentApply"
    | "recentPosted";
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
  company?: string;
  total?: number;
  cardId: string;
}

interface IProgressBarProps {
  totalLength: number;
  value: number;
}

interface ITagComp {
  bgColor?: string;
  textColor: string;
  text: string;
  borderColor?: string;
}

export type { IButtton, ILogo, ICards, ICardId, IProgressBarProps, ITagComp };
