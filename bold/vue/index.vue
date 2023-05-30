<template>
  <div id="app-ExploreProject" ref="self" :class="isMobile && 'isMobile'">
    <div class="l-row">
      <div class="g-col--15 c-horizon-list__top">
        <div class="c-horizon-list__top-txt">
          <div class="t-h--18">
            <span class="t--fak">Explore (COMMON)<br />Project Themes</span>
          </div>
        </div>
        <div class="c-horizon-list__top-btn">
          <em class="t-b--13"
            ><span class="t--fak"
              >({{
                data.items.filter((item) => item.linkUrl).length - 1
              }})</span
            ></em
          >
        </div>
      </div>
    </div>
    <div class="explore-project--canvas" ref="canvasWrap"></div>
    <!-- <div class="explore-project--copyright">DFY® combines digital strategy with emotional design to produce creative solutions that make a difference, and merges branding and advertising with digital platforms for authentic brand experiences that connect with the consumer. </div> -->
  </div>
</template>

<script>
import * as $ from "fxdom";
import * as _ from "fxjs";
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
} from "@/helper/vue.js";
import "pathseg";
import Matter from "matter-js";
import router from "@/router/index.js";

export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    //
  },

  setup(props) {
    const self = ref();
    const canvasWrap = ref();

    // intersection Observer
    const numSteps = 20.0;
    let boxElement;
    let prevRatio = 0.0;
    let increasingColor = "rgba(40, 40, 190, ratio)";
    let decreasingColor = "rgba(190, 40, 40, ratio)";
    let observer;
    let debounce_observer;
    let isFirst = true;
    let popAble = false;

    const imgUrlBase = "@/assets/work/";
    let filter = "all";

    const data = reactive({
      items: [
        {
          name: "S1",
          type: "A|all",
          path: "M82 0C65.9837 0 53 12.9837 53 29C53 32.5144 53.6251 35.8828 54.7703 39C56.7703 45.4615 53 46 49 46H29C12.9837 46 0 58.9837 0 75C0 91.0163 12.9837 104 29 104H357C373.016 104 386 91.0163 386 75C386 58.9837 373.016 46 357 46H336C332 46 328.23 45.4615 330.23 39C331.375 35.8828 332 32.5144 332 29C332 12.9837 319.016 0 303 0H82Z",
          imgUrl: "S1.png",
          linkUrl: "/services/branded-ecommerce",
        },
        {
          name: "S2",
          type: "A|all",
          path: "M104 0C87.9837 0 75 12.9837 75 29C75 32.5144 75.6251 35.8828 76.7703 39C78.7703 45.4615 75 46 71 46H63C46.9837 46 34 58.9837 34 75C34 78.5144 34.6251 81.8828 35.7703 85C37.7703 91.4615 34 92 30 92H29C12.9837 92 0 104.984 0 121C0 137.016 12.9837 150 29 150H343C359.016 150 372 137.016 372 121C372 104.984 359.016 92 343 92C339 92 335.23 91.4615 337.23 85C338.375 81.8828 339 78.5144 339 75C339 58.9837 326.016 46 310 46H302C298 46 294.23 45.4615 296.23 39C297.375 35.8828 298 32.5144 298 29C298 12.9837 285.016 0 269 0H104Z",
          imgUrl: "S2.png",
          linkUrl: "/services/digital-products-platforms",
        },
        {
          name: "S3",
          type: "A|all",
          path: "M29 0C12.9837 0 0 12.9837 0 29C0 39.3178 5.38835 48.3772 13.5046 53.5175C16.9383 55.9709 16.0391 58.4221 15.2207 59.9259C12.5428 64.3185 11 69.4791 11 75V121C11 137.016 23.9837 150 40 150H262C278.016 150 291 137.016 291 121V75C291 69.479 289.457 64.3184 286.779 59.9258C285.961 58.422 285.062 55.9709 288.495 53.5176C296.612 48.3773 302 39.3179 302 29C302 12.9837 289.016 0 273 0H29Z",
          imgUrl: "S3.png",
          linkUrl: "/services/branding-strategy-design",
        },
        {
          name: "S4",
          type: "A|all",
          path: "M60 29C60 12.9837 72.9837 0 89 0H333C349.016 0 362 12.9837 362 29C362 45.0163 349.016 58 333 58H335C331 58 327.23 58.5385 329.23 65C330.375 68.1172 331 71.4856 331 75C331 91.0163 318.016 104 302 104H29C12.9837 104 0 91.0163 0 75C0 58.9837 12.9837 46 29 46H56C60 46 63.77 45.4615 61.77 39C60.6249 35.8828 60 32.5144 60 29Z",
          imgUrl: "S4.png",
          linkUrl: "/services/branded-experience",
        },
        {
          name: "L1",
          type: "B|all",
          path: "M321.76 38.8276L321.756 38.8398L321.752 38.8522C320.734 42.1416 321.11 44.1739 322.555 45.3154C323.243 45.8594 324.12 46.1493 325.045 46.3077C325.973 46.4666 326.994 46.5 328 46.5H349C364.74 46.5 377.5 59.2599 377.5 75C377.5 90.7401 364.74 103.5 349 103.5H29C13.2599 103.5 0.5 90.7401 0.5 75C0.5 59.2599 13.2599 46.5 29 46.5H91C92.0064 46.5 93.0267 46.4666 93.9547 46.3077C94.8803 46.1493 95.7566 45.8594 96.445 45.3154C97.8895 44.1739 98.2658 42.1416 97.2476 38.8522L97.2438 38.8398L97.2393 38.8276C96.1142 35.7648 95.5 32.4547 95.5 29C95.5 13.2599 108.26 0.5 124 0.5H295C310.74 0.5 323.5 13.2599 323.5 29C323.5 32.4547 322.886 35.7648 321.76 38.8276Z",
          imgUrl: "L1.png",
          linkUrl: "/interests/human-technology",
        },
        {
          name: "L2",
          type: "B|all",
          path: "M104.239 65.1724L104.244 65.1602L104.248 65.1478C105.266 61.8584 104.89 59.8261 103.445 58.6846C102.757 58.1406 101.88 57.8507 100.955 57.6923C100.027 57.5334 99.0064 57.5 98 57.5H29C13.2599 57.5 0.5 44.7401 0.5 29C0.5 13.2599 13.2599 0.5 29 0.5H276C291.74 0.5 304.5 13.2599 304.5 29C304.5 44.7401 291.74 57.5 276 57.5H208C206.994 57.5 205.973 57.5334 205.045 57.6923C204.12 57.8507 203.243 58.1406 202.555 58.6846C201.11 59.8261 200.734 61.8584 201.752 65.1478L201.756 65.1602L201.76 65.1724C202.886 68.2352 203.5 71.5453 203.5 75C203.5 78.4547 202.886 81.7648 201.761 84.8276L201.756 84.8398L201.752 84.8522C200.734 88.1416 201.11 90.1739 202.555 91.3154C203.243 91.8594 204.12 92.1493 205.045 92.3077C205.973 92.4666 206.994 92.5 208 92.5H220C235.74 92.5 248.5 105.26 248.5 121C248.5 136.74 235.74 149.5 220 149.5H85C69.2599 149.5 56.5 136.74 56.5 121C56.5 105.26 69.2599 92.5 85 92.5H98C99.0064 92.5 100.027 92.4666 100.955 92.3077C101.88 92.1493 102.757 91.8594 103.445 91.3154C104.89 90.1739 105.266 88.1416 104.248 84.8522L104.244 84.8398L104.24 84.8276C103.114 81.7648 102.5 78.4547 102.5 75C102.5 71.5453 103.114 68.2352 104.239 65.1724Z",
          imgUrl: "L2.png",
          linkUrl: "/interests/new-way-to-retail",
        },
        {
          name: "L3",
          type: "B|all",
          path: "M74.2393 65.1724L74.2438 65.1602L74.2476 65.1478C75.2658 61.8584 74.8895 59.8261 73.445 58.6846C72.7566 58.1406 71.8803 57.8507 70.9547 57.6923C70.0267 57.5334 69.0064 57.5 68 57.5H54C38.2599 57.5 25.5 44.7401 25.5 29V8C25.5 3.85787 28.8579 0.5 33 0.5H212C216.142 0.5 219.5 3.85786 219.5 8V29C219.5 44.7401 206.74 57.5 191 57.5H178C176.994 57.5 175.973 57.5334 175.045 57.6923C174.12 57.8507 173.243 58.1406 172.555 58.6846C171.11 59.8261 170.734 61.8584 171.752 65.1478L171.756 65.1602L171.76 65.1724C172.886 68.2352 173.5 71.5453 173.5 75C173.5 78.4547 172.886 81.7648 171.761 84.8276L171.756 84.8398L171.752 84.8522C170.734 88.1416 171.11 90.1739 172.555 91.3154C173.243 91.8594 174.12 92.1493 175.045 92.3077C175.973 92.4666 176.994 92.5 178 92.5H216C231.74 92.5 244.5 105.26 244.5 121V142C244.5 146.142 241.142 149.5 237 149.5H7.99999C3.85786 149.5 0.5 146.142 0.5 142V121C0.5 105.26 13.2599 92.5 29 92.5H68C69.0064 92.5 70.0267 92.4666 70.9547 92.3077C71.8804 92.1493 72.7567 91.8594 73.4451 91.3154C74.8897 90.1739 75.2661 88.1416 74.2479 84.8522L74.2441 84.8398L74.2396 84.8276C73.1145 81.7648 72.5 78.4547 72.5 75C72.5 71.5453 73.1142 68.2352 74.2393 65.1724Z",
          imgUrl: "L3.png",
          linkUrl: "/interests/ready-to-launch",
        },
        {
          name: "L4",
          type: "B|all",
          path: "M185.76 38.8276L185.756 38.8398L185.752 38.8522C184.734 42.1416 185.11 44.1739 186.555 45.3154C187.243 45.8594 188.12 46.1493 189.045 46.3077C189.973 46.4666 190.994 46.5 192 46.5H234C249.74 46.5 262.5 59.2599 262.5 75V96C262.5 100.142 259.142 103.5 255 103.5H76C60.2599 103.5 47.5 90.7401 47.5 75C47.5 71.5453 48.1145 68.2352 49.2396 65.1724L49.2441 65.1602L49.2479 65.1478C50.2661 61.8584 49.8898 59.8261 48.4451 58.6846C47.7567 58.1406 46.8804 57.8507 45.9547 57.6923C45.0267 57.5334 44.0064 57.5 43 57.5H29C13.2599 57.5 0.5 44.7401 0.5 29V8C0.5 3.85787 3.85786 0.5 8 0.5H159C174.74 0.5 187.5 13.2599 187.5 29C187.5 32.4547 186.886 35.7648 185.76 38.8276Z",
          imgUrl: "L4.png",
          linkUrl: "/interests/being-social",
        },
        {
          name: "L5",
          type: "B|all",
          path: "M283.752 65.1478L283.756 65.1602L283.761 65.1724C284.886 68.2352 285.5 71.5453 285.5 75C285.5 90.7401 272.74 103.5 257 103.5H92C76.2599 103.5 63.5 90.7401 63.5 75C63.5 71.5453 64.1145 68.2352 65.2396 65.1724L65.2441 65.1602L65.2479 65.1478C66.2661 61.8584 65.8897 59.8261 64.4451 58.6846C63.7567 58.1406 62.8804 57.8507 61.9547 57.6923C61.0267 57.5334 60.0064 57.5 59 57.5H29C13.2599 57.5 0.5 44.7401 0.5 29C0.5 13.2599 13.2599 0.5 29 0.5H319C334.74 0.5 347.5 13.2599 347.5 29C347.5 44.7401 334.74 57.5 319 57.5H290C288.994 57.5 287.973 57.5334 287.045 57.6923C286.12 57.8507 285.243 58.1406 284.555 58.6846C283.11 59.8261 282.734 61.8584 283.752 65.1478Z",
          imgUrl: "L5.png",
          linkUrl: "/interests/purposeful-spaces",
        },
        {
          name: "L6",
          type: "B|all",
          path: "M268.752 65.1478L268.756 65.1602L268.761 65.1724C269.886 68.2352 270.5 71.5453 270.5 75C270.5 90.7401 257.74 103.5 242 103.5H101C85.2599 103.5 72.5 90.7401 72.5 75C72.5 71.5453 73.1145 68.2352 74.2396 65.1724L74.2441 65.1602L74.2479 65.1478C75.2661 61.8584 74.8897 59.8261 73.4451 58.6846C72.7567 58.1406 71.8804 57.8507 70.9547 57.6923C70.0267 57.5334 69.0064 57.5 68 57.5H29C13.2599 57.5 0.5 44.7401 0.5 29C0.5 13.2599 13.2599 0.5 29 0.5H314C329.74 0.5 342.5 13.2599 342.5 29C342.5 44.7401 329.74 57.5 314 57.5H275C273.994 57.5 272.973 57.5334 272.045 57.6923C271.12 57.8507 270.243 58.1406 269.555 58.6846C268.11 59.8261 267.734 61.8584 268.752 65.1478Z",
          imgUrl: "L6.png",
          linkUrl: "/interests/tomorrow-today",
        },
        {
          name: "L7",
          type: "B|all",
          path: "M268.76 38.8276L268.756 38.8398L268.752 38.8522C267.734 42.1416 268.11 44.1739 269.555 45.3154C270.243 45.8594 271.12 46.1493 272.045 46.3077C272.973 46.4666 273.994 46.5 275 46.5H323C338.74 46.5 351.5 59.2599 351.5 75C351.5 90.7401 338.74 103.5 323 103.5H29C13.2599 103.5 0.5 90.7401 0.5 75C0.5 59.2599 13.2599 46.5 29 46.5H32C33.0064 46.5 34.0267 46.4666 34.9547 46.3077C35.8803 46.1493 36.7566 45.8594 37.445 45.3154C38.8895 44.1739 39.2658 42.1416 38.2476 38.8522L38.2438 38.8398L38.2393 38.8276C37.1142 35.7648 36.5 32.4547 36.5 29C36.5 13.2599 49.2599 0.5 65 0.5H242C257.74 0.5 270.5 13.2599 270.5 29C270.5 32.4547 269.886 35.7648 268.76 38.8276Z",
          imgUrl: "L7.png",
          linkUrl: "/interests/stories-that-inspire",
        },
        {
          name: "Group_698",
          type: "B|all",
          path: "M210.119 46.043C210.119 52.1581 207.261 58.0243 202.01 63.4044C196.756 68.7868 189.13 73.6568 179.667 77.7576C160.742 85.9583 134.562 91.043 105.619 91.043C76.6759 91.043 50.4966 85.9583 31.5717 77.7576C22.1085 73.6568 14.482 68.7868 9.22837 63.4044C3.977 58.0243 1.11914 52.1581 1.11914 46.043C1.11914 39.9278 3.977 34.0617 9.22837 28.6816C14.482 23.2992 22.1085 18.4291 31.5717 14.3284C50.4966 6.12762 76.6759 1.04297 105.619 1.04297C134.562 1.04297 160.742 6.12762 179.667 14.3284C189.13 18.4291 196.756 23.2992 202.01 28.6816C207.261 34.0617 210.119 39.9278 210.119 46.043Z",
          imgUrl: "Group_698.png",
        },
        // {
        //   name:   "Group_699",
        //   type:   "B|all",
        //   path:   "M162.373 46.0508C162.373 58.354 153.49 69.5948 138.904 77.7882C124.333 85.9728 104.171 91.0508 81.8728 91.0508C59.5748 91.0508 39.4124 85.9728 24.842 77.7882C10.2559 69.5948 1.3728 58.354 1.3728 46.0508C1.3728 33.7475 10.2559 22.5068 24.842 14.3134C39.4124 6.12879 59.5748 1.05078 81.8728 1.05078C104.171 1.05078 124.333 6.12879 138.904 14.3134C153.49 22.5068 162.373 33.7475 162.373 46.0508Z",
        //   imgUrl: "Group_699.png"
        // },
        {
          name: "Light",
          type: "B|all",
          path: "M55.12 0H48.88V20.8L50.544 48.672L32.032 27.664L17.472 13.104L13.104 17.472L27.872 32.24L48.88 50.752L20.8 48.88H0V55.12H20.8L48.672 53.456L27.664 71.968L12.896 86.736L17.264 91.104L32.032 76.336L50.544 55.328L48.88 83.2V104H55.12V83.2L53.456 55.328L71.968 76.336L86.736 91.104L91.104 86.736L76.336 71.968L55.328 53.456L83.2 55.12H104V48.88H83.2L55.328 50.544L76.336 32.032L91.104 17.264L86.736 12.896L71.968 27.664L53.456 48.672L55.12 20.8V0Z",
          imgUrl: "Light.png",
        },
        {
          name: "Arrow",
          type: "B|all",
          path: "M31.5 1H50.5V-1H31.5V1ZM50.5 62H31.5V64H50.5V62ZM31.5 62C14.6553 62 1 48.3447 1 31.5H-1C-1 49.4493 13.5507 64 31.5 64V62ZM81 31.5C81 48.3447 67.3447 62 50.5 62V64C68.4493 64 83 49.4493 83 31.5H81ZM50.5 1C67.3447 1 81 14.6553 81 31.5H83C83 13.5507 68.4493 -1 50.5 -1V1ZM31.5 -1C13.5507 -1 -1 13.5507 -1 31.5H1C1 14.6553 14.6553 1 31.5 1V-1Z",
          imgUrl: "Arrow.png",
        },
        {
          name: "Flame",
          type: "B|all",
          path: "M31.6279 1.39062L120.628 1.39062V-0.609375L31.6279 -0.609375V1.39062ZM120.628 62.3906L31.6279 62.3906V64.3906H120.628V62.3906ZM31.6279 62.3906C14.7832 62.3906 1.12793 48.7353 1.12793 31.8906H-0.87207C-0.87207 49.8399 13.6787 64.3906 31.6279 64.3906V62.3906ZM151.128 31.8906C151.128 48.7353 137.473 62.3906 120.628 62.3906V64.3906C138.577 64.3906 153.128 49.8399 153.128 31.8906H151.128ZM120.628 1.39062C137.473 1.39062 151.128 15.0459 151.128 31.8906H153.128C153.128 13.9414 138.577 -0.609375 120.628 -0.609375V1.39062ZM31.6279 -0.609375C13.6787 -0.609375 -0.87207 13.9414 -0.87207 31.8906H1.12793C1.12793 15.0459 14.7832 1.39062 31.6279 1.39062V-0.609375Z",
          imgUrl: "Flame.png",
        },
        {
          name: "Folder",
          type: "B|all",
          path: "M0.728516 8.55469C0.728516 4.13641 4.31024 0.554687 8.72852 0.554687L37.4148 0.554687C39.5365 0.554687 41.5714 1.39754 43.0717 2.89783L48.73 8.55618C50.7295 10.5547 52.7288 10.5547 53.7285 10.5547L112.729 10.5547C117.147 10.5547 120.729 14.1364 120.729 18.5547L120.729 92.5547C120.729 96.973 117.147 100.555 112.729 100.555L8.72852 100.555C4.31024 100.555 0.728516 96.973 0.728516 92.5547L0.728516 8.55469Z M44.1205 120.555L40.4935 111.455H39.0635L35.4235 120.555H36.5675L37.5685 117.981H41.9625L42.9635 120.555H44.1205ZM39.2065 113.743L39.7655 112.209L40.3245 113.743L41.5985 117.045H37.9325L39.2065 113.743ZM46.0864 111.455H45.0334V120.555H50.4414V119.658H46.0864V111.455ZM52.5996 111.455H51.5466V120.555H56.9546V119.658H52.5996V111.455ZM69.8087 117.838L69.4577 119.58L68.9637 117.838L66.9097 111.455H65.4277L63.3867 117.825L62.9057 119.515L62.5677 117.838L61.0727 111.455H59.9417L62.1907 120.555H63.5557L65.7527 113.795L66.1817 112.326L66.5977 113.782L68.8077 120.555H70.1597L72.4087 111.455H71.3037L69.8087 117.838ZM74.138 112.625C73.241 113.496 72.799 114.614 72.799 115.966C72.799 117.318 73.241 118.436 74.138 119.333C75.035 120.23 76.114 120.685 77.388 120.685C78.662 120.685 79.741 120.23 80.638 119.333C81.535 118.436 81.977 117.318 81.977 115.966C81.977 114.614 81.535 113.496 80.651 112.625C79.754 111.754 78.675 111.325 77.388 111.325C76.101 111.325 75.022 111.754 74.138 112.625ZM74.788 118.748C74.177 118.098 73.878 117.175 73.878 115.966C73.878 113.613 75.139 112.274 77.388 112.274C79.637 112.274 80.898 113.613 80.898 115.966C80.898 117.175 80.599 118.098 79.988 118.748C79.377 119.411 78.519 119.736 77.388 119.736C76.257 119.736 75.399 119.411 74.788 118.748ZM89.8247 120.555L88.0047 117.422L87.2247 116.408C88.7327 116.265 89.7077 115.29 89.7077 113.938C89.7077 113.197 89.4477 112.586 88.9147 112.131C88.3817 111.676 87.6667 111.455 86.7957 111.455H83.3377V120.555H84.3517V116.434H86.3017L88.5247 120.555H89.8247ZM86.9517 112.404C88.1607 112.404 88.6287 112.833 88.6287 113.938C88.6287 115.069 88.1607 115.498 86.9517 115.498H84.3517V112.404H86.9517ZM98.3889 120.555L95.0089 114.744L98.1939 111.455H96.7769L93.5919 114.913L92.1229 116.837V111.455H91.0569V120.555H92.1229V117.747L94.2679 115.524L97.0499 120.555H98.3889Z",
          imgUrl: "Folder.png",
          linkUrl: "/work",
        },
        {
          name: "Switch",
          type: "all|A|B",
          path: "M31.6279 1.39062L120.628 1.39062V-0.609375L31.6279 -0.609375V1.39062ZM120.628 62.3906L31.6279 62.3906V64.3906H120.628V62.3906ZM31.6279 62.3906C14.7832 62.3906 1.12793 48.7353 1.12793 31.8906H-0.87207C-0.87207 49.8399 13.6787 64.3906 31.6279 64.3906V62.3906ZM151.128 31.8906C151.128 48.7353 137.473 62.3906 120.628 62.3906V64.3906C138.577 64.3906 153.128 49.8399 153.128 31.8906H151.128ZM120.628 1.39062C137.473 1.39062 151.128 15.0459 151.128 31.8906H153.128C153.128 13.9414 138.577 -0.609375 120.628 -0.609375V1.39062ZM31.6279 -0.609375C13.6787 -0.609375 -0.87207 13.9414 -0.87207 31.8906H1.12793C1.12793 15.0459 14.7832 1.39062 31.6279 1.39062V-0.609375Z",
          imgUrl: "Switch_on.png",
        },
      ],
    }); // [e]: data

    const method = {
      shuffleArray: (array) => {
        let copy = array.concat();
        let arr = [];

        while (copy.length) {
          arr.push(copy.splice(parseInt(Math.random() * copy.length), 1)[0]);
        }
        return arr;
      },

      getBodyScale: (w) => {
        const cw = w || document.documentElement.clientWidth;

        // texture scale 은 절대값이 있다, 1.0이 origin
        // body scale 은 절대값이 없다, 현재 값 기준으로 변동, 1.5이후 2를 주는 경우 origin 기준 3배가 된다
        let textureScale = 1.0;
        let bodyScale = 1.0;

        if (cw <= 768) {
          textureScale = 1.0;
        } else if (cw <= 1024) {
          textureScale = 1.0;
        } else if (cw <= 1400) {
          textureScale = 1.2;
        } else if (cw <= 1600) {
          textureScale = 1.4;
        } else if (cw <= 2000) {
          textureScale = 1.4;
        } else {
          textureScale = 1.2;
        }
        bodyScale = (bodyScale / beforeScale) * textureScale;
        beforeScale = textureScale;

        return { textureScale: textureScale, bodyScale: bodyScale };
      },

      getMatterRect2: (w) => {
        let cw = w || document.documentElement.clientWidth;
        let matterW = cw * 2;
        let matterH = 0;

        if (cw <= 768) {
          matterW = 1536;
          matterH = 2800;
        } else if (cw <= 1024) {
          matterW = 2048;
          matterH = (matterW * 1800) / 1600;
        } else if (cw <= 1400) {
          matterW = 2400;
          matterH = (matterW * 1400) / 1600;
        } else if (cw <= 1600) {
          matterW = 3200;
          matterH = (matterW * 1200) / 1600;
        } else {
          matterW = 3800;
          matterH = (matterW * 900) / 1600;
        }
        matterH += 200; // bottom wall gap
        return { matterW: matterW, matterH: matterH };
      },
    }; // [e]: method

    const deviceCheck = {
      width: 0,
      device: "",
      deviceWidth: 0,
      callback: [],
      check() {
        const cw = document.documentElement.clientWidth;
        this.width = cw;

        let current;
        if (cw <= 768) {
          current = "mobile";
          this.deviceWidth = 768;
        } else if (cw <= 1024) {
          current = "tablet";
          this.deviceWidth = 1024;
        } else if (cw <= 1400) {
          current = "desktop-s";
          this.deviceWidth = 1400;
        } else if (cw <= 1600) {
          current = "desktop-m";
          this.deviceWidth = 1600;
        } else {
          current = "desktop-l";
          this.deviceWidth = 1600;
        }
        if (this.device !== current) {
          this.device = current;
          this.callback.forEach((item) => item(this.device));
        }
        return this.device;
      },
      addChangeEvent(cb) {
        this.callback.push(cb);
      },
    };

    const shuffleItems = method.shuffleArray(data.items);
    const standardScaleWidth = 1024;
    let beforeScale = 1;
    let debounce_resize = null;
    let matterRect = method.getMatterRect2(standardScaleWidth);

    let CB_RESIZE;

    // Matter js
    let Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Body = Matter.Body,
      Composites = Matter.Composites,
      Common = Matter.Common,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      //World = Matter.World,
      Composite = Matter.Composite,
      Vertices = Matter.Vertices,
      Svg = Matter.Svg,
      Bodies = Matter.Bodies,
      Events = Matter.Events;

    // create engine
    let engine = Engine.create(),
      world = engine.world;
    engine.timing.timeScale = 1.2;
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 1.2;
    engine.world.gravity.isPoint = true;

    let mouseConstraint;
    let render;
    let runner;

    onMounted(() => {
      deviceCheck.check();

      var textureScale = matterRect.textureScale;
      var bodyScale = matterRect.bodyScale;

      // create renderer
      render = Render.create({
        element: canvasWrap.value,
        engine: engine,
        options: {
          width: matterRect.matterW,
          height: matterRect.matterH,
          background: "transparent",
          // pixelRatio: 'auto',

          // wireframes: false,
          // showDebug: false,
          // showBroadphase: false,
          // showBounds: false,
          // showVelocity: false,
          // showCollisions: false,
          // showSeparations: false,
          // showAxes: false,
          // showPositions: false,
          // showAngleIndicator: false,
          // showIds: false,
          // showShadows: false,
          // showVertexNumbers: false,
          // showConvexHulls: false,
          // showInternalEdges: false,
          // showMousePosition: false

          // zshowAngleIndicator: true,
          wireframes: false,
        },
      });

      Render.run(render);

      // create runner
      runner = Runner.create();
      Runner.run(runner, engine);

      // SVG PATH ADD
      // add bodies
      // 최초에 2배수로 그린 후 resize event 내에서 scale 조정
      var vertexSets = [];
      var color = Common.choose([
        "#556270",
        "#4ECDC4",
        "#C7F464",
        "#FF6B6B",
        "#C44D58",
      ]);

      shuffleItems.forEach((item, i) => {
        if (String(item.type).indexOf(filter) < 0) return;

        var newElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        newElement.setAttribute("d", item.path);

        var points = Svg.pathToVertices(newElement, 30);
        vertexSets.push(Vertices.scale(points, 2.1, 2.1));

        Composite.add(
          world,
          Bodies.fromVertices(
            //100 + Math.round(Common.random()*800),
            //200 + i * 5,
            matterRect.matterW / 4 +
              Math.round((Common.random() * matterRect.matterW) / 2),
            matterRect.matterH / 1.5,
            vertexSets[vertexSets.length - 1],
            {
              render: {
                fillStyle: color,
                strokeStyle: color,
                lineWidth: 1,
                sprite: {
                  texture: require("@/assets/work/" + item.imgUrl),
                  //xScale: 1,
                  //yScale: 1
                },
                //visible: false
              },
              id: item.name,
              plugin: {
                //index:      i,
                status: "on",
                type: item.type,
                name: item.name,
                imgUrl: item.imgUrl,
                linkUrl: item.linkUrl,
              },
            },
            true
          )
        );
      });

      // STACK ADD
      // add bodies
      // params: startX, startY, amountX, amountY, marginX, marginY
      /*
      var stack = Composites.stack(20, 20, 10, 4, 0, 0, function(x, y) {
          if (Common.random() > 0.35) {
              return Bodies.rectangle(x, y, 64, 64, {
                  render: {
                      strokeStyle: '#ffffff',
                      sprite: {
                          texture: 'https://github.com/liabru/matter-js/blob/master/demo/img/box.png?raw=true'
                      }
                  }
              });
          } else {
              return Bodies.circle(x, y, 46, {
                  density: 0.0005,
                  frictionAir: 0.06,
                  restitution: 0.3,
                  friction: 0.01,
                  render: {
                      sprite: {
                          texture: 'https://www.gstatic.com/webp/gallery3/2_webp_a.png'
                      }
                  }
              });
          }
      });

      Composite.add(world, stack);
      */

      // WALL ADD x,y,w,h
      var wallTop = Bodies.rectangle(
        matterRect.matterW / 2,
        0 - 490,
        matterRect.matterW,
        1000,
        { isStatic: true, label: "roof", render: { fillStyle: "transparent" } }
      );
      var wallBottom = Bodies.rectangle(
        matterRect.matterW / 2,
        matterRect.matterH + 300,
        matterRect.matterW,
        1000,
        {
          isStatic: true,
          label: "ground",
          render: { fillStyle: "transparent" },
        }
      );
      var wallLeft = Bodies.rectangle(
        0 - 390,
        matterRect.matterH / 2,
        800,
        matterRect.matterH,
        {
          isStatic: true,
          label: "wallLeft",
          render: { fillStyle: "transparent" },
        }
      );
      var wallRight = Bodies.rectangle(
        matterRect.matterW + 390,
        matterRect.matterH / 2,
        800,
        matterRect.matterH,
        {
          isStatic: true,
          label: "wallRight",
          render: { fillStyle: "transparent" },
        }
      );
      var wallMinime = Bodies.rectangle(
        (matterRect.matterW / 15) * 5.8,
        matterRect.matterH - 210,
        380,
        180,
        {
          isStatic: true,
          label: "wallMinime",
          render: { fillStyle: "transparent" },
        }
      );

      Composite.add(world, [
        wallTop,
        wallBottom,
        wallLeft,
        wallRight,
        wallMinime,
      ]);

      // Observer
      boxElement = document.querySelector("#app-ExploreProject");
      createObserver();
      function createObserver() {
        let options = {
          root: null,
          rootMargin: "0px",
          threshold: buildThresholdList(),
        };

        observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(boxElement);
      }

      function buildThresholdList() {
        let thresholds = [];
        let numSteps = 50;

        for (let i = 1.0; i <= numSteps; i++) {
          let ratio = i / numSteps;
          thresholds.push(ratio);
        }

        thresholds.push(0);
        return thresholds;
      }

      function handleIntersect(entries, observer) {
        if (entries[0].intersectionRatio > 0.5) {
          if (isFirst) {
            // 등장
            //shakeScene(engine, true);
            isFirst = false;
            // setTimeout(()=>{
            //   popAble = true;
            // }, 2000);
          } else {
            if (!popAble) return;
            popScene(engine);
            //shakeScene(engine, true);
            popAble = false;
          }
        }

        entries.forEach((entry) => {
          if (entry.intersectionRatio > prevRatio) {
            //entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
            entry.target.style.opacity = Math.min(
              entry.intersectionRatio * 5,
              1
            );
          } else {
            //entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
            entry.target.style.opacity = Math.min(
              entry.intersectionRatio * 5,
              1
            );
          }
          prevRatio = entry.intersectionRatio;
        });

        // debounce
        clearTimeout(debounce_observer);
        debounce_observer = setTimeout(() => {
          popAble = true;
        }, 300);
      }

      // Events
      var popScene = function (engine) {
        var bodies = Composite.allBodies(engine.world);

        for (var i = 0; i < bodies.length; i++) {
          var body = bodies[i];

          if (
            !body.isStatic &&
            body.position.y >=
              1300 /* && body.position.x > render.canvas.width/4 && body.position.x < render.canvas.width/1.33*/
          ) {
            Body.applyForce(body, body.position, {
              x: 0.01 * body.mass * Common.choose([1, -1]),
              //y: (0.06 * body.mass) * -2
              y: 0.06 * body.mass * -1,
            });
          }
        }
      };

      var shakeScene = function (engine, isStart) {
        var bodies = Composite.allBodies(engine.world);

        for (var i = 0; i < bodies.length; i++) {
          var body = bodies[i];
          if (!body.isStatic && isStart) {
            //Body.setPosition(body, {x: matterRect.matterW/2 + Math.round(Math.random()*matterRect.matterW/2), y: matterRect.matterH/1.2});
            //body.render.visible = true;
          }
          if (!body.isStatic && body.position.y >= 500) {
            var forceMagnitude = 0.015 * body.mass;

            Body.applyForce(body, body.position, {
              x: isStart ? 0 : 0.09 * body.mass * Common.choose([1, -1]),
              y: isStart ? -4 * Math.random() - 1 : 0.08 * body.mass * -1,
            });
          }
        }
      };

      var resetItemByFilterType = function (lastFilterStr, nextFilterStr) {
        var matterRect = method.getMatterRect2();
        var bodies = Composite.allBodies(engine.world);
        var bodyScale = matterRect.matterW / (standardScaleWidth * 2);
        var removeItems = bodies.filter(
          (item) =>
            !item.isStatic &&
            String(item.plugin.type).indexOf(nextFilterStr) < 0
        );
        Matter.Composite.remove(world, removeItems);
        var addItems = shuffleItems.filter(
          (item) =>
            String(item.type).indexOf(lastFilterStr) < 0 &&
            String(item.type).indexOf(nextFilterStr) >= 0
        );

        vertexSets = [];
        addItems.forEach((item, i) => {
          var newElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          newElement.setAttribute("d", item.path);

          var points = Svg.pathToVertices(newElement, 30);
          vertexSets.push(
            Vertices.scale(points, 2.1 * beforeScale, 2.1 * beforeScale)
          );

          Composite.add(
            world,
            Bodies.fromVertices(
              //100 + Math.round(Common.random()*800),
              //200 + i * 5,
              matterRect.matterW / 4 +
                Math.round((Common.random() * matterRect.matterW) / 2),
              matterRect.matterH / 1.25,
              vertexSets[vertexSets.length - 1],
              {
                render: {
                  fillStyle: color,
                  strokeStyle: color,
                  lineWidth: 1,
                  sprite: {
                    texture: require("@/assets/work/" + item.imgUrl),
                    xScale: textureScale,
                    yScale: textureScale,
                  },
                },
                id: item.name,
                plugin: {
                  //index:      i,
                  status: "on",
                  type: item.type,
                  name: item.name,
                  imgUrl: item.imgUrl,
                  linkUrl: item.linkUrl,
                },
              },
              true
            )
          );
        });
      };

      var resizeCanvas = function () {
        var matterRect = method.getMatterRect2();
        var bodies = Composite.allBodies(engine.world);

        var scale = method.getBodyScale();
        textureScale = scale.textureScale;
        bodyScale = scale.bodyScale;

        for (var i = 0; i < bodies.length; i++) {
          var body = bodies[i];
          if (!body.isStatic) {
            var forceMagnitude = 0.015 * body.mass;
            Body.applyForce(body, body.position, {
              x:
                body.position.x >= 500 &&
                render.canvas.width > matterRect.matterW
                  ? -4
                  : 0,
              y: body.position.y >= 500 ? -2 : 0,
            });
            Body.scale(body, bodyScale, bodyScale);
            body.render.sprite.xScale = body.render.sprite.yScale =
              textureScale;
          }
        }

        setTimeout(() => {
          Body.scale(wallTop, Math.max(1, matterRect.matterW / 1500), 1);
          Body.scale(wallBottom, Math.max(1, matterRect.matterW / 1500), 1);
          Body.scale(wallLeft, 1, Math.max(1, matterRect.matterH / 2000));
          Body.scale(wallRight, 1, Math.max(1, matterRect.matterH / 2000));

          Body.setPosition(wallTop, { x: matterRect.matterW / 2, y: 0 - 490 });
          Body.setPosition(wallBottom, {
            x: matterRect.matterW / 2,
            y: matterRect.matterH + 300,
          });
          Body.setPosition(wallLeft, { x: 0 - 390, y: matterRect.matterH / 2 });
          Body.setPosition(wallRight, {
            x: matterRect.matterW + 390,
            y: matterRect.matterH / 2,
          });
          Body.setPosition(wallMinime, {
            x: (matterRect.matterW / 15) * 5.8,
            y: matterRect.matterH - 210,
          });

          render.canvas.width = matterRect.matterW;
          render.canvas.height = matterRect.matterH;
        }, 100);
      };

      CB_RESIZE = function (e) {
        // debounce
        clearTimeout(debounce_resize);
        debounce_resize = setTimeout(() => {
          deviceCheck.check();
        }, 500);
      };

      window.addEventListener("resize-x", CB_RESIZE);
      deviceCheck.addChangeEvent(resizeCanvas);

      // 초기 스케일 조정
      resizeCanvas();

      // add mouse control
      var mouse = Mouse.create(render.canvas);
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

      Composite.add(world, mouseConstraint);

      // keep the mouse in sync with rendering
      render.mouse = mouse;

      // background drag event flag
      let hitTest = false;
      let cancelTouch = false;

      // an example of using mouse events on a mouse
      Events.on(mouseConstraint, "mousedown", function (event) {
        if (!hitTest) {
          /* type1 */
          mouseConstraint.mouse.element.removeEventListener(
            "touchmove",
            mouseConstraint.mouse.mousemove
          );
          mouseConstraint.mouse.element.removeEventListener(
            "touchstart",
            mouseConstraint.mouse.mousedown
          );
          mouseConstraint.mouse.element.removeEventListener(
            "touchend",
            mouseConstraint.mouse.mouseup
          );
          cancelTouch = true;
        }
      });

      Events.on(mouseConstraint, "mouseup", function (event) {
        /* type1 */
        if (!hitTest) {
          mouseConstraint.mouse.element.addEventListener(
            "touchmove",
            mouseConstraint.mouse.mousemove
          );
          mouseConstraint.mouse.element.addEventListener(
            "touchstart",
            mouseConstraint.mouse.mousedown
          );
          mouseConstraint.mouse.element.addEventListener(
            "touchend",
            mouseConstraint.mouse.mouseup
          );
          cancelTouch = false;
        }

        //Events.off(mouseConstraint, 'mousemove');
        hitTest = false;
        dragBody = null;
      });

      var dragBody = null;

      Events.on(mouseConstraint, "mousemove", function (event) {
        if (dragBody != null) {
          var mousePosition = event.mouse.position;

          // ### object hit test!!..

          if (
            mousePosition.y <= 200 ||
            mousePosition.y >= render.canvas.height - 200 ||
            mousePosition.x <= 20 ||
            mousePosition.x >= render.canvas.width - 20 ||
            (wallMinime.bounds.min.x < mousePosition.x &&
              mousePosition.x < wallMinime.bounds.max.x &&
              wallMinime.bounds.min.y < mousePosition.y &&
              mousePosition.y < wallMinime.bounds.max.y)
          ) {
            event.source.body
              ? (event.source.body.collisionFilter.category = 0x0004)
              : null;
            event.source.constraint.bodyB = null;
            mouseConstraint.mouse.element.dispatchEvent(new Event("mouseup"));
          }
        }
      });

      Events.on(mouseConstraint, "startdrag", function (event) {
        //render.canvas.style.cursor = 'grabbing';
        if (!cancelTouch) {
          hitTest = true;
        }
        dragBody = event.body;
      });

      Events.on(mouseConstraint, "enddrag", function (event) {
        //render.canvas.style.cursor = 'default';
        var xGap = Math.abs(
          event.mouse.mousedownPosition.x - event.mouse.mouseupPosition.x
        );
        var yGap = Math.abs(
          event.mouse.mousedownPosition.y - event.mouse.mouseupPosition.y
        );

        if (hitTest && !event.body.isStatic && Math.max(10, xGap, yGap) == 10) {
          switch (event.body.id) {
            case "Switch":
              if (event.body.plugin.status == "on") {
                event.body.plugin.status = "off";
                event.body.render.sprite.texture = require("@/assets/work/" +
                  event.body.plugin.imgUrl.replace("_on", "_off"));
                resetItemByFilterType(filter, "A");
                filter = "A";
              } else {
                event.body.plugin.status = "on";
                event.body.render.sprite.texture = require("@/assets/work/" +
                  event.body.plugin.imgUrl.replace("_off", "_on"));
                resetItemByFilterType(filter, "all");
                filter = "all";
              }
              shakeScene(engine);
              break;
            default:
              event.body.plugin.linkUrl
                ? router.push({ path: event.body.plugin.linkUrl })
                : null;
              break;
          }
        }
      });
      // fit the render viewport to the scene
      // Render.lookAt(render, {
      //     min: { x: 0, y: 0 },
      //     max: { x: 3800, y: 2000 }
      // });

      // Remove default Prevent event
      mouseConstraint.mouse.element.removeEventListener(
        "mousewheel",
        mouseConstraint.mouse.mousewheel
      );
      mouseConstraint.mouse.element.removeEventListener(
        "DOMMouseScroll",
        mouseConstraint.mouse.mousewheel
      );

      // mouseConstraint.mouse.element.removeEventListener('touchmove', mouseConstraint.mouse.mousemove);
      // mouseConstraint.mouse.element.removeEventListener('touchstart', mouseConstraint.mouse.mousedown);
      // mouseConstraint.mouse.element.removeEventListener('touchend', mouseConstraint.mouse.mouseup);

      //mouseConstraint.mouse.element.addEventListener('touchmove', mouseConstraint.mouse.mousemove);
      //mouseConstraint.mouse.element.addEventListener('touchstart', mouseConstraint.mouse.mousedown);
      //mouseConstraint.mouse.element.addEventListener('touchend', mouseConstraint.mouse.mouseup);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize-x", CB_RESIZE);
      Events.off(mouseConstraint, "mousedown");
      Events.off(mouseConstraint, "mouseup");
      Events.off(mouseConstraint, "mousemove");
      Events.off(mouseConstraint, "startdrag");
      Events.off(mouseConstraint, "enddrag");
      Render.stop(render);
      render = null;
      Runner.stop(runner);
      runner = null;
      Engine.clear(engine);
      engine = null;
      observer.unobserve(boxElement);
      observer = null;
    });

    return {
      self,
      canvasWrap,
      data,
      method,
    };
  },
};
</script>

<style>
#app-ExploreProject {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #171010;
  z-index: 1;
}
#app-ExploreProject.isMobile {
  display: none;
}
#app-ExploreProject .explore-project--canvas {
  padding-bottom: 10em;
}
#app-ExploreProject canvas {
  width: 100%;
  height: auto;
}
#app-ExploreProject .c-horizon-list__top {
  justify-content: space-between;
}
#app-ExploreProject .c-horizon-list__top-btn {
  align-self: center;
}
#app-ExploreProject + .minime-item > .minime {
  margin-top: -0px;
  -webkit-touch-callout: none;
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}
</style>
