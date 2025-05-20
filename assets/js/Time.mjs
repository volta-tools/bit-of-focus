/**
 * Immutable Time object
 */
export class Time {

    #hours = 0
    get hours() { return this.#hours}

    #minutes = 0
    get minutes() { return this.#minutes}

    #seconds = 0
    get seconds() { return this.#seconds}

    #sign = "+"
    get sign() { return this.#sign}

    /**
     * @param {string|number} time
     */
    constructor(time) {

        if (typeof time === 'string') {
            if (time.charAt(0) === "-")  this.#sign = "-";
            const parts = time.split(":").map((x) => parseInt(x))
            this.#hours = parts[0] ?? 0;
            this.#minutes = parts[1] ?? 0;
            this.#seconds = parts[2] ?? 0;
        } else if (typeof time === 'number') {
            if (time < 0 ) {
                this.#sign = "-";
                time = Math.abs(time);
            }
            this.#seconds = Math.round(time)
        } else {
            throw new Error("Expected time to be a string hh:mm:ss or integer, '" + typeof time + "' given")
        }

        if (this.#seconds > 59 ) {
           const seconds = this.#seconds % 60;
           const extraMinutes = (this.#seconds - seconds) / 60
           this.#minutes += extraMinutes
           this.#seconds = seconds
        }

        if (this.#minutes > 59 ) {
            const minutes = this.#minutes % 60;
            const extraHours = (this.#minutes - minutes) / 60
            this.#hours += extraHours
            this.#minutes = minutes
        }

        if (this.#hours > 999) {
            throw new Error("Time is out of bounds")
        }
    }

    toInteger()
    {
        let s = (this.#hours * 60 * 60) + (this.#minutes * 60) + this.#seconds;
        if (this.#sign === "-") return s + -1;
        return s;
    }

    toString()
    {
        return ((this.#sign === "-") ? "-" : "" ) +
            this.#hours.toString().padStart(3, "0") + ":" +
            this.#minutes.toString().padStart(2, "0") + ":" +
            this.#seconds.toString().padStart(2, "0")
    }

    /**
     * @param {string|number|Time} timeA
     * @param {string|number|Time} timeB
     * @returns {Time}
     */
    static add = (timeA, timeB) => {
        const a = Time.#convertToTime(timeA)
        const b = Time.#convertToTime(timeB)
        return new Time(a.toInteger() + b.toInteger())
    }

    /**
     * @param {string|number|Time} time
     * @returns {Time}
     */
    withAdd(time)
    {
        return Time.add(this, time)
    }


    /**
     * @param {string|number|Time} timeA
     * @param {string|number|Time} timeB
     * @returns {Time}
     */
    static sub = (timeA, timeB) => {
        const a = Time.#convertToTime(timeA)
        const b = Time.#convertToTime(timeB)
        return new Time(a.toInteger() - b.toInteger())
    }

    /**
     * @param {string|number|Time} time
     * @returns {Time}
     */
    withSub(time)
    {
        return Time.sub(this, time)
    }

    /**
     * @param {string|number|Time} timeA
     * @param {string|number|Time} timeB
     * @returns {Time}
     */
    static diff = (timeA, timeB) => {
        const a = Time.#convertToTime(timeA)
        const b = Time.#convertToTime(timeB)
        return new Time(b.toInteger() - a.toInteger())
    }

    /**
     * @param {string|number|Time} time
     * @returns {Time}
     */
    withDiff(time)
    {
        return Time.diff(this, time)
    }

    /**
     * @param val
     */
    static #convertToTime(val){
        if (typeof val === "string" || typeof val === 'number') {
            return new Time(val)
        } else if (typeof val === 'object' ) {
            if (val.constructor.name === 'Time'  ) {
                return val
            }
        }
        throw new Error("Cannot convert " + typeof val + " to Time")
    }
}

