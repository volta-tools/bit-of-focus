

class RandomQuoteElement extends HTMLElement
{
    connectedCallback() {
        console.log("Custom element added to page.");
        RandomQuote().then(q => this.innerHTML =`<blockquote>${q.text}<cite>${q.author}</cite></blockquote>`);
    }
}

export const RandomQuote = async () =>{
    const response = await fetch("api/v1/random.json");
    const data = await response.json();
    if  (data.quotes && Array.isArray(data.quotes)) {
        const randomIndex =  Math.floor(Math.random() * data.quotes.length);
        return data.quotes[randomIndex];
    }

    console.log("Failed to fetch random quote");
    return "nee";


}

export default RandomQuoteElement;