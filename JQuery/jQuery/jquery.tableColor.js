(function($) {
    $.fn.tableColor = function(options) {
        for (var i in options) {
            this.find(i).css(options[i]);
        }
        return this;
    };
})(jQuery);