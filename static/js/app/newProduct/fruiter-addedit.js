$(function() {

    var code = getQueryString('code');
    var view = getQueryString('v');
    var pcode;
    var codeInd = 0;
    var paramIndex = 0;

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }, {
        field: 'category',
        title: '大类',
        type: 'hidden',
        required: true,
        value: 'FL20170627100000002',
        // listCode: '808007',
        // params: {
        // 	type: "1",
        // 	status: '1',
        // 	parentCode: 0
        // },
        // keyName: 'code',
        // valueName: 'name',
        // onChange:function(v,data){
        // 	$("#type").renderDropdown({
        // 		listCode: '808007',
        // 		params: {
        // 			parentCode: "FL2017062717580920664616"
        // 		},
        // 		keyName: 'code',
        // 		valueName: 'name',
        // 	})
        // }
    }, {
        field: 'type',
        title: '小类',
        type: 'select',
        listCode: '808007',
        params: {
            parentCode: 'FL20170627100000002',
            status: "1",
            type: "1"
        },
        keyName: 'code',
        valueName: 'name',
        required: true,
        view: view
    },{
        title: '产品品种',
        field: "strain",
        maxlength: 255,
        required: true,
        view: view
    },{
        field: 'name',
        title: '果树名称',
        required: true,
        maxlength: 20,
        view: view
    },  {
        title: "销售状态",
        field: "saleStatus",
        maxlengthh: 255,
        required: true,
        view: view
    },  {
        field: 'slogan',
        title: '广告语',
        required: true,
        maxlength: 250,
    }, {
        field: 'advPic',
        title: '广告图',
        type: 'img',
        required: true,
        view: view
    }, {
        field: 'pic',
        title: '展示图',
        type: 'img',
        required: true,
        view: view
    }, {
        title: '图文详述',
        field: 'description',
        type: 'textarea',
        required: true,
        view: view
    }, {
        title: "成熟时间",
        field: "logisticsDate",
        maxlength: 255,
        required: true,
        view: view
    }, {
        title: "认购年限",
        field: "logisticsSum",
        number: true,
        required: true,
        view: view
    }, {
        field: 'remark',
        title: '备注',
        view: view,
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '808026',
        addCode: '808010',
        editCode: '808012',
        buttons: {},
        // beforeSubmit:function(data){
        // 	if (!storeCode){
        // 		data.storeCode = storeCode;
        // 	}
        // 	return data;
        // }
    });
    $('#tableList').bootstrapTable({
        columns: [{
            field: '',
            title: '',
            checkbox: true
        },{
            field: 'name',
            title: '规格名称',
            required: true,
        }, {
            field: 'price1',
            title: '人民币价',
            amount: true,
            required: true,
            formatter: moneyFormat,
        }, {
            field: 'price2',
            title: '橙券价',
            amount: true,
            required: true,
            formatter: moneyFormat,
        }, 
        // {
        //     title: "发货地",
        //     field: "province",
        //     type: "citySelect",
        //     // required: true
        // }, {
        //     field: 'weight',
        //     title: '重量（kg）',
        //     number: true,
        //     // required: true,
        // }, 
        {
            field: 'quantity',
            title: '库存',
            // required: true,
            number: true,
        }, {
            field: 'orderNo',
            title: '序号',
            required: true,
            number: true
        }],
        singleSelect: true, //禁止多选
        clickToSelect: true, //自动选中
        uniqueId: 'id',
        onClickRow: function(row, $element) {
            paramIndex = $element.data('index')
        }
    });

    if (code) {
        reqApi({ code: '808026', json: { code: code } }).done(function(d) {
            pcode = d.code
            $('#tableList').bootstrapTable('prepend', d.productSpecsList)
        })

    }

    //添加
    $("#addBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"></ul>' +
                '</form>'
        });

        dw.showModal();
        buildDetail({
            fields: [{
                field: 'name',
                title: '规格名称',
                required: true,
            },  {
                field: 'price1',
                title: '人民币价',
                amount: true,
                required: true,
                formatter: moneyFormat,
            }, {
                field: 'price2',
                title: '橙券价',
                amount: true,
                required: true,
                formatter: moneyFormat,
            },{
                field: 'quantity',
                title: '库存',
                required: true,
            }, {
                field: 'orderNo',
                title: '序号',
                required: true,
            }],
            container: $('#formContainer'),
            buttons: [{
                title: '保存',
                handler: function() {

                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();
                        data.code = codeInd++;
                        $('#tableList').bootstrapTable('insertRow', {
                            index: data.code,
                            row: data
                        });
                        toastr.info("添加成功");
                        dw.close().remove();
                    }
                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });
        dw.__center();
    })

    //删除
    $("#deleteBtn").click(function() {

        var selRecords = $('#tableList').bootstrapTable('getSelections');

        if (selRecords.length != 1) {
            toastr.info("请选择记录");
            return;
        }
        $('#tableList').bootstrapTable('remove', {
            field: "code",
            values: [selRecords[0].code]
        });
        //      if(code){
        //      	reqApi({code:'808031',json:{code:selRecords[0].code}}).done(function(res){
        //      		$('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
        //      	})
        //      }
        toastr.info("删除成功");
    })

    $("#edit2Btn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');

        if (selRecords.length != 1) {
            toastr.info("请选择记录");
            return;
        }

        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"></ul>' +
                '</form>'
        });

        buildDetail({
            fields: [{
                field: 'name',
                title: '规格名称',
                required: true,
            }, {
                field: 'price1',
                title: '人民币价',
                amount: true,
                required: true,
                formatter: moneyFormat,
            }, {
                field: 'price2',
                title: '橙券价',
                amount: true,
                required: true,
                formatter: moneyFormat,
            },{
                field: 'quantity',
                title: '库存',
                number: true,
                required: true,
            }, {
                field: 'orderNo',
                title: '序号',
                required: true,
                number: true
            }],
            container: $('#formContainer'),
            buttons: [{
                title: '保存',
                handler: function() {

                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();

                        $('#tableList').bootstrapTable('updateRow', {
                            index: paramIndex,
                            row: data
                        })
                        toastr.info("修改成功");
                        $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });

                        dw.close().remove();
                    }
                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });

        $('#popForm #name').val(selRecords[0].name)
        $('#popForm #price2').val(moneyFormat(selRecords[0].price2))
        $('#popForm #price1').val(moneyFormat(selRecords[0].price1))
        // $('#popForm #originalPrice').val(moneyFormat(selRecords[0].originalPrice))  
        $('#popForm #quantity').val(selRecords[0].quantity)
        $('#popForm #orderNo').val(selRecords[0].orderNo)

        dw.showModal();
        dw.__center();
    })

    $('#sub1Btn').off("click").click(function() {

        if ($('#jsForm').valid()) {
            var data = $('#jsForm').serializeObject();
            $('#jsForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
                var values = [];
                var imgs = $(el).find('.img-ctn');
                imgs.each(function(index, img) {
                    values.push($(img).attr('data-src') || $(img).find('img').attr('data-src'));
                });
                data[el.id] = values.join('||');
            });
            for (var i = 0, len = fields.length; i < len; i++) {
                var item = fields[i];
                if (item.equal && (!$('#' + item.field).is(':hidden') || !$('#' + item.field + 'Img').is(':hidden'))) {
                    data[item.equal] = $('#' + item.field).val() || $('#' + item.field).attr('src');
                } else if (item.emptyValue && !data[item.field]) {
                    data[item.field] = item.emptyValue;
                } else if (item.readonly && item.pass) {
                    data[item.field] = $('#' + item.field).attr('data-value') || $('#' + item.field).html();
                }
                if (item.type == 'select' && item.passValue) {
                    data[item.field] = $('#' + item.field).find('option:selected').html();
                }
            }
            data['id'] = data['code'];
            data.productSpecsList = $('#tableList').bootstrapTable("getData", { useCurrentPage: true });

            reqApi({
                code: code ? '808012' : '808010',
                json: data
            }).done(function(data) {
                sucDetail();
            });

        }
    });

    $('#back1Btn').off("click").click(function() {
        goBack();
    });
    if (view) {
        $("#addBtn").remove();
        $("#edit2Btn").remove();
        $("#deleteBtn").remove();
        $("#sub1Btn").remove();
    }

});