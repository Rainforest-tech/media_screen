<template>
  <div class="">
    <b-row>
      <b-col class="col-2 bg-warning">
        <h1 class="time-size m-0 p-0">{{ currentTimestamp }}</h1>
        <p class="date-size m-0 p-0">{{ currentDate }}</p>
        <hr />
        <div
          v-for="(holiday, index) in getCurrentHoliday"
          :key="index"
          class="mt-1 px-2"
        >
          {{ holiday.day }} {{ holiday.title }}
        </div>
        <hr />
        <div
          v-for="event in getCurrentEvent"
          :key="event.event"
          class="mt-1 px-2"
        >
          {{ event.day }} {{ event.event }}
        </div>
        <hr />
      </b-col>
      <b-col class="bg-dark col-10 px-0">
        <video
          class="d-flex center"
          src="../videos/1.180419_Boxing_20_18.mp4"
          style="position: relative"
          width="100%"
          height="800"
          autoplay
          loop
          muted
        ></video>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="col-2 px-0">
        <h5 class="text-black ms-4 ps-4 mt-5">РОСНЕФТЬ</h5>
      </b-col>
      <b-col class="col-10"
        ><footer class="footer">
          <div class="">
            <h3 class="text-start mt-4">{{ line[0].title }}</h3>
          </div>
          <div class="marquee">
            <h5>{{ line[0].line }}</h5>
          </div>
        </footer></b-col
      >
    </b-row>
  </div>
</template>

<script>
import holidays from "../data/holidays";
import events from "../data/events";
import parse from "date-fns/parse";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import isWithinInterval from "date-fns/isWithinInterval";
import ru from "date-fns/locale/ru";
import line from "../data/line";

export default {
  name: "Default_screen",

  data() {
    return {
      visible: true,
      currentTimestamp: "",
      currentDate: "",
      holidays,
      events,
      line,
    };
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  mounted() {
    console.log(parse("10/15/2022", "MM/dd/yyyy", new Date()));
    console.log(this.getCurrentEvent);
  },
  computed: {
    getCurrentHoliday() {
      const date = new Date();

      return holidays.filter(function (holiday) {
        const intervalDate = isWithinInterval(
          parse(holiday.day, "d MMMM", new Date(), {
            locale: ru,
          }),
          {
            start: subDays(date, 5),
            end: addDays(date, 5),
          }
        );
        if (intervalDate) {
          return holiday;
        }
      });
    },
    getCurrentEvent() {
      const date = new Date();

      return events.filter(function (event) {
        const intervalDate = isWithinInterval(
          parse(event.day, "d MMMM", new Date(), {
            locale: ru,
          }),
          {
            start: subDays(date, 5),
            end: addDays(date, 5),
          }
        );
        if (intervalDate) {
          return event;
        }
      });
    },
  },

  methods: {
    getNow: function () {
      const today = new Date();
      const date = today.toLocaleDateString("ru-ru", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      const time =
        today.getHours() +
        ":" +
        (today.getMinutes() < 10 ? "0" : "") +
        today.getMinutes();
      this.currentTimestamp = time;
      this.currentDate = date;
    },
  },
};
</script>

<style lang="scss" scoped>
.time-size {
  font-size: 80px;
  font-weight: bold;
}
.date-size {
  font-size: 20px;
}
.footer {
  position: absolute;

  width: 100%;

  background-color: white;
}
.marquee {
  height: 80px;
  overflow: hidden;
  position: relative;
}
.marquee h5 {
  position: relative;
  width: auto;
  height: 100px;
  line-height: 50px;
  white-space: nowrap;
  text-align: center;

  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);

  -moz-animation: marquee 40s linear infinite scroll-left;
  -webkit-animation: marquee 40s linear infinite;
  animation: marquee 40s linear infinite;
  animation-delay: 3s;
}

@-moz-keyframes marquee {
  0% {
    -moz-transform: translateX(100%);
  }
  100% {
    -moz-transform: translateX(-100%);
  }
}
@-webkit-keyframes marquee {
  0% {
    -webkit-transform: translateX(100%);
  }
  100% {
    -webkit-transform: translateX(-100%);
  }
}
@keyframes marquee {
  0% {
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  100% {
    -moz-transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
