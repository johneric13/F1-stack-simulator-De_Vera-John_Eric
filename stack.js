class Stack {
    constructor() {
        this.items = [];
        this.count = 0;
    }

    push(element) {
        this.items[this.count] = element;
        let push_res = `${element}`;
        this.count += 1;
        let count = this.count - 1;
        return [push_res, count];
    }

    pop() {
        if (this.count == 0) return undefined;
        let deleteItem = this.items[this.count - 1];
        this.count -= 1;
        this.items.length = this.count;
        return deleteItem;
    }

    peek() {
        if (this.count == 0) return undefined;
        return this.items[this.count - 1];
    }

    isEmpty() {
        return this.count == 0;
    }

    size() {
        return this.count;
    }

    clear() {
        this.items = [];
        this.count = 0;
        return this.items;
    }
}

const stack = new Stack();

$(document).ready(function () {
    $("#push-btn").on("click", function () {
        let inputVal = $("#st-data").val().trim();
        if (inputVal === "") {
            alert("Please enter a value to push!");
            return;
        }
        let push_data = stack.push(inputVal);
        $("#stack").prepend(
            `<div id="st_${push_data[1]}" class="row bg-primary push">${push_data[0]}</div>`
        );
        $("#st-data").val("");
    });

    $("#pop-btn").on("click", function () {
        if (stack.isEmpty()) {
            alert("Stack is empty! Nothing to pop.");
            return;
        }
        let topIndex = stack.size() - 1;
        let pop_data = stack.pop();
        $("#popped").prepend(
            `<div class="row pop text-bg-danger border border-light">${pop_data}</div>`
        );
        $(`#st_${topIndex}`).remove();
    });

    $("#peek-btn").on("click", function () {
        if (stack.isEmpty()) {
            alert("Stack is empty! Nothing to peek.");
            return;
        }
        let topIndex = stack.size() - 1;
        $(`#st_${topIndex}`).removeClass("bg-primary").addClass("peek");
        setTimeout(function () {
            $(`#st_${topIndex}`).removeClass("peek").addClass("bg-primary");
        }, 1000);
    });

    $("#clear-btn").on("click", function () {
        stack.clear();
        $("#stack, #popped").empty();
    });
});