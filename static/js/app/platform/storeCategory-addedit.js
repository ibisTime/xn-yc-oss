$(function() {
	
	var code = getQueryString('code');
//	var pCode = getQueryString('pCode')
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	},
	{
        title: '所属大类',
        field: 'parentCode',
         required: true,
        type: 'select',
        listCode: '808007',
        params: {
            type: "2",
            parentCode: 0
        },
        keyName: 'code',
        valueName: 'name',
        defaultOption: '选此创建大类',
    }, 
     {
        field: 'name',
        title: '类别名称',
        required: true,
    }, {
		title: '图片',
		field: 'pic',
		type: 'img',
		// required: true,
	}, {
        field: 'orderNo',
        title: '次序',
		required: true,
        number: true,
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '808006',
		addCode: '808000',
		editCode: '808002',
		beforeSubmit: function(data){
			data.type = "2";
			// data.parentCode ="0";
			
			return data;
		}
	});
	
});