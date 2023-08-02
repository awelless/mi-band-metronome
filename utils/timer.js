function isHmTimerDefined() {
    return typeof timer !== 'undefined'
}

function getGlobal() {
    if (typeof self !== 'undefined') {
        return self
    }
    if (typeof window !== 'undefined') {
        return window
    }
    if (typeof global !== 'undefined') {
        return global
    }
    if (typeof globalThis !== 'undefined') {
        return globalThis
    }

    throw new Error('unable to locate global object')
}

const globalNS = getGlobal()

if (typeof setTimeout === 'undefined' && isHmTimerDefined()) {
    globalNS.clearTimeout = function clearTimeout(timerRef) {
        timerRef && timer.stopTimer(timerRef)
    }

    globalNS.setTimeout = function setTimeout(func, ns) {
        const timer1 = timer.createTimer(
            ns || 1,
            Number.MAX_SAFE_INTEGER,
            function () {
                globalNS.clearTimeout(timer1)
                func && func()
            },
            {}
        )

        return timer1
    }

    globalNS.clearImmediate = function clearImmediate(timerRef) {
        timerRef && timer.stopTimer(timerRef)
    }

    globalNS.setImmediate = function setImmediate(func) {
        const timer1 = timer.createTimer(
            1,
            Number.MAX_SAFE_INTEGER,
            function () {
                globalNS.clearImmediate(timer1)
                func && func()
            },
            {}
        )

        return timer1
    }

    globalNS.clearInterval = function clearInterval(timerRef) {
        timerRef && timer.stopTimer(timerRef)
    }

    globalNS.setInterval = function setInterval(func, ms) {
        const timer1 = timer.createTimer(
            1,
            ms,
            function () {
                func && func()
            },
            {}
        )

        return timer1
    }
}
