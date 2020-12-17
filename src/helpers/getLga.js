import lgas from "../utils/constants/lgas.json";

const getLga = (stateID) => {
  return lgas.filter((el) => el.state_id === stateID);
};

export default getLga;
