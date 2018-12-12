<template>
  <section class="component-layout ui-optimat-vue-input-dialog-layout fix lt0 w100"
           :style="{width:windowWidth+'px',height:windowHeight+'px',backgroundColor:showMask?'rgba(0,0,0,0.5)':''}"
           v-show="isShow"
           @click.self="shake=true">
    <div class="dialog-area bg-white shadow fs-middle" :class="[shake?'shake-horizontal':'']">
      <p class="title-area" v-if="title">
        <strong><span>{{title}}</span></strong>
      </p>
      <p class="content-area pdt20" v-if="content">
        <span>{{content}}</span>
      </p>
      <p class="input-area pdt15" :style="{borderBottomColor:primaryColor}">
        <input class="w100 pd10 pdt15 pdb15" :maxlength="maxLength" :placeholder="inputHint"
               v-model="inputContent" title="内容输入"/>
      </p>
      <p class="length-area pdt15">
                <span class="input-warn-message left fs-nano pdl10"
                      v-if="inputWarnMessage"
                      :style="{color:primaryColor}"
                      :class="[warnMessageShake?'shake-horizontal':'']">{{inputWarnMessage}}</span>
        <span class="fs-small" :style="{color:primaryColor}">{{inputContent.length+' / '+maxLength}}</span>
      </p>
      <p class="operation-area pdt10">
                <span class="pdt20 pdl20 mgr20"
                      :style="{color:cancelButtonColor}"
                      @click="cancel">取消</span>
        <span class="pdt20 pdl20"
              :style="{color:confirmButtonColor}"
              @click="confirm">确认</span>
      </p>
    </div>
  </section>
</template>

<script>
  const Component = require('./component');
  export default new Component();
</script>

