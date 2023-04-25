type Action = {
  type: string;
};

export type BasicAction = Action & {
  value: number;
};

export const CLICK_CELL = "clickCell";
