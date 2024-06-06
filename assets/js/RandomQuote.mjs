"use strict"

class RandomQuote extends HTMLQuoteElement
{
    connectedCallback() {

        console.log("Custom element added to page.");
        this.innerHTML = '';
        fetch("./api/v1/random")
            .then(response => response.json())
            .then(data => {

                let quote = data.quotes[(Math.floor(Math.random() * data.quote.length))];
                 console.log(quote)
                this.innerHTML +=  data.message
            });
    }
}


export default RandomQuote;