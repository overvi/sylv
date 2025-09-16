const navigation = document.getElementsByTagName("nav")[0];

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 10) {
    navigation.parentElement.classList.add("stick-top");
  } else {
    navigation.parentElement.classList.remove("stick-top");
  }
});

const openMenuBtn = document.getElementById("open-res-menu");
const responsiveMenu = document.getElementById("responsive-menu");
const closeMenu = document.getElementById("close-res-menu");

function openMenuHandler() {
  responsiveMenu.classList.replace("top-full", "top-0");

  document.body.classList.add("overflow-hidden");
}

openMenuBtn.addEventListener("click", openMenuHandler);

function closeMenuHandler() {
  responsiveMenu.classList.replace("top-0", "top-full");

  document.body.classList.remove("overflow-hidden");
}

closeMenu.addEventListener("click", closeMenuHandler);

const openServicesMenu = document.getElementById("open-services-res-menu");
let servicesIsOpen = false;

function openServicesMenuHandler(e) {
  const servicesMenu = document.getElementById("services-res-menu");
  if (servicesIsOpen) {
    e.currentTarget.style.gap = "14px";
    e.currentTarget.style.fontWeight = "400";
    servicesIsOpen = false;
  } else {
    e.currentTarget.style.gap = "56px";
    e.currentTarget.style.fontWeight = "700";
    servicesIsOpen = true;
  }
  servicesMenu.classList.toggle("hidden");
  e.currentTarget.lastElementChild.classList.toggle("rotate-90");
}

openServicesMenu.addEventListener("click", openServicesMenuHandler);

// Choose Language

const chooseLanguageBtn = document.getElementById("choose-language");
const languageFaBtn = document.getElementById("language-fa");
const languageEnBtn = document.getElementById("language-en");

let language = "fa";

function getLanguageLocalstorge() {
  // Get Language Data From Localhost
  return "fa";
}

function languageHandler() {
  if (!language) {
    language = getLanguageLocalstorge();
  } else {
    if (language === "fa") {
      languageFaBtn.style.color = "white";
    } else {
      chooseEnLanguage(languageFaBtn);
    }
  }
}

languageHandler();

function chooseFaLanguage(e) {
  const elementFa = e.currentTarget ? e.currentTarget : e;
  elementFa.firstElementChild.style.transform = "translateX(0px)";
  elementFa.firstElementChild.style.color = "white";
  languageEnBtn.firstElementChild.style.transform = "translateX(0px)";
  languageEnBtn.firstElementChild.style.color = "black";
  chooseLanguageBtn.firstElementChild.style.transform = "translateX(0px)";
  chooseLanguageBtn.style.left = "0px";
}

languageFaBtn.addEventListener("click", chooseFaLanguage);

function chooseEnLanguage(e) {
  const elementEn = e.currentTarget ? e.currentTarget : e;
  elementEn.firstElementChild.style.transform = "translateX(-22px)";
  elementEn.firstElementChild.style.color = "white";
  languageFaBtn.firstElementChild.style.transform = "translateX(0px)";
  languageFaBtn.firstElementChild.style.color = "black";
  chooseLanguageBtn.firstElementChild.style.transform = "translateX(0px)";
  chooseLanguageBtn.style.left = "33px";
}

languageEnBtn.addEventListener("click", chooseEnLanguage);

// Selector Box

const selector = document.querySelectorAll("input.selector");

function openSelectBoxHandler(event, id, selectBoxData = []) {
  const input = event.currentTarget;
  const sliderBox = input.nextElementSibling;
  const { left, top, width } = input.getBoundingClientRect();

  sliderBox.setAttribute("data-id", id);
  sliderBox.style.width = `${width}px`;
  sliderBox.style.left = `${left}px`;
  sliderBox.style.top = `${top + 50 + window.scrollY}px`;
  sliderBox.style.visibility = "visible";
  sliderBox.style.opacity = "1";

  sliderBox.classList.add("active-selector");

  if (!sliderBox.dataset.bound) {
    sliderBox.addEventListener("mousedown", (optionElement) => {
      const liItem = optionElement.target;
      if (liItem.tagName !== "LI") return;

      if (liItem.dataset.explain) {
        showTooltip(liItem, input, selectBoxData, id);
      }

      if (input.multiple) {
        const existingIdx = selectBoxData.findIndex(
          (item) => item.li === liItem
        );

        if (liItem.classList.contains("selected")) {
          liItem.classList.remove("selected", "border-orange-base");
          if (existingIdx > -1) selectBoxData.splice(existingIdx, 1);
        } else {
          liItem.classList.add("selected", "border-orange-base");
          if (!liItem.dataset.explain) {
            if (existingIdx === -1)
              selectBoxData.push({ li: liItem, value: liItem.textContent });
          }
        }

        input.value = selectBoxData.map((i) => i.value).join(", ");
      } else {
        if (input.getAttribute("data-explain") && !liItem.dataset.explain) {
          input.value = liItem.textContent;

          input.classList.remove("active-selector")
          closeSelectBoxHandler(input, id);
        } else if (!liItem.dataset.explain) {
          input.value = liItem.textContent;
        }
      }
    });

    sliderBox.dataset.bound = true;
  }

  document.body.appendChild(sliderBox);
}

