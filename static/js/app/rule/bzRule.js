$(function() {

    var columns = [{
            field: '',
            title: '',
            checkbox: true
        },{
            field: 'remark',
            title: '参数名'
        }, {
            title: '参数值',
            field: 'cvalue',
        }, {
            field: 'updateDatetime',
            title: '最近修改时间',
            formatter: dateTimeFormat
        }
    ];
    buildList({
        columns: columns,
        pageCode: "802025",
        searchParams: {
            type: "1",
            companyCode:OSS.company,
        }       
    });
});