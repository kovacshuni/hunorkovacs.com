var fade = function () {
    return {
        delayed: function (id, direction, target, delay) {
            setTimeout(function() { fade.init(id, direction, target) }, delay * 1000);
        },
        init: function (id, direction, target) {
            this.elem = document.getElementById(id);
            clearInterval(this.elem.si);
            this.target = target ? target : direction ? 100 : 0;
            this.flag = direction || -1;
            this.alpha = this.elem.style.opacity ? parseFloat(this.elem.style.opacity) * 100 : 0;
            this.elem.si = setInterval(function () {
                fade.tween()
            }, 20);
        },
        tween: function () {
            if (this.alpha == this.target) {
                clearInterval(this.elem.si);
            } else {
                var value = Math.round(this.alpha + ((this.target - this.alpha) * .005)) + (1 * this.flag);
                this.elem.style.opacity = value / 100;
                this.elem.style.filter = 'alpha(opacity=' + value + ')';
                this.alpha = value
            }
        }
    }
}();
