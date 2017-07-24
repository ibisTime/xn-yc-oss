$(function () {
	var code = getQueryString('code');
	var c = getQueryString('c');
	var owner = getQueryString('owner');
	var view = 1;
	var amount, inAmount,outAmount;
    reqApi({
        code: "802503",
        json: {
            userId: owner,
            currency: "CB"
        }
    }).done(function(d) {
        amount = moneyFormat(d[0].amount);
        inAmount = moneyFormat(d[0].inAmount);
        outAmount = moneyFormat(d[0].outAmount);
        outWait = moneyFormat(d[0].inAmount - d[0].outAmount)
        })	
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	},{
		title : '登录名',
		field : 'loginName',
		required: true,
		maxlength: 20
	},{
		title : '手机号',
    	field : 'mobile',
    	mobile:true,
		required: true
    }, {
        title: '真实姓名',
        field: 'realName',
        chinese: true,
		required: true
    },  {
        title: '证件类型',
        field: 'idKind',
        type: 'select',
        key: 'id_kind',
        keyCode: "807706"
	},{
        title: '证件号',
        field: 'idNo',
        idCard: true
    }, {
		title : '分成比例',
    	field : 'divRate',
		required: true,
	},{
        field : 'amount',
        title : '当前信用值',
        formatter:function(v,data){
            return amount
        }
    },{
        field : 'inAmount',
        title : '历史总信用值',
        formatter:function(v,data){
            return inAmount
        }
    },{
        field : 'outAmount',
        title : '已归账信用值',
        formatter:function(v,data){
            return outAmount
        }
    },{
        field : 'outWait',
        title : '待归账信用值',
        formatter:function(v,data){
            return outWait
        }
    },{
		title: '备注',
		field: 'remark',
		maxlength: 250
	}];
	
	buildDetail({
		fields: fields,
		code:{
			userId: owner
		},
		view:view,
		detailCode:'805056',
		 buttons: {},
	});
	
	
	    $('#tableList').bootstrapTable({ 
		    columns: [{
		        field: '',
		        title: '',
		        checkbox: true
		    }, {
				field : 'mobile',
				title : '发放用户',
				formatter: function(v, data){
					return data.toUser.mobile;
				}
			},
			// {
		 //        field: 'toUserId',
		 //        title: '发放用户',
		 //        type:"select",
		 //        pageCode1:"805054",
		 //        params:{
		 //            kind:"f2",
		 //            updater:"",
		 //            userReferee:owner
		 //        },
		 //        keyName:"userId",
		 //        valueName:"mobile",
		 //        search:true,
		 //        visible:false
		 //        // formatter: function(v, data) {
		 //        //     return data.toUser.mobile;
		 //        // }
		 //    }, 
		    {
		    	field: 'toAmount',
		    	title: '发放金额',
		    	formatter: moneyFormat
		    },{
				field: 'toCurrency',
				title: '币种',
				type: 'select',
				key: 'currency',
				keyCode: "802006",
		        formatter: Dict.getNameForList("currency",'802006'),
			},{
				field : 'createDatetime',
				title : '发放时间',
				formatter: dateTimeFormat,
			},]
		});

		if (owner) {
	        reqApi({
	            code: '802415',
	            json: { 
	                fromUserId: owner,
	                start: "1",
	                limit: "10",
	                type: "1",
	                updater: ""
	                 }
	        }).done(function(d) {
	            // pcode = d.code
	            $('#tableList').bootstrapTable('prepend', d.list)
	        })

	    }  
    $('#back1Btn').off("click").click(function() {
        goBack();
    });  
	 //  //   buildList({
	 //  //       columns: columns,
	 //  //       pageCode: '802415',
	 //  //       searchParams:{
	 //  //       	fromUserId: owner,
	 //  //       	fromCurrency: c,
	 //  //       	toCurrency: c,
	 //  //       	status: 1,
	 //  //       	companyCode: OSS.company
		// 	// }
	 //  //   });
	    
		// $('.tools .toolbar').empty();
		
		// $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
		// $('#backBtn').on('click', function() {
		// 	goBack();
		// });  
      
});