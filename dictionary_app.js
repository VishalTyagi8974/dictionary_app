const h1 = document.querySelector("h1")
const section = document.querySelector("section");

const form = document.querySelector("form");
const input = document.querySelector("input");


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    h1.innerText = "";
    if (document.querySelector(".ans")) {
        document.querySelector(".ans").remove();
    }
    const word = input.value;
    let list = await fetchMeaning(word);

    const newDiv = document.createElement("div");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");

    h2.innerText = word;
    newDiv.append(h2);
    p.innerText = list;
    newDiv.append(p);

    newDiv.classList.add("ans");
    section.append(newDiv);

    await setTimeout(() => {
        newDiv.style.transform = "translate(-100%,0)";
    }, 100)
    input.value = "";

})


async function fetchMeaning(word) {
    try {
        const meaningreq = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd3/json/${word}?key=b16d8773-4b5e-4c44-9071-92957be3aed8`)
        const meaningjson = await meaningreq.json();
        const list = meaningjson[0].shortdef;

        if (!list) {
            if (meaningjson.length <= 5) {
                return `do yo mean: ${meaningjson}`
            }
            else {
                return `do yo mean: ${Array.from(meaningjson).slice(0, 4)}`
            }
        }


        return list;
    }

    catch {
        return "Server is down, please retry:("
    }
}
