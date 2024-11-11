class Calculator {
    constructor(previousoutputTextElement, currentoutputTextElement) {
        this.previousoutputTextElement = previousoutputTextElement;
        this.currentoutputTextElement = currentoutputTextElement;
        this.clear();
    }

    clear() {
        this.currentoutput = '';
        this.previousoutput = '';
        this.operation = undefined;
    }

    delete() {
        this.currentoutput = this.currentoutput.toString().slice(0, -1)
    }

    appendnumber(number) {
        if (number === '.' && this.currentoutput.includes('.')) return
        this.currentoutput = this.currentoutput.toString() + number.toString()
    }

    chooseoperation(operation) {
        if (this.currentoutput === '') return
        if (this.currentoutput !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousoutput = this.currentoutput
        this.currentoutput = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousoutput)
        const current = parseFloat(this.currentoutput)
        if (isNaN(prev) || isNaN(current)) return
        else if (this.operation === '÷' && current === 0) {
            alert("Error: Division by zero!");
            this.clear();
            this.updatedisplay();
            return;
        }
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentoutput = computation
        this.operation = undefined
        this.previousoutput = ''
    }

    updatedisplay() {
        this.currentoutputTextElement.innerText = this.getdisplayno(this.currentoutput)
        if (this.operation != null) {
            this.previousoutputTextElement.innerText = `${this.getdisplayno(this.previousoutput)} ${this.operation}`
        }
        else {
            this.previousoutputTextElement.innerText = ''
        }
    }

    getdisplayno(number) {
        const stno = number.toString()
        const intdig = parseFloat(stno.split('.')[0])
        const decimaldig = stno.split('.')[1]
        let intdisplay
        if (isNaN(intdig)) {
            intdisplay = ''
            if (this.operation === '÷' && current === 0) {
                alert("Error: Division by zero!");
                this.clear();
                this.updatedisplay();
                return;
            }
        }
        else {
            intdisplay = intdig.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimaldig != null) {
            return `${intdisplay}.${decimaldig}`
        }
        else {
            return intdisplay
        }
    }
}

const nobutton = document.querySelectorAll('[data-number]');
const opbutton = document.querySelectorAll('[data-operation]');
const eqbutton = document.querySelector('[data-equals]');
const delbutton = document.querySelector('[data-delete]');
const allclearbutton = document.querySelector('[data-allclear]');
const previousoutputTextElement = document.getElementsByClassName('previous-output')[0];
const currentoutputTextElement = document.getElementsByClassName('current-output')[0];

const calculator = new Calculator(previousoutputTextElement, currentoutputTextElement)

nobutton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendnumber(button.innerText)
        calculator.updatedisplay()
    })
});

opbutton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseoperation(button.innerText)
        calculator.updatedisplay()
    })
});

eqbutton.addEventListener('click', () => {
    calculator.compute()
    calculator.updatedisplay()
})

calculator.clear();

allclearbutton.addEventListener('click', () => {
    calculator.clear();
    calculator.updatedisplay();
});

delbutton.addEventListener('click', () => {
    calculator.delete();
    calculator.updatedisplay();
})