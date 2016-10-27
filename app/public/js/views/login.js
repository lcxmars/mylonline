define(['backbone'], function (BB) {
    return BB.View.extend({
        el: '#login-form',
        events: {
            'submit': 'login'
        },
        initialize: function () {
            this.$('input[name="username"]').focus();
            this.$('input[name="username"]').val(this.$('input[name="username"]').val());
        },
        login: function (event) {
            event.preventDefault();
            this.$('.error').hide();
            var username = this.$('input[name="username"]').val();
            var password = this.$('input[name="password"]').val();

            APP.socket.emit('anonymous action', 'login', {
                username: username,
                password: password
            });

            var self = this;

            APP.socket.once('anonymous action', function (data) {
                if (data.success) {
                    APP.user.set(data.attributes);
                    BB.history.navigate('dashboard', {trigger: true});
                } else self.$('.error[data-code="' + data.errorCode + '"]').show();
            });
        }
    });
});
