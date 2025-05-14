"use strict";

/**
 * load PWA
 */
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("./../serviceWorker.js")
            .then(registration => {
                console.log("Registration serviceworker succeeded")
                registration.unregister()
                    .then((unregister) => {
                        if (unregister) {
                            console.log("Unregister serviceworker successful")
                        }
                    }
                )
            })
            .catch(error => console.error(`Registration serviceworker failed with ${error}`))
    })
}

