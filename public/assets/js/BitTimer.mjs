"use strict";


/**
 * The main class
 */
class BitTimer
{

    /**
     * Internal copy of the current timer config
     * @type {{}}
     */
    #_config = {};


    timerElementId = "timer";
    timerMessageElementId = "timerMessage";

    /**
     * Initializes internal values
     *
     * @param config
     * @param elementId
     */
    constructor(config, elementId) {
        this.#_config = config;

        this.sequence = this.#_config.sequence ?? {};
        this.timerElement = document.getElementById(this.timerElementId);
        this.timeMessageElement = document.getElementById(this.timerMessageElementId);
        this.startHour = this.#_config.startHour ?? 9;
        this.startMinute = this.#_config.startMinute ?? 30;
        this.sequenceTotal = 0;
        this.sequence.forEach(slice => {
            this.sequenceTotal += slice.duration * 60;
        })
        this.currentSliceIndex = -1;
        console.debug("Total time of the sequence = ", this.sequenceTotal, "s. = ", this.sequenceTotal / 60 , " m. = ", this.sequenceTotal / 60 / 60, " h.");
    }

    start() {
        let showCountDown = ()=> {
            let timeCounter = this.getTimeCounter();
            let elapse = 0;
            let sliceIndex  = -1;
            let focusCounter = 0;

            // pending when negative, this means the start time is not yet passed
            if (timeCounter < 0 ) {
                this.timerElement.innerHTML = `- ${this.secondsToTime(Math.abs(timeCounter))}`;
                this.timeMessageElement.innerHTML = this.#_config.startMessage ?? "pending";

                // stopped, when the time counter exceeds the total time (including start time) of the sequence
            }else if (timeCounter > this.sequenceTotal) {
                this.timerElement.innerHTML = `+ ${this.secondsToTime(Math.abs(timeCounter - this.sequenceTotal))}`;
                this.timeMessageElement.innerHTML = this.#_config.endMessage ?? "stopped";

                // active, in all other cases
            } else {
                for(let i = 0; i < this.sequence.length; i++){

                    // get the active sequence slice by checking if the current slice duration
                    // combined with elapsed slice time is greater than the time counter
                    if ((this.sequence[i].duration * 60) + elapse > timeCounter) {
                        sliceIndex = i;
                        break; // found active counter
                    }

                    // increase elapse time with the duration of all the finished slices
                    elapse += (this.sequence[i].duration * 60);
                    if (this.sequence[i].type === 1 ) focusCounter++;
                }

                // print the time left for the current slice
                this.timerElement.innerHTML =
                    `${this.secondsToTime(timeCounter-elapse)}
                   `;

                if (this.currentSliceIndex < sliceIndex ) {
                    this.currentSliceIndex = sliceIndex;

                    console.debug(`New Slice Index ${this.currentSliceIndex}`);
                    if (this.sequence[sliceIndex].audioFile) {
                        let audio = new Audio(this.sequence[sliceIndex].audioFile);
                        audio.play().then( () => {
                            console.debug('Audio played')
                        } ).catch(error => {
                            console.debug('Audio failed', error)
                        });
                    }

                    this.timeMessageElement.innerHTML = `
                     <p>
                      <strong>slice:</strong> ${sliceIndex+1}/ ${this.sequence.length},<br> 
                      <strong>duration:</strong> ${this.sequence[sliceIndex].duration} m./ ${this.sequenceTotal/60} m. 
                    </p>
                    ${this.sequence[sliceIndex].description}`;
                }
            }
            setTimeout(showCountDown, 500);
        };
        setTimeout(showCountDown, 500);
    }

    /**
     * Formats given seconds in hh:mm:ss and returns it
     * @param {int} seconds
     * @returns {string}
     */
    secondsToTime(seconds) {

        let r = 0;
        let h = 0;
        let m = 0;
        let s = 0;

        if (seconds > 3600) {
            r = seconds % 3600;
            h = (seconds - r) / 3600;
            seconds -= h * 3600;
        }

        if (seconds > 60) {
            r = seconds % 60;
            m = (seconds - r) / 60;
            seconds -= m * 60;
        }
        s = seconds;
        return Math.floor(h).toString().padStart(2, "0") + ":"
            + Math.floor(m).toString().padStart(2, "0") + ":"
            + Math.floor(s).toString().padStart(2, "0");
    }

    /**
     * Returns the number of seconds since startTime (will be negative if not started yet)
     * @returns int
     */
    getTimeCounter()
    {
        let startTime = (this.startHour * 60 * 60 ) + (this.startMinute * 60);
        let currentDate = new Date();
        let currentTime =
            (currentDate.getHours() * 60 * 60 ) +
            (currentDate.getMinutes() *  60) + currentDate.getSeconds()
        return currentTime - startTime;
    }



}

export default BitTimer;