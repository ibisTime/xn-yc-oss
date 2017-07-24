$(function() {
	
	var userId = getQueryString('userId');
    var view = getQueryString('v');
	var view = 1;
    var amount, inAmount,outAmount;
    reqApi({
        code: "802503",
        json: {
            userId: userId,
            currency: "CB"
        }
    }).done(function(d) {
        amount = moneyFormat(d[0].amount);
        inAmount = moneyFormat(d[0].inAmount);
        outAmount = moneyFormat(d[0].outAmount);
        outWait = moneyFormat(d[0].inAmount - d[0].outAmount)
        })    
	
	var fields = [  {
        field: 'realName',
        title: '真实姓名',
        required: true,
    },{
    	field : 'mobile',
		title : '手机号',
        required: true
    }, {
        field: 'level',
        title: '等级',
        type: 'select',
        key: 'taster_level',
        keyCode: "807706",
        formatter: Dict.getNameForList('taster_level', "807706"),                
    },{
        field : 'province',
        title : '地址',
        type: "citySelect1",
        required: true,
        formatter:function(v,data){
            data = data.addressList[0];
            if(data.province !== data.city){
                return data.province + data.city +data.district
            }else{
                return data.city +data.district
            }            

        }
    },{
        field : 'address',
        title : '详细地址',
        required: true,
        formatter:function(v,data){
            var detailAddress = data.addressList[0].detailAddress;
            return detailAddress

        }        
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        search: true,
        key: 'user_status',
        keyCode: "807706",
        formatter: Dict.getNameForList('user_status', "807706"),
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
        afterSet:function(v,data){
            return $('#outWait').text(outWait)
        }
    }, {
        field: 'remark',
        title: '备注',   
    }];
	
	buildDetail({
		fields: fields,
        view: view,
		code:{
			userId: userId
		},
        buttons: {},
		addCode:'805500',
        editCode:'805501',
        detailCode:'805506',
        beforeSubmit:function(data){
            data.userId = userId;
            return data;
        }      
	});

    $('#tableList').bootstrapTable({
        columns: [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'code',
            title: '编号',
            required: true,
        }, {
            title: "受方手机",
            field: "mobile",
            formatter:function(v,data){
                return data.toUser.mobile
            }
        }, {
            field: 'toAmount',
            title: '发放金额',
            amount: true,
            required: true,
            formatter: moneyFormat,
        }, {
            field: 'createDatetime',
            title: '发放时间',
            formatter: dateTimeFormat,
        }, {
            field: 'remark',
            title: '备注',
        }],
        singleSelect: true, //禁止多选
        clickToSelect: true, //自动选中
        uniqueId: 'id',
        onClickRow: function(row, $element) {
            paramIndex = $element.data('index')
        }
    });

    if (userId) {
        reqApi({
            code: '802415',
            json: { 
                fromUserId: userId,
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

});