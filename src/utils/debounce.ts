const debounce = (fn, delay) => {
    let timerId;

    return (...arg) => {
        if(timerId) {
            clearTimeout(timerId);
            timerId = null;
        }

        timerId = setTimeout(() => {
            fn.apply(this, arg)
        }, delay);
    }
}

export default debounce;