let $formData = {
  utma: "",
  utmb: "",
  attr3: "", //所在行业
  name: "",
  company: "",
  title: "",
  country: "",
  province: "",
  email: "",
  mobile: "",
  attr42: "", // 您的出海业务进程
  attr6: "", //您希望在出海过程中获得哪些支持
  attr7: "", //您的季度海外推广预算
  attr4: "", //公司经营模式
  attr16: "", //游戏产品阶段
  attr5: "", //您的公司是否有出海经验 / 您的团队出海经验
  attr23: "", //产业类型
  cltoken: "",
  attr52:"",
};
let $formData2 = {
  attr6: "", //您希望在出海过程中获得哪些支持
};
// 提交成功
$("body").append(`<div class='huiju_success'><div class='huiju_success_text'>提交成功</div></div>`);
function popup_success() {
  $(".huiju_success").addClass("active");
  setTimeout(function () {
    $(".huiju_success").removeClass("active");
    setTimeout(function () {
      window.location.reload();
    }, 500);
  }, 2500);
}

// get and post
function submit_huiju_form() {
  let $formID = "1b513d054a874397813c0f4e3f9dc093";

  // get
  $.ajax({
    type: "GET",
    url: "https://host.huiju.cool/formdata/get/" + $formID,
    dataType: "json",
    timeout: 100000,
    success: function (res) {
      $formData.utma = getCookie("c__utma");
      $formData.utmb = getCookie("c__utmb");
      $formData.attr3 = getCookie("form-type");
      $formData.cltoken = res.token;

      // 格式化
      $formData_format = JSON.stringify($formData).replace(/,/g, "&").replace(/:/g, "=").replace(/"/g, "").replace(/{/g, "").replace(/}/g, "")+"&"+JSON.stringify($formData2).replace(/:/g, "=").replace(/"/g, "").replace(/{/g, "").replace(/}/g, "");
      // post
      $.ajax({
        type: "POST",
        url: "https://host.huiju.cool/form/" + $formID,
        data: $formData_format,
        timeout: 100000,
        success: function (response) {
          console.log("Submit Success");
          popup_success();
        },
        error: function (request, status, error) {
          console.log(status);
          console.log(error);
        },
      });
    },
    error: function (request, status, error) {
      console.log(status);
      console.log(error);
    },
  });
}

