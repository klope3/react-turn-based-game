const assetPath = "/src/assets";
const charPath = `${assetPath}/characters`;
const envPath = `${assetPath}/environment`;
const uiPath = `${assetPath}/ui`;

export const characters = {
  player: `${charPath}/player.png`,
  melee: `${charPath}/melee.png`,
  archer: `${charPath}/archer.png`,
  bomber: `${charPath}/bomber.png`,
};

export const environment = {
  groundRock1: `${envPath}/ground_rock1.png`,
  objRock1: `${envPath}/obj_rock1.png`,
  bomb: `${envPath}/bomb.png`,
  explosionBlue1: `${envPath}/explosion_blue_1.png`,
  explosionBlue2: `${envPath}/explosion_blue_2.png`,
};

export const ui = {
  heartFull: `${uiPath}/heart_full.png`,
  heartEmpty: `${uiPath}/heart_empty.png`,
};
