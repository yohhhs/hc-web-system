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
    created () {
        this.token = window.sessionStorage.getItem('token')
        if (!this.token) {
            window.location.href="./index.html"
        } else {
            this.getPeople()
            this.getOrderList()
        }
    },
    methods: {
        getPeople () {
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
        getOrderList () {
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
        showUser () {
            this.showInfo = true
        },
        clickMask () {
            this.showInfo = false
        },
        loginOut () {
            window.sessionStorage.clear()
            window.location.href="./index.html"
        },
        receiveConfirm (id) {
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
        fliterList () {
            this.getOrderList()
        },
        changeStatus (n) {
            this.agentMemberName = ''
            this.status = n
            this.getOrderList()
        }
    }
})