<style lang="scss" scoped="true">
  /*根字体*/
  @media (min-width: 1025px) {
    html {
      font-size: 28px;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    html {
      font-size: 24px;
    }
  }

  @media (min-width: 376px) and (max-width: 768px) {
    html {
      font-size: 22px;
    }
  }

  @media (min-width: 321px) and (max-width: 375px) {
    html {
      font-size: 20px;
    }
  }

  @media (max-width: 320px) {
    html {
      font-size: 18px;
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    position: relative;
    z-index: 1;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .over-scroll {
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }

  .over-hidden {
    overflow: hidden;
  }

  html, body {
    width: 100%;
    overflow-x: hidden;
    background-color: #ededed;
  }

  input,
  button {
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    border: none;
  }

  input {
    -webkit-appearance: none;
  }

  textarea {
    resize: none;
  }

  input, select, textarea, button {
    height: auto;
  }

  input:focus, select:focus, textarea:focus {
    border-color: #999;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    text-shadow: none;
    outline: none;
  }

  input::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }

  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }

  section {
    display: block;
  }

  ol, ul {
    list-style: none;
  }

  img {
    border: 0;
  }

  a {
    text-decoration: none;
    color: #4b4b57;
    padding: 0;
    margin: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  a:focus, a:active {
    outline: none;
    text-decoration: none;
    color: #4b4b57;
    border: none;
  }

  /**禁用文本选择*/
  li, ul, a, button, p, i {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /**阴影*/

  .shadow {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  }

  .shadow:focus {
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
  }

  .global-layout {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.25);
  }

  /**限制单行文本*/
  .one-line {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /**Android 样式*/

  .clickable {
    background-color: white;
    transition: all 0.3s ease-out;
  }

  .clickable:active {
    background-color: gainsboro;
    transition: all 0.3s ease-out;
  }

  /**尺寸*/

  .h100 {
    height: 100%;
  }

  .w100 {
    width: 100%;
  }

  /**位置*/
  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .abs {
    position: absolute;
  }

  .rel {
    position: relative;
  }

  .fix {
    position: fixed;
  }

  .lt0 {
    left: 0;
    top: 0;
  }

  .lb0 {
    left: 0;
    bottom: 0;
  }

  .rt0 {
    right: 0;
    top: 0;
  }

  .rb0 {
    right: 0;
    bottom: 0;
  }

  /**px转rem*/
  $fontbase: 32px;
  @function rem($px) {
    @return $px / $fontbase * 1rem;
  }

  /**字体大小*/
  $fontSizeNano: rem(18px);
  $fontSizeMini: rem(19px);
  $fontSizeSmall: rem(20px);
  $fontSizeNormal: rem(22px);
  $fontSizeMiddle: rem(24px);
  $fontSizeLarge: rem(26px);
  .fs-nano {
    font-size: $fontSizeNano;
  }

  .fs-mini {
    font-size: $fontSizeMini;
  }

  .fs-small {
    font-size: $fontSizeSmall;
  }

  .fs-normal {
    font-size: $fontSizeNormal;
  }

  .fs-middle {
    font-size: $fontSizeMiddle;
  }

  .fs-large {
    font-size: $fontSizeLarge;
  }

  /**颜色*/
  $red: #F04055;
  $black: #222222;
  $blackLight: #4b4b57;
  $gray: #989898;
  $default: #ededed;
  $white: #FFFFFF;
  $orange: #EE8A1F;
  $blue: #00AAEE;
  $zjyx: #06a0f3;

  * {
    font-size: $fontSizeNormal;
  }

  body {
    color: $blackLight;
  }

  /**文字颜色*/
  .text-red {
    color: $red;
  }

  .text-black {
    color: $black;
  }

  .text-black-light {
    color: $blackLight;
  }

  .text-gray {
    color: $gray;
  }

  .text-default {
    color: $default;
  }

  .text-white {
    color: $white;
  }

  .text-orange {
    color: $orange;
  }

  .text-blue {
    color: $blue;
  }

  .text-zjyx {
    color: $zjyx;
  }

  /**背景颜色*/

  .bg-red {
    background-color: $red;
  }

  .bg-black {
    background-color: $black;
  }

  .bg-black-light {
    background-color: $blackLight;
  }

  .bg-gray {
    background-color: $gray;
  }

  .bg-default {
    background-color: $default;
  }

  .bg-white {
    background-color: $white;
  }

  .bg-orange {
    background-color: $orange;
  }

  .bg-blue {
    background-color: $blue;
  }

  .bg-zjyx {
    background-color: $zjyx;
  }

  /*border*/

  .border-red {
    border-color: $red;
  }

  .border-orange {
    border-color: $orange;
  }

  .border-blue {
    border-color: $blue;
  }

  .border-zjyx {
    border-color: $zjyx;
  }

  /**button*/

  button[type="red"] {
    color: white;
    background-color: $red;
    border-color: $red;
  }

  button[type="black"] {
    color: white;
    background-color: $black;
    border-color: $black;
  }

  button[type="gray"] {
    color: white;
    background-color: $gray;
    border-color: $gray;
  }

  button[type="orange"] {
    color: white;
    background-color: $orange;
    border-color: $orange;
  }

  button[type="blue"] {
    color: white;
    background-color: $blue;
    border-color: $blue;
  }

  button[type="white"] {
    color: #EE8A1F;
    background-color: white;
    border-color: white;
  }

  button[type="zjyx"] {
    color: white;
    background-color: $zjyx;
    border-color: $zjyx;
  }

  button {
    transition: all 0.2s ease-out;
    cursor: pointer;
    display: block;
    text-align: center;
    -webkit-transition: -webkit-box-shadow 0.2s ease-out;
    -moz-transition: -moz-box-shadow 0.2s ease-out;
    -o-transition: box-shadow 0.2s ease-out;
  }

  button[type="black"]:active {
    background-color: rgba(39, 38, 54, 0.8);
  }

  button[type="red"]:active {
    background-color: rgba(240, 66, 88, 0.8);
  }

  button[type="gray"]:active {
    background-color: rgba(204, 204, 204, 0.8);
  }

  button[type="orange"]:active {
    background-color: rgba(238, 138, 31, 0.8);
  }

  button[type="blue"]:active {
    background-color: rgba(0, 170, 238, 0.8);
  }

  button[type="white"]:active {
    background-color: rgba(255, 255, 255, 0.8);
  }

  button[type="zjyx"]:active {
    background-color: rgba(6, 160, 243, 0.8);
  }

  /**尺寸*/
  $s5: rem(5px);
  $s10: rem(10px);
  $s15: rem(15px);
  $s20: rem(20px);
  $s30: rem(30px);
  $s40: rem(40px);
  $s50: rem(50px);
  $s60: rem(60px);
  $s70: rem(70px);
  $s80: rem(80px);
  $s90: rem(90px);
  $s100: rem(100px);
  $s110: rem(110px);
  $s120: rem(120px);

  /*padding*/

  .pd5 {
    padding: $s5;
  }

  .pdt5 {
    padding-top: $s5;
  }

  .pdb5 {
    padding-bottom: $s5;
  }

  .pdl5 {
    padding-left: $s5;
  }

  .pdr5 {
    padding-right: $s5;
  }

  .pd10 {
    padding: $s10;
  }

  .pdt10 {
    padding-top: $s10;
  }

  .pdb10 {
    padding-bottom: $s10;
  }

  .pdl10 {
    padding-left: $s10;
  }

  .pdr10 {
    padding-right: $s10;
  }

  .pd15 {
    padding: $s15;
  }

  .pdt15 {
    padding-top: $s15;
  }

  .pdb15 {
    padding-bottom: $s15;
  }

  .pdl15 {
    padding-left: $s15;
  }

  .pdr15 {
    padding-right: $s15;
  }

  .pd20 {
    padding: $s20;
  }

  .pdt20 {
    padding-top: $s20;
  }

  .pdb20 {
    padding-bottom: $s20;
  }

  .pdl20 {
    padding-left: $s20;
  }

  .pdr20 {
    padding-right: $s20;
  }

  /*margin*/

  .mg5 {
    margin: $s5;
  }

  .mgt5 {
    margin-top: $s5;
  }

  .mgb5 {
    margin-bottom: $s5;
  }

  .mgl5 {
    margin-left: $s5;
  }

  .mgr5 {
    margin-right: $s5;
  }

  .mg10 {
    margin: $s10;
  }

  .mgt10 {
    margin-top: $s10;
  }

  .mgb10 {
    margin-bottom: $s10;
  }

  .mgl10 {
    margin-left: $s10;
  }

  .mgr10 {
    margin-right: $s10;
  }

  .mg15 {
    margin: $s15;
  }

  .mgt15 {
    margin-top: $s15;
  }

  .mgb15 {
    margin-bottom: $s15;
  }

  .mgl15 {
    margin-left: $s15;
  }

  .mgr15 {
    margin-right: $s15;
  }

  .mg20 {
    margin: $s20;
  }

  .mgt20 {
    margin-top: $s20;
  }

  .mgb20 {
    margin-bottom: $s20;
  }

  .mgl20 {
    margin-left: $s20;
  }

  .mgr20 {
    margin-right: $s20;
  }

  $borderStyle: 1px solid #eee;

  .shake-horizontal {
    transform-origin: center center;
    animation-play-state: running;
    animation-name: shake-horizontal;
    animation-duration: 100ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  @keyframes shake-horizontal {
    2% {
      transform: translate(-7px, 0) rotate(0)
    }
    4% {
      transform: translate(-5px, 0) rotate(0)
    }
    6% {
      transform: translate(4px, 0) rotate(0)
    }
    8% {
      transform: translate(-4px, 0) rotate(0)
    }
    10% {
      transform: translate(-6px, 0) rotate(0)
    }
    12% {
      transform: translate(2px, 0) rotate(0)
    }
    14% {
      transform: translate(-5px, 0) rotate(0)
    }
    16% {
      transform: translate(-3px, 0) rotate(0)
    }
    18% {
      transform: translate(2px, 0) rotate(0)
    }
    20% {
      transform: translate(3px, 0) rotate(0)
    }
    22% {
      transform: translate(-2px, 0) rotate(0)
    }
    24% {
      transform: translate(-3px, 0) rotate(0)
    }
    26% {
      transform: translate(-9px, 0) rotate(0)
    }
    28% {
      transform: translate(2px, 0) rotate(0)
    }
    30% {
      transform: translate(7px, 0) rotate(0)
    }
    32% {
      transform: translate(2px, 0) rotate(0)
    }
    34% {
      transform: translate(0px, 0) rotate(0)
    }
    36% {
      transform: translate(-1px, 0) rotate(0)
    }
    38% {
      transform: translate(6px, 0) rotate(0)
    }
    40% {
      transform: translate(-7px, 0) rotate(0)
    }
    42% {
      transform: translate(0px, 0) rotate(0)
    }
    44% {
      transform: translate(-1px, 0) rotate(0)
    }
    46% {
      transform: translate(-2px, 0) rotate(0)
    }
    48% {
      transform: translate(10px, 0) rotate(0)
    }
    50% {
      transform: translate(-8px, 0) rotate(0)
    }
    52% {
      transform: translate(-9px, 0) rotate(0)
    }
    54% {
      transform: translate(9px, 0) rotate(0)
    }
    56% {
      transform: translate(-2px, 0) rotate(0)
    }
    58% {
      transform: translate(-5px, 0) rotate(0)
    }
    60% {
      transform: translate(2px, 0) rotate(0)
    }
    62% {
      transform: translate(-4px, 0) rotate(0)
    }
    64% {
      transform: translate(1px, 0) rotate(0)
    }
    66% {
      transform: translate(-3px, 0) rotate(0)
    }
    68% {
      transform: translate(10px, 0) rotate(0)
    }
    70% {
      transform: translate(4px, 0) rotate(0)
    }
    72% {
      transform: translate(-6px, 0) rotate(0)
    }
    74% {
      transform: translate(-6px, 0) rotate(0)
    }
    76% {
      transform: translate(2px, 0) rotate(0)
    }
    78% {
      transform: translate(-2px, 0) rotate(0)
    }
    80% {
      transform: translate(-6px, 0) rotate(0)
    }
    82% {
      transform: translate(-1px, 0) rotate(0)
    }
    84% {
      transform: translate(-6px, 0) rotate(0)
    }
    86% {
      transform: translate(-5px, 0) rotate(0)
    }
    88% {
      transform: translate(-1px, 0) rotate(0)
    }
    90% {
      transform: translate(-1px, 0) rotate(0)
    }
    92% {
      transform: translate(-1px, 0) rotate(0)
    }
    94% {
      transform: translate(-3px, 0) rotate(0)
    }
    96% {
      transform: translate(-6px, 0) rotate(0)
    }
    98% {
      transform: translate(-6px, 0) rotate(0)
    }
    0%, 100% {
      transform: translate(0, 0) rotate(0)
    }
  }

  .ui-optimat-vue-input-dialog-layout {
    * {
      z-index: inherit;
      font-size: 1.2rem;
    }

    padding: 0 30px;

    .dialog-area {
      padding: $s30;
      margin: 0 auto;
      width: auto;
      min-width: 240px;
      max-width: 640px;

      .title-area {
        span {
          font-size: 1.6rem;
        }
      }

      .content-area {
        span {
          font-size: 1.4rem;
        }
      }

      .operation-area {
        text-align: right;

        span {
          display: inline-block;
        }

        span:hover {
          opacity: 0.75;
        }
      }

      .input-area {
        border-bottom: 1px solid;

        input {
          font-size: 1.3rem;
        }
      }

      .length-area {
        text-align: right;

        .input-warn-message {
          opacity: 0.8;
        }
      }
    }
  }
</style>
