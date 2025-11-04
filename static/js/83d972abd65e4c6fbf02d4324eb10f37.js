"use strict";
requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

const Alpscroll = class Alpscroll {
  constructor() {
    this.data = {
      scrollbar: null,
      init: false,
      enbaleMobile: "1",
      wrapper: "body",
      ratio: 0.1,
      scroll_y: 0,
      motion_y: 0,
      scroll_x: 0,
      wrapper_width: 0,
      wrapper_height: 0,
      scroll_height: 0,
      scroll_width: 0,
      page_x: 0,
      page_y: 0,
      split: 0,
      split_data: [],
      split_data_detail: [],
      split_height: 0,
      parallax: [],
      parallax_data: [],
      sticky: [],
      sticky_data: [],
      sticky_child: [],
      sticky_child_data: [],
      reach: [],
      reach_data: [],
      mouse: [],
      mouse_data: [],
      size_h: 0,
      size_w: 0,
    };
    this.animation = this.animation.bind(this);
    this.getMousePosition();
  }
  // get mouse position
  getMousePosition() {
    window.addEventListener("mousemove", (e) => {
      this.data.page_x = e.pageX - window.scrollX;
      this.data.page_y = e.pageY - window.scrollY;
    });
  }
  // 获取元素到顶部的距离
  getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  }
  // 获取元素到左边的距离
  getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    return actualLeft;
  }
  // 判断是否是移动端
  isMobile() {
    return /mobile/i.test(navigator.userAgent) || window.innerWidth <= 768;
  }
  // init scroll
  init(wrapper, ratio, eventTarget, split, splitELM, SplitOverscroll, enbaleMobile) {
    this.data.scrollbar = window.Scrollbar;
    this.data.enbaleMobile = enbaleMobile;
    if (this.data.enbaleMobile !== "1" && this.isMobile()) {
      this.data.scrollbar = false;
    }
    if (this.data.scrollbar) {
      console.log("init scroll effect with smooth-scrollbar");
      document.querySelector("body").style.setProperty("overflow", "hidden");
      this.data.ratio = ratio ? ratio : this.data.ratio;
      this.data.split = split ? split : this.data.split;
      this.data.wrapper = wrapper ? wrapper : this.data.wrapper;
      let $splitELM = splitELM ? splitELM : ".alp-split";
      if (!document.querySelector($splitELM)) {
        this.data.split = 0;
      }
      let $wrapper = document.querySelector(this.data.wrapper);
      let $eventTg = document.querySelector(eventTarget ? eventTarget : null);
      if (this.data.split == 1) {
        let $wrapperClass = this.data.wrapper.replace(".", "");
        $wrapper.classList.add("split-warpper");
        $wrapper.classList.remove($wrapperClass);
        let $outWrapper = `<div class="split-outer ${$wrapperClass}"><div></div></div>`;
        document.querySelector("body").innerHTML += $outWrapper;
        $wrapper = document.querySelector(this.data.wrapper);
        $eventTg = document.querySelector(eventTarget ? eventTarget : null);
        this.split($splitELM, SplitOverscroll ? SplitOverscroll : 0);
      }
      $wrapper.classList.add("scrollbar-active");
      $wrapper.style.setProperty("height", `${window.innerHeight}px`);
      this.acitveScrollbar($wrapper, $eventTg);
    } else {
      console.log("init scroll effect with native scroll");
      document.querySelector(this.data.wrapper).style.setProperty("height", "auto");
    }
    this.data.init = true;
    this.onLoad();
  }
  acitveScrollbar($wrapper, $eventTg) {
    this.data.scrollbar.init($wrapper, {
      damping: this.data.ratio,
      renderByPixels: false,
      delegateTo: $eventTg,
    });
  }

  // split
  split(elm, leng_h) {
    if (elm) {
      //push
      this.data.split_data.push({
        elm: elm,
        leng_h: leng_h ? leng_h : 0,
      });
      this.split_push();
    }
  }
  split_push() {
    this.data.split_data_detail.length = 0;
    for (let i = 0; i < this.data.split_data.length; i++) {
      this.split_data(this.data.split_data[i]);
    }
  }
  split_data(elms) {
    let the_elms = document.querySelectorAll(elms.elm);
    this.data.split_height = 0;
    for (let i = 0; i < the_elms.length; i++) {
      let offset_top = this.getElementTop(the_elms[i]);
      // update the real offset top
      let offset_left = this.getElementLeft(the_elms[i]);
      // update the real offset left
      the_elms[i].dataset.split_top = offset_top;
      the_elms[i].dataset.split_left = offset_left;

      let the_elms_height = the_elms[i].clientHeight;
      let the_elms_width = the_elms[i].clientWidth;

      this.data.split_height = the_elms[i].parentElement.clientHeight;
      this.data.split_data_detail.push({
        elm: the_elms[i],
        top: offset_top,
        left: offset_left,
        height: the_elms_height,
        width: the_elms_width,
        leng_h: elms.leng_h,
      });
      the_elms[i].classList.add("split-element");
    }
  }
  split_run() {
    for (let i = 0; i < this.data.split_data_detail.length; i++) {
      let leng_hh = this.data.split_data_detail[i].leng_h;
      let top_leng = this.data.scroll_y - this.data.split_data_detail[i].top + (leng_hh + this.data.wrapper_height);
      let bottom_leng = this.data.scroll_y - (this.data.split_data_detail[i].top + this.data.split_data_detail[i].height) - leng_hh;
      let trans_leng = 0;
      if (top_leng >= 0 && bottom_leng <= 0) {
        trans_leng = this.data.split_data_detail[i].top - this.data.scroll_y - this.data.split_data_detail[i].top;
        this.data.split_data_detail[i].elm.style.setProperty("pointer-events", "auto");
        this.data.split_data_detail[i].elm.style.setProperty("z-index", "2");
        this.data.split_data_detail[i].elm.dataset.split_y = trans_leng;
      } else if (top_leng < 0) {
        trans_leng = leng_hh + this.data.wrapper_height - this.data.split_data_detail[i].top;
        this.data.split_data_detail[i].elm.style.setProperty("pointer-events", "none");
        this.data.split_data_detail[i].elm.style.setProperty("z-index", "1");
        this.data.split_data_detail[i].elm.dataset.split_y = trans_leng;
      }
    }
  }

  // palallax
  parallax(elm, limit, friction_y, friction_x) {
    if (elm) {
      // push
      this.data.parallax.push({
        elm: elm,
        limit: limit ? limit : 0,
        friction_y: friction_y ? friction_y : 0.1,
        friction_x: friction_x ? friction_x : 0.1,
      });
      this.parallax_push();
    }
  }
  parallax_push() {
    // reset and update
    this.data.parallax_data.length = 0;
    for (let i = 0; i < this.data.parallax.length; i++) {
      this.parallax_data(this.data.parallax[i]);
    }
  }
  parallax_data(elms) {
    // push all elm data
    let the_elms = document.querySelectorAll(elms.elm);
    for (let i = 0; i < the_elms.length; i++) {
      let offset_top = this.getElementTop(the_elms[i]);
      let offset_left = this.getElementLeft(the_elms[i]);
      the_elms[i].dataset.of_top = offset_top;
      the_elms[i].dataset.of_left = offset_left;
      let the_elms_height = the_elms[i].clientHeight;
      let the_elms_width = the_elms[i].clientWidth;
      this.data.parallax_data.push({
        elm: the_elms[i],
        limit: elms.limit,
        friction_y: elms.friction_y,
        friction_x: elms.friction_x,
        top: offset_top,
        left: offset_left,
        height: the_elms_height,
        width: the_elms_width,
        center_y: 0,
        center_y_friction: 0,
        center_x: 0,
        center_x_friction: 0,
      });
    }
  }
  parallax_run() {
    for (let i = 0; i < this.data.parallax_data.length; i++) {
      // y
      let center_y_init = this.data.parallax_data[i].top - this.data.wrapper_height / 2 + this.data.parallax_data[i].height / 2 - this.data.scroll_y;
      this.data.parallax_data[i].center_y = center_y_init;

      // x
      let center_x_init = this.data.parallax_data[i].left - this.data.wrapper_width / 2 + this.data.parallax_data[i].width / 2 - this.data.scroll_x;
      this.data.parallax_data[i].center_x = center_x_init;

      // set value
      let center_y = 0;
      let center_x = 0;

      // no-limit
      let lenght_y_bottom = this.data.wrapper_height + this.data.parallax_data[i].height * 1;
      let lenght_y_top = (this.data.wrapper_height + this.data.parallax_data[i].height * 1) * -1;

      let lenght_x_right = this.data.wrapper_width + this.data.parallax_data[i].width;
      let lenght_x_left = (this.data.wrapper_width + this.data.parallax_data[i].width) * -1;

      if (this.data.parallax_data[i].limit == 0) {
        if (this.data.parallax_data[i].center_y < lenght_y_bottom && this.data.parallax_data[i].center_y > lenght_y_top) {
          center_y = this.data.parallax_data[i].center_y;
        } else if (this.data.parallax_data[i].center_y > lenght_y_bottom) {
          center_y = lenght_y_bottom;
        } else if (this.data.parallax_data[i].center_y < lenght_y_top) {
          center_y = lenght_y_top;
        }

        if (this.data.parallax_data[i].center_x < lenght_x_right && this.data.parallax_data[i].center_x > lenght_x_left) {
          center_x = this.data.parallax_data[i].center_x;
        } else if (this.data.parallax_data[i].center_x > lenght_x_right) {
          center_x = lenght_x_right;
        } else if (this.data.parallax_data[i].center_x < lenght_x_left) {
          center_x = lenght_x_left;
        }
      }
      // stop-at-center
      else if (this.data.parallax_data[i].limit == 1) {
        if (this.data.parallax_data[i].center_y > 0 && this.data.parallax_data[i].center_y < lenght_y_bottom) {
          center_y = this.data.parallax_data[i].center_y;
        } else {
          center_y = 0;
        }
        if (this.data.parallax_data[i].center_x > 0) {
          center_x = this.data.parallax_data[i].center_x;
        } else {
          center_x = 0;
        }
      } else if (this.data.parallax_data[i].limit == 2) {
        if (this.data.parallax_data[i].center_y < 0 && this.data.parallax_data[i].center_y > lenght_y_top) {
          center_y = this.data.parallax_data[i].center_y;
        } else {
          center_y = 0;
        }
        if (this.data.parallax_data[i].center_x < 0) {
          center_x = this.data.parallax_data[i].center_x;
        } else {
          center_x = 0;
        }
      }
      // friction data
      this.data.parallax_data[i].center_y_friction = Math.round((this.data.parallax_data[i].center_y_friction + (center_y - this.data.parallax_data[i].center_y_friction) * this.data.parallax_data[i].friction_y) * 100) / 100;
      this.data.parallax_data[i].center_x_friction = Math.round((this.data.parallax_data[i].center_x_friction + (center_x - this.data.parallax_data[i].center_x_friction) * this.data.parallax_data[i].friction_x) * 100) / 100;

      let progerss_y = 1 - center_y / (this.data.wrapper_height / 2);
      let progerss_x = 1 - center_x / (this.data.wrapper_width / 2);
      let progerss_yf = 1 - this.data.parallax_data[i].center_y_friction / (this.data.wrapper_height / 2);
      let progerss_xf = 1 - this.data.parallax_data[i].center_x_friction / (this.data.wrapper_width / 2);

      // set data
      this.data.parallax_data[i].elm.dataset.yy = center_y;
      this.data.parallax_data[i].elm.dataset.fy = this.data.parallax_data[i].center_y_friction;
      this.data.parallax_data[i].elm.dataset.xx = center_x;
      this.data.parallax_data[i].elm.dataset.fx = this.data.parallax_data[i].center_x_friction;
      this.data.parallax_data[i].elm.dataset.pg_y = progerss_y;
      this.data.parallax_data[i].elm.dataset.pg_yf = progerss_yf;
      this.data.parallax_data[i].elm.dataset.pg_x = progerss_x;
      this.data.parallax_data[i].elm.dataset.pg_xf = progerss_xf;
    }
  }
  parallax_data_update() {
    for (let i = 0; i < this.data.parallax_data.length; i++) {
      this.data.parallax_data[i].top = this.getElementTop(this.data.parallax_data[i].elm);
      this.data.parallax_data[i].left = this.getElementLeft(this.data.parallax_data[i].elm);
      this.data.parallax_data[i].height = this.data.parallax_data[i].elm.clientHeight;
      this.data.parallax_data[i].width = this.data.parallax_data[i].elm.clientWidth;
      //
      this.data.parallax_data[i].elm.dataset.of_top = this.data.parallax_data[i].top;
      this.data.parallax_data[i].elm.dataset.of_left = this.data.parallax_data[i].left;
    }
  }

  // Sticky
  sticky(elm, limit, friction_y, friction_x) {
    if (elm) {
      // push
      this.data.sticky.push({
        elm: elm,
        limit: limit ? limit : 0,
        friction_y: friction_y ? friction_y : 1,
        friction_x: friction_x ? friction_x : 1,
        set_fixed: 0,
      });
      this.sticky_push();
    }
  }
  sticky_push() {
    // reset and update
    this.data.sticky_data.length = 0;
    for (let i = 0; i < this.data.sticky.length; i++) {
      this.sticky_data(this.data.sticky[i]);
    }
  }
  sticky_data(elms) {
    // push all elm data
    let the_elms = document.querySelectorAll(elms.elm);
    for (let i = 0; i < the_elms.length; i++) {
      the_elms[i].classList.add("sticky-element");
      let the_elms_height = the_elms[i].clientHeight;
      let the_elms_width = the_elms[i].clientWidth;
      let parent_height = the_elms[i].parentElement.clientHeight;
      let parent_width = the_elms[i].parentElement.clientWidth;
      // set parent height
      if (the_elms_width > parent_width) {
        the_elms[i].parentElement.style.setProperty("height", `${the_elms_width}px`);
      }
      parent_height = the_elms[i].parentElement.clientHeight;

      let offset_top = this.getElementTop(the_elms[i]);
      let parent_offset_top = this.getElementTop(the_elms[i].parentElement);
      let offset_left = this.getElementLeft(the_elms[i]);
      let parent_offset_left = this.getElementLeft(the_elms[i].parentElement);

      the_elms[i].dataset.of_top = offset_top;
      the_elms[i].dataset.of_left = offset_left;

      if (this.data.scrollbar) {
        elms.set_fixed = 0;
      } else {
        elms.set_fixed = 1;
        the_elms[i].style.setProperty("--st_top", offset_top);
        the_elms[i].style.setProperty("--st_left", offset_left);
        the_elms[i].style.setProperty("--st_parent_width", parent_width);
      }

      this.data.sticky_data.push({
        elm: the_elms[i],
        limit: elms.limit,
        friction_y: elms.friction_y,
        friction_x: elms.friction_x,
        set_fixed: elms.set_fixed,
        top: offset_top,
        left: offset_left,
        height: the_elms_height,
        width: the_elms_width,
        parent_height: parent_height,
        parent_width: parent_width,
        parent_top: parent_offset_top,
        parent_left: parent_offset_left,
        progress: 0,
        progress_friction: 0,
        stick_y: 0,
        stick_y_friction: 0,
        stick_x: 0,
        stick_x_friction: 0,
      });
    }
  }
  sticky_run() {
    for (let i = 0; i < this.data.sticky_data.length; i++) {
      if (this.data.sticky_data[i].set_fixed == 1) {
        this.data.sticky_data[i].elm.classList.add("sticky-fixed");
      } else {
        this.data.sticky_data[i].elm.classList.remove("sticky-fixed");
      }
      // no-limit
      if (this.data.sticky_data[i].limit == 0) {
        // update data
        this.data.sticky_data[i].progress = this.data.scroll_y / (this.data.scroll_height - this.data.wrapper_height);
        this.data.sticky_data[i].stick_y = this.data.scroll_y;
      }
      // limit-in-container
      else if (this.data.sticky_data[i].limit == 1) {
        let stick_top = this.data.sticky_data[i].top - this.data.scroll_y;
        let stick_bottom = this.data.sticky_data[i].parent_top + this.data.sticky_data[i].parent_height - this.data.scroll_y;
        let stick_x_distence = (stick_top / (this.data.sticky_data[i].parent_height - this.data.sticky_data[i].height - (this.data.sticky_data[i].top - this.data.sticky_data[i].parent_top))) * (this.data.sticky_data[i].width - this.data.sticky_data[i].parent_width);
        if (stick_top <= 0 && stick_bottom >= this.data.sticky_data[i].height) {
          this.data.sticky_data[i].stick_y = stick_top;
          this.data.sticky_data[i].stick_x = stick_x_distence;
          this.data.sticky_data[i].progress = stick_top / (this.data.sticky_data[i].height - this.data.sticky_data[i].parent_height + (this.data.sticky_data[i].top - this.data.sticky_data[i].parent_top));
          this.data.sticky_data[i].elm.classList.add("sticky-in");
          this.data.sticky_data[i].elm.classList.remove("sticky-out");
        } else if (stick_top > 0) {
          this.data.sticky_data[i].stick_y = 0;
          this.data.sticky_data[i].stick_x = 0;
          this.data.sticky_data[i].progress = 0;
          this.data.sticky_data[i].elm.classList.remove("sticky-in");
          this.data.sticky_data[i].elm.classList.remove("sticky-out");
        } else {
          this.data.sticky_data[i].stick_y = this.data.sticky_data[i].height - this.data.sticky_data[i].parent_height + (this.data.sticky_data[i].top - this.data.sticky_data[i].parent_top);
          this.data.sticky_data[i].stick_x = this.data.sticky_data[i].parent_width - this.data.sticky_data[i].width;
          this.data.sticky_data[i].progress = 1;
          this.data.sticky_data[i].elm.classList.add("sticky-out");
          this.data.sticky_data[i].elm.classList.remove("sticky-in");
        }
      }
      // friction data
      this.data.sticky_data[i].stick_y_friction = Math.round((this.data.sticky_data[i].stick_y_friction + (this.data.sticky_data[i].stick_y - this.data.sticky_data[i].stick_y_friction) * this.data.sticky_data[i].friction_y) * 100) / 100;
      this.data.sticky_data[i].stick_x_friction = Math.round((this.data.sticky_data[i].stick_x_friction + (this.data.sticky_data[i].stick_x - this.data.sticky_data[i].stick_x_friction) * this.data.sticky_data[i].friction_x) * 100) / 100;
      this.data.sticky_data[i].progress_friction = Math.round((this.data.sticky_data[i].progress_friction + (this.data.sticky_data[i].progress - this.data.sticky_data[i].progress_friction) * this.data.sticky_data[i].friction_x) * 1000000) / 1000000;

      // set data
      this.data.sticky_data[i].elm.dataset.yy = this.data.sticky_data[i].stick_y;
      this.data.sticky_data[i].elm.dataset.fy = this.data.sticky_data[i].stick_y_friction;
      this.data.sticky_data[i].elm.dataset.xx = this.data.sticky_data[i].stick_x;
      this.data.sticky_data[i].elm.dataset.fx = this.data.sticky_data[i].stick_x_friction;
      this.data.sticky_data[i].elm.dataset.progress = this.data.sticky_data[i].progress;
      this.data.sticky_data[i].elm.dataset.progress_f = this.data.sticky_data[i].progress_friction;
    }
  }
  sticky_data_update() {
    for (let i = 0; i < this.data.sticky_data.length; i++) {
      this.data.sticky_data[i].top = this.getElementTop(this.data.sticky_data[i].elm);
      this.data.sticky_data[i].parent_top = this.getElementTop(this.data.sticky_data[i].elm.parentElement);
      this.data.sticky_data[i].left = this.getElementLeft(this.data.sticky_data[i].elm);
      this.data.sticky_data[i].parent_left = this.getElementLeft(this.data.sticky_data[i].elm.parentElement);
      this.data.sticky_data[i].width = this.data.sticky_data[i].elm.clientWidth;
      this.data.sticky_data[i].parent_width = this.data.sticky_data[i].elm.parentElement.clientWidth;
      this.data.sticky_data[i].height = this.data.sticky_data[i].elm.clientHeight;
      this.data.sticky_data[i].parent_height = this.data.sticky_data[i].elm.parentElement.clientHeight;
      if (this.data.sticky_data[i].width > this.data.sticky_data[i].parent_width) {
        this.data.sticky_data[i].parent_height = this.data.sticky_data[i].width;
        this.data.sticky_data[i].elm.parentElement.style.setProperty("height", `${this.data.sticky_data[i].parent_height}px`);
      }
      //
      this.data.sticky_data[i].elm.dataset.of_top = this.data.sticky_data[i].top;
      this.data.sticky_data[i].elm.dataset.of_left = this.data.sticky_data[i].left;
    }
  }

  // Sticky Child
  sticky_child(elm, limit) {
    if (elm) {
      // push
      this.data.sticky_child.push({
        elm: elm,
        limit: limit ? limit : 0,
      });
      this.sticky_child_push();
    }
  }
  sticky_child_push() {
    // reset and update
    this.data.sticky_child_data.length = 0;
    for (let i = 0; i < this.data.sticky_child.length; i++) {
      this.sticky_child_data(this.data.sticky_child[i]);
    }
  }
  sticky_child_data(elms) {
    // push all elm data
    let the_elms = document.querySelectorAll(elms.elm);
    for (let i = 0; i < the_elms.length; i++) {
      let the_elms_height = the_elms[i].clientHeight;
      let the_elms_width = the_elms[i].clientWidth;

      let offset_top = this.getElementTop(the_elms[i]);
      let offset_left = this.getElementLeft(the_elms[i]);
      let parent_offset_top = this.getElementTop(the_elms[i].parentElement);
      let parent_offset_left = this.getElementLeft(the_elms[i].parentElement);

      the_elms[i].dataset.of_top = offset_top;
      the_elms[i].dataset.of_left = offset_left;
      the_elms[i].dataset.of_parent_top = parent_offset_top;
      the_elms[i].dataset.of_parent_left = parent_offset_left;

      this.data.sticky_child_data.push({
        elm: the_elms[i],
        limit: elms.limit,
        set_var: elms.set_var,
        top: offset_top,
        parent_top: parent_offset_top,
        left: offset_left,
        parent_left: parent_offset_left,
        height: the_elms_height,
        width: the_elms_width,
        center_x: 0,
        center_y: 0,
      });
    }
  }
  sticky_child_run() {
    for (let i = 0; i < this.data.sticky_child_data.length; i++) {
      let center_y_init = this.data.sticky_child_data[i].top - this.data.wrapper_height / 2 + this.data.sticky_child_data[i].height / 2 - this.data.scroll_y;
      let center_x_init = this.data.sticky_child_data[i].left - this.data.wrapper_width / 2 + this.data.sticky_child_data[i].width / 2 - this.data.scroll_x;
      this.data.sticky_child_data[i].center_x = center_x_init;
      this.data.sticky_child_data[i].center_y = center_y_init;

      if (this.data.sticky_child_data[i].set_var == 1) {
        this.data.sticky_child_data[i].elm.style.setProperty("--sc-center-x", center_x_init);
        this.data.sticky_child_data[i].elm.style.setProperty("--sc-center-y", center_y_init);
      } else {
        // set data
        this.data.sticky_child_data[i].elm.dataset.xx = center_x_init;
        this.data.sticky_child_data[i].elm.dataset.yy = center_y_init;
      }
    }
  }
  sticky_child_data_update() {
    for (let i = 0; i < this.data.sticky_child_data.length; i++) {
      this.data.sticky_child_data[i].top = this.getElementTop(this.data.sticky_child_data[i].elm);
      this.data.sticky_child_data[i].parent_top = this.getElementTop(this.data.sticky_child_data[i].elm.parentElement);
      this.data.sticky_child_data[i].left = this.getElementLeft(this.data.sticky_child_data[i].elm);
      this.data.sticky_child_data[i].parent_left = this.getElementLeft(this.data.sticky_child_data[i].elm.parentElement);
      this.data.sticky_child_data[i].height = this.data.sticky_child_data[i].elm.clientHeight;
      this.data.sticky_child_data[i].width = this.data.sticky_child_data[i].elm.clientWidth;
      //
      this.data.sticky_child_data[i].elm.dataset.of_top = this.data.sticky_child_data[i].top;
      this.data.sticky_child_data[i].elm.dataset.of_parent_top = this.data.sticky_child_data[i].parent_top;
      this.data.sticky_child_data[i].elm.dataset.of_left = this.data.sticky_child_data[i].left;
      this.data.sticky_child_data[i].elm.dataset.of_parent_left = this.data.sticky_child_data[i].parent_left;
    }
  }

  // reach element
  reach(elm, offset_y, offset_x) {
    if (elm) {
      // push
      this.data.reach.push({
        elm: elm,
        offset_y: offset_y ? offset_y : 0,
        offset_x: offset_x ? offset_x : 0,
      });
      this.reach_push();
    }
  }
  reach_push() {
    // reset and update
    this.data.reach_data.length = 0;
    for (let i = 0; i < this.data.reach.length; i++) {
      this.reach_data(this.data.reach[i]);
    }
  }
  reach_data(elms) {
    // push all elm data
    let the_elms = document.querySelectorAll(elms.elm);
    for (let i = 0; i < the_elms.length; i++) {
      let offset_top = this.getElementTop(the_elms[i]);
      let offset_left = this.getElementLeft(the_elms[i]);
      the_elms[i].dataset.of_top = offset_top;
      the_elms[i].dataset.of_left = offset_left;
      let the_elms_height = the_elms[i].clientHeight;
      let the_elms_width = the_elms[i].clientWidth;
      this.data.reach_data.push({
        elm: the_elms[i],
        top: offset_top,
        left: offset_left,
        height: the_elms_height,
        width: the_elms_width,
        center_y: 0,
        center_x: 0,
        offset_y: elms.offset_y,
        offset_x: elms.offset_x,
      });
    }
  }
  reach_run() {
    for (let i = 0; i < this.data.reach_data.length; i++) {
      // y
      let center_y_init = this.data.reach_data[i].top - this.data.wrapper_height / 2 - this.data.scroll_y;
      this.data.reach_data[i].center_y = center_y_init;
      // x
      let center_x_init = this.data.reach_data[i].left - this.data.wrapper_width / 2 - this.data.scroll_x;
      this.data.reach_data[i].center_x = center_x_init;

      let reach_y = center_y_init - this.data.reach_data[i].offset_y * (this.data.wrapper_height / 2);
      let reach_x = center_x_init - this.data.reach_data[i].offset_x * (this.data.wrapper_width / 2);

      if (reach_y < 0) {
        this.data.reach_data[i].elm.dataset.active_y = 1;
      } else {
        this.data.reach_data[i].elm.dataset.active_y = 0;
      }
      if (reach_x < 0) {
        this.data.reach_data[i].elm.dataset.active_x = 1;
      } else {
        this.data.reach_data[i].elm.dataset.active_x = 0;
      }
    }
  }
  reach_data_update() {
    for (let i = 0; i < this.data.reach_data.length; i++) {
      this.data.reach_data[i].top = this.getElementTop(this.data.reach_data[i].elm);
      this.data.reach_data[i].left = this.getElementLeft(this.data.reach_data[i].elm);
      this.data.reach_data[i].height = this.data.reach_data[i].elm.clientHeight;
      this.data.reach_data[i].width = this.data.reach_data[i].elm.clientWidth;
      //
      this.data.reach_data[i].elm.dataset.of_top = this.data.reach_data[i].top;
      this.data.reach_data[i].elm.dataset.of_left = this.data.reach_data[i].left;
    }
  }

  // mouse
  mouse(elm, limit, friction_y, friction_x, outside) {
    if (elm) {
      // push
      this.data.mouse.push({
        elm: elm,
        limit: limit ? limit : 0,
        friction_y: friction_y ? friction_y : 0.1,
        friction_x: friction_x ? friction_x : 0.1,
        outside: outside ? outside : 0,
      });
      this.mouse_push();
    }
  }
  mouse_push() {
    // reset and update
    this.data.mouse_data.length = 0;
    for (let i = 0; i < this.data.mouse.length; i++) {
      this.mouse_data(this.data.mouse[i]);
    }
  }
  mouse_data(elms) {
    // push all elm data
    let the_elms = document.querySelectorAll(elms.elm);
    for (let i = 0; i < the_elms.length; i++) {
      let the_elms_height = the_elms[i].clientHeight;
      let the_elms_width = the_elms[i].clientWidth;
      let parent_height = the_elms[i].parentElement.clientHeight;
      let parent_width = the_elms[i].parentElement.clientWidth;
      let offset_top = this.getElementTop(the_elms[i]);
      let parent_offset_top = this.getElementTop(the_elms[i].parentElement);
      let offset_left = this.getElementLeft(the_elms[i]);
      let parent_offset_left = this.getElementLeft(the_elms[i].parentElement);

      this.data.mouse_data.push({
        elm: the_elms[i],
        limit: elms.limit,
        friction_y: elms.friction_y,
        friction_x: elms.friction_x,
        top: offset_top,
        left: offset_left,
        height: the_elms_height,
        width: the_elms_width,
        parent_height: parent_height,
        parent_width: parent_width,
        parent_top: parent_offset_top,
        parent_left: parent_offset_left,
        mouse_y: 0,
        mouse_y_friction: 0,
        mouse_x: 0,
        mouse_x_friction: 0,
        outside: elms.outside,
      });
    }
  }
  mouse_run() {
    for (let i = 0; i < this.data.mouse_data.length; i++) {
      let center_x = this.data.page_x - (this.data.mouse_data[i].left + this.data.mouse_data[i].width / 2);
      let center_y = this.data.page_y - (this.data.mouse_data[i].top + this.data.mouse_data[i].height / 2);
      if (this.data.scrollbar && this.data.mouse_data[i].outside == 0) {
        center_x = center_x + this.data.scroll_x;
        center_y = center_y + this.data.scroll_y;
      } else if (this.data.mouse_data[i].outside == 0) {
        center_x = center_x + this.data.scroll_x;
        center_y = center_y + this.data.scroll_y;
      }
      // limit = 0
      if (this.data.mouse_data[i].limit == 0) {
        this.data.mouse_data[i].mouse_x = center_x;
        this.data.mouse_data[i].mouse_y = center_y;
      }
      // limit = 1
      else if (this.data.mouse_data[i].limit == 1) {
        if (Math.abs(center_x) < this.data.mouse_data[i].parent_width / 2 && Math.abs(center_y) < this.data.mouse_data[i].parent_height / 2) {
          this.data.mouse_data[i].mouse_x = center_x;
          this.data.mouse_data[i].mouse_y = center_y;
        } else {
          this.data.mouse_data[i].mouse_x = 0;
          this.data.mouse_data[i].mouse_y = 0;
        }
      }
      // limit = "num"
      else if (parseFloat(this.data.mouse_data[i].limit) !== NaN) {
        let limit = parseFloat(this.data.mouse_data[i].limit);
        if (Math.abs(center_x) < limit && Math.abs(center_y) < limit) {
          this.data.mouse_data[i].mouse_x = center_x;
          this.data.mouse_data[i].mouse_y = center_y;
        } else {
          this.data.mouse_data[i].mouse_x = 0;
          this.data.mouse_data[i].mouse_y = 0;
        }
      }
      // updata friction data
      this.data.mouse_data[i].mouse_x_friction = Math.round((this.data.mouse_data[i].mouse_x_friction + (this.data.mouse_data[i].mouse_x - this.data.mouse_data[i].mouse_x_friction) * this.data.mouse_data[i].friction_x) * 100) / 100;
      this.data.mouse_data[i].mouse_y_friction = Math.round((this.data.mouse_data[i].mouse_y_friction + (this.data.mouse_data[i].mouse_y - this.data.mouse_data[i].mouse_y_friction) * this.data.mouse_data[i].friction_y) * 100) / 100;

      this.data.mouse_data[i].elm.dataset.mxx = Math.round(this.data.mouse_data[i].mouse_x_friction * 100) / 100;
      this.data.mouse_data[i].elm.dataset.myy = Math.round(this.data.mouse_data[i].mouse_y_friction * 100) / 100;
    }
  }
  mouse_data_update() {
    for (let i = 0; i < this.data.mouse_data.length; i++) {
      this.data.mouse_data[i].top = this.getElementTop(this.data.mouse_data[i].elm);
      this.data.mouse_data[i].parent_top = this.getElementTop(this.data.mouse_data[i].elm.parentElement);
      this.data.mouse_data[i].left = this.getElementLeft(this.data.mouse_data[i].elm);
      this.data.mouse_data[i].parent_left = this.getElementLeft(this.data.mouse_data[i].elm.parentElement);
      this.data.mouse_data[i].width = this.data.mouse_data[i].elm.clientWidth;
      this.data.mouse_data[i].parent_width = this.data.mouse_data[i].elm.parentElement.clientWidth;
      this.data.mouse_data[i].height = this.data.mouse_data[i].elm.clientHeight;
      this.data.mouse_data[i].parent_height = this.data.mouse_data[i].elm.parentElement.clientHeight;
    }
  }

  // get size
  getSize() {
    let $wrapper = document.querySelector(this.data.wrapper);
    if (this.data.scrollbar) {
      $wrapper.style.setProperty("height", `${window.innerHeight}px`);
      this.data.wrapper_height = this.data.scrollbar.get($wrapper).size.container.height;
      this.data.wrapper_width = this.data.scrollbar.get($wrapper).size.container.width;
      if (this.data.split == 1) {
        this.data.split_height = document.querySelector(".split-element").parentElement.clientHeight;
        this.data.scroll_height = this.data.split_height;
        this.data.scroll_width = document.querySelector(".split-element").parentElement.clientWidth;
        document.querySelector(`${this.data.wrapper} > div > div`).style.setProperty("height", `${this.data.scroll_height}px`);
      } else {
        this.data.scroll_height = this.data.scrollbar.get($wrapper).size.content.height;
        this.data.scroll_width = this.data.scrollbar.get($wrapper).size.content.width;
      }
      document.querySelector("body").style.setProperty("height", `${this.data.scroll_height}px`);
    } else {
      this.data.wrapper_height = window.innerHeight;
      this.data.wrapper_width = window.innerWidth;
      this.data.scroll_height = $wrapper.clientHeight;
      this.data.scroll_width = $wrapper.clientWidth;
    }
    if (this.data.size_h !== this.data.scroll_height || this.data.size_w !== this.data.scroll_width) {
      this.data.size_h = this.data.scroll_height;
      this.data.size_w = this.data.scroll_width;
      this.resetSize();
    }
  }
  // reset size
  resetSize() {
    console.log("reset size");
    this.split_push();
    this.parallax_data_update();
    this.sticky_data_update();
    this.sticky_child_data_update();
    this.reach_data_update();
    this.mouse_data_update();
  }
  // get scroll
  getScroll() {
    let $wrapper = document.querySelector(this.data.wrapper);
    if (this.data.scrollbar) {
      this.data.scroll_y = this.data.scrollbar.get($wrapper).offset.y;
      this.data.scroll_x = this.data.scrollbar.get($wrapper).offset.x;
      window.scrollTo(0, this.data.scroll_y);
    } else {
      this.data.scroll_y = document.documentElement.scrollTop || document.body.scrollTop;
      this.data.motion_y = Math.round((this.data.motion_y + ((document.documentElement.scrollTop || document.body.scrollTop) - this.data.motion_y) * this.data.ratio) * 100) / 100;
    }
  }

  // scrollTO
  scrollTo(y) {
    if (als.data.scrollbar) {
      this.data.scrollbar.get(document.querySelector(this.data.wrapper)).update();
      this.data.scrollbar.get(document.querySelector(this.data.wrapper)).scrollTo(0, y, 800);
    } else {
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }

  // animation
  animation() {
    this.getSize();
    this.getScroll();
    this.split_run();
    this.parallax_run();
    this.sticky_run();
    this.sticky_child_run();
    this.reach_run();
    this.mouse_run();
    requestAnimationFrame(this.animation);
  }

  // on load
  onLoad() {
    window.addEventListener("load", () => {
      this.animation();
    });
  }
};
