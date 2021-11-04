import { notifyError } from "../error/error";

export default {
  install(Vue) {
    Vue.prototype.$notifyError = (message) => {
      notifyError(message);
    };
  },
};