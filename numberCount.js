const NumberCount = function (option) {
    if (option.element && this.isDOMElement(option.element)) {
        this.element = option.element;
    } else {
        throw 'DOMElement error';
    }
    this.total = 0;
    if (option.to && typeof option.to === 'number') {
        this.to = option.to;
    } else {
        throw 'Invalid type of "number" expected, Received "' + typeof option.to + '" instead';
    }
    this.delay = option.delay || Math.floor(Math.random() * 40 + 40);
    this.range = 0; // 根据传入的数，设定定时器每次变动的幅度
    this.interval = null;
    this.incrementl = 0;
    this.prefix = 1; //改变的数字大于0: 1 小于0: -1
    this.float_num = 20; // 如果传入的数小于该设定的数，则定时器每次累加1，直至达到变动期望
    if (option.onRenderStart) {
        if (typeof option.onRenderStart === 'function') {
            this.onRenderStart = option.onRenderStart;
        } else {
            throw 'Invalid type of "function" expected, Received "' + typeof option.to + '" instead';
        }
    } else {
        this.onRenderStart = null;
    }
    if (option.onRenderEnd) {
        if (typeof option.onRenderEnd === 'function') {
            this.onRenderEnd = option.onRenderEnd;
        } else {
            throw 'Invalid type of "function" expected, Received "' + typeof option.to + '" instead';
        }
    } else {
        this.onRenderEnd = null;
    }
    this.init();
}
NumberCount.prototype = {
    constructor: NumberCount,
    init() {
        this.range = this.getRange();
        this.render();
    },
    render() {
        this.onRenderStart && this.onRenderStart();
        this.interval = setInterval(() => {
            this.incrementl += this.range;
            if (this.incrementl >= Math.abs(this.to)) {
                clearInterval(this.interval);
                this.incrementl = this.to;
                this.onRenderEnd && this.onRenderEnd();
                this.total += this.to;
                this.to = 0;
                this.range = 0;
                this.incrementl = 0;
            }
            this.element.innerHTML = this.formate(this.total + this.incrementl * this.prefix);
        }, this.delay)
    },
    rise(num) {
        if (typeof num !== 'number') {
            throw 'Invalid type of "number" expected, Received "' + typeof num + '" instead';
        }
        if (num > 0) {
            this.prefix = 1;
        } else {
            this.prefix = -1;
        }
        this.to = num;
        this.range = this.getRange();
        this.render();
    },
    formate(num) {
        return (num).toLocaleString();
    },
    getRange() {
        let _to = Math.abs(this.to);
        return _to >= this.float_num ? Math.floor(_to / this.float_num * Math.random() + _to / this.float_num / 2) : 1;
    },
    isDOMElement(obj) {
        return !!(obj && typeof window !== 'undefined' && (obj === window || obj.nodeType));
    }
}