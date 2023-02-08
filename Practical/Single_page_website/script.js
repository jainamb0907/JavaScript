document.querySelectorAll('#nav-tab>[data-bs-toggle="tab"]').forEach((el) => {
  el.addEventListener("shown.bs.tab", () => {
    const target = el.getAttribute("data-bs-target");
    const scrollElem = document.querySelector(
      `${target} [data-bs-spy="scroll"]`
    );
    bootstrap.ScrollSpy.getOrCreateInstance(scrollElem).refresh();
  });
});

const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: "#navbar-example2",
});

const triggerTabList = document.querySelectorAll("#myTab button");
triggerTabList.forEach((triggerEl) => {
  const tabTrigger = new bootstrap.Tab(triggerEl);

  triggerEl.addEventListener("click", (event) => {
    event.preventDefault();
    tabTrigger.show();
  });
});

const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

function initMap() {
  // The location of simform solutions office
  const ss_office = {
    lat: 23.028217245452694,
    lng: 72.49937209773258,
  };

  // Set the zoom of the map
  var mapOptions = {
    zoom: 17.56,
    center: ss_office,
  };

  // Create the map, centered at ss_office
  const googlemap = new google.maps.Map(
    document.getElementById("map"),
    mapOptions
  );

  var marker = new google.maps.Marker({
    position: ss_office,
    map: googlemap,
  });
}

let btn = document.querySelector(".mouse-cursor-gradient-tracking");
btn.addEventListener("mousemove", (e) => {
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  btn.style.setProperty("--x", x + "px");
  btn.style.setProperty("--y", y + "px");
});
