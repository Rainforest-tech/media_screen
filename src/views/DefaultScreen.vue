<template>
  <div class="main">
    <b-row>
      <b-col class="col-2 bg-warning">
        <h1 class="time-size m-0 p-0 mt-1 clock">{{ currentTimestamp }}</h1>
        <p class="date-size m-0 p-0 text-dark">{{ currentDate }}</p>
        <b-row>
          <b-col class="col-1"
            ><img
              src="../media/img/Ресурс 1.png"
              alt="baloon"
              class="baloon mt-2 ms-1"
          /></b-col>
          <b-col class="col-1"
            ><img
              src="../media/img/Ресурс 1.png"
              alt="baloon-mini"
              class="baloon-mini mt-5 ms-2"
          /></b-col>
          <b-col>
            <b-carousel :interval="6000" class="mb-5">
              <b-carousel-slide
                v-for="(holiday, index) in getCurrentHoliday"
                :key="index"
                img-width="100"
                img-height="60"
                img-blank
                class="mt-1"
                ><h5
                  class="text-dark me-2"
                  style="font-size: 16px; font-weight: 900"
                >
                  {{ holiday.day }}
                </h5>
                <p class="text-dark text-start" style="font-size: 12px">
                  {{ holiday.title }}
                </p></b-carousel-slide
              >
            </b-carousel></b-col
          >
        </b-row>

        <b-carousel :interval="10000">
          <b-carousel-slide
            v-for="event in getCurrentEvent"
            :key="event.event"
            img-width="800"
            img-height="350"
            img-blank
            class="mb-5"
            ><h5 class="text-dark" style="font-size: 16px; font-weight: 900">
              {{ event.day }}
            </h5>
            <p class="text-dark text-start" style="font-size: 14px">
              {{ event.event }}
            </p></b-carousel-slide
          >
        </b-carousel>
      </b-col>
      <b-col class="bg-dark col-10 px-0">
        <video
          v-if="videoId === 'firstVideo'"
          class=""
          src="../media/videos/1.180419_Boxing_20_18.mp4"
          style="position: relative"
          width="100%"
          height="100%"
          autoplay
          loop
          muted
        ></video>
        <video
          v-else
          class=""
          src="../media/videos/2.SampleVideo_1280x720_2mb.mp4"
          style="position: relative"
          width="100%"
          height="100%"
          autoplay
          loop
          muted
        ></video>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="col-2 px-0">
        <img
          class="logo mt-3"
          src="../media/img/Лого РН ТННЦ_default овбодка.png"
          alt=""
        />
      </b-col>
      <b-col class="col-10"
        ><footer class="footer">
          <div class="">
            <h4 class="text-start mt-5" style="font-weight: 900">
              {{ firstTitle }}
            </h4>
          </div>
          <marquee
            style="height: 50px; font-size: 20px"
            class="mt-3"
            behavior="scroll"
            direction="left"
            scrollamount="10"
            >{{ firstLine }}</marquee
          >
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
import axios from "axios";

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
      firstTitle: line[0].title,
      secondTitle: line[1].title,
      firstLine: line[0].line,
      secondLine: line[1].line,
      firstVideo: "",
      secondVideo: "",
      videoId: "firstVideo",
      textLine: [],
      videos: [],
    };
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  mounted() {
    this.getVideos();
  },
  watch: {},
  beforeUpdate() {
    this.$nextTick(() =>
      setInterval(
        () => (
          (this.firstTitle = this.secondTitle),
          (this.firstLine = this.secondLine)
        ),
        60000
      )
    );
    this.$nextTick(() => setInterval(() => (this.videoId = ""), 5000));
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
            start: subDays(date, 3),
            end: addDays(date, 3),
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
            start: subDays(date, 3),
            end: addDays(date, 3),
          }
        );
        if (intervalDate) {
          return event;
        }
      });
    },
  },

  methods: {
    getTextLine() {
      const url = "http://localhost:8090/content/text-line";
      axios.get(url).then((response) => (this.textLine = response));
    },
    getVideos() {
      const url = "http://127.0.0.1:8090/content/videos";
      axios
        .get(url)
        .then((response) => (this.videos = response))
        .catch((error) => console.log(error));
    },
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
.main {
  font-family: "Montserrat", serif;
}
.time-size {
  font-size: 75px;
  font-weight: 900;
  font-family: "Montserrat-Bold", serif;
}

.date-size {
  font-size: 20px;
}
.footer {
  position: absolute;

  background-color: white;
}
.logo {
  width: 150px !important;
  height: 120px !important;
}
.baloon {
  width: 50px;
  height: 110px;
  transform: rotate(-30deg);
}
.baloon-mini {
  width: 30px;
  height: 65px;
}
.carousel-caption {
  word-wrap: break-word;
}
</style>
