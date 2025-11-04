$("input.company_ss").parent().append(` <div class="company_name_list"></div> `);

var CmyNames = "";
var queryName = "";
function SearchCompanyName(name) {
  $.get(`https://qccapi.meetsocial.com/CompanySearch.php?searchKey=${name}`, function (data) {
    let $datas = data;
    let DateList = $datas.Result;
    CmyNames = DateList;
    //console.log(DateList);
    ShowCompanyName(DateList);
  });
}

function ShowCompanyName(namelist) {
  $("div.company_name_list").empty();
  if (namelist !== null) {
    if (namelist.length == 0) {
      $("div.company_name_list").append(`<div class="company_name_list_item">未找到相关公司</div>`);
    }
    for (let index = 0; index < namelist.length; index++) {
      const element = namelist[index].Name;
      let $list = `<div class="company_name_list_item" onclick="SelectCompanyName(${index})">${element}</div>`;
      $("div.company_name_list").append($list);
    }
  }
}

function SelectCompanyName(index) {
  let name = CmyNames[index].Name;
  $("input.company_ss").val(name);
  $("div.company_name_list").empty();
}

// $("input.company_ss").on("input", function () {
//   let name = $(this).val();
//   if (name.length > 0) {
//     $("div.company_name_list").empty();
//     SearchCompanyName(name);
//   } else {
//     $("div.company_name_list").empty();
//   }
// });

setInterval(function () {
  if (queryName !== $("input.company_ss").val()) {
    queryName = $("input.company_ss").val();
    $("div.company_name_list").empty();
    SearchCompanyName(queryName);
  }
}, 300);
