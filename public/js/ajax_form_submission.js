//Form Submition
function ajaxSubmit(e, form, method, callBackFunction, id) {
    if (form.valid()) {
        e.preventDefault();
        var action = form.attr('action');
        var form2 = e.currentTarget;

        var data = new FormData(form2);
        console.log("checking data here::>>>>>", e, 'target>>>>>0', JSON.stringify(data));
        $.ajax({
            type: method,
            url: action,
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false,
            data: data,
            success: function (response) {
                if (response.status) {
                    toastr.success(response.notification);
                    if (form.attr('class') === 'ajaxDeleteForm') {
                        $('#alert-modal').modal('toggle')
                    } else {
                        $('#right-modal').modal('hide');
                        $('#large-modal').modal('hide');
                        $('#larger-modal').modal('hide');
                    }
                    if (!id == undefined || !id == 'undefined') {

                        callBackFunction(id);
                    } else {

                        callBackFunction();
                    }
                } else {
                    toastr.error(response.notification);
                }
            }
        });
    } else {
        toastr.error('Please make sure to fill all the necessary fields');
    }
}
