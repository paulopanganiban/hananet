// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  useEmulators: true,
  firebase: {
    apiKey: "AIzaSyCOHVD83wiUjV3r_c_JQ2E9I73CpzdPRDE",
    authDomain: "fir-sample-cd74f.firebaseapp.com",
    projectId: "fir-sample-cd74f",
    storageBucket: "fir-sample-cd74f.appspot.com",
    messagingSenderId: "425758555000",
    appId: "1:425758555000:web:204268002639031bde268d",
    measurementId: "G-LXKW2ZMCJ2"
  },
  api: {
    createUser: 'http://127.0.0.1:5001/fir-sample-cd74f/us-central1/createUser'
  }
};
