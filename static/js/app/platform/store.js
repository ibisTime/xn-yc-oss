$(function() {
    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'name',
            title: '店铺名称',
            search: true
        }, {
            field: 'type',
            title: '分类',
            type: 'select',
            listCode: '808007',
            keyName: 'code',
            valueName: 'name',
            params: {
                type: '2',
                status: "1"
            },
            search: true
        }, {
            field: 'legalPersonName',
            title: '法人姓名',
        }, {
            field: 'bookMobile',
            title: '联系电话',
        }, {
            field: 'smsMobile',
            title: '短信手机号',
        }, {
            title: "运营商",
            field: "refereeMobile",
            formatter: function(v, data) {
                if (v) {
                    return v
                } else {
                    return data.updater
                }

            }
        },
        // {
        //     title:'折扣',
        //     field:""
        // },
        {
            field: 'status',
            title: '状态',
            type: 'select',
            key: "store_status",
            keyCode: '808907',
            formatter: Dict.getNameForList("store_status", "808907"),
            search: true,
        }, {
            field: 'isDefault',
            title: '是否默认',
            type: 'select',
            data: {
                1: "是",
                0: "否",
            },
            required: true,
        },
        {
            field: 'rate1',
            title: '返点人民币比例',
        }, {
            field: 'rate2',
            title: '返点橙券比例',
        },
        {
            field: 'updateDatetime',
            title: '入驻时间',
            formatter: dateTimeFormat,
        }
    ];

    buildList({
        columns: columns,
        pageCode: '808215',
        searchParams: {
            companyCode: OSS.company
        }
    });

    //审核
    $('#examineBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 0) {
            toastr.info("当前店铺状态不能审核!");
            return;
        }

        window.location.href = "../store/store_examine.html?Code=" + selRecords[0].code;
    });

    //上架
    $('#up2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status == 2 || selRecords[0].statu == 3) {
            toastr.info("已上架!");
            return;
        }

        if (selRecords[0].status != 1 && selRecords[0].status != 4) {
            toastr.info("当前店铺状态不能上架!");
            return;
        }

        window.location.href = "store_up2.html?Code=" + selRecords[0].code;
    });

    //下架
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 2 && selRecords[0].status != 3) {
            toastr.info("还未上架");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '808205',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        }, function() {});

    });

    $('#applyBtn').click(function() {


        window.location.href = "../store/store_addedit.html";
    });

    // $('#yyBtn').click(function() {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }

    //     window.location.href = "yyLedger.html?Code=" + selRecords[0].code;
    // });

    // $('#daixiaoBtn').click(function() {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }

    //     window.location.href = "daixiaoLedger.html?Code=" + selRecords[0].code + "&owner=" + selRecords[0].owner + "&c=CB";
    // });



    //账户查询
    $('#accountQueryBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "../platform/member_account.html?userId=" + selRecords[0].owner + "&store=1";
    });

});