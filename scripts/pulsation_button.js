class PulsationButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({
      mode: "open",
    });

    shadow.innerHTML = `
                        <style>
                          .pulsation_button {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          }
              
                          button {
                            font-weight: 600;
                            font-size: 32px;
                            line-height: 100%;
                            padding: 30px 40px;
                            letter-spacing: 0;
                            color: white;
                            background-color: #6137CD;
                            border-radius: 88px;
                            position: relative;
                            z-index: 3;
                            border: none;
                            cursor: pointer;

                            transition: background-color 0.3s ease;
                          }

                          button:hover {
                            background-color: #4d2aa5;
                          }
              
                          .pulsation_button__outer_border {
                            position: relative;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 7px;
                            border: 3px solid rgba(97, 55, 205, 0);
                            border-radius: 88px;
                            animation-duration: 3.5s;
                            animation-timing-function: ease-in-out;
                            animation-iteration-count: infinite;
                            animation-fill-mode: both;

                            z-index: 1;
                          }
              
                          .outer_border_layer_1 {
                            animation-name: step-1;
                          }
                          .outer_border_layer_2 {
                            animation-name: step-2;
                          }
                          .outer_border_layer_3 {
                            animation-name: step-3;
                          }
                          .outer_border_layer_4 {
                            animation-name: step-4;
                          }
              
                          @keyframes step-1 {
                            20%, 100% { border-color: rgba(97, 55, 205, 0); }
                            20% { border-color: rgba(97, 55, 205, 0.8); }
                          }
                          @keyframes step-2 {
                            40%, 100% { border-color: rgba(97, 55, 205, 0); }
                            40% { border-color: rgba(97, 55, 205, 0.6); }
                          }
                          @keyframes step-3 {
                            60%, 100% { border-color: rgba(97, 55, 205, 0); }
                            60% { border-color: rgba(97, 55, 205, 0.4); }
                          }
                          @keyframes step-4 {
                            80%, 100% { border-color: rgba(97, 55, 205, 0); }
                            80% { border-color: rgba(97, 55, 205, 0.1); }
                            80%, 90% { border-color: rgba(97, 55, 205, 0.2); }
                            90%, 100% { border-color: rgba(97, 55, 205, 0); }
                          }

                          @media (max-width: 1000px) {
                            .pulsation_button {
                              button {
                                font-weight: 500;
                                font-size: 28px;
                                padding: 20px 25px;
                              }
                            }
                          }

                          @media (max-width: 800px) {
                            .pulsation_button {
                              button {
                                font-size: 24px;
                                padding: 15px 20px;
                              }
                            }
                          }
                        </style>
              
                        <div class="pulsation_button">
                          <div class="pulsation_button__outer_border outer_border_layer_4">
                            <div class="pulsation_button__outer_border outer_border_layer_3">
                              <div class="pulsation_button__outer_border outer_border_layer_2">
                                <div class="pulsation_button__outer_border outer_border_layer_1">
                                  <button><slot>Click Me</slot></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      `;
  }

  connectedCallback() {
    const label = this.getAttribute("label");
    if (label) {
      this.shadowRoot.querySelector("button").textContent = label;
    }
  }
}

customElements.define("pulsation-button", PulsationButton);
