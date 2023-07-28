export const CHANGE_LOGGING = "CHANGE_LOGGING";

export const changeLogging = (data) => {
  return {
    type: CHANGE_LOGGING,
    payload: { data },
  };
};


