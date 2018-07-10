$('#loginBtn').click(function() {
    let account = $('#account').val().trim();
    let pass = $('#pass').val().trim();
    if (account === '') {
        layer.open({
            content: '请输入账号',
            btn: '我知道了'
        });
        return
    }
    if (pass === '') {
        layer.open({
            content: '请输入密码',
            btn: '我知道了'
        });
        return
    }
    $.post('https://www.topasst.com/web/insideMember/login', {
        account: account,
        password:  hex_md5(pass)
    }, function (result) {
        console.log(result)
        if (result.statusCode === 200) {
            window.sessionStorage.setItem('token', result.data)
            window.location.href="./desk.html"
        } else {
            layer.open({
                content: result.msg,
                btn: '我知道了'
            });
        }
    })
})