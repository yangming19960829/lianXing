// 获取url中的参数
// 'new.html?targetId=123'
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substring(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  } else {
    return null;
  }
}

// 根据后缀判断文件类型
function wenjian_leixing(the_name) {
  let suffix = ""; // 后缀获取
  let result = ""; // 获取类型结果
  if (the_name) {
    const flieArr = the_name.split("."); // 根据.分割数组
    suffix = flieArr[flieArr.length - 1]; // 取最后一个
  }
  if (!suffix) return false; // the_name无后缀返回false
  suffix = suffix.toLocaleLowerCase(); // 将后缀所有字母改为小写方便操作
  // 匹配图片
  const imgList = ["png", "jpg", "jpeg", "bmp", "gif"]; // 图片格式
  result = imgList.find((item) => item === suffix);
  if (result) return "image";
  // 匹配txt
  const txtList = ["txt"];
  result = txtList.find((item) => item === suffix);
  if (result) return "txt";
  // 匹配excel
  const excelList = ["xls", "xlsx"];
  result = excelList.find((item) => item === suffix);
  if (result) return "excel";
  // 匹配word
  const wordList = ["doc", "docx"];
  result = wordList.find((item) => item === suffix);
  if (result) return "word";
  // 匹配pdf
  const pdfList = ["pdf"];
  result = pdfList.find((item) => item === suffix);
  if (result) return "pdf";
  // 匹配ppt
  const pptList = ["ppt", "pptx"];
  result = pptList.find((item) => item === suffix);
  if (result) return "ppt";
  // 匹配zip
  const zipList = ["rar", "zip", "7z"];
  result = zipList.find((item) => item === suffix);
  if (result) return "zip";
  // 匹配视频
  const videoList = ["mp4", "m2v", "mkv", "rmvb", "wmv", "avi", "flv", "mov", "m4v"];
  result = videoList.find((item) => item === suffix);
  if (result) return "video";
  // 匹配音频
  const radioList = ["mp3", "wav", "wmv"];
  result = radioList.find((item) => item === suffix);
  if (result) return "radio";
  // 其他文件类型
  return "other";
}

// Countup
function countupp(elm, sec) {
  $(elm).each(function () {
    let $this = $(this);
    let anming = $this.attr("data-cpanming");
    if (anming == undefined) {
      // $this.attr("data-cpanming", "off");
      runanmm();
    } else if (anming == "off") {
      runanmm();
    }
    function runanmm() {
      $this.attr("data-cpanming", "on");
      let numm = 0;
      let datann = $this.attr("data-cpnum");
      if (datann !== undefined) {
        numm = $this.attr("data-cpnum");
      } else {
        numm = $this.html();
      }
      $this.attr("data-cpnum", numm);
      let startnum = 0;
      let speed = numm / sec;
      function councc() {
        if (startnum <= numm) {
          $this.html(Math.round(startnum));
          startnum = startnum + speed;
          setTimeout(function () {
            councc();
          }, 20);
        } else {
          $this.html(numm);
          $this.attr("data-cpanming", "off");
        }
      }
      councc();
    }
  });
}

//
function isisEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

$(".tohtml").each(function () {
  let $text = $(this).text();
  $(this).html($text);
});

//   新增判断第一次加载
if (window.name == "Meetsocial") {
  $(".the-loading").css("opacity", "0");
} else {
  $(".the-loading").css("opacity", "1");
}

