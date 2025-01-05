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



const onClickShowForm = () => {
  movieModal.classList.remove("d-none");
  backdrop.classList.remove("d-none");
};

const onremove = () => {
  movieArr.classList.remove("d-none");
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