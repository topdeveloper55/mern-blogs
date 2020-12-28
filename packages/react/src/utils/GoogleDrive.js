// import { google } from 'googleapis';

// const { REACT_APP_GOOGLE_OAUTH2, REACT_APP_GOOGLE_APP_ID, REACT_APP_GOOGLE_API_KEY } = process.env;
// const scope = ['https://www.googleapis.com/auth/drive.file'];

// let pickerApiLoaded = false;
// let oauthToken;

// export function loadPicker() {
//     google.load('auth', {callback: onAuthApiLoad});
//     google.load('picker', {callback: onPickerApiLoad});
// }

// function onAuthApiLoad() {
//     window.google.auth.authorize(
//         {
//           client_id: REACT_APP_GOOGLE_OAUTH2,
//           scope: scope,
//           immediate: false
//         },
//         handleAuthResult);
//   }

//   function onPickerApiLoad() {
//     pickerApiLoaded = true;
//     createPicker();
//   }

//   function handleAuthResult(authResult) {
//     if (authResult && !authResult.error) {
//       oauthToken = authResult.access_token;
//       createPicker();
//     }
//   }

//   function createPicker() {
//     if (pickerApiLoaded && oauthToken) {
//       const view = new google.picker.View(google.picker.ViewId.DOCS);
//       view.setMimeTypes("image/png,image/jpeg,image/jpg");
//       const picker = new google.picker.PickerBuilder()
//           .enableFeature(google.picker.Feature.NAV_HIDDEN)
//           .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
//           .setAppId(REACT_APP_GOOGLE_APP_ID)
//           .setOAuthToken(oauthToken)
//           .addView(view)
//           .addView(new google.picker.DocsUploadView())
//           .setDeveloperKey(REACT_APP_GOOGLE_API_KEY)
//           .setCallback(pickerCallback)
//           .build();
//        picker.setVisible(true);
//     }
//   }

//   // A simple callback implementation.
//   function pickerCallback(data) {
//     if (data.action == google.picker.Action.PICKED) {
//       const fileId = data.docs[0].id;
//       console.log('The user selected: ' + fileId);
//     }
//   }
