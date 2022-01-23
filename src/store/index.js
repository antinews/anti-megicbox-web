import { createStore } from "vuex";

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules", true, /\.js$/);

// console.log(modulesFiles);
// modulesFiles.keys().forEach((x) => {
//   console.log(x);
//   const tp = x.replace(/^\.\/(.*)\.\w+$/, "$1");
//   console.log(tp);
//   console.log(modulesFiles(x));
// });

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  // app: {state:..}
  modules[moduleName] = { namespaced: true, ...value.default };
  return modules;
}, {});

export default createStore({
  modules,
  getters: {
    token: (state) => state.user.accessToken,
    avatar: (state) => state.user.avatar,
    name: (state) => state.user.name,
    introduction: (state) => state.user.introduction,
    roles: (state) => state.user.roles,
  },
});
