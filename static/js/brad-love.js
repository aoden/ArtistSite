jQuery(document).ready(function (e) {
    e("body").on("click", ".brad-love", function () {
        var t = e(this);
        var n = e(this).attr("id");
        var r = e(this);
        if (t.hasClass("loved"))return false;
        if (e(this).hasClass("inactive"))return false;
        var i = {action: "brad-love", loves_id: n};
        e.post(main.ajaxurl, i, function (e) {
            t.find("span").html(e);
            t.addClass("loved").attr("title", "You already love this!");
            t.find("span").css({opacity: 1, width: "auto"})
        });
        e(this).addClass("inactive");
        return false
    })
})