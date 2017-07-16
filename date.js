;(function () {
    var datepicker = {};

    datepicker.getMonthData = function (year, month) {
        var ret = [];
        if (!year || !month && month !== 0) {
            var today = new Date(); // 今天
            year = today.getFullYear(); // 今年
            month = today.getMonth() + 1; // 当月（真实）
        }
        var firstDay = new Date(year, month - 1, 1); // 当月第一天 
        var firstDayWeekDay = firstDay.getDay(); // 当月第一天的星期
        if (firstDayWeekDay === 0) firstDayWeekDay = 7;

        // 参数month可越界
        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        console.log(year, month)
             

        var lastDayOfLastMonth = new Date(year, month - 1, 0); // 上月最后一天
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate(); // 上月最后一天是几号

        var preMonthDayCount = firstDayWeekDay - 1; // 上个月剩余几天 

        var lastDay = new Date(year, month, 0); // 当月最后一天
        var lastDate = lastDay.getDate(); // 当月最后一天几号

        for (var i=0; i<7*6; i++) {
            var date = i + 1 -preMonthDayCount;
            var showDate = date;
            var thisMonth = month;
            // 上一月
            if (date <= 0) {
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            } else if (date > lastDate) {
                // 下一月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }

            if (thisMonth === 0) thisMonth = 12;
            if (thisMonth === 13) thisMonth = 1;

            ret.push({
                month:thisMonth,
                date:date,
                showDate:showDate
            })
        }

        return {
            year:year,
            month:month,
            days:ret
        };
    }

    window.datepicker = datepicker;
})();