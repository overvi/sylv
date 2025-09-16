const swiper = new Swiper(".mySwiper", {
  spaceBetween: 20,
  allowTouchMove: false,
  speed: 700,
  effect: "slide",
  pagination: false,
});

const nextBtn = document.getElementById("swiper-next-btn");
const prevBtn = document.getElementById("swiper-back-btn");

const tickSvg = `
          <svg
            width="32"
            height="22"
            viewBox="0 0 32 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 11L11.3224 20L30 2"
              stroke="white"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        `;

function getFormData(currentIndex) {
  const slides = swiper.slides;
  const formElement = slides[currentIndex].firstElementChild;
  
  return Array.from(formElement.querySelectorAll("input, select, textarea"))
    .filter(el => !el.closest(".tooltip-input")); 
}

function formTitleHandler(currentIndex) {
  const formTitle = document.getElementById(`form-slide-${currentIndex}`);
  const formTitleFirstChild = formTitle.firstElementChild;
  formTitleFirstChild.style.backgroundColor = `${formTitleFirstChild.dataset.disable}`;

  formTitleFirstChild.innerHTML = tickSvg;

  const formTitleTextChild = formTitle.lastElementChild;
  formTitleTextChild.style.color = "#737373";

  const nextFormTitleChild = formTitle.nextElementSibling.firstElementChild;
  const nextFormTextChild = formTitle.nextElementSibling.lastElementChild;
  nextFormTitleChild.style.backgroundColor = `${nextFormTitleChild.dataset.enable}`;
  nextFormTextChild.style.color = "black";
  if (window.innerWidth < 1024) {
    formTitleTextChild.style.visibility = "hidden";
    nextFormTextChild.style.visibility = "visible";
  }
}

function completeLastFormTitle() {
  const formTitle = document.getElementById(`form-slide-5`);
  const formAllTitle = document.querySelectorAll(`[data-enable]`);
  formTitle.firstElementChild.innerHTML = tickSvg;
  Array.from(formAllTitle).map((element) => {
    element.style.backgroundColor = `${element.dataset.enable}`;
    element.nextElementSibling.style.color = "black";
  });
  const swiperBtnsContainer = document.getElementById("swiper-btns");
  swiperBtnsContainer.style.display = "none";
}

nextBtn.addEventListener("click", (e) => {
  const currentIndex = swiper.realIndex;

  if (currentIndex === 0) {
    const backBtn = document.getElementById("swiper-back-btn");
    backBtn.classList.remove("disable-btn");
  }

  if (currentIndex === 3) {
    e.currentTarget.textContent = "Submit";
    e.currentTarget.nextElementSibling.innerHTML = `<span class="text-orange-base">Click</span> to register information <span class="text-orange-base">!</span>`;
  }

  if (currentIndex === 4) {

    const fetchData = true;

    if (fetchData) {
      completeLastFormTitle();
      swiper.slideNext();
    }

    return;
  }

  const formData = getFormData(currentIndex);

  console.log(formData.map(a => a.value))
  const checkFormData = formData.every(
    (element) => element.value && element.validity.valid
  );

  if (checkFormData) {
    formTitleHandler(currentIndex + 1);
    swiper.slideNext();
  } else {
    alert("لطفا تمامی فیلد ها رو کامل کنید !");
  }
});

function previousFormTitleHandler(currentIndex) {
  const formTitle = document.getElementById(`form-slide-${currentIndex}`);
  const formTitleFirstChild = formTitle.firstElementChild;
  formTitleFirstChild.style.backgroundColor = `${formTitleFirstChild.dataset.disable}`;
  formTitleFirstChild.innerHTML = currentIndex;

  const formTitleTextChild = formTitle.lastElementChild;
  formTitleTextChild.style.color = "#737373";

  const previousFormTitleChild =
    formTitle.previousElementSibling.firstElementChild;
  const previousFormTextChild =
    formTitle.previousElementSibling.lastElementChild;
  previousFormTitleChild.style.backgroundColor = `${previousFormTitleChild.dataset.enable}`;
  previousFormTextChild.style.color = "black";
  if (window.innerWidth < 1024) {
    formTitleTextChild.style.visibility = "hidden";
    previousFormTextChild.style.visibility = "visible";
  }
}

prevBtn.addEventListener("click", (e) => {
  const currentIndex = swiper.realIndex;

  if (currentIndex === 1) e.currentTarget.classList.add("disable-btn");
  else if (currentIndex === 0) return;

  previousFormTitleHandler(currentIndex + 1);
  swiper.slidePrev();
});
