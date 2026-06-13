const revealEls = document.querySelectorAll(".reveal");
const subscriptionModal = document.querySelector("[data-subscription-modal]");
const subscriptionOpeners = document.querySelectorAll("[data-subscription-open]");
const subscriptionClosers = document.querySelectorAll("[data-subscription-close]");
const phoneShowcase = document.querySelector("[data-phone-tilt]");
const phoneTabs = document.querySelectorAll("[data-phone-tab]");
const panelKicker = document.querySelector("[data-panel-kicker]");
const panelTime = document.querySelector("[data-panel-time]");
const panelCopy = document.querySelector("[data-panel-copy]");
const balanceValue = document.querySelector("[data-balance]");

const phoneStates = {
  sarif: {
    kicker: "Sarif degdeg ah",
    time: "3.8s",
    balance: "$14,830.45",
    copy:
      "Marka lacag lagaa sarifto, GAASHAAN wuxuu kaa caawinayaa in hawshaas si nadiif ah ugu socoto diris degdeg ah iyo xisaab cad."
  },
  xisaab: {
    kicker: "Xisaab maalinle ah",
    time: "Live",
    balance: "$14,812.10",
    copy:
      "Waxaad si fudud u aragtaa tirada lacagaha la sariftay, dhaqdhaqaaqa maalinta, iyo halka hawshaadu marayso."
  },
  diris: {
    kicker: "Diris aan daahin",
    time: "Diyaar",
    balance: "$14,812.10",
    copy:
      "GAASHAAN wuxuu kaa caawinayaa in lacag-diristu aysan gacantaada ku daahin marka sarifku dhaco."
  }
};

function initReveals() {
  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -48px 0px" }
  );

  revealEls.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
    observer.observe(el);
  });
}

function openSubscription() {
  subscriptionModal.classList.add("is-open");
  subscriptionModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeSubscription() {
  subscriptionModal.classList.remove("is-open");
  subscriptionModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function initSubscription() {
  if (!subscriptionModal) return;

  subscriptionOpeners.forEach((opener) => opener.addEventListener("click", openSubscription));
  subscriptionClosers.forEach((closer) => closer.addEventListener("click", closeSubscription));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && subscriptionModal.classList.contains("is-open")) {
      closeSubscription();
    }
  });
}

function initMagneticHover() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const strength = element.classList.contains("subscription-card") ? 0.04 : 0.14;

      element.style.setProperty("--mx", `${x * strength}px`);
      element.style.setProperty("--my", `${y * strength}px`);
    });

    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--mx", "0px");
      element.style.setProperty("--my", "0px");
    });
  });
}

function initPhoneTilt() {
  if (!phoneShowcase || window.matchMedia("(pointer: coarse)").matches) return;

  phoneShowcase.addEventListener("pointermove", (event) => {
    const rect = phoneShowcase.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    phoneShowcase.style.setProperty("--tilt-y", `${x * 14}deg`);
    phoneShowcase.style.setProperty("--tilt-x", `${y * -12}deg`);
  });

  phoneShowcase.addEventListener("pointerleave", () => {
    phoneShowcase.style.setProperty("--tilt-y", "0deg");
    phoneShowcase.style.setProperty("--tilt-x", "0deg");
  });
}

function setPhoneState(key) {
  const state = phoneStates[key];
  if (!state) return;

  if (phoneTabs.length) {
    phoneTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.phoneTab === key));
  }
  if (panelKicker) panelKicker.textContent = state.kicker;
  if (panelTime) panelTime.textContent = state.time;
  if (panelCopy) panelCopy.textContent = state.copy;
  if (balanceValue) balanceValue.textContent = state.balance;
}

function initPhoneDemo() {
  if (!phoneTabs.length) return;

  phoneTabs.forEach((tab) => {
    tab.addEventListener("click", () => setPhoneState(tab.dataset.phoneTab));
  });

  let index = 0;
  const keys = Object.keys(phoneStates);

  window.setInterval(() => {
    if (document.hidden) return;
    index = (index + 1) % keys.length;
    setPhoneState(keys[index]);
  }, 4200);
}

initReveals();
initSubscription();
initMagneticHover();
initPhoneTilt();
initPhoneDemo();

if (window.lucide) {
  window.lucide.createIcons();
}
