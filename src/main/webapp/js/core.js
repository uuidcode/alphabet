    var wordList = [];
//    wordList.push('PIANO');
//    wordList.push('APPLE');
//    wordList.push('DOG');
//    wordList.push('MOON');
//    wordList.push('BALLET');
//    wordList.push('MOTHER');
    wordList.push('FATHER');
//    wordList.push('SPRING');

    var word = wordList[Math.floor(Math.random() * wordList.length)];

    console.log('word', word);

    var mouseWidth = 200;
    var mouseHeight = 200;
    var alphabetWidth = 150;
    var alphabetHeight = 200;

    var width = 0;
    var height = 0;
    var matrix = [];

    function resize() {
        jQuery('#backgroundLayer')
            .height(jQuery(window).height())
            .width(jQuery(window).width());
    }

    var wordPositon = 0;

    jQuery(document).ready(function() {
        width = jQuery(window).width();
        height = jQuery(window).height();

        console.log('width', width);
        console.log('height', height);

        matrix = [];

        for (var i = 0; i < height; i++) {
            var row = [];
            for (var j = 0; j < width; j++) {
                if (i < alphabetHeight + alphabetHeight/2) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            matrix.push(row)
        }

        jQuery(window).resize(resize);
        resize();

        jQuery('#mouse').css({
            width: mouseWidth,
            height: mouseHeight
        });

        jQuery(document).on('mousemove', function(e){
            jQuery('#mouse').css({
                left: e.pageX - mouseWidth/2,
                top: e.pageY - mouseWidth/2
            });

            var alphabet = jQuery('div.alphabet[status="none"]');
            alphabet.each(function() {
                var item = jQuery(this);
                var offset = item.position();
                var isVisible = false;

                if (offset.left <= e.pageX && e.pageX <= offset.left + item.width()) {
                    if (offset.top <= e.pageY && e.pageY <= offset.top + item.height()) {
                        isVisible = true;
                    }
                }

                if (isVisible) {
                    item.css({
                        opacity: 1
                    });

                    jQuery("#mp3_" + item.html())[0].play();

                } else {
                    item.css({
                        opacity: 0
                    });
                }
            })
        });

        var alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        for (var i = 0; i < alphabetArray.length; i++) {
            jQuery('body')
                .append(
                    jQuery('<audio></audio>')
                    .attr('id', 'mp3_' + alphabetArray[i])
                    .append(
                        jQuery('<source></source>')
                            .attr('src', './mp3/' + alphabetArray[i] + ".mp3")));

        }

        jQuery('body')
            .append(
            jQuery('<audio></audio>')
                .attr('id', 'mp3_' + word)
                .append(
                jQuery('<source></source>')
                    .attr('src', './mp3/' + word + ".mp3")));


        alphabetArray = word.split('');

        for (var i = 0; i < alphabetArray.length; i++) {
            var alphabet = jQuery('<div/>')
                .html(alphabetArray[i])
                .attr('class', 'alphabet')
                .attr('status', 'none')
                .attr('index', i)
                .css({
                    fontSize: alphabetHeight
                });

            jQuery('body').append(alphabet);

            var left = 0;
            var top = 0;

            do {
                left = Math.floor((Math.random() * (width - alphabetWidth)) + 1);
                top = Math.floor((Math.random() * (height - alphabetHeight)) + 1);
                console.log('random');

            } while (duplicated(left, top));

            setMatrix(left, top);

            alphabet.css({
                left: left,
                top: top,
                width: alphabetWidth,
                height: alphabetHeight,
                opacity: 0
            })
        }

        jQuery('div.alphabet').on('click', function () {
            console.log('click');
            jQuery(this).show();
            jQuery(this).attr('status', 'selected');

            var index = parseInt(jQuery(this).attr('index'), 10);

            jQuery(this).animate({
                left: index * alphabetWidth,
                top: 0,
                color: '#000000'
            }, 200, function () {
                if (jQuery('div.alphabet[status="none"]').size() == 0) {
                    jQuery('#mp3_' + word)[0].play();

                    var imageDiv = jQuery('<div></div>');
                    var imageItem =
                        jQuery('<img>')
                            .attr('src', './images/' + word + ".png");
                    imageDiv
                        .attr('id', 'modalForm')
                        .hide()
                        .append(imageItem);

                    jQuery('body').append(imageDiv);

                    $("#modalForm").modal({
                        fadeDuration: 100
                    });
                }
            });
        });

    });

    function duplicated(left, top) {
        for (var i = left; i < left + alphabetWidth; i++) {
            for (var j = top; j < top + alphabetHeight; j++) {
                if (matrix[j][i] == 1) {
                    return true;
                }
            }
        }

        return false;
    }

    function setMatrix(left, top) {
        for (var i = left; i < left + alphabetWidth; i++) {
            for (var j = top; j < top + alphabetHeight; j++) {
                matrix[j][i] = 1;
            }
        }
    }

    function closeCallback() {
        window.location.reload();
    }
