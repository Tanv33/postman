// Creating DOM element
function getDomElements(string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
}
// Parameters & textArea
const parameter = document.getElementById("parameter");
const textArea = document.getElementById("textArea");
parameter.style.display = "none";
// content Type
const jsonRadio = document.getElementById("jsonRadio");
const paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
    textArea.style.display = "none"
    parameter.style.display = "block";
});
jsonRadio.addEventListener("click", () => {
    textArea.style.display = "block"
    parameter.style.display = "none";
});

// click on +sign of parameters
const addSign = document.getElementById("addParams");
let index = 0;
addSign.addEventListener("click", () => {
    let string = `<div class="row my-3">
                        <label for="parameterKey1" class="col-sm-2 col-form-label">Parameter ${index + 2}</label>
                        <div class="col-md-4 my-1">
                            <input type="text" id="parameterKey${index + 2}" class="form-control" placeholder="Enter Parameter ${index + 2} Key"
                            aria-label="parameter Key">
                        </div>
                        <div class="col-md-4 my-1">
                            <input type="text" id="parameterValue${index + 2}" class="form-control" placeholder="Enter Parameter ${index + 2} Value"
                            aria-label="parameter Value">
                        </div>
                        <div class="col-1 my-1">
                            <button class="btn btn-primary deleteParams"> - </button>
                        </div>
                  </div>`;
    // calling DOM function
    let paramsElement = getDomElements(string);
    parameter.appendChild(paramsElement);
    // delete
    let deleteParams = document.getElementsByClassName("deleteParams");
    for (const item of deleteParams) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.remove()
        })
    }
    index++;
})

// Submit
const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    // Variables
    const url = document.getElementById("url").value;
    let response = document.getElementById("response");
    // response.value = `Please wait... response in progress...`
    let requestValue = document.querySelector("input[name='requestType']:checked").value;
    let contentValue = document.querySelector("input[name='contentType']:checked").value;
    let textAreaValue = document.getElementById("jsonTextArea");
    
    if (url.includes("http")) {
    response.innerText = `Please wait... response in progress...`
    }

    if (contentValue === "params") {
        data = {};
        for (let i = 0; i < index + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById("parameterKey" + (i + 1)).value;
                let value = document.getElementById("parameterValue" + (i + 1)).value;
                data[key] = value;
            }
        }
        data =  JSON.stringify(data);
    } else {
        data = textAreaValue.value;
    }

    // console.log('URL is ', url);
    // console.log('requestType is ', requestValue);
    // console.log('contentType is ', contentValue);
    // console.log('data is ', data);
    // console.log('index', index);

    if (requestValue === "GET") {
        fetch(url, {
            method: 'GET',
        }).then((response) => {
            return response.text();
        }).then((text) => {
            // response.value = text;
            if (url.includes("http")) {
                response.innerText= text;
                
            }
        })
    } else {
        fetch(url, {
            method: 'POST',
            body: data, 
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return response.text();
        }).then((text) => {
            // response.value = text;
            response.innerText = text;
        })
    }
});