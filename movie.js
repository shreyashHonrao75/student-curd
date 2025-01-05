const cl = console.log;

const cardContainer = document.getElementById('cardContainer');
const movieAddBtn = document.getElementById('movieAddBtn');

const movieModal = document.getElementById('movieModal');
const backdrop = document.getElementById('backdrop');
const closeIconBtn = [...document.querySelectorAll('.closeIconBtn')];

const movieForm = document.getElementById('movieForm');
const addBtn = document.getElementById('addBtn');

const movieTitleControl = document.getElementById('movieTitle');
const ImgUrlControl = document.getElementById('ImgUrl');
const overviewControl = document.getElementById('overview');
const MovieratingControl = document.getElementById('Movierating');
const containerF = document.getElementById('containerF');


let movieArr = JSON.parse(localStorage.getItem('movieArr')) || [
  {
    movieTitle: "Everything Everywhere All At Once",
    imageUrl:
      "https://cdn-dkepej.nitrocdn.com/xHPizjaXJNONuYnLnfsGSUCsMnIlzOEq/assets/images/optimized/rev-ef469ea/blog.frame.io/wp-content/uploads/2022/04/B0443-featured-image-1-2048x1152.jpg",
    rating: 4.5,
    overview:
      "An exhausted Chinese American woman is swept up in an insane adventure, where she alone can save the world by exploring other universes connected with the lives she could have led.",
    movieId: "1",
  },
  {
    movieTitle: "The Batman",
    imageUrl:
      "https://m.media-amazon.com/images/I/71YITH5YtwL._AC_UF1000,1000_QL80_.jpg",
    rating: 4,
    overview:
      "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing the serial killer known as the Riddler.",
    movieId: "2",
  },
  {
    movieTitle: "Top Gun: Maverick",
    imageUrl:
      "https://www.tallengestore.com/cdn/shop/products/TopGunMaverick-TomCruise-HollywoodMovieGraphicPoster_5249b2a8-ac25-4e51-94bb-0047af2ed641.jpg?v=1673605573",
    rating: 4.7,
    overview:
      "After more than thirty years of service as one of the Navy's top aviators, Pete 'Maverick' Mitchell is where he belongs, pushing the envelope as a courageous test pilot.",
    movieId: "3",
  },
  {
    movieTitle: "Avatar: The Way of Water",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNmQxNjZlZTctMWJiMC00NGMxLWJjNTctNTFiNjA1Njk3ZDQ5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: 4.3,
    overview:
      "Jake Sully and Ney'tiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora.",
    movieId: "4",
  },
  {
    movieTitle: "Guardians of the Galaxy Vol. 3",
    imageUrl:
      "https://m.media-amazon.com/images/I/71VANA9wdCL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.5,
    overview:
      "The Guardians must protect one of their own while dealing with past traumas and new threats that arise in their journey.",
    movieId: "5",
  },
  {
    movieTitle: "Dune: Part Two",
    imageUrl:
      "https://sm.ign.com/ign_in/cover/d/dune-part-/dune-part-two_c118.jpg",
    rating: 4.6,
    overview:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.",
    movieId: "6",
  },
  {
    movieTitle: "Barbie",
    imageUrl:
      "https://variety.com/wp-content/uploads/2023/04/Fs3wHN8akAAJF08.jpeg?w=800",
    rating: 4.2,
    overview:
      "After being expelled from Barbieland for not being perfect enough, Barbie sets off on a journey of self-discovery in the real world.",
    movieId: "7",
  },
  {
    movieTitle: "Killers of the Flower Moon",
    imageUrl:
      "https://www.broadcastprome.com/wp-content/uploads/2023/10/Killers-of-the-flower-moon.jpg",
    rating: 4.4,
    overview:
      "In 1920s Oklahoma, members of the Osage Nation are murdered under mysterious circumstances, leading to an FBI investigation.",
    movieId: "8",
  },
  {
    movieTitle: "Spider-Man: Across the Spider-Verse",
    imageUrl:
      "https://i.pinimg.com/736x/d7/d3/5c/d7d35c40aa5bf6d2cf925b2757b07837.jpg",
    rating: 4.8,
    overview:
      "Miles Morales returns for the next chapter of the Spider-Verse saga, facing new challenges and meeting new allies across dimensions.",
    movieId: "9",
  },
  {
    movieTitle: "Mission Impossible – Dead Reckoning Part One",
    imageUrl: "https://i.ytimg.com/vi/avz06PDqDbM/maxresdefault.jpg",
    rating: 4.5,
    overview:
      "Ethan Hunt and his IMF team embark on their most dangerous mission yet as they race against time to prevent a global catastrophe.",
    movieId: "10",
  },
  {
    movieTitle: "The Marvels",
    imageUrl:
      "https://cdn.marvel.com/content/1x/goatrodeo_pay1_pre-sunrise_ka_v4_lg.jpg",
    rating: 5.5,
    overview:
      "Carol Danvers gets her powers entangled with those of Kamala Khan and Monica Rambeau, forcing them to work together to save the universe.",
    movieId: "11",
  },
  {
    movieTitle: "Wonka",
    imageUrl:
      "https://deadline.com/wp-content/uploads/2023/11/WONKA_INSTA_VERT_MAIN_1638x2048_DOM.jpg?w=800",
    rating: 7.0,
    overview:
      "With dreams of opening a shop in a city renowned for its chocolate, a young and poor Willy Wonka discovers that the industry is run by a cartel of greedy chocolatiers.",
    movieId: "12",
  },
];

const generateUuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
    const random = (Math.random() * 16) | 0;
    const value = character === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
};

const cardTemplate = (array = movieArr) => {
  result = "";
  array.forEach((movie) => {
    result += `
                    <div class="col-md-3 mb-mt">
                        <div class="card border-0">
                            <figure class="movieCard">
                                <img
                                    src="${movie.imageUrl}"
                                    alt="poster"
                                    class="movieImg"
                                    title="poster"
                                />
                                <figcaption>
                                    <div class="titleInfo">
                                        <div class="row mt-2 border border-light">
                                            <div class="col-sm-10 p-0">
                                            <h4 class="heading">${movie.movieTitle}</h4>
                                            </div>
                                            <div class="col-sm-2 text-center p-0">
                                            <span class="rating border border-light">${movie.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="overview">
                                            <h5>${movie.movieTitle}</h5>
                                            <p>
                                            ${movie.overview}
                                            </p>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                `;
  });

  cardContainer.innerHTML = result;
};
cardTemplate(movieArr);

const onClickShowForm = () => {
  movieModal.classList.remove("d-none");
  backdrop.classList.remove("d-none");
};

const onClickCloseForm = () => {
  movieModal.classList.add("d-none");
  backdrop.classList.add("d-none");
};

const onSubmitAddMovie = (eve) => {
    eve.preventDefault()
  let objNew = {
          movieTitle: movieTitleControl.value,
          imageUrl: ImgUrlControl.value,
          rating: MovieratingControl.value,
          overview: overviewControl.value,
          movieId: generateUuid(),
  };
  cl(objNew);
  movieArr.unshift(objNew)
localStorage.setItem("movieArr", JSON.stringify(movieArr));
const divCol = document.createElement('div')
divCol.className = `col-md-3 mb-mt`;
divCol.innerHTML =
                    `
                      <div class="card border-0">
                        <figure class="movieCard">
                          <img
                              src="${objNew.imageUrl}"
                              alt="poster"
                              class="movieImg"
                              title="poster"
                          />
                          <figcaption>
                              <div class="titleInfo">
                                  <div class="row mt-2 border border-light">
                                      <div class="col-sm-10 p-0">
                                        <h4 class="heading">${objNew.movieTitle}</h4>
                                      </div>
                                      <div class="col-sm-2 text-center p-0">
                                        <span class="rating border border-light">${objNew.rating}</span>
                                      </div>
                                  </div>
                              </div>
                              <div class="overview">
                                <h5>${objNew.movieTitle}</h5>
                                <p>
                                ${objNew.overview}
                                </p>
                              </div>
                          </figcaption>
                        </figure>
                      </div>
                    `;

cardContainer.prepend(divCol);
movieForm.reset()
onClickCloseForm()
};

movieAddBtn.addEventListener("click", onClickShowForm);
closeIconBtn.forEach((IconBtn) => IconBtn.addEventListener("click", onClickCloseForm));
movieForm.addEventListener("submit", onSubmitAddMovie);