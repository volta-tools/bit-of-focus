"use strict"

class RandomQuote extends HTMLQuoteElement
{
    connectedCallback() {

        console.log("Custom element added to page.");
        this.innerHTML = '';
        fetch("/api/v1/random")
            .then(response => response.json())
            .then(data => {
                this.innerHTML +=  data.message
            });
    }
}


export default RandomQuote;