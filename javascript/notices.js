const form = document.querySelector("form");
const postButton = document.querySelector(".post__button");
const modalForm = document.querySelector(".modal__form");
const overlayForm = document.querySelector(".overlay");
const cardContainer = document.querySelector(".card__container");
const deleteIcon = document.querySelector("#deleteIcon");

const title = document.querySelector("#title");
const message = document.querySelector("#message");
const myFile = document.querySelector("#myFile");

form.onsubmit = (e) => {
  e.preventDefault();
  refreshPage();
};

const refreshPage = () => {
  const xhr = new XMLHttpRequest();
  let currentUrl = window.location.href;
  let url = new URL(currentUrl);
  let page = url.searchParams.get("page");
  xhr.open("POST", "http://localhost/ptp/php/get-notices.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let data = xhr.response;
        cardContainer.innerHTML = data;
      }
    }
  };
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("page=" + page);
};

refreshPage();

postButton.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost/ptp/php/pop-up-insert.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let data = xhr.response;
        title.value = "";
        message.value = "";
        myFile.value = "";
        modalForm.classList.add("hidden");
        overlayForm.classList.add("hidden");
        swal({
          title: "NOTICE MESSAGE",
          text: data,
          icon: data === "Notice added successfully" ? "success" : "error",
        });
        refreshPage();
      }
    }
  };

  let formData = new FormData(form);
  xhr.send(formData);
});

setInterval(() => {
  const xhr = new XMLHttpRequest();
  let currentUrl = window.location.href;
  let url = new URL(currentUrl);
  let page = url.searchParams.get("page");
  xhr.open("POST", "http://localhost/ptp/php/get-notices.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let data = xhr.response;
        cardContainer.innerHTML = data;
      }
    }
  };
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("page=" + page);
}, 120000);

// SEARCH BAR

const searchBar = document.querySelector(".header__input");
searchBar.onkeyup = () => {
  let searchValue = searchBar.value;
  let currentUrl = window.location.href;
  let url = new URL(currentUrl);
  let page = url.searchParams.get("page");
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost/ptp/php/search.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let data = xhr.response;
        cardContainer.innerHTML = data;
      }
    }
  };
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("search=" + searchValue + "&page=" + page);
};