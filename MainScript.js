$(document).ready(function () {
    var UNL;
    $("#IANOutputTextArea").html("IAN Output will be displayed here");
    $("#EUGENEOutputTextArea").html("EUGENE Output will be displayed here");
    $("#UNLize").click(function () {
        if ($("#ddlLanguageSelection :selected").text() === "Select Natural language") { alert("Please select a Natural language before UNL-ization and NL-ization"); }
        else {
            $("#IANOutputTextArea").html("");
            var data = {
                action: "analyze",
                client: "test",
                lng: "hin",
                input: $("#InputArea").val(),
                timeOut: 60000,
                token_timeOut: 60000,
                user: "parteek"
            };


            var xhr = $.ajax({
                type: 'POST',
                url: 'http://dev.undlfoundation.org/WebService' + '/api/Analysis',
                crossDomain: true,
                dataType: 'json',
                data: data,
                beforeSend: function (xhr) { xhr.withCredentials = true; xhr.callID = 0; xhr.WSURL = "http://dev.undlfoundation.org/WebService"; },
                xhrFields: { withCredentials: true, callID: 0, WSURL: "http://dev.undlfoundation.org/WebService" },
                success: function (response, textStatus, XMLHttpRequest) {
                    UNL = response.text_unl;
                    alert("UNLization is successful");
                    $("#IANOutputTextArea").html(response.text_unl);
                },
                error: function (response, textStatus, XMLHttpRequest) {
                    alert("Some Error occurred");
                }
            });
        }
    });

    $("#NLize").click(function () {
        if ($("#ddlLanguageSelection :selected").text() === "Select Natural language") { alert("Please select a Natural language before UNL-ization and NL-ization"); }
        else {
            var data = {
            action: "generate",
            client: "test",
            user: "parteek",
            lng: "ind",
            input: $("#InputArea").val(),
            timeOut: 60000,
            token_timeOut: 60000
        };


        var xhr = $.ajax({
            type: 'POST',
            url: 'http://dev.undlfoundation.org/WebService' + '/api/Generation',
            crossDomain: true,
            dataType: 'json',
            data: data,
            beforeSend: function (xhr) { xhr.withCredentials = true; xhr.callID = 0; xhr.WSURL = "http://dev.undlfoundation.org/WebService"; },
            xhrFields: { withCredentials: true, callID: 0, WSURL: "http://dev.undlfoundation.org/WebService" },
            success: function (response, textStatus, XMLHttpRequest) {
                alert("NLization is successful");
                $("#EUGENEOutputTextArea").html(response.output);
            },
            error: function (response, textStatus, XMLHttpRequest) {
                alert("Some Error occurred");
            }
        });
    }
    });

});