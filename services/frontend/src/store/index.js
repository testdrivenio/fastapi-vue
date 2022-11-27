import { createStore } from "vuex";

import notes from './modules/notes';
import users from './modules/users';

export default createStore({
  modules: {
    notes,
    users,
  }
});
