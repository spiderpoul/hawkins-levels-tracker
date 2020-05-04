import { LEVELS_TYPES } from "./models";

export const LEVELS_VALUES: {[key in keyof typeof LEVELS_TYPES]: number} = {
  Shame: 20,
  Guilt: 30,
  Apathy: 50,
  Grief: 75,
  Fear: 100,
  Desire: 125,
  Anger: 150,
  Pride: 175,
  Courage: 200,
  Neutrality: 250,
  Willingness: 310,
  Acceptance: 350,
  Reason: 400,
  Love: 500,
  Joy: 540,
  Peace: 600,
  Enlightenment: 700,
}