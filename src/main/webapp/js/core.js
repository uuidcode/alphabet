    var alphabetSprite = './images/alphabet' + (random(3) + 1) + ".png";
    console.log('alphabetSprite', alphabetSprite);

    var word = wordList[random(wordList.length)];

    console.log('word', word);

    var mouseWidth = 200;
    var mouseHeight = 200;
    var alphabetWidth = 150;
    var alphabetHeight = 200;

    var width = 0;
    var height = 0;
    var matrix = [];
    var started = false;
    var alphabetMatrix = {
        'A': [0, 0],
        'B': [1, 0],
        'C': [2, 0],
        'D': [3, 0],
        'E': [4, 0],
        'F': [5, 0],
        'G': [6, 0],
        'H': [7, 0],
        'I': [8, 0],
        'J': [9, 0],
        'K': [10, 0],
        'L': [11, 0],
        'M': [12, 0],
        'N': [0, 1],
        'O': [1, 1],
        'P': [2, 1],
        'Q': [3, 1],
        'R': [4, 1],
        'S': [5, 1],
        'T': [6, 1],
        'U': [7, 1],
        'V': [8, 1],
        'W': [9, 1],
        'X': [10, 1],
        'Y': [11, 1],
        'Z': [12, 1]
    };

    function resize() {
        jQuery('#backgroundLayer')
            .height(jQuery(window).height())
            .width(jQuery(window).width());
    }

    var wordPositon = 0;

    function random(num) {
        return Math.floor(Math.random() * num);
    }

    function contain(offset, e, item, isVisible) {
        if (offset.left - 50 <= e.pageX && e.pageX <= offset.left + item.width() + 50) {
            if (offset.top - 50 <= e.pageY && e.pageY <= offset.top + item.height() + 50) {
                return true;
            }
        }
        return false;
    }

    jQuery(document).ready(function() {
        width = jQuery(window).width();
        height = jQuery(window).height();

        setTimeout(function () {
            started = true;
            jQuery('div.alphabet').css({
                opacity: 0
            });

            jQuery('body').append('<div id=\"mouse\"><div id=\"mouseShadow\"></div>');
            jQuery('#mouse').css({
                width: mouseWidth,
                height: mouseHeight,
                left: (width - mouseWidth)/2,
                top: (height - mouseHeight)/2
            });
        }, 3000);

        var backgroundIndex = random(4) + 1;

        console.log('backgroundIndex', backgroundIndex);

        jQuery('body').css({
            background: 'url("./images/background' + backgroundIndex + '.png") no-repeat center center fixed'
        });

        console.log('width', width);
        console.log('height', height);

        matrix = [];

        for (var i = 0; i < height; i++) {
            var row = [];
            for (var j = 0; j < width; j++) {
                if (i < alphabetHeight) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            matrix.push(row)
        }

        jQuery(window).resize(resize);
        resize();

        jQuery(document).on('mousemove', function(e){
            if (!started) {
                return;
            }

            jQuery('#mouse').css({
                left: e.pageX - mouseWidth/2,
                top: e.pageY - mouseWidth/2
            });

            var alphabet = jQuery('div.alphabet[status="none"]');
            alphabet.each(function() {
                var item = jQuery(this);
                var offset = item.position();
                var isVisible = false;

                isVisible = contain(offset, e, item);


                if (isVisible) {
                    var x = e.pageX - offset.left;
                    var y = e.pageY - offset.top;
                    var clipPath = 'circle(' + mouseWidth/2 + 'px at ' + x + 'px ' + y + 'px)';
                    console.log('clipPath', clipPath);

                    item.css({
                        'opacity': 1,
                        '-webkit-clip-path': clipPath,
                        'clip-path': clipPath
                    });

                    jQuery("#mp3_" + item.attr('letter'))[0].play();

                } else {
                    item.css({
                        opacity: 0,
                        '-webkit-clip-path': '',
                        'clip-path': ''
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
            var spritePosition = alphabetMatrix[alphabetArray[i]];
            var spriteX = -1 * spritePosition[0] * alphabetWidth;
            var spriteY = -1 * spritePosition[1] * alphabetHeight;

            var alphabet = jQuery('<div/>')
                .attr('class', 'alphabet')
                .attr('status', 'none')
                .attr('index', i)
                .attr('letter', alphabetArray[i])
                .css({
                    fontSize: alphabetHeight,
                    background: 'url("' + alphabetSprite + '") ' + spriteX + 'px ' + spriteY + 'px'
                });

            jQuery('body').append(alphabet);
            alphabet.fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn();

            var completeRegion =
                jQuery('<div>')
                    .css({
                        background: 'white',
                        opacity: 0.7,
                        margin: '10px',
                        width: alphabetWidth - 20,
                        height: alphabetHeight - 20,
                        position: 'absolute',
                        left: i * alphabetWidth + 'px',
                        top: '0px',
                        zIndex: 50
                    })
                    .attr('index', i)
                    .attr('class', 'complete');

            jQuery('body').append(completeRegion);

            var left = 0;
            var top = 0;

            for (var j = 0; j < 10000; j++) {
                left = Math.floor((Math.random() * (width - alphabetWidth)) + 1);
                top = Math.floor((Math.random() * (height - alphabetHeight)) + 1);
                console.log('random');

                if (!duplicated(left, top)) {
                    break;
                }
            }

            setMatrix(left, top);

            alphabet.css({
                left: left,
                top: top,
                width: alphabetWidth,
                height: alphabetHeight,
                opacity: 1
            })
        }

        jQuery('body').on('click', function (e) {
            if (!started) {
                return;
            }

            var alphabet = jQuery('div.alphabet[status="none"]');
            alphabet.each(function() {
                var item = jQuery(this);
                var offset = item.position();

                if (contain(offset, e, item)) {
                    console.log('click');
                    item.show();
                    item.attr('status', 'selected');

                    var index = parseInt(jQuery(this).attr('index'), 10);

                    item.css({
                        '-webkit-clip-path': '',
                        'clip-path': ''
                    });

                    item.animate({
                        left: index * alphabetWidth,
                        top: 0
                    }, 200, function () {
                        jQuery('div.complete[index=' + index + ']').remove();

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

                            $('#mouse').remove();
                        }
                    });

                    return;
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
