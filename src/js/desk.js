var URL = 'https://www.topasst.com/web'
new Vue({
    el: '#app',
    data: {
        showInfo: false,
        token: '',
        saleDptList: [],
        buyGift: 0,
        sendGift: 1,
        transferCount: 0,
        insideMemberName: '',
        agentMemberName: '',
        status: 3,
        orderList: []
    },
    created: function () {
        this.token = window.sessionStorage.getItem('token')
        if (!this.token) {
            window.location.href="./index.html"
        } else {
            this.getPeople()
            this.getOrderList()
        }
    },
    methods: {
        getPeople: function () {
            var vm = this
            $.post(URL + '/insideMember/getInsideMember', {
                token: vm.token
            }, function (res) {
                if (res.statusCode === 200) {
                    vm.insideMemberName = res.data.insideMemberName
                    vm.transferCount = res.data.transferCount
                    vm.buyGift = res.data.buyGiftCount
                    vm.sendGift = res.data.sendGiftCount
                    vm.saleDptList = res.data.saleDptList
                }
            })
        },
        getOrderList: function () {
            var vm = this
            $.post(URL + '/insideMember/getInsideMemberOrderList', {
                token: vm.token,
                orderState: vm.status,
                agentMemberName: vm.agentMemberName
            }, function (res) {
                if (res.statusCode === 200) {
                    vm.orderList = res.data
                }
            })
        },
        showUser: function () {
            this.showInfo = true
        },
        clickMask: function () {
            this.showInfo = false
        },
        loginOut: function () {
            window.sessionStorage.clear()
            window.location.href="./index.html"
        },
        receiveConfirm: function (id) {
            var vm = this
            layer.open({
                title: '确认收货',
                content: '请确认该经济人收到货物'
                ,btn: ['确定', '取消']
                ,yes: function(index){
                    $.post(URL + '/insideMember/receive', {
                        token: vm.token,
                        purchaseOrderId: id
                    }, function (res) {
                        if (res.statusCode === 200) {
                            layer.close(index);
                            vm.getOrderList()
                        }
                    })
                }
            });

        },
        fliterList: function () {
            this.getOrderList()
        },
        changeStatus: function (n) {
            this.status = n
            this.getOrderList()
        },
        formatTime: function (date) {
            date = new Date(date)
            var year = date.getFullYear()
            var month = date.getMonth() + 1
            var day = date.getDate()
            var hour = date.getHours()
            var minute = date.getMinutes()
            var second = date.getSeconds()

            return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
        },
        formatNumber: function (n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        }
    }
})