// 非制作平台
if (window.parent.location.hostname !== "dc.thefastmake.com") {
  $("body").addClass("runnn");

  // active ss scroll
  $(".to-out:not(.the-main-wrapper)").each(function () {
    $(this).appendTo("body");
  });
  //   $(".the-main-wrapper").addClass("the-real-wrapper");
  var scroll_html = `<div class="Scroll-wrapper"><div class="scroll-w real-content"></div></div>`;
  //   $("body").append(scroll_html);
  //   $(".the-main-wrapper").appendTo(".scroll-w");

  //   新增
  $(".the-main-wrapper").wrap(scroll_html);
  $(".global_footer").appendTo(".the-main-wrapper");
  $(".ny_1_banner").parent().css("width", "100%");

  function ap_hf() {
    let nav_h = $(".top_nav").outerHeight();
    let footer_h = $(".global_footer").outerHeight();
    $(".fake-head").css("--height", `${nav_h}px`);
    $("body").css("--nav-height", `${nav_h}px`);
    // $(".fake-footer").css("--height", `${footer_h}px`);
  }
  ap_hf();

  //
  $(".bn_title_1 div").lettering();

  // spec swiper

  var easing_1 = "cubicBezier(0.12, 0.31, 0.25, 1)";
  var easing_2 = "cubicBezier(0.73, 0.05, 0.25, 1)";
  var duration_1 = 1000;

  function change_banner(elm, index) {
    $(elm).each(function () {
      $(this).children().removeClass("active next prev");
      $(this).children().eq(index).addClass("active");
      $(this).children().eq(index).nextAll().addClass("next");
      $(this).children().eq(index).prevAll().addClass("prev");
    });
  }
  // onload anime
  function anim_loaded() {
    if (window.innerWidth > 999) {
      anime({
        targets: `.top_nav .news_area>div , .tn_left_logo`,
        translateX: ["40px", "0px"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: duration_1,
        delay: anime.stagger(120, { start: 500 }),
      });
      anime({
        targets: `.top_nav .menu_area>a , .top_nav .text_area`,
        translateX: ["-40px", "0px"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: duration_1,
        delay: anime.stagger(120, { start: 500, from: "last" }),
      });
      anime({
        targets: `.tn_menu_tree.deep-1 > div , .tn_right_search , .tn_right_lang`,
        translateX: ["-40px", "0px"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: duration_1,
        delay: anime.stagger(120, { start: 500, from: "last" }),
      });

      anime({
        targets: `.pf-bg-1`,
        scale: [1.3, 1],
        translateX: ["60%", "0%"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: duration_1 * 6,
        delay: 200,
      });
      // 内页
      anime({
        targets: `.banner_ny_title>div>*`,
        translateY: ["40px", "0px"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: 1500,
        delay: anime.stagger(120, { start: 400 }),
      });
      anime({
        targets: `.banner_ny_title.jhoso .the-text-c>* , .jhisoc_bg , .jhisoc_front>div`,
        translateY: ["40px", "0px"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: 1500,
        delay: anime.stagger(120, { start: 400 }),
      });
      anime({
        targets: `.ab_bnn_testxa>div>*`,
        translateY: ["40px", "0px"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: 1500,
        delay: anime.stagger(120, { start: 400 }),
      });
      anime({
        targets: `.the-sx-wrapper , .the-soslgs-wrapper`,
        translateY: ["80px", "0px"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: 1500,
        delay: anime.stagger(120, { start: 600 }),
      });
      anime({
        targets: `.ny_1_banner .bn_bg.full-img-wrap`,
        scale: [1.2, 1],
        translateX: ["0%", "0%"],
        opacity: ["0.5", "1"],
        easing: easing_1,
        duration: duration_1 * 6,
        delay: 200,
      });
      anime({
        targets: `.bn_bg_2A.full-img-wrap>*`,
        translateY: ["40px", "0px"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: 1500,
        delay: anime.stagger(320, { start: 800 }),
      });
      anime({
        targets: `.szcy_bn_ccct>div>*`,
        translateY: ["40px", "0px"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: 1500,
        delay: anime.stagger(220, { start: 500 }),
      });
    }
  }
  // onload banner anime
  function anim_banner_init(index) {
    let act_index = `.banner_ii:nth-child(${index + 1})`;
    if (window.innerWidth > 999) {
      anime({
        targets: `${act_index} .bn_title_1 span`,
        translateY: ["120%", "0px"],
        opacity: ["1", "1"],
        easing: easing_1,
        duration: duration_1,
        delay: anime.stagger(100, { start: 0 }),
      });
      anime({
        targets: `${act_index} .bn_title_2 , ${act_index} .bn_contents , ${act_index} .bn_more`,
        translateY: ["100%", "0px"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: duration_1 * 1.5,
        delay: anime.stagger(150, { start: duration_1 * 0.65 }),
      });
      anime({
        targets: `${act_index} .banner_background > div > img:nth-child(1)`,
        scale: [1.1, 1],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: duration_1 * 4,
        delay: 0,
      });
      anime({
        targets: `${act_index} .banner_background > div > img:nth-child(2)`,
        scale: [1.3, 1],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: duration_1 * 6,
        delay: 0,
      });
      anime({
        targets: `${act_index} .banner_background > div > img:nth-child(3)`,
        scale: [0.8, 1],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: duration_1 * 7,
        delay: 0,
      });
      anime({
        targets: `.banner_tumb_wrapper > div`,
        translateX: ["100%", "0px"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: duration_1 * 1.5,
        delay: anime.stagger(150, { start: duration_1 * 0.65 }),
      });
    }
  }
  // switch banner anime
  function anim_banner(index) {
    let act_index = `.banner_ii:nth-child(${index + 1})`;
    let next_index = `.banner_ii:nth-child(${index + 2})`;
    let prev_index = `.banner_ii:nth-child(${index})`;
    let delay = 1200;
    // active
    if (window.innerWidth > 999) {
      anime({
        targets: `${act_index} .bn_title_1 span`,
        translateY: ["120%", "0px"],
        opacity: ["1", "1"],
        easing: easing_1,
        duration: duration_1,
        delay: anime.stagger(100, { start: delay }),
      });
      anime({
        targets: `${act_index} .bn_title_2 , ${act_index} .bn_contents , ${act_index} .bn_more`,
        translateY: ["100%", "0px"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: duration_1 * 1.5,
        delay: anime.stagger(150, { start: duration_1 * 0.65 + delay }),
      });
      anime({
        targets: `${act_index} .banner_background > div > img:nth-child(1)`,
        scale: [1.1, 1],
        opacity: ["1", "1"],
        easing: easing_1,
        duration: duration_1 * 4,
        delay: delay * 0.5,
      });
      anime({
        targets: `${act_index} .banner_background > div > img:nth-child(2)`,
        scale: [1.3, 1],
        opacity: ["1", "1"],
        easing: easing_1,
        duration: duration_1 * 6,
        delay: delay * 0.5,
      });
      anime({
        targets: `${act_index} .banner_background > div > img:nth-child(3)`,
        scale: [0.8, 1],
        opacity: ["1", "1"],
        easing: easing_1,
        duration: duration_1 * 7,
        delay: delay * 0.5,
      });
      anime({
        targets: `${act_index}`,
        translateX: ["100%", "0%"],
        opacity: ["1", "1"],
        easing: easing_2,
        duration: delay,
        delay: 0,
      });
      anime({
        targets: `${act_index} .banner_background `,
        translateX: ["-80%", "0%"],
        opacity: ["1", "1"],
        scale: [1.05, 1],
        easing: easing_2,
        duration: delay,
        delay: 0,
      });
      anime({
        targets: `${act_index} .banner_content_c`,
        opacity: ["0", "1"],
        easing: easing_1,
        duration: delay * 0.5,
        delay: 0,
      });
      // prev
      anime({
        targets: `${prev_index} .banner_content_c , ${next_index} .banner_content_c`,
        opacity: ["1", "0"],
        easing: easing_1,
        duration: delay * 0.5,
        delay: 0,
      });
      anime({
        targets: `${prev_index} .banner_background , ${next_index} .banner_background`,
        scale: [1, 1.05],
        easing: easing_2,
        duration: delay,
        delay: 0,
      });
    }
  }

  if ($(".banner_slide_control").length > 0) {
    change_banner(".banner_wrapper , .banner_tumb_wrapper", 0);
    var banner_slide_control = new Swiper(".banner_slide_control", {
      init: false,
      preventInteractionOnTransition: true,
      followFinger: false,
      speed: 1000,
      autoplay: {
        delay: 7000,
      },
      navigation: {
        nextEl: ".ar-right",
        prevEl: ".ar-left",
      },
      on: {
        init: function (swiper) {
          let banner_index = this.realIndex;
          change_banner(".banner_wrapper , .banner_tumb_wrapper", banner_index);
          this.$wrapperEl.addClass("init");
          // anim_banner_init(banner_index);
        },
        transitionStart: function (swiper) {
          console.log(this.realIndex);
          let banner_index = this.realIndex;
          change_banner(".banner_wrapper , .banner_tumb_wrapper", banner_index);
          // anim_banner(banner_index);
        },
      },
    });
    $(".banner_tumb_wrapper>div").click(function () {
      let $this = $(this);
      banner_slide_control.slideTo($this.index());
    });
  }

  // choice anime
  function anim_choice(index) {
    let act_index = `.chios_swithh_con .swiper-slide:nth-child(${index + 1})`;
    let next_index = `.chios_swithh_con .swiper-slide:nth-child(${index + 2})`;
    let prev_index = `.chios_swithh_con .swiper-slide:nth-child(${index})`;
    let delay = 500;
    if (window.innerWidth > 999) {
      anime({
        targets: `${act_index} .text-content , ${act_index} .text-more , ${act_index} .swithh-co-icon-w , ${act_index} .swithh-co-icon-w .sh-co-icon-i > div`,
        translateY: ["40px", "0px"],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: 1000,
        delay: anime.stagger(40, { start: delay * 0.75 }),
      });
      anime({
        targets: `.the-chios-cc-2-icon-si:nth-child(${index + 1}) .the-path-icon-i > div`,
        scale: [0.5, 1],
        opacity: ["0", "1"],
        easing: easing_1,
        duration: 1000,
        delay: anime.stagger(150, { start: delay }),
      });
    }
  }

  if ($(".chios_swithh_con").length > 0) {
    var chios_swithh_con = new Swiper(".chios_swithh_con", {
      init: true,
      preventInteractionOnTransition: true,
      followFinger: false,
      speed: 500,
      // virtualTranslate: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      // autoplay: {
      //   delay: 7000,
      // },
      // navigation: {
      //   nextEl: ".ar-right",
      //   prevEl: ".ar-left",
      // },
      on: {
        init: function (swiper) {
          let banner_index = this.realIndex;
          change_banner(".chios-swithh-cc , .the-chios-cc-2-iicon", banner_index);
        },
        transitionStart: function (swiper) {
          console.log(this.realIndex);
          let banner_index = this.realIndex;
          change_banner(".chios-swithh-cc , .the-chios-cc-2-iicon", banner_index);
          anim_choice(banner_index);
        },
      },
    });
    $(".chios-swithh-cc>div").click(function () {
      let $this = $(this);
      chios_swithh_con.slideTo($this.index());
    });
  }

  // cricle anime
  if (window.innerWidth > 999) {
    anime({
      targets: ".the-path-icon-i-w",
      rotate: "360deg",
      easing: "linear",
      duration: 72000,
      loop: true,
    });
    anime({
      targets: ".the-path-icon-i-w>div img",
      rotate: "-360deg",
      easing: "linear",
      duration: 72000,
      loop: true,
    });
  }

  // flip-section
  $(".the-flip-i-bb-cc > div:nth-child(1)").addClass("active");
  $(".the-flip-i-aa-bg > div:nth-child(1)").addClass("active");
  $(".the-flip-i-bb-bg > div:nth-child(1)").addClass("active");

  $(".the-flip-i-bb-cc > div").mouseenter(function () {
    let $this = $(this);
    let $index = $this.index();
    $this.siblings().removeClass("active");
    $this.addClass("active");
    $(".the-flip-i-aa-bg > div").removeClass("active");
    $(".the-flip-i-aa-bg > div").eq($index).addClass("active");
    $(".the-flip-i-bb-bg > div").removeClass("active");
    $(".the-flip-i-bb-bg > div").eq($index).addClass("active");
  });

  // they say
  $(".e-thsy-ii > div").mouseenter(function () {
    let $this = $(this).parent();
    let $index = $this.index();
    $this.siblings().removeClass("active");
    $this.siblings().addClass("blur");
    $this.removeClass("blur");
    $this.addClass("active");
  });
  $(".e-thsy-ii > div").mouseleave(function () {
    let $this = $(this).parent();
    let $index = $this.index();
    $this.siblings().removeClass("blur");
    $this.removeClass("active");
  });

  // they anmin
  if (window.innerWidth > 999) {
    anime({
      targets: ".ainimx",
      rotate: "360deg",
      easing: "linear",
      duration: 6000,
      loop: true,
    });
    anime({
      targets: ".ainimx > div",
      rotate: "-360deg",
      easing: "linear",
      duration: 6000,
      loop: true,
    });
  }

  // no-scroll-wrap
  function noscroll(time) {
    let $time = time ? time : 1500;
    $(".no-scroll-wrap").addClass("onon");
    setTimeout(function () {
      $(".no-scroll-wrap").removeClass("onon");
    }, $time);
  }
  // 限定数值在区间内
  function count_range(a, b, c) {
    c = c ? c : 0;
    if (a >= c && a <= b) {
      a = a;
    } else if (a < c) {
      a = c;
    } else if (a > b) {
      a = b;
    }
    return a;
  }

  // ss scroll
  function runSS() {
    if($('.Scroll-wrapper').length!==0){
        init_scroll(".Scroll-wrapper", 0.05, 0);
    }
    // Als_split(".the-real-wrapper > div", 0, 100);

    Als_parallax(".img_wrp_aim,.img_wrp_aim2,.img_wrp_aim4", 1, 0.05, 0.05, 0);
    Als_parallax(".img_wrp_aim3", 0, 0.05, 0.05, 0);

    Als_parallax(".opsparr", 0, 0.05, 0.05, 0);

    // reach
    Als_reach(".the-about-c1 , .the-about-c2 , .the-chios-cc-1 , .the-thsy-cc , .the-chios-cc-2-iicon , .anim_delay , .ccuom-num ", 0.85, 0.85, 0);
    Als_reach(".mjzst-5c-skt", 0.5, 0.5, 0);

    // 新增页面 date 12.30
    Als_reach("video.mtg_c_vdo", -0.5, -0.5, 0);

    // 全球生态
    Als_sticky(".qqst-2n-skt", 1, 0.05, 0.05, 0);
    // 奖项
    Als_sticky(".mjzst-5c-skt", 1, 0.05, 0.05, 0);
    // 案例
    Als_sticky(".mjzst-6c-skt", 1, 0.05, 0.05, 0);
    // 创意
    Als_sticky(".szcy_stk_cc", 1, 0.05, 0.05, 0);
    Als_parallax(".szcy_stk_cc02", 1, 0.05, 0.05, 0);
    // 公司简介
    Als_sticky(".about_b.skytk-c", 1, 0.05, 0.05, 0);
    Als_sticky(".abab2_wom_map_stickyy_ssw", 1, 0.05, 0.05, 0);
    Als_parallax(".about_banner_w_cc , .about_banner_w_cc > div", 1, 0.05, 0.05, 0);
    // 技术优势
    Als_sticky(".jsys-3nc.stickkn", 1, 0.05, 0.05, 0);

    if (window.innerWidth > 999) {
      Als_sticky(".the-banner , .ny_1_banner", 0, 0.05, 0.05, 0);
      //   home
      Als_sticky(".the-flip-lop>div", 1, 0.05, 0.05, 0);
      Als_parallax(".the-flip-i-aa-bg , .the-about > .full-img-wrap", 1, 0.05, 0.05, 0);
      Als_parallax(".pf-bg-1 > div , .the-chios-bg , .the-thsy-bg", 0, 0.05, 0.05, 0);
      // mouse
      Als_mouse(".search_btn , .lang_btn", "30", 0.05, 0.05, 0, 0);
      Als_mouse(".iiiimg-c > div", "50", 0.02, 0.02, 0, 0);
      // 应用出海
      Als_sticky(".yych-n-sty-bgg", 1, 0.05, 0.05, 0);

      // 新增页面 date 12.30
      Als_sticky(".mtgw2", 1, 0.05, 0.05, 0);
      Als_mouse(".mtg_ipad_w", 1, 0.02, 0.02, 0, 0);
      Als_parallax(".sinoclick-page", 0, 0.05, 0.05, 0);
      Als_parallax(".mtg_2_w", 1, 0.05, 0.05, 0);
    }
  }

  // 第1屏anime
  var duration_p = 1000;
  var easing_p = "cubicBezier(0.23, 0.22, 0.25, 1)";

  if (window.innerWidth > 999) {
    var tl_anime_a1 = anime.timeline({
      easing: easing_p,
      duration: duration_p,
      autoplay: false,
      delay: 0,
    });
    tl_anime_a1
      .add(
        {
          targets: ".the-flip-ii-1 .the-flip-i-aa",
          translateX: ["0%", "-50%"],
        },
        0
      )
      .add(
        {
          targets: ".the-flip-ii-1 .the-flip-i-aa > div",
          translateX: ["0%", "25%"],
        },
        0
      )
      .add(
        {
          targets: ".the-flip-ii-1 .the-flip-i-bb",
          translateX: ["100%", "0%"],
        },
        0
      )
      .add(
        {
          targets: ".the-flip-ii-1 .the-flip-i-bb > .the-flip-i-bb-bg",
          translateX: ["-50%", "0%"],
        },
        0
      )
      .add(
        {
          targets: ".the-flip-ii-1 .the-flip-i-bb > .the-flip-i-bb-cc > .the-flip-i-bb-c1",
          translateX: ["60%", "0%"],
          delay: anime.stagger(300),
        },
        0
      )
      .add(
        {
          targets: ".the-flip-ii-1 .the-flip-i-bb > .the-flip-i-bb-cc > .the-flip-i-bb-c1 .the-ff-c1-c > div > div",
          translateX: ["80px", "0%"],
          delay: anime.stagger(80),
        },
        0
      );

    // 第2屏anime
    var tl_anime_b1 = anime.timeline({
      easing: easing_p,
      duration: duration_p,
      autoplay: false,
      delay: 100,
    });
    tl_anime_b1
      .add(
        {
          targets: ".flip-ii-e-2 .the-flip-i2-aa",
          translateY: ["100%", "0%"],
        },
        0
      )
      .add(
        {
          targets: ".flip-ii-e-2 .the-flip-i2-aa > div",
          translateY: ["-60%", "0%"],
        },
        0
      )
      .add(
        {
          targets: ".flip-ii-e-2 .the-flip-i2-aa > div > div",
          scale: ["1.2", "1"],
        },
        0
      )
      .add(
        {
          targets: ".flip-ii-e-2 .the-flip-i2-bb",
          translateY: ["-100%", "0%"],
        },
        0
      )
      .add(
        {
          targets: ".flip-ii-e-2 .the-flip-i2-bb > div",
          translateY: ["60%", "0%"],
        },
        0
      );
    var tl_anime_b2 = anime.timeline({
      easing: easing_p,
      duration: duration_p,
      autoplay: false,
      delay: 100,
    });
    tl_anime_b2
      .add(
        {
          targets: ".the-flip-i2-sicc .ffc-logo , .the-flip-i2-sicc h3.ffc-tt, .the-flip-i2-sicc p.subtt, .the-flip-i2-sicc .ffc-more",
          translateY: ["-80px", "0px"],
          opacity: ["0", "1"],
          delay: anime.stagger(200, { start: duration_p * 0.5, from: "last" }),
        },
        0
      )
      .add(
        {
          targets: ".the-flip-i2-bb-22i > div > div",
          translateX: ["-60px", "0px"],
          opacity: ["0", "1"],
          delay: anime.stagger(200, { start: duration_p * 0.8, from: "last" }),
        },
        0
      )
      .add(
        {
          targets: ".flip-ii-e-2 .the-flip-i2-bb > div .ii-2fb-bg:nth-child(2)",
          translateY: ["-18%", "0%"],
          translateX: ["14%", "0%"],
          opacity: ["0", "1"],
          delay: anime.stagger(200, { start: duration_p * 0.6 }),
        },
        0
      )
      .add(
        {
          targets: ".flip-ii-e-2 .the-flip-i2-bb > div .ii-2fb-bg:nth-child(3)",
          translateY: ["18%", "0%"],
          translateX: ["-14%", "0%"],
          opacity: ["0", "1"],
          delay: anime.stagger(200, { start: duration_p * 0.7 }),
        },
        0
      );

    // 第3屏anime
    var tl_anime_c1 = anime.timeline({
      easing: easing_p,
      duration: duration_p,
      autoplay: false,
      delay: 100,
    });
    tl_anime_c1
      .add(
        {
          targets: ".flip-ii-e-3 .the-flip-i2-bb",
          translateY: ["100%", "0%"],
        },
        0
      )
      .add(
        {
          targets: ".flip-ii-e-3 .the-flip-i2-bb > div",
          translateY: ["-60%", "0%"],
        },
        0
      )
      .add(
        {
          targets: ".flip-ii-e-3 .the-flip-i2-bb > div > div",
          scale: ["1.2", "1"],
        },
        0
      )
      .add(
        {
          targets: ".flip-ii-e-3 .the-flip-i2-aa",
          translateY: ["-100%", "0%"],
        },
        0
      )
      .add(
        {
          targets: ".flip-ii-e-3 .the-flip-i2-aa > div",
          translateY: ["60%", "0%"],
        },
        0
      );
    var tl_anime_c2 = anime.timeline({
      easing: easing_p,
      duration: duration_p,
      autoplay: false,
      delay: 100,
    });
    tl_anime_c2.add(
      {
        targets: ".the-flip-i2-sicc2 .ffc-logo , .the-flip-i2-sicc2 h3.ffc-tt, .the-flip-i2-sicc2 p.subttSub, .the-flip-i2-sicc2 .subtt2ii > div, .the-flip-i2-sicc2 .ffc-more",
        translateY: ["80px", "0px"],
        opacity: ["0", "1"],
        delay: anime.stagger(200, { start: duration_p * 0.5 }),
      },
      0
    );
  }

  if (window.innerWidth > 999) {
    var r_anime_1 = anime
      .timeline({
        easing: easing_1,
        duration: 1500,
        delay: 200,
        autoplay: false,
      })
      .add(
        {
          targets: ".the-about-c1 .text-title_1",
          translateX: ["60px", "0px"],
          opacity: ["0", "1"],
        },
        0
      )
      .add(
        {
          targets: ".the-about-c1 .text-title_2 div:nth-child(1)",
          translateX: ["-60px", "0px"],
          opacity: ["0", "1"],
        },
        100
      )
      .add(
        {
          targets: ".the-about-c1 .text-title_2 div:nth-child(2)",
          translateX: ["60px", "0px"],
          opacity: ["0", "1"],
        },
        200
      )
      .add(
        {
          targets: ".the-about-c1 .hd3 p , .the-about-c1 .text-more , .the-about .dr-line",
          translateY: ["60px", "0px"],
          opacity: ["0", "1"],
          delay: anime.stagger(120),
        },
        400
      );
    var r_anime_2 = anime
      .timeline({
        easing: easing_1,
        duration: 1500,
        delay: 200,
        autoplay: false,
      })
      .add(
        {
          targets: ".the-about-c2 .text-title_1",
          translateX: ["60px", "0px"],
          opacity: ["0", "1"],
        },
        0
      )
      .add(
        {
          targets: ".the-about-c2 .icons-list-c > div .iiiimg-c , .the-about-c2 .icons-list-c > div .iii-text h4 , .the-about-c2 .icons-list-c > div .iii-text p",
          translateX: ["60px", "0px"],
          opacity: ["0", "1"],
          delay: anime.stagger(60, { from: "first" }),
        },
        0
      );
    var r_anime_3 = anime
      .timeline({
        easing: easing_1,
        duration: 1500,
        delay: 200,
        autoplay: false,
      })
      .add(
        {
          targets: ".the-chios-cc-1 .the-text-c > div , .the-chios-cc-1 .chios-swithh , .the-chios-cc-1 .swiper-slide-active .chios-swithh-con-i > div",
          translateY: ["60px", "0px"],
          opacity: ["0", "1"],
          delay: anime.stagger(80, { from: "first" }),
        },
        0
      )
      .add(
        {
          targets: ".the-chios-cc-1 .swiper-slide-active .swithh-co-icon-c > div > div , .the-chios-cc-2-iicon .active .the-path-icon-i > div",
          scale: ["0.5", "1"],
          opacity: ["0", "1"],
          delay: anime.stagger(60, { from: "first" }),
        },
        400
      );
    var r_anime_4 = anime
      .timeline({
        easing: easing_1,
        duration: 1500,
        delay: 200,
        autoplay: false,
      })
      .add(
        {
          targets: ".the-thsy-cc .the-text-c > div",
          translateY: ["60px", "0px"],
          opacity: ["0", "1"],
          delay: anime.stagger(120, { from: "first" }),
        },
        0
      )
      .add(
        {
          targets: ".the-thsy-cc .e-thsy-ii",
          translateY: ["0px", "0px"],
          scale: ["0.6", "1"],
          // opacity: ["0", "1"],
          delay: anime.stagger(120, { from: "first" }),
          duration: 3000,
        },
        200
      );
  }

  function run_Reach_anime() {
    if (window.innerWidth > 999) {
      $(".the-about-c1").each(function () {
        let $this = $(this);
        let $act = $this.attr("data-active_y");
        if ($act == "1") {
          if ($this.attr("data-act") == undefined || $this.attr("data-act") == 0) {
            console.log("run anime");
            //
            r_anime_1.play();
            //
            $this.attr("data-act", 1);
          }
        } else if ($act == "0") {
          $this.attr("data-act", 0);
        }
      });
      $(".the-about-c2").each(function () {
        let $this = $(this);
        let $act = $this.attr("data-active_y");
        if ($act == "1") {
          if ($this.attr("data-act") == undefined || $this.attr("data-act") == 0) {
            console.log("run anime");
            //
            r_anime_2.play();
            //
            $this.attr("data-act", 1);
          }
        } else if ($act == "0") {
          $this.attr("data-act", 0);
        }
      });
      $(".the-chios-cc-1").each(function () {
        let $this = $(this);
        let $act = $this.attr("data-active_y");
        if ($act == "1") {
          if ($this.attr("data-act") == undefined || $this.attr("data-act") == 0) {
            console.log("run anime");
            //
            r_anime_3.play();
            //
            $this.attr("data-act", 1);
          }
        } else if ($act == "0") {
          $this.attr("data-act", 0);
        }
      });
      $(".the-thsy-cc").each(function () {
        let $this = $(this);
        let $act = $this.attr("data-active_y");
        if ($act == "1") {
          if ($this.attr("data-act") == undefined || $this.attr("data-act") == 0) {
            console.log("run anime");
            //
            r_anime_4.play();
            //
            $this.attr("data-act", 1);
          }
        } else if ($act == "0") {
          $this.attr("data-act", 0);
        }
      });
    }
    $(".anim_delay").each(function () {
      let $this = $(this);
      let $act = $this.attr("data-active_y");
      if ($act == "1") {
        if ($this.attr("data-act") == undefined || $this.attr("data-act") == 0) {
          console.log("run anime");
          $this.attr("data-act", 1);
          $this.addClass("active_y");
        }
      } else if ($act == "0") {
        $this.attr("data-act", 0);
        $this.removeClass("active_y");
      }
    });

    // 新增页面 date 12.30
    $("video.mtg_c_vdo").each(function () {
      let $this = $(this);
      let $act = $this.attr("data-active_y");
      if ($act == "1") {
        if ($this.attr("data-act") == undefined || $this.attr("data-act") == 0) {
          console.log("run anime");
          $this.attr("data-act", 1);
          $this.addClass("active_y");
          $("video.mtg_c_vdo").trigger("play");
          $this[0].play();
        }
      } else if ($act == "0") {
        $this.attr("data-act", 0);
        $this.removeClass("active_y");
      }
    });
  }

  // 数字创意 anime
  var tl_anime_szz1 = anime.timeline({
    easing: "linear",
    duration: 4000,
    autoplay: false,
    delay: 100,
  });
  tl_anime_szz1
    .add(
      {
        targets: `.uonm-1`,
        keyframes: [
          { left: ["58%", "0%"], backgroundColor: "#FFF" },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
        ],
      },
      0
    )
    .add(
      {
        targets: `.szcy_sogeimg-img[data-imgset="zza-1a"] img`,
        keyframes: [
          { opacity: 0, translateY: "-40px" },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
        ],
      },
      0
    )
    .add(
      {
        targets: `.szcy_sogeimg-img[data-imgset="zza-1a"]`,
        keyframes: [
          { opacity: 0, top: ["-10%", "-15%"] },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
        ],
      },
      0
    )
    .add(
      {
        targets: `.szcy_sogeimg-img[data-imgset="zza-1b"] img`,
        keyframes: [{ opacity: 0, translateY: "40px" }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }],
      },
      0
    )
    .add(
      {
        targets: `.szcy_sogeimg-img[data-imgset="zza-1b"]`,
        keyframes: [
          { opacity: 0, bottom: ["-26%", "-28%"] },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
        ],
      },
      0
    )
    .add(
      {
        targets: `.szcy_stk_asb.anims-1`,
        keyframes: [{ opacity: 0, translateY: "-=40%", easing: "linear" }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }],
      },
      0
    )

    .add(
      {
        targets: `.uonm-1 > div > *`,
        keyframes: [
          { opacity: 1 },
          { translateY: "-40px", opacity: 0, delay: anime.stagger(300) },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
        ],
      },
      0
    )
    .add(
      {
        targets: `.szcy_sogeimg-img[data-imgset="zza-1"]`,
        keyframes: [{ opacity: 1 }, { opacity: 1 }, { opacity: 1 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }],
      },
      0
    )
    .add(
      {
        targets: `.szcy_stk_asb.anims-4`,
        keyframes: [
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 0, translateY: ["0px", "-50px"] },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
        ],
      },
      0
    )
    .add(
      {
        targets: `.szcy_stk_asb.anims-2`,
        keyframes: [{ opacity: 0 }, { opacity: 0 }, { opacity: 1, translateY: ["10%", "0%"], easing: "linear" }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 }],
      },
      0
    )
    .add(
      {
        targets: `.szcy_stk_zs_bg .ssgtk_zs_img:nth-child(1)`,
        keyframes: [
          { opacity: [0, 0] },
          { opacity: 0 },
          { opacity: 1, translateX: ["30%", "0%"], scale: [0.8, 1], translateY: ["100%", "0%"] },
          { opacity: 0.8, scale: 1.15, translateX: "-10%", translateY: "-20%" },
          { opacity: 0.5, scale: 1.3, translateX: "-20%", translateY: "-30%" },
          { opacity: 0.25 },
          { opacity: 0.25 },
          { opacity: 0.25 },
        ],
      },
      0
    )
    .add(
      {
        targets: `.szcy_stk_zs_bg .ssgtk_zs_img:nth-child(2)`,
        keyframes: [
          { opacity: [0, 0] },
          { opacity: 0 },
          { opacity: 1, translateY: ["10%", "0%"] },
          { opacity: 0.8, scale: 1.15, translateY: "-10%" },
          { opacity: 0.5, scale: 1.3, translateY: "-20%" },
          { opacity: 0.4 },
          { opacity: 0.4 },
          { opacity: 0.4 },
        ],
      },
      0
    )
    .add(
      {
        targets: `.anims-2 .szcy_sektext2 > *`,
        keyframes: [
          { opacity: 0 },
          { opacity: 1, translateY: ["80px", "0px"], delay: anime.stagger(200) },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 1 },
        ],
      },
      0
    )
    .add(
      {
        targets: `.uonm-2 > div > div`,
        keyframes: [
          { opacity: 0 },
          { opacity: 0 },
          { translateY: ["40px", "0px"], opacity: 1, delay: anime.stagger(200) },
          { opacity: 1 },
          { opacity: 1 },
          { translateY: ["0px", "-10px"], opacity: 0, delay: anime.stagger(20) },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
        ],
      },
      0
    )
    .add(
      {
        targets: `.szcy_stk_asb.anims-5`,
        keyframes: [
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 1, translateY: ["50px", "0px"] },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 1 },
        ],
      },
      0
    )
    .add(
      {
        targets: `.szcy_sogeimg-img[data-imgset="zza-5"]`,
        keyframes: [{ opacity: 1 }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }],
      },
      0
    )
    .add(
      {
        targets: `.szcy_sogeimg-img[data-imgset="zza-5a"] , .szcy_sogeimg-img[data-imgset="zza-5b"]`,
        keyframes: [
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 1, translateY: ["50px", "0px"], delay: anime.stagger(200, { start: 300 }) },
          { opacity: 1 },
          { opacity: 0, translateY: ["0px", "-20px"], delay: anime.stagger(80) },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
        ],
      },
      0
    )
    .add(
      {
        targets: `.szcy_stk_asb.anims-6`,
        keyframes: [{ opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 }],
      },
      0
    )
    .add(
      {
        targets: `.szcy_sogeimg2_ffbgc`,
        keyframes: [
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 1, translateY: ["25%", "12.5%"] },
          { opacity: 1, translateY: ["12.5%", "0%"], easing: "linear" },
          { opacity: 1, translateY: "-25%", easing: "linear" },
          { opacity: 1, translateY: "-55%" },
        ],
      },
      0
    );
  // 公司简介
  var tl_anime_abz1 = anime.timeline({
    easing: "linear",
    duration: 1000,
    autoplay: false,
    delay: 0,
  });
  tl_anime_abz1
    .add(
      {
        targets: `.ab_bnn_mask_c`,
        keyframes: [
          {
            scale: ["1", "48"],
          },
        ],
      },
      100
    )
    .add(
      {
        targets: `.ab_bnn_testxa>div`,
        keyframes: [
          {
            opacity: ["1", "0"],
            translateY: ["0px", "200px"],
          },
          { opacity: "0" },
          { opacity: "0" },
          { opacity: "0" },
        ],
      },
      0
    );

  var tl_anime_abz2 = anime.timeline({
    easing: "linear",
    duration: 1000,
    autoplay: false,
    delay: 0,
  });
  tl_anime_abz2.add(
    {
      targets: `.about_banner_w_cc .banner_ny_title-1 > div > *`,
      keyframes: [
        {
          opacity: ["0", "1"],
          translateY: ["100px", "0px"],
          delay: anime.stagger(200, { from: "first" }),
        },
      ],
    },
    0
  );
  var tl_anime_abz3 = anime.timeline({
    easing: "linear",
    duration: 800,
    autoplay: false,
    delay: 0,
  });
  tl_anime_abz3.add(
    {
      targets: `.about_banner_w_cp1 > div > *`,
      keyframes: [
        {
          opacity: ["0", "1"],
          translateY: ["100px", "0px"],
          delay: anime.stagger(200, { from: "first" }),
        },
      ],
    },
    0
  );
  var tl_anime_abz4 = anime.timeline({
    easing: "linear",
    duration: 1000,
    autoplay: false,
    delay: 0,
  });
  tl_anime_abz4.add(
    {
      targets: `.about_banner_w_cp2 > div > * , .about_banner_w_cp2 .abosl-h > div`,
      keyframes: [
        {
          opacity: ["0", "1"],
          translateY: ["30px", "0px"],
          delay: anime.stagger(100, { from: "first" }),
        },
      ],
    },
    0
  );

  var tl_anime_abz5 = anime.timeline({
    easing: "linear",
    duration: 1000,
    autoplay: false,
  });
  tl_anime_abz5
    .add(
      {
        targets: `.jsys-sl2_bgi[data-ts="1"]`,
        keyframes: [
          {
            opacity: ["1", "1"],
            translateY: ["0%", "-20%"],
            delay: 200,
          },
        ],
      },
      0
    )
    .add(
      {
        targets: `.jsys-sl2_bgi[data-ts="2"]`,
        keyframes: [
          {
            opacity: ["1", "1"],
            translateY: ["100%", "0%"],
            delay: 200,
          },
        ],
      },
      0
    )
    .add(
      {
        targets: `.jsys-sl2_bgi[data-ts="2"] img`,
        keyframes: [
          {
            opacity: ["1", "1"],
            translateY: ["-60%", "0%"],
            delay: 200,
          },
        ],
      },
      0
    );

  var tl_anime_abz6 = anime.timeline({
    easing: "linear",
    duration: 1000,
    autoplay: false,
  });
  tl_anime_abz6
    .add(
      {
        targets: `.jsys-sl-tsli[data-ts="1"] >div>div`,
        keyframes: [
          {
            opacity: ["1", "0"],
            translateY: ["0px", "-100px"],
            delay: 200,
          },
          { opacity: "0" },
          { opacity: "0" },
        ],
      },
      0
    )
    .add(
      {
        targets: `.jsys-sl-tsli[data-ts="2"] >div>div`,
        keyframes: [
          { opacity: "0" },
          {
            opacity: ["0", "1"],
            translateY: ["100px", "0px"],
            delay: 0,
          },
          { opacity: "1" },
        ],
      },
      0
    );

  function run_Als_run() {
    let scbar = Scrollbar.get(document.querySelector(".Scroll-wrapper"));
    // $("body").height(als.scroll_height);
    // split
    $(".the-real-wrapper > div").each(function () {
      let $this = $(this);
      $this.css("transform", `perspective(1000px) translate3d(0px, ${$this.attr("data-spl_yy") * 1}px, 0px)`);
    });
    // countup
    $(".ccuom-num").each(function () {
      let $this = $(this);
      $this.css("min-width", `${$this.width()}px`);
      if ($this.attr("data-active_y") == 1 && !$this.hasClass("onreach")) {
        countupp(".ccuom-num", 123);
        $this.addClass("onreach");
      } else if ($this.attr("data-active_y") == 0) {
        $this.removeClass("onreach");
      }
    });

    // reach
    $(".mjzst-5c-skt").each(function () {
      let $this = $(this);
      let $bgbg = $this.find("[data-gbg]").attr("data-gbg");
      $this.find("[data-gbg]").css("background-color", `${$bgbg}`);
      if (als.scroll_width > 999) {
        if ($this.attr("data-active_y") == 1 && !$this.hasClass("sticky-out")) {
          $(".the-main-wrapper").addClass("change_bg");
          $(".the-main-wrapper").css("background", `${$bgbg}`);
        } else {
          $(".the-main-wrapper").removeClass("change_bg");
          $(".the-main-wrapper").css("background", `#fff`);
        }
      } else {
        $(".the-main-wrapper").addClass("change_bg");
      }
    });

    // 新增页面 date 12.30
    $(".mtg_2_w").each(function () {
      let $this = $(this);
      // let $parent = $this.parents(".sticky-elm");
      $this.find(".mtg_2_video").css("transform", `translate3d(${$this.attr("data-fx") * -1}px, ${$this.attr("data-yy") * -1}px, 0px)`);
    });
    $(".mtgw2").each(function () {
      let $this = $(this);
      let $parent = $this.parent();
      let child_h = $this.outerHeight();
      $parent.height(child_h * 3);
      $this.css("transform", `translate3d(${$this.attr("data-fx") * -1}px, ${$this.attr("data-yy") * -1}px, 0px)`);
      let $progress = $this.attr("data-progress_f");
      if ($progress <= 0.33 && $progress > -0.001) {
        let $rg = $progress * 3;
        $this.find(".mtgw2cstkc.mtgstk1").css("transform", `translate3d(0px, ${$rg * -100}%, 0px)`);
        $this.find(".mtgw2cstkc.mtgstk1").css("opacity", `${3 - $rg * 3.2}`);
        $this.find(".mtgw2cstkc.mtgstk2").removeClass("active");
      } else if ($progress <= 0.66 && $progress > 0.001) {
        let $rg = ($progress - 0.33) * 3;
        $this.find(".mtgw2cstkc.mtgstk2").css("transform", `translate3d(0px, ${$rg * -100}%, 0px)`);
        $this.find(".mtgw2cstkc.mtgstk2").css("opacity", `${3 - $rg * 3.2}`);
      } else if ($progress <= 1 && $progress > 0.001) {
        let $rg = ($progress - 0.66) * 3;
      }

      if ($progress <= 0.5 && $progress > 0.27) {
        $this.find(".mtgw2cstkc.mtgstk2").addClass("active");
        $this.find(".mtgw2cstkc.mtgstk3").removeClass("active");
      } else if ($progress <= 1 && $progress > 0.5) {
        $this.find(".mtgw2cstkc.mtgstk3").addClass("active");
      }
    });
    $(".mtg_ipad_w").each(function () {
      let $this = $(this);
      // $this.css("transform", `translate3d(${$this.attr("data-mxx") * 0.25}px, ${$this.attr("data-myy") * 0.25}px, 0px)`);
      $this.css("transform", `perspective(1000px) rotateX(${$this.attr("data-myy") * -0.01}deg) rotateY(${$this.attr("data-mxx") * 0.01}deg)`);
    });
    $(".sinoclick-page").each(function () {
      let $this = $(this);
      $this.find(".bn_bg.full-img-wrap").css("transform", `translate3d(0px, ${$this.attr("data-yy") * -0.4}px, 0px)`);
    });

    // sticky
    $(".the-flip-lop > div").each(function () {
      let $this = $(this);
      let $parent = $this.parents(".sticky-elm");
      $this.css("transform", `translate3d(${$this.attr("data-fx") * -1}px, ${$this.attr("data-yy") * -1}px, 0px)`);
    });

    // 应用出海
    $(".yych-n-sty-bgg").each(function () {
      let $this = $(this);
      $this.css("transform", `translate3d(${$this.attr("data-fx") * -1}px, ${$this.attr("data-yy") * -1}px, 0px)`);
      let $datata = $(`[data-yych-stk="2"] .yych-n-sty-cc .n_j_3p-ctsxt.jsys-text`).attr("data-active_y");
      if ($datata == "1") {
        $this.addClass("onreach2");
      } else {
        $this.removeClass("onreach2");
      }
    });
    // 地图
    $(".abab2_wom_map_stickyy_ssw").each(function () {
      let $this = $(this);
      let $parent = $this.parent();
      $this.css("transform", `translate3d(${$this.attr("data-fx") * -1}px, ${$this.attr("data-yy") * -1}px, 0px)`);
    });
    // 全球生态
    $(".qqst-2n-skt").each(function () {
      let $this = $(this);
      let $parent = $this.parent();
      let child_w = $this.find(".the-curps-listwcw").width();
      $parent.height(child_w);
      $this.css("transform", `translate3d(${$this.attr("data-fx") * -1}px, ${$this.attr("data-yy") * -1}px, 0px)`);
    });
    $(".the-curps-listwcw").each(function () {
      let $this = $(this);
      let $width = $this.width();
      let $parent_d = $this.parents(".qqst-2n-skt");
      let $parent_w = $this.parent().width();
      $this.css("transform", `translate3d(${$parent_d.attr("data-progress_f") * ($width - $parent_w) * -1}px, 0px, 0px)`);
    });
    // 奖项
    $(".mjzst-5c-skt").each(function () {
      let $this = $(this);
      let $parent = $this.parent();
      let child_w = $this.find(".mjzst-5-listc").width();
      $parent.height(child_w);
      $this.css("transform", `translate3d(${$this.attr("data-fx") * -1}px, ${$this.attr("data-yy") * -1}px, 0px)`);
    });
    $(".mjzst-5-listc").each(function () {
      let $this = $(this);
      let $width = $this.width();
      let $parent_d = $this.parents(".mjzst-5c-skt");
      let $parent_w = $this.parent().width();
      $this.css("transform", `translate3d(${$parent_d.attr("data-progress_f") * ($width - $parent_w) * -1}px, 0px, 0px)`);
    });
    // 案例
    $(".mjzst-6c-skt").each(function () {
      let $this = $(this);
      let $parent = $this.parent();
      let child_w = $this.find(".mjzst-6-listc").width();
      if ($this.height() < child_w) {
        $parent.height(child_w);
      }
      $this.css("transform", `translate3d(${$this.attr("data-fx") * -1}px, ${$this.attr("data-yy") * -1}px, 0px)`);
    });
    $(".mjzst-6-listc").each(function () {
      let $this = $(this);
      let $width = $this.width();
      let $parent_d = $this.parents(".mjzst-6c-skt");
      let $parent_w = $this.parent().width();
      $this.css("transform", `translate3d(${$parent_d.attr("data-progress_f") * ($width - $parent_w) * -1}px, 0px, 0px)`);
    });
    // 数字创意服务
    $(".szcy_stk_cc").each(function () {
      let $this = $(this);
      let $parent = $this.parent();
      let child_w = $this.height();
      $parent.height(child_w * 5);
      $this.css("transform", `translate3d(${$this.attr("data-fx") * -1}px, ${$this.attr("data-yy") * -1}px, 0px)`);
      let $progress = $this.attr("data-progress_f");
      tl_anime_szz1.seek($progress * tl_anime_szz1.duration);
    });
    // 技术优势
    $(".jsys-3nc.stickkn").each(function () {
      let $this = $(this);
      let $parent = $this.parent();
      let child_w = $this.height();
      $parent.height(child_w * 3);
      $this.css("transform", `translate3d(${$this.attr("data-fx") * -1}px, ${$this.attr("data-yy") * -1}px, 0px)`);
      let $progress = $this.attr("data-progress_f");
      tl_anime_abz5.seek($progress * tl_anime_abz5.duration);
      tl_anime_abz6.seek($progress * tl_anime_abz5.duration);
      if ($progress < 0.5) {
        $(`.jsys-sl-tsli[data-ts="1"]`).css("z-index", "10");
        $(`.jsys-sl-tsli[data-ts="2"]`).css("z-index", "9");
        $(`.jsys-sl-tsli[data-ts="3"]`).css("z-index", "9");
        change_banner(".jsys-sl-pagin-o", 0);
      } else if ($progress > 0.5) {
        $(`.jsys-sl-tsli[data-ts="2"]`).css("z-index", "10");
        $(`.jsys-sl-tsli[data-ts="3"]`).css("z-index", "9");
        change_banner(".jsys-sl-pagin-o", 1);
      }
    });
    // 公司简介
    $(".banner_background.about_b.skytk-c").each(function () {
      let $this = $(this);
      $this.css("transform", `translate3d(${$this.attr("data-fx") * -1}px, ${$this.attr("data-yy") * -1}px, 0px)`);
    });
    $(".about_banner_w .about_banner_w_cc").each(function () {
      let $this = $(this);
      let $parent = $this.parent();
      let child_w = $this.height();
      $parent.height(child_w + als.wrapper_height * 2);
      $(".blank-height").height(als.wrapper_height * 2);
    });
    $(".ab_bnn_mask_c").each(function () {
      let $this = $(this);
      let $parent = $this.parents(".about_b");
      if ($parent.attr("data-yy") * -1 <= als.wrapper_height / 0.35) {
        let $progress = (($parent.attr("data-yy") * -1) / als.wrapper_height) * 0.35;
        tl_anime_abz1.seek($progress * tl_anime_abz1.duration);
      }
      // $this.css("transform", `scale(${$parent.attr("data-progress_f") * 4 + 1})`);
    });
    $(".about_banner_w_cc .banner_ny_title-1").each(function () {
      let $this = $(this);
      let $progress = $this.attr("data-pg_y");
      tl_anime_abz2.seek($progress * tl_anime_abz2.duration);
    });
    $(".about_banner_w_cc .about_banner_w_cp1").each(function () {
      let $this = $(this);
      let $progress = $this.attr("data-pg_y");
      tl_anime_abz3.seek($progress * tl_anime_abz3.duration);
    });
    $(".about_banner_w_cc .about_banner_w_cp2").each(function () {
      let $this = $(this);
      let $progress = $this.attr("data-pg_y");
      tl_anime_abz4.seek($progress * tl_anime_abz4.duration);
    });
    // parallax
    $(`.szcy_sogeimg-img[data-imgset="zza-1a"]`).each(function () {
      let $this = $(this);
      let $parent = $this.parents(".szcy_stk_cc02");
      $this.css("transform", `perspective(1000px) translate3d(${$parent.attr("data-fy") * -0.08}px, 0px, 0px)`);
    });
    $(`.szcy_sogeimg-img[data-imgset="zza-1b"]`).each(function () {
      let $this = $(this);
      let $parent = $this.parents(".szcy_stk_cc02");
      $this.css("transform", `perspective(1000px) translate3d(0px, ${$parent.attr("data-fy") * 0.15}px, 0px)`);
    });
    // aim
    $(`.img_wrp_aim>*`).each(function () {
      let $this = $(this);
      let $parent = $this.parent();
      $this.css("transform", `perspective(1000px) translate3d(0px, 0px, ${$parent.attr("data-fy") * 0.15}px)`);
    });
    $(`.img_wrp_aim2>*`).each(function () {
      let $this = $(this);
      let $parent = $this.parent();
      $this.css("transform", `perspective(1000px) translate3d(${$parent.attr("data-fy") * -0.15}px, 0px, 0px)`);
    });
    $(`.img_wrp_aim3`).each(function () {
      let $this = $(this);
      let $parent = $this;
      $this.css("transform", `perspective(1000px) translate3d(0px, ${$parent.attr("data-fy") * 0.15}px, 0px)`);
    });
    $(`.img_wrp_aim4`).each(function () {
      let $this = $(this);
      let $parent = $this;
      $this.css("transform", `perspective(1000px) translate3d(${$parent.attr("data-fy") * 0.15}px, 0px, 0px)`);
    });

    // mouse
    $(".search_btn , .lang_btn").each(function () {
      let $this = $(this);
      $this.css("transform", `translate3d(${$this.attr("data-mxx") * 0.5}px, ${$this.attr("data-myy") * 0.5}px, 0px)`);
    });
    $(".iiiimg-c > div").each(function () {
      let $this = $(this);
      $this.css("transform", `translate3d(${$this.attr("data-mxx") * 0.25}px, ${$this.attr("data-myy") * 0.25}px, 0px)`);
    });
    // float par
    $(".pf-bg-1 > div").each(function () {
      let $this = $(this);
      let $parent = $this;
      $this.css(
        "transform",
        `perspective(1000px) translate3d(${($parent.attr("data-fy") - window.innerHeight / 2) * -0.25}px, ${($parent.attr("data-fy") - window.innerHeight / 2) * -0.2}px, ${
          ($parent.attr("data-fy") - window.innerHeight / 2) * -0.5
        }px)`
      );
    });
    $(".the-banner").each(function () {
      let $this = $(this);
      let $parent = $this;
      if ($parent.attr("data-yy") < 1000) {
        $this.css("transform", `perspective(1000px) translate3d(0px, ${$parent.attr("data-yy") * 0.4}px, 0px)`);
      }
    });
    $(".banner_content , .banner_tumb").each(function () {
      let $this = $(this);
      let $parent = $this.parents(".the-banner");
      if ($parent.attr("data-yy") < 1000) {
        $this.css("transform", `perspective(1000px) translate3d(0px, ${$parent.attr("data-yy") * -0.4}px, 0px)`);
      }
    });
    // nybanner
    $(".ny_1_banner.bn-a3.bn-szcy").each(function () {
      let $this = $(this);
      let $parent = $this;
      if ($parent.attr("data-yy") < 1000) {
        $this.css("transform", `perspective(1000px) translate3d(0px, ${$parent.attr("data-yy") * 0.7}px, 0px)`);
      }
    });
    //
    $(".the-about > .full-img-wrap > img").each(function () {
      let $this = $(this);
      let $parent = $this.parent();
      $this.css("transform", `perspective(1000px) translate3d(calc(${$parent.attr("data-yy") * -0.15}px + 10%), 0px, ${$parent.attr("data-yy") * 0.1 + 150}px)`);
    });
    $(".the-chios-bg.full-img-wrap > img").each(function () {
      let $this = $(this);
      let $parent = $this.parent();
      $this.css("transform", `perspective(1000px) translate3d(0px, ${$parent.attr("data-yy") * -0.3}px, 0px)`);
    });

    // 第1屏
    $(".the-flip-ii-1.sticky-elm").each(function () {
      let $this = $(this);
      let $progress = $this.attr("data-progress_f");
      $progress = count_range($progress / 0.3333, 1, 0);
      tl_anime_a1.seek($progress * tl_anime_a1.duration);
      if ($progress > 0.5) {
        $this.addClass("on-reach");
      } else {
        $this.removeClass("on-reach");
      }
    });

    // 第1屏 parallax
    $(".the-flip-i-aa-bg > div").each(function () {
      let $this = $(this);
      let $parent = $this.parent();
      $this.css("transform", `perspective(1000px) translate3d(0px, 0px, ${$parent.attr("data-fy") * 0.15}px)`);
    });

    // 第2屏
    $(".flip-ii-e-2.sticky-elm").each(function () {
      let $this = $(this);
      let $progress = ($this.attr("data-progress_f") - 0.3333) * 1.1;
      $progress = count_range($progress / 0.3333, 1, 0);
      tl_anime_b1.seek($progress * tl_anime_b1.duration);
      tl_anime_b2.seek($progress * tl_anime_b2.duration);
      if ($progress > 0.5) {
        $this.addClass("on-reach");
      } else {
        $this.removeClass("on-reach");
      }
    });

    // 第3屏
    $(".flip-ii-e-3.sticky-elm").each(function () {
      let $this = $(this);
      let $progress = ($this.attr("data-progress_f") - 0.66667) * 1.1;
      $progress = count_range($progress / 0.3333, 1, 0);
      tl_anime_c1.seek($progress * tl_anime_c1.duration);
      tl_anime_c2.seek($progress * tl_anime_c2.duration);
      if ($progress > 0.5) {
        $this.addClass("on-reach");
      } else {
        $this.removeClass("on-reach");
      }
    });

    // stick-child-2
    $(".s-box-s-i-2").each(function () {
      let $this = $(this);
      let $parent = $this.parents(".sticky-elm");
      if ($parent.attr("data-progress") >= 0 && $parent.attr("data-progress") <= 0.3) {
        $this.css("width", `${($parent.attr("data-progress") / 0.3) * 50}%`);
      }
    });
  }

  // 判断上下滚动
  function reach_top(elm) {
    let scroll = als.scroll_y;
    let sllp1 = 0;
    function run_rrtt() {
      scroll = als.scroll_y;
      if (scroll > sllp1 && $(elm).attr("data-hrm") !== "1") {
        $(elm).attr("data-hrm", "1");
      } else if (scroll < sllp1 && $(elm).attr("data-hrm") == "1") {
        $(elm).attr("data-hrm", "0");
      }

      if (scroll > 0) {
        $(elm).attr("data-top", "0");
      } else {
        $(elm).attr("data-top", "1");
      }
      sllp1 = scroll;
      window.requestAnimationFrame(run_rrtt);
    }
    run_rrtt();
  }
  reach_top("body , .top_nav");

  // 加载二级导航
  function load_nav() {
    // let nav_wrap = `<div class="the-sec-nav-wrpper"></div>`;
    // $(".top_nav").append(nav_wrap);
    // $(".tn_menu_tree.deep-1 > .tn_menu_ii").each(function () {
    //   let $this = $(this);
    //   let $spec = $this.attr("data-des");
    //   let $id = $this.attr("data-cid");
    //   let $child_link = `/nav_lists/${$id}.html`;
    //   if ($spec == "_blank") {
    //     $this.children("a").attr("target", `${$spec}`);
    //   }
    //   if ($spec == "spec-nav") {
    //     let spec_w = `<div class="the-sec-nav-listw spec1-nav-a" data-pid="${$id}"></div>`;
    //     $(".the-sec-nav-wrpper").append(spec_w);
    //     $(`.the-sec-nav-listw[data-pid="${$id}"]`).load(`${$child_link} .nav_sec_list_i_1.spec-1-nav`, function () {
    //       console.log(`loaded ${$id}`);
    //       $(`.the-sec-nav-listw[data-pid="${$id}"] > div`).wrapAll("<div class='spec-1-nav-c' />");
    //       nav_switch();
    //       nav_anime();
    //     });
    //   } else {
    //     let spec_w = `<div class="the-sec-nav-listw spec1-nav-b" data-pid="${$id}"></div>`;
    //     $(".the-sec-nav-wrpper").append(spec_w);
    //     $(`.the-sec-nav-listw[data-pid="${$id}"]`).load(`${$child_link} .nav_sec_list_i_2.spec-2-nav`, function () {
    //       console.log(`loaded ${$id}`);
    //       $(`.the-sec-nav-listw[data-pid="${$id}"] > div`).wrapAll("<div class='spec-2-nav-ci2' />");
    //       let spec_w2 = `<div class="spec-2-nav-ci1"></div>`;
    //       $(`.the-sec-nav-listw[data-pid="${$id}"]`).append(spec_w2);
    //       $(`.the-sec-nav-listw[data-pid="${$id}"] .spec-2-nav-ci1`).load(`${$child_link} .nav_sec_2_des.spec-2-nav`, function () {
    //         $(`.the-sec-nav-listw[data-pid="${$id}"] > div`).wrapAll("<div class='spec-2-nav-cww' />");
    //         nav_anime();
    //       });
    //     });
    //   }
    // });
    nav_switch();
    nav_anime();
  }

  function nav_switch() {
    change_banner(".spec-1n-ppspw , .spec-1n-icon-1", 0);
    $(".spec-1n-icon-1 > div").mouseenter(function () {
      let $this = $(this);
      let $index = $this.index();
      $this.siblings().removeClass("active");
      $this.addClass("active");
      // change_banner(".spec-1n-ppspw", $index);
      let $parent = $this.parents(".nav_sec_list_i_1.spec-1-nav");
      $parent.find(".spec-1n-ppspw").each(function () {
        $(this).children().removeClass("active next prev");
        $(this).children().eq($index).addClass("active");
        $(this).children().eq($index).nextAll().addClass("next");
        $(this).children().eq($index).prevAll().addClass("prev");
        let $hh = $(this).children().eq($index).height();
        $(this).css("min-height", `${$hh}px`);
      });
    });
  }

  function nav_anime() {
    $(".tn_menu_ii").mouseenter(function () {
      $("body").removeClass("search-open");
      let $this = $(this);
      let $id = $this.attr("data-cid");
      if (!$this.hasClass("active")) {
        nav_anime_1($id);
      }
      $this.addClass("active");
      $this.siblings().removeClass("active");
      $(`.the-sec-nav-wrpper [data-pid="${$id}"]`).siblings().removeClass("active");
      $(`.the-sec-nav-wrpper [data-pid="${$id}"]`).addClass("active");
    });
    $(".top_nav").mouseleave(function () {
      $(".tn_menu_ii").removeClass("active");
      $(".the-sec-nav-wrpper > div").removeClass("active");
    });
  }
  function nav_anime_1(id) {
    //
    anime({
      targets: `[data-pid="${id}"] .spec-1n-b > *`,
      translateY: ["-40px", "0px"],
      opacity: ["0", "1"],
      easing: easing_1,
      duration: 1000,
      delay: anime.stagger(80, { from: "last", start: 300 }),
    });
    anime({
      targets: `[data-pid="${id}"] .spec-1n-a > *`,
      translateY: ["-40px", "0px"],
      opacity: ["0", "1"],
      easing: easing_1,
      duration: 1000,
      delay: anime.stagger(80, { from: "last", start: 400 }),
    });
    //
    anime({
      targets: `[data-pid="${id}"] .nav_sec_list_i_2.spec-2-nav`,
      translateY: ["-40px", "0px"],
      opacity: ["0", "1"],
      easing: easing_1,
      duration: 1000,
      delay: anime.stagger(50, { from: "last", start: 300 }),
    });
    anime({
      targets: `[data-pid="${id}"] .nav_sec_2_des.spec-2-nav > *`,
      translateY: ["-40px", "0px"],
      opacity: ["0", "1"],
      easing: easing_1,
      duration: 1000,
      delay: anime.stagger(80, { from: "last", start: 300 }),
    });
  }
  // 搜索栏
  $(".search_btn").on("click", function () {
    $("body").toggleClass("search-open");
    $(".tn_menu_ii").removeClass("active");
    $(".the-sec-nav-wrpper > div").removeClass("active");
  });
  $(".top_nav")
    .siblings()
    .on("click", function () {
      $("body").removeClass("search-open");
    });
  // 搜索跳转
  $(".search-submit").on("click", function () {
    let sval = $("input.serinput").val();
    let pathnn = `/globalSearch.html?keywords=${sval}&appIds=all`;
    let locathref = window.location.hostname;
    window.location.href = `//${locathref}${pathnn}`;
  });
  function active_alink() {
    //识别当前页面地址对应a标签
    $("a").each(function () {
      let $this = $(this);
      let link = $this.attr("href").split("?")[0];
      let current_pathname = window.location.pathname;
      if (current_pathname == link) {
        $this.addClass("onlink");
      }
      if (getUrlParam("para") !== null) {
        let para_link = $this.attr("data-link");
        let current_para = getUrlParam("para");
        if (current_para == para_link) {
          $this.addClass("onlink");
        }
      }
    });
  }
  // 分类二级筛选跳转
  function shaixuan() {
    $(".param_link a").click(function () {
      let link_para = $(this).attr("data-link");
      window.location.href = `${window.location.pathname}?para=${link_para}`;
    });
  }

  // 首页案例弹层
  function act_anli() {
    $(".the-flip-lop a").click(function (e) {
      e.preventDefault();
      let $this = $(this);
      let $link = $this.attr("data-src");
      $(`.the-anli-popup-wrapper`).load(`${$link} .anli_list`, function () {
        console.log(`loaded ${$link}`);
        $(`body`).addClass("anli_load");
      });
    });
    // 内页案例列表
    let aopen = 0;
    $(".pupopn-o .mjzst-6-listi a").click(function (e) {
      e.preventDefault();
      let $this = $(this);
      let $link = $this.attr("href");
      let $file_type = wenjian_leixing($link);
      let $popdiv;
      if (aopen == 0) {
        if ($file_type == "image") {
          $popdiv = `<div class="anli_wlos"><img src="${$link}" alt=""></div>`;
          $(`.the-anli-popup-wrapper`).html($popdiv);
          setTimeout(function () {
            $(`body`).addClass("anli_load");
            aopen = 1;
          }, 250);
        } else if ($file_type == "video") {
          $popdiv = `<div class="anli_wlos"><video controls autoplay src="${$link}"></video></div>`;
          $(`.the-anli-popup-wrapper`).html($popdiv);
          setTimeout(function () {
            $(`body`).addClass("anli_load");
            aopen = 1;
          }, 250);
        }
      }
    });

    //
    $(".anli-close").click(function () {
      $(`body`).removeClass("anli_load");
      setTimeout(function () {
        $(".anli_wlos").remove();
        aopen = 0;
      }, 1000);
    });
    $(".anli-close").mouseenter(function () {
      $(`body`).addClass("anli_pre");
    });
    $(".anli-close").mouseleave(function () {
      $(`body`).removeClass("anli_pre");
    });
  }

  // 联系表格
  function set_bd_vall() {
    $(".guojia input").on("change", function () {
      let $val = $(this).val();
      if ($val !== "中国") {
        $(".shengfen input").val("无");
      } else {
        $(".shengfen input").val("");
      }
    });
    setTimeout(function () {
      document.querySelector(".guojia input").value = "中国";
    }, 1500);
  }

  // 全球生态
  if ($(".hzst-hzzn").length > 0) {
    var thumbsSwiper_hzzn = new Swiper(".hzst-hzzn_loop_1", {
      spaceBetween: 0,
      slidesPerView: "auto",
      centerInsufficientSlides: true,
      watchSlidesVisibility: true, //防止不可点击
    });
    var gallerySwiper_hzzn = new Swiper(".hzst-hzzn_loop_2", {
      spaceBetween: 0,
      thumbs: {
        swiper: thumbsSwiper_hzzn,
      },
      speed: 800,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
    });
  }
  // 品牌内容营销
  if ($(".hzst-hzzn2").length > 0) {
    var thumbsSwiper_hzzn2 = new Swiper(".hzst-hzzn_loop2_1", {
      spaceBetween: 0,
      slidesPerView: "auto",
      //   centerInsufficientSlides: true,
      watchSlidesVisibility: true, //防止不可点击
    });
    var gallerySwiper_hzzn2 = new Swiper(".hzst-hzzn_loop2_2", {
      spaceBetween: 0,
      thumbs: {
        swiper: thumbsSwiper_hzzn2,
      },
      speed: 800,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
    });
  }

  // 优化运营服务
  if ($(".hzst-hzzn_loop3_2").length > 0) {
    var thumbsSwiper_hzzn3 = new Swiper(".hzst-hzzn_loop3_1", {
      spaceBetween: 0,
      slidesPerView: "auto",
      centerInsufficientSlides: true,
      watchSlidesVisibility: true, //防止不可点击
    });
    var gallerySwiper_hzzn3 = new Swiper(".hzst-hzzn_loop3_2", {
      spaceBetween: 0,
      thumbs: {
        swiper: thumbsSwiper_hzzn3,
      },
      speed: 800,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
    });
  }

  // MCCM
  if ($(".mccm-swiper1").length > 0) {
    var Swiper_mccm1 = new Swiper(".mccm-swiper1", {
      spaceBetween: 0,
      speed: 800,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".swiper-pagination.zxcl-swopm",
        clickable: true,
        bulletClass: "zxcl-bullet",
        renderBullet: function (index, className) {
          return '<div class="' + className + '">' + (index + 1) + "</div>";
        },
      },
    });
    var Swiper_mccm2 = new Swiper(".mccm-swiper2", {
      spaceBetween: 0,
      speed: 800,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      controller: {
        control: Swiper_mccm1,
      },
    });
    Swiper_mccm1.controller.control = Swiper_mccm2;
  }

  // 应用出海-洞察报告
  if ($(".yych-6-listw").length > 0) {
    var Swiper_yych1 = new Swiper(".yych-6-listw", {
      spaceBetween: 20,
      speed: 800,
      slidesPerView: "auto",
      grabCursor: true,
      freeMode: true,
      // breakpoints
      breakpoints: {
        0: {
          spaceBetween: 20,
        },
        768: {
          spaceBetween: 30,
        },
        1440: {
          spaceBetween: 60,
        },
      },
    });
  }

  // 数字创意banner
  $(".szcy_bn_content > div:nth-child(1)").addClass("on");
  change_banner(".bn_bg_szcy", 0);

  $(".szcy_bn_content > div").mouseenter(function () {
    let $this = $(this);
    let $index = $this.index();
    $this.siblings().removeClass("on");
    $this.addClass("on");
    change_banner(".bn_bg_szcy", $index);
  });

  //   企业培训服务页
  $(".qypx-1n-ii").mouseenter(function () {
    let $this = $(this);
    let $index = $this.index();
    $this.siblings().removeClass("active");
    $this.addClass("active");
    $(".qypx-1n").addClass("on_hover");
    change_banner(".qypx-1n-fbg", $index);
  });
  $(".qypx-1n-ii").mouseleave(function () {
    let $this = $(this);
    let $index = $this.index();
    $this.siblings().removeClass("active");
    $this.removeClass("active");
    $(".qypx-1n-fbg > div").removeClass("active");
    $(".qypx-1n").removeClass("on_hover");
  });

  // 数字技术服务
  $(".szjs-1-img-ii>div").mouseenter(function () {
    let $this = $(this);
    let $index = $this.index();
    let $attr = $this.attr("data-link");
    if ($attr !== "link") {
      $this.siblings().removeClass("active");
      $this.addClass("active");
      $(".szjs-1-img-w").addClass("on1_hover");
      change_banner(".szjs-1-img-popup", $index);
    }
  });

  $(".szjs-1n").click(function () {
    if (window.innerWidth > 999) {
      $(".szjs-1-img-w").removeClass("on1_hover");
      $(".szjs-1-img-ii>div").removeClass("active");
      $(".szjs-1-img-popup>div").removeClass("active");
    }
  });

  $(".szjs-1-img-popup-i > div").click(function () {
    if (window.innerWidth < 999) {
      if ($(this).parent().hasClass("active")) {
        $(".szjs-1-img-w").removeClass("on1_hover");
        $(".szjs-1-img-ii>div").removeClass("active");
        $(".szjs-1-img-popup>div").removeClass("active");
      }
    }
  });

  // 滚屏跳转
  if (window.innerWidth > 1) {
    $(".szcy_bn_ccc a").click(function (e) {
      e.preventDefault();
      als_Scrollbar.get(document.querySelector(als.wrapper)).update();
      let idt = $(this).attr("href");
      let idt_top = $(idt).attr("data-of_top");
      als_Scrollbar.get(document.querySelector(als.wrapper)).scrollTo(0, idt_top, 800);
    });
  } else {
    $(".szcy_bn_ccc a").click(function (e) {
      e.preventDefault();
      let idt = $(this).attr("href");
      let idt_top = $(idt).attr("data-of_top");
      $("html , body").scrollTop(idt_top);
    });
  }

  // 地图
  $(".mapp_pointii").eq(0).addClass("active");
  $(".mapp_pointii").click(function () {
    let $this = $(this);
    let $index = $this.index();
    if ($this.hasClass("active")) {
      $this.removeClass("on active");
    } else {
      $this.siblings().removeClass("on");
      $this.addClass("on");
      change_banner(".wom_mapp_points", $index);
    }
  });
  $(".wom_mapp").click(function () {
    $(".mapp_pointii").removeClass("active on");
  });

  // 技术优势
  $(".jsys-sl-tabb").each(function () {
    let $this = $(this);
    $this.children().eq(0).addClass("active");
    $this.children().eq(0).find("p").stop().slideDown(100);
  });
  // $(".jsys-sl-tabb>div").eq(0).addClass("active");
  // $(".jsys-sl-tabb>div").eq(0).find("p").stop().slideDown(100);
  $(".jsys-sl-tabb>div").click(function () {
    let $this = $(this);
    let $index = $this.index();
    $this.siblings().find("p").stop().slideUp(400);
    $this.find("p").stop().slideDown(400);
    // change_banner(".jsys-sl-tabb", $index);
    $this.parent().children().removeClass("active next prev");
    $this.addClass("active");
    $this.nextAll().addClass("next");
    $this.prevAll().addClass("prev");
  });

  // 咨询策略服务
  $(".cll-tab").each(function () {
    let $this = $(this);
    $this.children().eq(0).addClass("active");
    $this.children().eq(0).find(".cll-tab-ii").stop().slideDown(100);
  });
  // $(".cll-tab>div").eq(0).addClass("active");
  // $(".cll-tab>div").eq(0).find(".cll-tab-ii").stop().slideDown(100);
  $(".cll-tab>div").click(function () {
    let $this = $(this);
    let $index = $this.index();
    $this.siblings().find(".cll-tab-ii").stop().slideUp(400);
    $this.find(".cll-tab-ii").stop().slideDown(400);
    // change_banner(".cll-tab", $index);
    $this.parent().children().removeClass("active next prev");
    $this.addClass("active");
    $this.nextAll().addClass("next");
    $this.prevAll().addClass("prev");
  });

  // 公司简介历史
  if ($(".history_wom_swiper.swiper").length > 0) {
    var thumbsSwiper_hzzn = new Swiper(".history_wom_swiper.swiper", {
      spaceBetween: 0,
      slidesPerView: 5,
      // centerInsufficientSlides: true,
      watchSlidesVisibility: true, //防止不可点击
      followFinger: false,
      breakpoints: {
        320: {
          //当屏幕宽度大于等于320
          slidesPerView: 1,
        },
        768: {
          //当屏幕宽度大于等于768
          slidesPerView: 3,
        },
        1280: {
          //当屏幕宽度大于等于1280
          slidesPerView: 5,
        },
      },
      watchSlidesProgress: true,
      on: {
        progress: function (progress) {
          for (i = 0; i < this.slides.length; i++) {
            var slide = this.slides.eq(i);
            var slideProgress = this.slides[i].progress;
            modify = 1;
            let slideProgress_abs = Math.abs(slideProgress);
            slide.attr("data-pgg", `${slideProgress_abs}`);
            slide
              .find(".history_wom_ii")
              .children("div")
              .css("padding-top", `calc(8vw - ${slideProgress_abs * 2}vw)`);
          }
        },
        setTransition: function (transition) {},
      },
    });
  }

  //
  //移动导航展开子菜单2
  $(".mo-menu-aii > svg").on("click", function () {
    let $this = $(this);
    $this.parent().parent().siblings().removeClass("open");
    $this.parent().parent().toggleClass("open");
    $this.parent().parent().siblings().children(".child-mo-menu").stop().slideUp(300);
    $this.parent().parent().children(".child-mo-menu").stop().slideToggle(300);
  });
  $(".open-mo-nav").on("click", function () {
    $("body").toggleClass("nav-open");
  });
  $(".close-nav-btn").on("click", function () {
    $("body").removeClass("nav-open");
  });

  //   弹窗
  function popadvv() {
    let advl = window.location.href.split("#")[1];
    if (advl == "adv" || document.querySelectorAll(".home-loading").length > 0) {
      setTimeout(function () {
        $("body").addClass("open-advs");
      }, 2500);
      $(".the-popadvev-panel-bg , .the-popadvev-panel-close").on("click", function () {
        $("body").removeClass("open-advs");
      });
    }
  }

  // 联系我们表单swiper
  if ($(".swpier_per").length > 0) {
    $(".swpier_per").addClass("swiper");
    $(".swpier_per>div").addClass("swiper-wrapper");
    $(".swpier_per>div>.swpier_perSlide").addClass("swiper-slide");
    change_banner(".lysos-ris", 0);
    let $text1 = $(".lysos-ris>div").eq(0).find("span").text();
    window.setCookie("form-type", $text1);
    var banner_slide_form = new Swiper(".swpier_per", {
      init: true,
      // preventInteractionOnTransition: true,
      followFinger: false,
      noSwiping: true,
      speed: 600,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoHeight: true,
      // autoplay: {
      //   delay: 7000,
      // },
      // navigation: {
      //   nextEl: ".ar-right",
      //   prevEl: ".ar-left",
      // },
      on: {
        init: function (swiper) {
          let banner_index = this.realIndex;
          change_banner(".lysos-ris", banner_index);
          this.$wrapperEl.addClass("init");
          $(".swpier_per.swiper .swiper-slide-active .form-group.guojia > div.cascader-wrap > div.zd-cascader__dropdown > div > div > div > ul > li:nth-child(1)").trigger("click");
        },
        transitionStart: function (swiper) {
          console.log(this.realIndex);
          let banner_index = this.realIndex;
          change_banner(".lysos-ris", banner_index);
          $(".swpier_per.swiper .swiper-slide-active .form-group.guojia > div.cascader-wrap > div.zd-cascader__dropdown > div > div > div > ul > li:nth-child(1)").trigger("click");
        },
      },
    });
    $(".lysos-ris>div").click(function () {
      let $this = $(this);
      banner_slide_form.slideTo($this.index());
      let $text = $this.find("span").text();
      window.setCookie("form-type", $text);
    });
  }

  // 咨询策略
  if ($(".zxcl12-swiper-1").length > 0) {
    // change_banner(".lysos-ris", 0);
    var banner_slide_zxcl12 = new Swiper(".zxcl12-swiper-1", {
      init: true,
      // preventInteractionOnTransition: true,
      followFinger: false,
      allowTouchMove: false,
      speed: 600,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoHeight: true,
      on: {
        init: function (swiper) {
          let banner_index = this.realIndex;
          change_banner(".zxcl-12n-coms-2 .jsys-sl-tabb", banner_index);
          this.$wrapperEl.addClass("init");
        },
        transitionStart: function (swiper) {
          console.log(this.realIndex);
          let banner_index = this.realIndex;
          change_banner(".zxcl-12n-coms-2 .jsys-sl-tabb", banner_index);
        },
      },
    });
    $(".zxcl-12n-coms-2 .jsys-sl-tabb>div").click(function () {
      let $this = $(this);
      banner_slide_zxcl12.slideTo($this.index());
    });
  }

  if ($(".zxcl13-swiper-1").length > 0) {
    // change_banner(".lysos-ris", 0);
    var banner_slide_zxcl13 = new Swiper(".zxcl13-swiper-1", {
      init: true,
      // preventInteractionOnTransition: true,
      followFinger: false,
      allowTouchMove: false,
      speed: 600,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoHeight: true,
      on: {
        init: function (swiper) {
          let banner_index = this.realIndex;
          change_banner(".zxcl-13n-coms-1 .jsys-sl-tabb", banner_index);
          this.$wrapperEl.addClass("init");
        },
        transitionStart: function (swiper) {
          console.log(this.realIndex);
          let banner_index = this.realIndex;
          change_banner(".zxcl-13n-coms-1 .jsys-sl-tabb", banner_index);
        },
      },
    });
    $(".zxcl-13n-coms-1 .jsys-sl-tabb>div").click(function () {
      let $this = $(this);
      banner_slide_zxcl13.slideTo($this.index());
    });
  }

  $(".subss .sub_submit").click(function () {
    let $val = $(this).parent().find("input").val();
    let $isEmail = isisEmail($val);
    if ($isEmail) {
      $(this).parent().removeClass("error");
      $("div#c_static_001-1671603472266").find("input.form-control").val($val);
      $("div#c_static_001-1671603472266").find("a.e_formBtn-3").trigger("click");
      $(this).parent().find("input").val("");
    } else {
      $(this).parent().addClass("error");
    }
  });

  // add language switcher
  function add_langg() {
    let $html = `<div class="lang_swsws">
    <div><a href="//www.meetsocial.com">中文</a></div>
    <div><a href="//en.meetsocial.com">EN</a></div></div>`;
    $(".tn_right_lang.langlll").append($html);
  }
  //   add_langg();

  // 新增页面 date 12.30
  if ($(".gaming_case_sw").length > 0) {
    var banner_gaming_case_sw = new Swiper(".gaming_case_sw", {
      init: true,
      // preventInteractionOnTransition: true,
      // followFinger: false,
      // allowTouchMove: false,
      speed: 800,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      navigation: {
        nextEl: ".swiper-fs-next",
        prevEl: ".swiper-fs-prev",
      },
      autoHeight: true,
    });
  }

  // 新增 2023.04.03
  function byc_img_hover() {
    $(".image-byc2-hover").mouseenter(function () {
      let $index = $(this).index();
      console.log($index);
      $(this).parents(".normal-image-byc2").find("img").removeClass("active");
      $(this).parents(".normal-image-byc2").find("img").eq($index).addClass("active");
    });
    $(".image-byc2-hover").mouseleave(function () {
      let $index = $(this).index();
      console.log($index);
      $(this).parents(".normal-image-byc2").find("img").eq($index).removeClass("active");
    });
  }
  byc_img_hover();

  // 新增2023.4.18
  if ($(".news-catev1.ctl-1").length > 0) {
    var newscatev1ctl1 = new Swiper(".news-catev1.ctl-1", {
      init: true,
      speed: 300,
      // effect: "fade",
      // fadeEffect: {
      //   crossFade: true,
      // },
      autoHeight: true,
      slidesPerView: "auto",
    });

    var newscatev1ctl2 = new Swiper(".news-catev1.ctl-2", {
      init: true,
      speed: 300,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoHeight: true,
      // slidesPerView: "auto",
    });

    $(".news-catev1.ctl-1 .category-wrap.swiper-slide").mouseenter(function () {
      let $index = $(this).index();
      newscatev1ctl2.slideTo($index);
    });

    $(function () {
      setTimeout(function () {
        if ($(".p_list_cosxe2a .news-catev1.ctl-2 .category.deep-2.swiper-wrapper a.onlink").length > 0) {
          let $index = $(".p_list_cosxe2a .news-catev1.ctl-2 .category.deep-2.swiper-wrapper a.onlink").parent().parent().parents(".category-wrap.swiper-slide").index();
          $(".news-catev1.ctl-1>div>div.category-wrap.swiper-slide").eq($index).find("a").addClass("onlink");
          console.log($index);
          newscatev1ctl1.slideTo($index);
          newscatev1ctl2.slideTo($index);
        }
      }, 900);
    });
  }

  function run_scroll_elms() {
    run_Als_run();
    run_Reach_anime();
    window.requestAnimationFrame(run_scroll_elms);
  }

  window.addEventListener("DOMContentLoaded", function () {
    document.querySelector("body").classList.add("is-init");
    runSS();
    run_scroll_elms();
  });
  //   load 改成 DOMContentLoaded
  window.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth > 999) {
      load_nav();
    }
    active_alink();
    act_anli();
    shaixuan();
    Als_split_push();
    Als_parallax_data_update();
    Als_sticky_data_update();
    Als_sticky_child_data_update();
    Als_reach_data_update();
    Als_mouse_data_update();

    if (document.querySelectorAll(".home-loading").length > 0) {
      if (window.name !== "Meetsocial") {
        setTimeout(function () {
          document.querySelector("body").classList.add("is-loaded");
          anim_loaded();
          if (banner_slide_control) {
            banner_slide_control.init();
          }
          popadvv();
          $(".the-loading").css("opacity", "0");
          window.name = "Meetsocial";
        }, 900);
      } else {
        document.querySelector("body").classList.add("is-loaded");
        anim_loaded();
        if (banner_slide_control) {
          banner_slide_control.init();
        }
        popadvv();
        $(".the-loading").css("opacity", "0");
        window.name = "Meetsocial";
      }
    } else {
      document.querySelector("body").classList.add("is-loaded");
      anim_loaded();
      popadvv();
    }
  });
} else {
  document.querySelector("body").classList.add("is-init");
  document.querySelector("body").classList.add("is-loaded");
}
//配置新闻详情页：关键词到详情页底部
var tags = $("#c_static_001-1663836159520 .cbox-33-0 .s_list").attr("data-keywords") ? $("#c_static_001-1663836159520 .cbox-33-0 .s_list").attr("data-keywords").split(",") : [];
var html1 = '';
if(tags.length > 0){
for(var i = 0;i<tags.length;i++){
  html1 += '<div class="cbox-36 p_loopItem"><p class="e_text-37 s_title">'+tags[i]+'</p></div>';
}
  $("#c_static_001-1663836159520 .cbox-33-0 .s_list").append(html1);
}
