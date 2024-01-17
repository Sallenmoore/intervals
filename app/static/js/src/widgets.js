import * as base from './base.js';

//==== Loader
// Usage:
//   <div id="loading-container-id"></div>
//   <script>
//     new Loader('loading-container-id');
//   </script>
export class Loader {
  constructor() {
    if (this.loader === undefined) {
      this.loader = document.createElement('div');
      this.loader.classList.add('is-loading');

      let load_anim = document.createElement('div');
      load_anim.classList.add('loader');
      this.loader.appendChild(load_anim);

      document.body.appendChild(this.loader);
    }
  }

  hide() {
    if (this.loader !== undefined) {
      this.loader.remove();
      this.loader = undefined;
    }
  }
}
//==== Mobile Menu
// Usage:
//   <div class="burger" id="burger"></div>
//   <div class="slideout-menu" id="slideout-menu">
//     <ul>
//       <li class=""><a href="#">Home</a></li>
//     </ul>
//   </div>
export class MobileMenu {
  constructor(menu_toggle_id = "burger") {
    //#nav-links
    var slideout_menu = base.get_element_by_id("slideout-menu");

    var menu_button = base.get_element_by_id(menu_toggle_id);

    menu_button.addEventListener("click", () => {
      menu_button.classList.toggle("is-active");
      menuclose_button.classList.toggle("is-active");
      slideout_menu.classList.toggle("menu-open");
    });

    let close_menu = document.createElement("div");
    close_menu.classList.add("close-modal");
    close_menu.innerHTML = "<iconify-icon icon='material-symbols:close'></iconify-icon>";

    close_menu.addEventListener('click', function (e) {
      menu_button.classList.toggle("is-active");
      menuclose_button.classList.toggle("is-active");
      slideout_menu.classList.toggle("menu-open");
    });
    slideout_menu.insertBefore(close_modal, slideout_menu.firstChild);
  }
}

//==== Modals
// Usage:
//   <div class="open-modal" target="modal1"></div>
//   <div class="modal" id="modal1"></div>
//
base.get_objects_by_class('open-modal').forEach((modal_trigger) => {
  let modal = base.get_object_by_id(modal_trigger.dataset.target);

  modal_trigger.addEventListener('click', function (e) {
    modal.classList.add("is-active");
  });

  let close_modal = document.createElement("div");
  close_modal.classList.add("close-modal");
  close_modal.innerHTML = "<iconify-icon icon='material-symbols:close'></iconify-icon>";
  modal.querySelector(".modal__content").appendChild(close_modal);

  close_modal.addEventListener('click', function (e) {
    modal.classList.remove("is-active");
  });
});

//==== Tabs
// Usage: 
//   <ul class="tabs__list">
//      <li class="tab" data-target="tab1">Tab 1</li>
//   </ul>
//   <div class="tab-panel" id="tab1"></div>
export class Tabs {
  constructor(user, pk, f = (p) => { }) {
    var tab_id = "tabs__list";
    base.get_objects_by_class(tab_id).forEach((tabs) => {
      tabs.querySelectorAll("li").forEach((tab_button) => {
        tab_button.addEventListener("click", () => {
          let panel = base.get_object_by_id(tab_button.dataset.target);
          base.get_objects_by_class("tab-panel").forEach((p) => {
            base.hide(p);
          });
          base.show(panel);
          tabs.querySelectorAll("li").forEach((tb) => {
            tb.classList.remove("is-active");
          });
          panel.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth',
            inline: 'nearest'
          });
        });
      });
    });
  };
}

//==== Tooltips
export class Tooltip { }
//==== Tags
export class Tag { }
//==== Popovers
export class Popover { }
//==== Dropdowns
export class DropDown { }
//==== Collapsibles
export class Collapsible { }
//==== Accordions
export class Accordion { }
//==== Carousels
export class Carousel { }

//==== Progress Bar
export class ProgressBar { }

//==== Toasts
//Usage:
//  new Toasted("Hello World", 3000, "toast", "center");
export class Toasted {
  constructor(msg, duration = 3000, cn = "toast", position = "center") {
    Toastify({
      text: msg,
      duration: duration,
      className: cn,
      position: position,
      offset: { x: 0, y: 50 },
    }).showToast();
  }
}

//==== Animations

