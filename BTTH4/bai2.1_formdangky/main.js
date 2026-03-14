$(document).ready(function() {
    // 1. Định nghĩa các phương thức kiểm tra riêng (Regex)
    // Kiểm tra họ tên: Chỉ chữ cái và khoảng trắng
    $.validator.addMethod("validateName", function(value, element) {
        return this.optional(element) || /^[a-zA-ZÀ-ỹ\s]+$/i.test(value);
    }, "Họ tên chỉ được chứa chữ cái");

    // Kiểm tra số điện thoại: 10 số, bắt đầu bằng 0
    $.validator.addMethod("validatePhone", function(value, element) {
        return this.optional(element) || /^0[0-9]{9}$/i.test(value);
    }, "Số điện thoại phải gồm 10 số và bắt đầu bằng số 0");

    // Kiểm tra mật khẩu mạnh 
    $.validator.addMethod("strongPassword", function(value, element) {
        return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/i.test(value);
    }, "Mật khẩu ≥ 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 số");

    $("#registerForm").validate({
        rules: {
            fullname: {
                required: true,
                minlength: 3,
                validateName: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                validatePhone: true
            },
            password: {
                required: true,
                strongPassword: true
            },
            repassword: {
                required: true,
                equalTo: "#password" // So khớp với ô có id="password"
            },
            gender: "required",
            terms: "required"
        },
        // Thông báo lỗi tiếng Việt tương ứng
        messages: {
            fullname: {
                required: "Vui lòng nhập họ tên",
                minlength: "Họ tên phải có ít nhất 3 ký tự"
            },
            email: {
                required: "Vui lòng nhập email",
                email: "Định dạng email không hợp lệ"
            },
            password: {
                required: "Bắt buộc nhập mật khẩu"
            },
            repassword: {
                required: "Vui lòng xác nhận mật khẩu",
                equalTo: "Mật khẩu xác nhận không khớp"
            },
            gender: "Vui lòng chọn giới tính",
            terms: "Bạn cần đồng ý với điều khoản để tiếp tục"
        },

        highlight: function(element) {
            $(element).addClass('input-error').removeClass('input-success');
        },
        unhighlight: function(element) {
            $(element).addClass('input-success').removeClass('input-error');
        },

        submitHandler: function(form) {
            const name = $("#fullname").val();
            $("#registerForm").fadeOut(300, function() {
                $("#displayUser").text(name);
                $("#successContainer").fadeIn();
            });
            return false; 
        }
    });
});