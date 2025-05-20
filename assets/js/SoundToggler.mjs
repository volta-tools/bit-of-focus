
class SoundTogglerElement extends HTMLElement
{
    #audio = null;
    #audioEnabled = false;

    static observedAttributes = ["audio"];

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        shadow.addEventListener('click', event => {
            console.log("Clicked on sound toggler")
            this.#toggle()
        })
        //
        // // Create some CSS to apply to the shadow dom
        // const style = document.createElement("style");
        // style.textContent = ` .svgContainer {border: 2px solid red; } `;
        //
        // // Attach the created elements to the shadow dom
        // shadow.appendChild(style);


        this.#render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        //console.log(`Attribute SoundTogglerElement.${name} has changed from ${oldValue} to ${newValue}.`,);
        if (name === 'audio') {
            this.#audio = new Audio(newValue);
        }
    }

    #toggle()
    {
        if (!this.#audioEnabled) {
            this.#audio.play().then(() => {
                this.#audioEnabled = true;
                this.#render()
                this.#notify()
            }).catch(error => {
                console.debug("Audio did not play:", error.message)
            });
        } else {
            this.#audioEnabled = false
            this.#render()
            this.#notify()
        }
    }

    #notify()
    {
        const event = new CustomEvent('sound-toggler', {
            bubbles: true,
            cancelable: true,
            detail:  this.#audioEnabled
        });
        this.dispatchEvent(event);
    }

    #render()
    {
        if (!this.#audioEnabled) {
            this.shadowRoot.innerHTML = ` 
                <svg class="svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 3.00001C14 1.07799 11.5532 0.262376 10.4 1.8L6.5 7H4C2.34315 7 1 8.34315 1 10V14C1 15.6569 2.34315 17 4 17H6.49356L10.3878 22.3049C11.5313 23.8627 14 23.0539 14 21.1214V3.00001ZM8.1 8.2L12 3V21.1214L8.10581 15.8165C7.72901 15.3032 7.13031 15 6.49356 15H4C3.44772 15 3 14.5523 3 14V10C3 9.44772 3.44772 9 4 9H6.5C7.12951 9 7.72229 8.70361 8.1 8.2Z" 
                    fill="#887755"/>
                    <path d="M21.2929 8.57094C21.6834 8.18041 22.3166 8.18042 22.7071 8.57094C23.0976 8.96146 23.0976 9.59463 22.7071 9.98515L20.7603 11.9319L22.7071 13.8787C23.0976 14.2692 23.0976 14.9024 22.7071 15.2929C22.3166 15.6834 21.6834 15.6834 21.2929 15.2929L19.3461 13.3461L17.3994 15.2929C17.0088 15.6834 16.3757 15.6834 15.9852 15.2929C15.5946 14.9023 15.5946 14.2692 15.9852 13.8787L17.9319 11.9319L15.9852 9.98517C15.5946 9.59464 15.5946 8.96148 15.9852 8.57096C16.3757 8.18043 17.0088 8.18043 17.3994 8.57096L19.3461 10.5177L21.2929 8.57094Z" 
                    fill="#ff0000"/>
                </svg>
            `;
        } else {
            this.shadowRoot.innerHTML = ` 
                 <svg class="svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4 1.8C11.5532 0.262376 14 1.07799 14 3.00001V21.1214C14 23.0539 11.5313 23.8627 10.3878 22.3049L6.49356 17H4C2.34315 17 1 15.6569 1 14V10C1 8.34315 2.34315 7 4 7H6.5L10.4 1.8ZM12 3L8.1 8.2C7.72229 8.70361 7.12951 9 6.5 9H4C3.44772 9 3 9.44772 3 10V14C3 14.5523 3.44772 15 4 15H6.49356C7.13031 15 7.72901 15.3032 8.10581 15.8165L12 21.1214V3Z" 
                    fill="#887755"/>
                    <path d="M16.2137 4.17445C16.1094 3.56451 16.5773 3 17.1961 3C17.6635 3 18.0648 3.328 18.1464 3.78824C18.4242 5.35347 19 8.96465 19 12C19 15.0353 18.4242 18.6465 18.1464 20.2118C18.0648 20.672 17.6635 21 17.1961 21C16.5773 21 16.1094 20.4355 16.2137 19.8256C16.5074 18.1073 17 14.8074 17 12C17 9.19264 16.5074 5.8927 16.2137 4.17445Z" 
                    fill="#009900"/>
                    <path d="M21.41 5C20.7346 5 20.2402 5.69397 20.3966 6.35098C20.6758 7.52413 21 9.4379 21 12C21 14.5621 20.6758 16.4759 20.3966 17.649C20.2402 18.306 20.7346 19 21.41 19C21.7716 19 22.0974 18.7944 22.2101 18.4509C22.5034 17.5569 23 15.5233 23 12C23 8.47672 22.5034 6.44306 22.2101 5.54913C22.0974 5.20556 21.7716 5 21.41 5Z" 
                    fill="#009900"/> 
                 </svg>
            `;
        }
    }

}


export default SoundTogglerElement;