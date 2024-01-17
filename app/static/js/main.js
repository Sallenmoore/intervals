// === Imports
import * as base from './src/base.js';
import * as widgets from './src/widgets.js';

// === define a Global object to store all of my page-level variables:
var Global = {
  intervals: [],
  timer: 0,
  total: 0,
  paused: false,
};

//===My document.ready() handler...
document.addEventListener("DOMContentLoaded", () => {
  //=== do some code stuff...
  set_timer();
  _add_interval(0, 20);
  _add_interval(0, 10);
  //===finally, bind my events
  bindEvents();
});

//===This function handles event binding for anything on the page
//===Bind to existing functions, not anonymous functions

function bindEvents() {
  document.getElementById("total_time").addEventListener("change", set_timer);

  document.querySelectorAll("input[type='number']").forEach((element) => {
    element.addEventListener("change", (e) => {
      e.currentTarget.value = e.currentTarget.value.toString().padStart(2, "0");
    });
  });

  document.getElementById("add_interval_button").addEventListener("click", add_interval);

  document.querySelectorAll(".remove_interval_button").forEach((element) => {
    element.addEventListener("click", remove_interval);
  });

  document.getElementById("start_button").addEventListener("click", start_timer);

  document.getElementById("pause_button").addEventListener("click", pause_timer);

  document.getElementById("clear_button").addEventListener("click", stop_timer);
}

//===Then everything below this is all of the other declared functions for my page...

function _add_interval(mins, secs) {
  Global.intervals.push(mins * 60 + secs);
  secs = secs.toString().padStart(2, "0");
  let new_interval = document.createElement("li");
  if (Global.intervals.length == 1) {
    new_interval.innerHTML = `${mins}:${secs} <iconify-icon icon="material-symbols:arrow-circle-left-rounded" width="25" height="25"></iconify-icon>`;
  } else {
    new_interval.innerHTML = `${mins}:${secs}`;
  }
  document.getElementById("intervals").appendChild(new_interval);
}

function add_interval(e) {
  _add_interval(
    document.getElementById("add_interval_min").value,
    document.getElementById("add_interval_sec").value
  );
}

function remove_interval(e) {
  console.log("remove interval");
}

function set_timer(e) {
  var minutes = document.getElementById("total_min").value;
  var seconds = document.getElementById("total_sec").value;
  document.getElementById("clock").innerHTML = minutes + " : " + seconds;
}

function pause_timer(e) {
  Global.paused = !Global.paused;
}

function stop_timer(e) {
  if (Global.timer) {
    clearInterval(Global.timer);
  }
  Global.timer = null;
  set_timer(e);
}

function start_timer(e) {
  Global.paused = false;
  if (Global.timer) {
    stop_timer(e);
  }
  // Time calculations for days, hours, minutes and seconds
  var minutes = document.getElementById("total_min").value;
  var seconds = document.getElementById("total_sec").value;

  var interval_index = 0;
  var countdown_total = Math.floor(minutes * 60) + (seconds % 60);
  var next_interval = Global.intervals[interval_index] - 1;

  // Update the count down every 1 second
  Global.timer = setInterval(function () {
    if (Global.paused) {
      return;
    } else {
      countdown_total -= 1;
    }

    // Display the result in the element with id="clock"
    document.getElementById("clock").innerHTML =
      Math.floor(countdown_total / 60) +
      " : " +
      (countdown_total % 60).toString().padStart(2, "0");

    // If the count down is finished, write some text

    if (countdown_total <= 0) {
      clearInterval(Global.timer);
      new widgets.Toasted("SET COMPLETE!");
      setTimeout(() => { base.ding(); base.ding(); base.ding(); }, 500);
    } else if (next_interval <= 0) {
      new widgets.Toasted("INTERVAL COMPLETE!");
      let intervals = document.getElementById("intervals");

      intervals.children[interval_index].querySelector("iconify-icon").remove();

      interval_index = (interval_index + 1) % Global.intervals.length;
      console.log(interval_index);
      next_interval = Global.intervals[interval_index] - 1;
      console.log(next_interval);
      intervals.children[interval_index].appendChild(
        base.createIcon("material-symbols:arrow-circle-left-rounded", 25, 25)
      );
      base.ding();
    } else {
      next_interval -= 1;
    }
  }, 1000);
}
