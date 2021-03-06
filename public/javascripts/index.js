$(function () {
    var delParent;
    var defaults = {
        fileType: ["jpg", "png", "bmp", "jpeg"],
        fileSize: 1024 * 1024 * 10
    };
    var uploadImgList = [];
    $(".file").change(function () {
        var idFile = $(this).attr("id");
        var file = document.getElementById(idFile);
        var imgContainer = $(this).parents(".z_photo");
        var fileList = file.files;
        console.log(fileList + "======filelist=====");
        var input = $(this).parent();
        var imgArr = [];
        var numUp = imgContainer.find(".up-section").length;
        var totalNum = numUp + fileList.length;
        if (fileList.length > 5 || totalNum > 5) {
            alert("涓婁紶鍥剧墖鏁扮洰涓嶅彲浠ヨ秴杩�5涓紝璇烽噸鏂伴€夋嫨");
        } else if (numUp < 5) {
            fileList = validateUp(fileList);
            for (var i = 0; i < fileList.length; i++) {
                var imgUrl = window.URL.createObjectURL(fileList[i]);
                imgArr.push(imgUrl);
                var $section = $("<section class='up-section fl loading'>");
                imgContainer.prepend($section);
                var $span = $("<span class='up-span'>");
                $span.appendTo($section);

                var $img0 = $("<img class='close-upimg'>").on("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(".works-mask").show();
                    delParent = $(this).parent();
                });
                $img0.attr("src", "/images/a7.png").appendTo($section);
                var $img = $("<img class='up-img up-opcity'>");
                $img.attr("src", imgArr[i]);
                $img.appendTo($section);
                var $p = $("<p class='img-name-p'>");
                $p.html(fileList[i].name).appendTo($section);
                var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
                $input.appendTo($section);
                var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
                $input2.appendTo($section);
            }
        }
        uploadImgList.push(fileList[0])
        setTimeout(function () {
            $(".up-section").removeClass("loading");
            $(".up-img").removeClass("up-opcity");
        }, 450);
        numUp = imgContainer.find(".up-section").length;
        if (numUp >= 5) {
            $(this).parent().hide();
        }
        $(this).val("");
    });



    $(".z_photo").delegate(".close-upimg", "click", function () {
        $(".works-mask").show();
        delParent = $(this).parent();
    });

    $(".wsdel-ok").click(function () {
        $(".works-mask").hide();
        var numUp = delParent.siblings().length;
        if (numUp < 6) {
            delParent.parent().find(".z_file").show();
        }
        delParent.remove();

    });

    $(".wsdel-no").click(function () {
        $(".works-mask").hide();
    });

    function validateUp(files) {
        var arrFiles = [];
        for (var i = 0, file; file = files[i]; i++) {
            var newStr = file.name.split("").reverse().join("");
            if (newStr.split(".")[0] != null) {
                var type = newStr.split(".")[0].split("").reverse().join("");
                console.log(type + "===type===");
                if (jQuery.inArray(type, defaults.fileType) > -1) {
                    if (file.size >= defaults.fileSize) {
                        alert(file.size);
                        alert('鎮ㄨ繖涓�"' + file.name + '"鏂囦欢澶у皬杩囧ぇ');
                    } else {

                        arrFiles.push(file);
                    }
                } else {
                    alert('鎮ㄨ繖涓�"' + file.name + '"涓婁紶绫诲瀷涓嶇鍚�');
                }
            } else {
                alert('鎮ㄨ繖涓�"' + file.name + '"娌℃湁绫诲瀷, 鏃犳硶璇嗗埆');
            }
        }
        return arrFiles;
    }
    // 上传图片
    $("#uploadimg").click(function () {
        var formData = new FormData();

        for (var i = 0; i < uploadImgList.length; i++) {
            formData.append('file' + i, uploadImgList[i]);
        }
        $.ajax({
            url: "/goods/file_upload",
            type: 'post',
            data: formData,
            contentType: false, // 注意 这两个必须加上
            processData: false, // 注意 这两个必须加上,
            success: res => {
                console.log(res)
            }
        })

    })
})