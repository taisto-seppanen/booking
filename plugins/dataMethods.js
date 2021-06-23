import firebase from "firebase/app";

export async function saveFilm(newfilm) {
  await firebase
    .database()
    .ref("films/")
    .set({ newfilm });
}

export async function getFilm() {
  let filmsArr = [];
  await firebase
    .database()
    .ref("films/")
    .get()
    .then(snapshot => {
      if (snapshot.exists()) {
        filmsArr = snapshot.val().newfilm;
      } else {
        console.warn("bad request");
      }
    });
  return filmsArr;
}

export async function getNews() {
  let newsArr = [];
  await firebase
    .database()
    .ref("news/")
    .get()
    .then(snapshot => {
      if (snapshot.exists()) {
        newsArr = snapshot.val().newsArr;
      } else console.warn("bad request");
    });
  return newsArr;
}
