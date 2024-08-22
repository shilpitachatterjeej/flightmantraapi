function getAPIService(url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: 'GET',
            dataType: "json",
            data: data,
            async: true,
            success: function (response) {
                return resolve(response);
            }, error: function (error) {
                let err = {
                    error: "{}",
                    message: "Something went wrong",
                    code: 500,
                    statusType: "error",
                };
                return resolve(error.responseJSON ? error.responseJSON : err);
            }
        });
    })
}


function postAPIService(url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: 'POST',
            dataType: "json",
            data: data,
            async: true,
            success: function (response) {
                return resolve(response);
            }, error: function (error) {
                let err = {
                    error: error,
                    message: "Something went wrong",
                    code: 500,
                    statusType: "error",
                };
                return resolve(error.responseJSON ? error.responseJSON : err);
            }
        });
    })
}




function photoPostAPIService(url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: 'POST',
            dataType: "json",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            data: data,
            async: true,
            success: function (response) {
                return resolve(response);
            }, error: function (error) {
                let err = {
                    error: error,
                    message: "Something went wrong",
                    code: 500,
                    statusType: "error",
                };
                return resolve(error.responseJSON ? error.responseJSON : err);
            }
        });
    })
}

