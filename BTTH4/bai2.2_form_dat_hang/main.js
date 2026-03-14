$(document).ready(function() {
    const prices = {
        "Laptop": 25000000,
        "Iphone": 28000000,
        "Airpods": 5500000
    };

    $.validator.addMethod("validateDeliveryDate", function(value, element) {
        if (!value) return false;
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0,0,0,0);
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 30);
        return selectedDate >= today && selectedDate <= maxDate;
    }, "Ngày giao từ hôm nay đến tối đa 30 ngày tới");

    function updateTotalPrice() {
        const product = $("#product").val();
        const qty = parseInt($("#quantity").val()) || 0;
        const price = prices[product] || 0;
        const total = price * qty;
        
        const priceDisplay = $("#totalPrice");
        const container = $("#totalContainer");
        const newTotalStr = total.toLocaleString("vi-VN");

        // Chỉ chạy hiệu ứng nếu số tiền thực sự thay đổi
        if (priceDisplay.text() !== newTotalStr) {
            priceDisplay.text(newTotalStr);

            // Kích hoạt hiệu ứng chuyển động
            container.addClass("animate-total");
            
            // Xóa class sau khi hiệu ứng kết thúc để có thể lặp lại lần sau
            setTimeout(function() {
                container.removeClass("animate-total");
            }, 400);
        }
    }

    $("#product, #quantity").on("change input", updateTotalPrice);

    $("#note").on("input", function() {
        const len = $(this).val().length;
        const counter = $("#charCount");
        counter.text(len + "/200");
        len > 200 ? counter.addClass("over-limit") : counter.removeClass("over-limit");
    });

    $("#orderForm").validate({
        onfocusout: function(element) { $(element).valid(); },
        rules: {
            product: { required: true },
            quantity: { required: true, digits: true, range: [1, 99] },
            deliveryDate: { required: true, validateDeliveryDate: true },
            address: { required: true, minlength: 10 },
            payment: { required: true },
            note: { maxlength: 200 }
        },
        messages: {
            product: "Vui lòng chọn một sản phẩm",
            quantity: { required: "Nhập số lượng", range: "Số lượng từ 1 đến 99" },
            deliveryDate: { required: "Chọn ngày nhận hàng" },
            address: { required: "Vui lòng nhập địa chỉ", minlength: "Địa chỉ phải từ 10 ký tự" },
            payment: "Chọn một phương thức thanh toán",
            note: { maxlength: "Ghi chú không được quá 200 ký tự" }
        },
        submitHandler: function(form) {
            const summary = `
                <p>🛍️ <b>Sản phẩm:</b> ${$("#product option:selected").text().split(' (')[0]}</p>
                <p>🔢 <b>Số lượng:</b> ${$("#quantity").val()}</p>
                <p>💰 <b>Tổng tiền:</b> ${$("#totalPrice").text()} VNĐ</p>
                <p>📅 <b>Ngày giao:</b> ${$("#deliveryDate").val()}</p>
                <p>📍 <b>Địa chỉ:</b> ${$("input[name='address']").val()}</p>
                <p>💳 <b>Thanh toán:</b> ${$("input[name='payment']:checked").val()}</p>
            `;
            $("#orderSummary").html(summary);
            $("#orderForm").hide();
            $("#confirmBox").fadeIn();
            return false;
        }
    });

    $("#btnFinalConfirm").click(function() {
        $("#confirmBox").hide();
        $("#finalSuccess").fadeIn();
    });

    $("#btnCancel").click(function() {
        $("#confirmBox").hide();
        $("#orderForm").fadeIn();
    });
});