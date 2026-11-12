class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
    }

    enqueue(element) {
        this.items[this.rear] = element;
        let currentRear = this.rear;
        this.rear += 1;
        return [element, currentRear];
    }

    dequeue() {
        if (this.isEmpty()) return undefined;
        let deleteItem = this.items[this.front];
        delete this.items[this.front];
        this.front += 1;
        return deleteItem;
    }

    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[this.front];
    }

    isEmpty() {
        return this.rear - this.front === 0;
    }

    clear() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
    }
}

const queue = new Queue();

function updateLabels() {
    $("#queue .enqueue").each(function (idx, el) {
        let rawVal = $(el).attr("data-val");
        let total = $("#queue .enqueue").length;
        if (total === 1) {
            $(el).text(`${rawVal} (Front/Rear)`);
        } else if (idx === 0) {
            $(el).text(`${rawVal} (Front)`);
        } else if (idx === total - 1) {
            $(el).text(`${rawVal} (Rear)`);
        } else {
            $(el).text(rawVal);
        }
    });
}

$(document).ready(function () {
    $("#enqueue-btn").on("click", function () {
        let inputVal = $("#q-data").val().trim();
        if (inputVal === "") {
            alert("Please enter a value to enqueue!");
            return;
        }
        let enq_data = queue.enqueue(inputVal);
        $("#queue").append(
            `<div id="q_${enq_data[1]}" data-val="${enq_data[0]}" class="row bg-primary enqueue">${enq_data[0]}</div>`
        );
        $("#q-data").val("");
        updateLabels();
    });

    $("#dequeue-btn").on("click", function () {
        if (queue.isEmpty()) {
            alert("Queue is empty! Nothing to dequeue.");
            return;
        }
        let frontIndex = queue.front;
        let deq_data = queue.dequeue();
        $("#dequeued").prepend(
            `<div class="row dequeue text-bg-danger border border-light">${deq_data}</div>`
        );
        $(`#q_${frontIndex}`).remove();
        updateLabels();
    });

    $("#peek-btn").on("click", function () {
        if (queue.isEmpty()) {
            alert("Queue is empty! Nothing to peek.");
            return;
        }
        let frontIndex = queue.front;
        $(`#q_${frontIndex}`).removeClass("bg-primary").addClass("peek");
        setTimeout(function () {
            $(`#q_${frontIndex}`).removeClass("peek").addClass("bg-primary");
        }, 1000);
    });

    $("#clear-btn").on("click", function () {
        queue.clear();
        $("#queue, #dequeued").empty();
    });
});