// 获取表单数据
function get_form_data() {
  let $wrapper = $(".swpier_per.swiper .swiper-slide-active");
  let $type = getCookie("form-type");
  if ($type == "电商") {
    $formData.name = $wrapper.find(`[name="e_input-46"]`).val();
    $formData.company = $wrapper.find(`[name="e_input-47"]`).val();
    $formData.title = $wrapper.find(`[name="e_input-50"]`).val();
    $formData.country = JSON.parse($wrapper.find(`[name="e_address-48"]`).val())[0].label;
    $formData.province = $wrapper.find("select.province_select").val();
    $formData.email = $wrapper.find(`[name="e_input-52"]`).val();
    $formData.mobile = $wrapper.find(`[name="e_input-51"]`).val();
    $formData.attr42 = $wrapper.find(`[name="e_select-53"]`).val(); // 您的出海业务进程
    $formData2.attr6 = $wrapper.find(`[name="e_multipleSelect-54"]`).val(); //您希望在出海过程中获得哪些支持
    $formData.attr7 = $wrapper.find(`[name="e_select-55"]`).val(); //您的季度海外推广预算
    $formData.attr52 = $wrapper.find(`[name="select1719199315843"]`).val(); //是否有账期服务需求?
  } else if ($type == "游戏") {
    $formData.name = $wrapper.find(`[name="e_input-58"]`).val();
    $formData.company = $wrapper.find(`[name="e_input-59"]`).val();
    $formData.title = $wrapper.find(`[name="e_input-62"]`).val();
    $formData.country = JSON.parse($wrapper.find(`[name="e_address-60"]`).val())[0].label;
    $formData.province = $wrapper.find("select.province_select").val();
    $formData.email = $wrapper.find(`[name="e_input-64"]`).val();
    $formData.mobile = $wrapper.find(`[name="e_input-63"]`).val();
    $formData.attr4 = $wrapper.find(`[name="e_select-65"]`).val(); // 公司经营模式
    $formData.attr16 = $wrapper.find(`[name="e_select-69"]`).val(); // 游戏产品阶段
    //$formData.attr5 = $wrapper.find(`[name="e_select-67"]`).val(); // 您的公司是否有出海经验 / 您的团队出海经验
    $formData.attr23 = $wrapper.find(`[name="e_select-67"]`).val(); // 产品类型
    $formData2.attr6 = $wrapper.find(`[name="e_multipleSelect-66"]`).val(); //您希望在出海过程中获得哪些支持
    $formData.attr52 = $wrapper.find(`[name="select1719200792074"]`).val(); //是否有账期服务需求?
  } else if ($type == "APP") {
    $formData.name = $wrapper.find(`[name="e_input-71"]`).val();
    $formData.company = $wrapper.find(`[name="e_input-72"]`).val();
    $formData.title = $wrapper.find(`[name="e_input-75"]`).val();
    $formData.country = JSON.parse($wrapper.find(`[name="e_address-73"]`).val())[0].label;
    $formData.province = $wrapper.find("select.province_select").val();
    $formData.email = $wrapper.find(`[name="e_input-77"]`).val();
    $formData.mobile = $wrapper.find(`[name="e_input-76"]`).val();
    $formData.attr4 = $wrapper.find(`[name="e_select-78"]`).val(); // 公司经营模式
    $formData.attr5 = $wrapper.find(`[name="e_select-80"]`).val(); // 您的公司是否有出海经验 / 您的团队出海经验
    $formData2.attr6 = $wrapper.find(`[name="e_multipleSelect-84"]`).val(); //您希望在出海过程中获得哪些支持
    $formData.attr7 = $wrapper.find(`[name="e_select-83"]`).val(); //您的季度海外推广预算
    $formData.attr52 = $wrapper.find(`[name="select"]`).val(); //是否有账期服务需求?
  } else if ($type == "品牌及其他") {
    $formData.name = $wrapper.find(`[name="e_input-110"]`).val();
    $formData.company = $wrapper.find(`[name="e_input-111"]`).val();
    $formData.title = $wrapper.find(`[name="e_input-114"]`).val();
    $formData.country = JSON.parse($wrapper.find(`[name="e_address-112"]`).val())[0].label;
    $formData.province = $wrapper.find("select.province_select").val();
    $formData.email = $wrapper.find(`[name="e_input-116"]`).val();
    $formData.mobile = $wrapper.find(`[name="e_input-115"]`).val();
    $formData.attr42 = $wrapper.find(`[name="e_select-117"]`).val(); // 您的出海业务进程
    $formData2.attr6 = $wrapper.find(`[name="e_multipleSelect-118"]`).val(); //您希望在出海过程中获得哪些支持
    $formData.attr7 = $wrapper.find(`[name="e_select-119"]`).val(); //您的季度海外推广预算
    $formData.attr52 = $wrapper.find(`[name="select1719201037605"]`).val(); //是否有账期服务需求?
  }

  let $guojaa = JSON.parse($wrapper.find(".form-group.guojia").children("input[name]").val())[0].label;
  let $shengfen = $wrapper.find(".form-group.shengfen").find("select").val();
  if ($guojaa == "中国" && $shengfen == "") {
    $wrapper.find(".form-group.shengfen").find("select").addClass("is-invalid");
  } else {
    $wrapper.find(".form-group.shengfen").find("select").removeClass("is-invalid");
    $wrapper.find(".bdd_more .more_btn_v a").trigger("click");
    setTimeout(function () {
      if ($wrapper.find(".is-invalid").length < 1) {
        submit_huiju_form();
      }
    }, 200);
  }
}

// 触发提交
$(function () {
  setTimeout(function () {
    $(".swpier_per.swiper .swiper-slide-active .form-group.guojia > div.cascader-wrap > div.zd-cascader__dropdown > div > div > div > ul > li:nth-child(1)").trigger("click");
  }, 3000);
  $(".bdd_more .more_btn_v").each(function () {
    let $this = $(this);
    $this.append(`<div class='huiju_button'></div>`);
  });
  $(".huiju_button").on("click", function () {
    get_form_data();
  });
});
