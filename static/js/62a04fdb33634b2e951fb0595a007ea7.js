   $(function() {
     
       $(".scroll_2").mCustomScrollbar();
        $(".scroll_3").mCustomScrollbar();

       var date_current = $('#date1').val().split('.').join('-');
       //常规用法
    
      laydate.render({
           elem: '#date1', //指定元素
           format: 'yyyy.MM.dd',
           max: date_current,
           value:  new Date()
       });




       function currency(name) {
           if (name == 'USD') {
               return '美元';
           } else if (name == 'CNY') {
               return '人民币元';
           } else if (name == 'EUR') {
               return '欧元';
           } else if (name == 'HKD') {
               return '港币元';
           } else if (name == 'GBP') {
               return '英镑';
           } else if (name == 'NZD') {
               return '新西兰元';
           } else if (name == 'SGD') {
               return '新加坡元';
           } else if (name == 'CAD') {
               return '加拿大元';
           } else if (name == 'RUB') {
               return '俄罗斯卢布';
           } else if (name == 'KRW') {
               return '韩元';
           } else if (name == 'NOK') {
               return '挪威克朗';
           } else if (name == 'THB') {
               return '泰铢';
           } else if (name == 'JPY') {
               return '日元';
           }
       }

       $('#date3').val('100');

       var url_pre = 'https://pre-sino-ka-gateway.meetsocial.com/sino-thirdpart';
       var url = 'https://sino-ka-gateway.meetsocial.com/sino-thirdpart';


       var req1 = {
           "rateDate": ""
       };


       var req2 = {
           "originCurrency": "",
           "rateDate": "",
           "targetCurrency": ""
       };

       var hold = '';
       var change = '';


       var now_list = JSON.parse(localStorage.getItem('currency_search'));
       if (!now_list) {
           now_list = [];
       }
       var history_html = '';
       $(now_list).each(function(i, v) {
           history_html += '<div class="h-box"><ul><li><span>汇率时间</span><span>' + v[0] + '</span><span>飞书深诺汇率</span><span>' + v[1] + '</span></li><li><span>' + v[2] + '</span><span>' + v[3] + '</span><span>' + v[4] + '</span><span>' + v[5] + '</span></li></ul></div>';
       });

       $('.exchange .b-list').empty().append(history_html);
       $(".scroll_4").mCustomScrollbar();

       $('.hold ul li').click(function() {
           $(this).addClass('active').siblings().removeClass('active');
           req2.originCurrency = $(this).find('span:nth-child(2)').text();
           hold = $(this).find('span:nth-child(1)').text();
       });

       $('.change ul li').click(function() {
           $(this).addClass('active').siblings().removeClass('active');
           req2.targetCurrency = $(this).find('span:nth-child(2)').text();
           change = $(this).find('span:nth-child(1)').text();
       });
     
      $('.conver').click(function(){
      	var n1=$('.hold ul li.active').index();
        var n2=$('.change ul li.active').index();
         $('.hold ul li').eq(n2).addClass('active').siblings().removeClass('active');
          req2.originCurrency = $('.hold ul li').eq(n2).find('span:nth-child(2)').text();
           hold =  $('.hold ul li').eq(n2).find('span:nth-child(1)').text();
         $('.change ul li').eq(n1).addClass('active').siblings().removeClass('active');
              req2.targetCurrency = $('.change ul li').eq(n1).find('span:nth-child(2)').text();
           change = $('.change ul li').eq(n1).find('span:nth-child(1)').text();
      });

     
     var flag=true;

       function rateList() {
           $.ajax({
               url: url + '/exchangeRate/querySinoExchangeRateList',
               type: 'POST',
               data: JSON.stringify(req1),
               contentType: "application/json",
               dataType: "json",
               success: function(data) {
                   var data = data.result;
                    if(flag){
                    	if(data.length==''){
                    	 laydate.render({
                             elem: '#date1', //指定元素
                             format: 'yyyy.MM.dd',
                             max: date_current,
                             value: new Date((new Date().getTime() - 24*60*60*1000))
                         });
                          
                          laydate.render({
                            elem: '#date2', //指定元素
                            format: 'yyyy.MM.dd',
                            max: date_current,
                            value: new Date((new Date().getTime() - 24*60*60*1000))
                          });
                          
                          
                      	$('.btn1').click();
                      	flag=false;
                    }else{
                    	       laydate.render({
                                   elem: '#date2', //指定元素
                                   format: 'yyyy.MM.dd',
                                   max: date_current,
                                   value: new Date()
                               });
                    
                    }
                    }else{
                        
                       if(data.length==''){
                           $('.rate .shop-show h2').text('未查询到汇率');
                           $('.rate .shop-show').fadeIn();
                           setTimeout(function() {
                               $('.rate .shop-show').fadeOut();
                           }, 2000)
                       }
                    }
                    
                   var list = [];
                   var html = '';
                   $(data).each(function(i, v) {
                       if (v.originCurrency == 'CNY') {
                           list.push(v);
                       }
                   });
                   $(list).each(function(i, v) {
                       html += '<ul><li>' + currency(v.targetCurrency) + '</li><li>' + v.targetCurrency + '</li><li>' + v.originCurrency + ' / ' + v.targetCurrency + '</li><li>' + v.rate +
                           '</li></ul>'
                   });
                   $('.exchange .con .rate .rate-list .list-bottom').empty().append(html);
                 
                      try{
                              !!$(".scroll_1").data("mCS") && $(".scroll_1").mCustomScrollbar("destroy"); //Destroy
                          }catch (e){
                              $(".scroll_1").data("mCS",''); //手动销毁
                     
                          }
                 
                 
                   $(".scroll_1").mCustomScrollbar();
               }
           });
       }


     
    

       function sinoRate() {
           $.ajax({
               url: url + '/exchangeRate/querySinoRate',
               type: 'POST',
               data: JSON.stringify(req2),
               contentType: "application/json",
               dataType: "json",
               success: function(data) {
                   if (data.success) {
                       var html_title = '';
                       var html_list = '';
                       html_title += '<ul><li>' + hold + '</li><li>飞书深诺汇率</li><li>' + change + '</li></ul>';
                       $('.exchange .exchange-list .e-title').empty().append(html_title);
                       var money = parseInt($('#date3').val());
                       var all_money = (money * data.result.adjustedRate).toFixed(4);
                       html_list += '<ul><li>' + money + '</li><li>' + data.result.adjustedRate + '</li><li>' + all_money + '</li></ul>';
                       $('.exchange .exchange-list .e-list').empty().append(html_list);
                       var date_now = data.result.rateDate.slice(0, 4) + '-' + data.result.rateDate.slice(4, 6) + '-' + data.result.rateDate.slice(6, 8);
                       var sino = [hold, change, date_now, money, data.result.adjustedRate, all_money];
                       now_list.push(sino);
                       localStorage.setItem('currency_search', JSON.stringify(now_list));


                       now_list = JSON.parse(localStorage.getItem('currency_search'));
                       if (!now_list) {
                           now_list = [];
                       }
                       var history_html = '';
                       $(now_list).each(function(i, v) {
                           history_html += '<div class="h-box"><ul><li><span>汇率时间</span><span>' + v[0] + '</span><span>飞书深诺汇率</span><span>' + v[1] + '</span></li><li><span>' + v[2] + '</span><span>' + v[3] + '</span><span>' + v[4] + '</span><span>' + v[5] + '</span></li></ul></div>';
                       });

                        try{
                              !!$(".scroll_4").data("mCS") && $(".scroll_4").mCustomScrollbar("destroy"); //Destroy
                          }catch (e){
                              $(".scroll_4").data("mCS",''); //手动销毁
                     
                          }

                        $('.exchange .b-list').empty().append(history_html);
                        $(".scroll_4").mCustomScrollbar();


                   } else {
                       $('.exchange-rate .shop-show h2').text(data.message);
                       $('.exchange-rate .shop-show').fadeIn();
                       setTimeout(function() {
                           $('.exchange-rate .shop-show').fadeOut();
                       }, 2000)
                   }

               }
           });
       }


       // 当前的汇率表
       var date_now = $('#date1').val().split('.').join('');
       req1.rateDate = date_now;
       rateList();

       $('.btn1').click(function() {
           var date1 = $('#date1').val().split('.').join('');
           req1.rateDate = date1;
           rateList();
       });

       // 查询某个汇率
       req2.originCurrency = $('.hold ul li.active').find('span:nth-child(2)').text();
       hold = $('.hold ul li.active').find('span:nth-child(1)').text();
       req2.targetCurrency = $('.change ul li.active').find('span:nth-child(2)').text();
       change = $('.change ul li.active').find('span:nth-child(1)').text();

       $('.btn2').click(function() {
           var date2 = $('#date2').val().split('.').join('');
           req2.rateDate = date2;
           sinoRate();
       });
     
     
       $('.clears').click(function () {
            $('.exchange .con .exchange-rate .exchange-list .right .bottom .b-list ').empty();
            now_list=[];
            localStorage.removeItem("currency_search");
        });

   })