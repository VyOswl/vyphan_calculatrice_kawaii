const input = document.getElementById("input");
const display = document.getElementById("display");
const answer = document.getElementById("answer");
const empty = (element) => {
    element.innerText = "";
};
const del1 = (element) => {
    let string = element.innerText.slice(0, -1);
    element.innerText = string;
};

// CE bouton
document.getElementById("all-clear").addEventListener("click", () => {
    empty(input);
    empty(display);
    empty(answer);
});

// C bouton
document.getElementById("clear").addEventListener("click", () => {
    empty(input);
});

// Erase 1 element
document.getElementById("goback").addEventListener("click", () => {
    del1(input);
});

// number inputs
document.querySelectorAll(".number").forEach((element) => {
    element.addEventListener("click", () => {
        if (input.innerText.length > 16)
            return alert("Entrée maximale dépassée !")
        input.innerText += element.innerText;
    });
});

// decimal point input rule
document.getElementById("dot").addEventListener("click", () => {
    if (input.innerText.includes(".")) return;

    input.innerText += ".";
});

// switching betweeen + and - 
document.getElementById("switchSign").addEventListener("click", () => {
    if (input.innerText.startsWith("-")) {
        input.innerText = input.innerText.slice(1);
    } else {
        input.innerText = `-${input.innerText}`;
    }
});

// Input display handler
document.querySelectorAll(".ope").forEach((element) => {
    element.addEventListener("click", () => {
        //input.innerText += element.innerText;
        if (input.innerText) {
            if (display.innerText) {
                display.innerText = `${display.innerText} ${input.innerText} ${element.innerText}`;
            } else {
                display.innerText = `${input.innerText} ${element.innerText}`;
            }
        } else if (display.innerText.slice(-1).match(/-|\+|\*|\//)) {
            let string = display.innerText.slice(0, -1);
            string += element.innerText;
            display.innerText = string;
        }
        empty(input);
    });
});

// Calculation logic
document.getElementById("result").addEventListener("click", () => {
    if (input.innerText) {
        display.innerText = `${display.innerText}`;
        input.innerText = `${input.innerText}`;
        //input.innerText = "=  " + eval(display.innerText);
        console.log(display.innerText);
        console.log(input.innerText);

        const rex = /(^|[(\/*+-])(-(?:\d*\.)?\d+)|[\/*+-]|(?:\d*\.)?\d+/g;
        var t,
            str = [];

        while (t = rex.exec(display.innerText)) {
            if (t[1]) {
                str.push(t[1], t[2]);
            } else {
                str.push(t[0]);
            }
        }
        console.log(str);

        let operators = str.filter(function (e) {
            if (isNaN(e)) {
                return e;
            }
        });
        console.log(operators);

        let operands = str.filter(x => !operators.includes(x));
        operands.push(input.innerText);
        console.log(operands);


        while (operators.includes('*')) {
            let opIndex = operators.indexOf('*');
            operands.splice(opIndex, 2, operands[opIndex] * operands[opIndex + 1]);
            operators.splice(opIndex, 1);
        };
        while (operators.includes('/')) {
            let opIndex = operators.indexOf('/');
            operands.splice(opIndex, 2, operands[opIndex] / operands[opIndex + 1]);
            operators.splice(opIndex, 1);
        };
        let result = +operands[0];
        for (let i = 0; i < operators.length; i++) {
            operators[i] === '+' ? (result += +operands[i + 1]) : (result -= +operands[i + 1])
        }

        answer.innerText = "=  " + (+(Math.round(result + "e+9") + "e-9"));
    }
});
