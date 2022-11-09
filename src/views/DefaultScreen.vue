<template>
  <div class="main" style="overflow: hidden">
    <b-row>
      <b-col class="col-2 bg-warning">
        <h1 class="time-size m-0 p-0 mt-4 clock">
          {{ currentTimestamp }}
        </h1>
        <p class="date-size m-0 p-0 text-dark">{{ currentDate }}</p>
        <b-row class="mt-4">
          <b-col class="col-1 mt-3"
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
            <b-carousel :interval="6000" class="mb-2">
              <b-carousel-slide
                v-for="(holiday, index) in getCurrentHoliday"
                :key="index"
                img-width="100"
                img-height="70"
                img-blank
                class=""
                ><h5
                  class="text-dark me-2"
                  style="font-size: 16px; font-weight: 900"
                >
                  {{ holiday.day }}
                </h5>
                <p class="text-dark text-start" style="font-size: 14px">
                  {{ holiday.title }}
                </p></b-carousel-slide
              >
            </b-carousel></b-col
          >
        </b-row>
        <b-row>
          <b-col class="col-1">
            <img
              src="../media/img/leaf-line (3).png"
              alt=""
              class=""
              style="
                width: 80px;
                transform: scale(-1, 1);
                position: relative;
                left: -55px;
              "
            />
          </b-col>
          <b-col class="col-1">
            <img
              src="../media/img/leaf-line (3).png"
              alt=""
              class=""
              style="width: 80px; position: relative; left: -25px"
            />
          </b-col>
          <b-col class="col-10">
            <b-carousel :interval="10000">
              <b-carousel-slide
                v-for="event in getCurrentEvent"
                :key="event.event"
                img-width="800"
                img-height="520"
                img-blank
                class="mb-5"
                ><h5
                  class="text-dark"
                  style="font-size: 16px; font-weight: 900"
                >
                  {{ event.day }}
                </h5>
                <p class="text-dark text-start" style="font-size: 14px">
                  {{ event.event }}
                </p></b-carousel-slide
              >
            </b-carousel>
          </b-col>
        </b-row>
        <b-row class="pt-4 pb-4" style="background-color: rgb(255, 213, 0)">
          <b-col
            class="col-2 ms-4"
            style="font-family: 'Montserrat-Bold', serif"
            >28.09</b-col
          >
          <b-col class="me-5" style="font-weight: 900; font-size: 14px"
            >Встреча ГД с СМС</b-col
          >
        </b-row>
        <b-row class="mt-3">
          <b-col
            class="col-2 ms-4"
            style="font-family: 'Montserrat-Bold', serif"
            >03.10</b-col
          >
          <b-col class="me-5" style="font-weight: 900; font-size: 14px"
            >Спартакиада ТННЦ<br />(Боулинг)</b-col
          >
        </b-row>
      </b-col>
      <b-col class="bg-dark col-10">
        <div v-if="videoId === 'firstVideo'" class="video-container">
          <video
            class="video"
            src="../media/videos/1.180419_Boxing_20_18.mp4"
            autoplay
            loop
            muted
          ></video>
        </div>
        <div class="video-container" v-else>
          <video
            class="video"
            src="../media/videos/2.SampleVideo_1280x720_2mb.mp4"
            autoplay
            loop
            muted
          ></video>
        </div>
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
// import axios from "axios";

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
    // this.getVideos();
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
    // getTextLine() {
    //   const url = "http://localhost:8090/content/text-line";
    //   axios.get(url).then((response) => (this.textLine = response));
    // },
    // getVideos() {
    //   const url = "http://localhost:8090/content/videos";
    //   axios
    //     .get(url)
    //     .then((response) => (this.videos = response))
    //
    // },
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
  color: rgb(255, 213, 0);
}
.video-container {
  padding-bottom: 56.25%;
  padding-top: 20px;
  height: 0;
  margin: 0 auto;
  position: relative;
}
.video {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
