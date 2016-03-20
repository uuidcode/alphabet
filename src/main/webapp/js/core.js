var mouseWidth = 200;
var mouseHeight = 200;
var alphabetWidth = 200;
var alphabetHeight = 200;

var width = 0;
var height = 0;
var matrix = [];

function resize() {
    jQuery('#backgroundLayer')
        .height(jQuery(window).height())
        .width(jQuery(window).width());
}

jQuery(function() {
    width = jQuery(window).width();
    height = jQuery(window).height();

    var row = [];

    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            row.push(0);
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

        var alphabet = jQuery('div.alphabet');
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

    //var alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//            var alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    var alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    for (var i = 0; i < alphabetArray.length; i++) {
        jQuery('body')
            .append(
                jQuery('<audio></audio>')
                .attr('id', 'mp3_' + alphabetArray[i])
                .append(
                    jQuery('<source></source>')
                        .attr('src', './mp3/' + alphabetArray[i] + ".mp3")));

    }

    for (var i = 0; i < alphabetArray.length; i++) {
        var alphabet = jQuery('<div/>')
            .html(alphabetArray[i])
            .attr('class', 'alphabet');

        jQuery('body').append(alphabet);

        var left = 0;
        var top = 0;

        do {
            left = Math.floor((Math.random() * (width - alphabetWidth)) + 1);
            top = Math.floor((Math.random() * (height - alphabetHeight)) + 1);
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