function closeSelectBoxHandler(e, id) {
  const sliderBox = document.querySelector(`[data-id="${id}"]`);
  if (!sliderBox) return;

  console.log(sliderBox);
  sliderBox.style.visibility = "hidden";
  sliderBox.style.opacity = "0";
  sliderBox.classList.remove("active-selector");

  if (e instanceof HTMLElement) {
    e.insertAdjacentElement("afterend", sliderBox);
  } else {
    e.currentTarget.insertAdjacentElement("afterend", sliderBox);
  }
}

Array.from(selector).map((element) => {
  const makeId = Math.random();
  if (element.multiple || element.getAttribute("data-explain")) {
    const selectBoxData = [];
    element.addEventListener("click", (e) => {
      if (element.classList.contains("active-selector")) {
        closeSelectBoxHandler(e, makeId);
        element.classList.remove("active-selector");
      } else {
        openSelectBoxHandler(e, makeId, selectBoxData);
        element.classList.add("active-selector");
      }
    });
  } else {
    element.addEventListener("focus", (e) => openSelectBoxHandler(e, makeId));
    element.addEventListener("blur", (e) => closeSelectBoxHandler(e, makeId));
  }
});

function showTooltip(li, input, selectBoxData, id) {
  const existing = li.querySelector(".tooltip-input");
  if (existing) return;

    const label = li.dataset.explain

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip-input";
  tooltip.innerHTML = `
    <label for=${label}>${label}</label>
    <input id=${label} type="text" placeholder="وارد کنید..." />
    <button>ذخیره</button>
  `;

  li.appendChild(tooltip);

  requestAnimationFrame(() => tooltip.classList.add("show"));

  const tooltipInput = tooltip.querySelector("input");
  const saveBtn = tooltip.querySelector("button");

  tooltipInput.focus();

  if (li.dataset.explainText) tooltipInput.value = li.dataset.explainText;

  saveBtn.addEventListener("click", () => {
    li.dataset.explainText = tooltipInput.value;

    const idx = selectBoxData.findIndex((item) => item.li === li);

    if (idx > -1) {
      selectBoxData[idx].value = tooltipInput.value;
    } else {
      selectBoxData.push({ li, value: tooltipInput.value });
    }

    input.value = selectBoxData.map((i) => i.value).join(", ");
    input.classList.remove("active-selector")
    closeSelectBoxHandler(input, id);

    tooltip.remove();
  });

  document.addEventListener(
    "click",
    (e) => {
      if (!li.contains(e.target)) {
        tooltip.remove();
      }
    },
    { once: true }
  );
}

const inpus = document.querySelectorAll(
  "input[type='text'], input[type='email'], input[type='number']"
);
Array.from(inpus).map((element) => {
  element?.addEventListener("focus", (element) => {
    element.currentTarget.placeholder = "...";
  });
  element?.addEventListener("blur", (element) => {
    element.currentTarget.placeholder = "تایپ کنید...";
  });
});

document.addEventListener("click", (e) => {
  const activeInput = document.querySelector("input.selector.active-selector");
  const activeBox = document.querySelector("ul[data-id].active-selector");

  if (
    activeInput &&
    activeBox &&
    activeInput.multiple &&
    !activeInput.contains(e.target) &&
    !activeBox.contains(e.target)
  ) {
    activeInput.classList.remove("active-selector");
    activeBox.style.visibility = "hidden";
    activeBox.style.opacity = "0";
    activeBox.classList.remove("active-selector");
    activeInput.insertAdjacentElement("afterend", activeBox);
  }
});
