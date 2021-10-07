<template>
<div id="app" class="">
  <router-view />
</div>
</template>

<style>
:root {
  --color-pink: #f9b4ab;
  --colour-beige: #fdebd3;
  --colour-dark-blue: #264e70;
  --colour-dark-green: #679186;
  --colour-light-green: #d0e2dd;
  --colour-sidebar-bg: #f8f9fa;
  --colour-sidebar-border: #eee;
  --colour-be-gradient-1: #c1dfc4;
  --colour-be-gradient-2: #bbd4ce;
  --colour-be-text: #264e70;
  --colour-setup-gradient-1: #a1c4fd;
  --colour-setup-gradient-2: #c2e9fb;
  --colour-setup-text: #143160;
  --colour-pp-gradient-1: #ffecd2;
  --colour-pp-gradient-2: #fcb69f;
  --colour-pp-text: #585874;
  --colour-welcome-gradient-1: #7DE2FC;
  --colour-welcome-gradient-2: #B9B6E5;

  --colour-radio: #000000a1;
  --colour-radio-border: #bbbbbb;
  --colour-chart-table-divider: #ccc;
}

.btn-outline-success {}

.bg-warning {
  background-color: #f9d858 !important;
}

.bg-danger {
  background-color: #ff9f9a !important
}

.bg-success {
  background-color: #77d78d !important;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-weight: 300;
}

.bd-callout-success {
  border-left-color: #28a745 !important;
}

.bd-callout-info {
  border-left-color: #5bc0de !important;
}


.bd-callout-secondary {
  border-left-color: #5bc0de;
}

.bd-callout {
  padding: 1.25rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  border: 1px solid #eee;
  border-left-color: rgb(238, 238, 238);
  border-left-width: 1px;
  border-left-width: .25rem;
  border-radius: .25rem;
}

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.noselect:hover {
  text-decoration: none !important;
  cursor: default !important;
}


.ff-blue {
  color: #0092b3 !important;
}

.link-hover {
  cursor: pointer;
}

.link-hover:hover {
  text-decoration: underline;
}


.nav-small {
  font-size: 16px;
}

.nav-help-padding {
  padding: 0 0.25rem 0 0.25rem !important
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.checkbox-indent {
  margin-left: 30px;
}

.checkbox-indent2 {
  margin-left: 60px;
}

.checkbox-indent3 {
  margin-left: 90px;
}

.checkbox-indent4 {
  margin-left: 120px;
}


input[type="radio"] {
  transform: scale(1.5);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  width: 15px;
  height: 15px;
  padding: 3px;
  background-clip: content-box;
  border: 1px solid var(--colour-radio-border);
  border-radius: 50%;
  cursor: pointer;
}

input[type="radio"]:checked {
  background-color: var(--colour-radio);
  padding: 3px;
}


.custom-checkbox .custom-control-label::before {
  transform: scale(1.1);
}

.custom-control-input:checked~.custom-control-label::before {
  transform: scale(1.1);
  border-color: grey !important;
  background: grey !important;
}

.custom-checkbox .custom-control-input:checked~.custom-control-label::after {
  transform: scale(1.3);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e") !important;

}

.custom-control-label {
  cursor: pointer !important;
}

.help-container {
  display: inline-flex;
}


.indent {
  padding-left: 20px;
}

.indent2 {
  padding-left: 40px;
}

.active {
  text-decoration: underline !important;
  text-decoration-color: var(--colour-light-green) !important;
  font-weight: bold;
}

.link {
  color: #2c3e50;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

.greybar {
  border-left: 5px solid grey;
}



.profile-block {
  height: 50px;
}

.weight-100 {
  font-weight: 100;
}

.question-ok-title {
  text-decoration: underline;
  text-decoration-color: var(--colour-light-green);
  color: var(--colour-dark-green) !important;
}

.question-ok-description {
  color: var(--colour-dark-green) !important;
}

.question-unfinished {
  position: absolute;
  left: -10px;
}

.question-unfinished-description {}

.sidebar-status {
  width: 5px;
  height: 14px;
  left: -11px;
  position: absolute;
  border-radius: 10px;
  top: 3px;

}

.sidebar-unfinished {
  background: #ffc336;
  background: #ffc107;
}

.sidebar-finished {
  background: #ffc336;
  background: #ffc107;
}

.crumb {
  color: var(--colour-dark-green);
  cursor: pointer;
}

.crumb:hover {
  text-decoration: underline;
}

.sdg-colour-box {
  font-size: 13px;
  color: white;
  height: 20px;
  width: 20px;
  font-weight: 100;
}

.divider {
  margin-bottom: 5px;
  height: 1px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
}


.divider-lg {
  border-bottom: 4px solid var(--colour-chart-table-divider);
}

.divider-sm {
  border-bottom: 2px solid var(--colour-chart-table-divider);
}

.divider-stakeholder {
  position: relative;
  width: 83.3%;
  left: 16.7%;
  border-bottom: 2px solid var(--colour-chart-table-divider);
}

.divider-stakeholder-dash {
  position: relative;
  width: 83.3%;
  left: 16.7%;
  border-bottom: 2px dashed #f7f7f7;
}

.be-top {
  background: var(--colour-be-gradient-2);
  background-image: linear-gradient(170deg, var(--colour-be-gradient-1) 0%, var(--colour-be-gradient-2));
}

.be-top-description {
  color: var(--colour-be-text);
}

.setup-top {
  background-image: linear-gradient(120deg, var(--colour-setup-gradient-1) 0%, var(--colour-setup-gradient-2));
}

.welcome-top {
  background-image: linear-gradient(-225deg, var(--colour-welcome-gradient-1) 0%, var(--colour-welcome-gradient-2));
  border-radius: 3px 3px 0 0;
}

.setup-top-description {
  color: var(--colour-setup-text);
}

.pp-top {
  background: var(--colour-pp-gradient-1);
  background-image: linear-gradient(to right, var(--colour-pp-gradient-1) 0%, var(--colour-pp-gradient-2));
}

.pp-top-title {
  color: var(--colour-dark-blue);
}

.pp-top-description {
  color: var(--colour-pp-text);
}

.slider {
  -webkit-appearance: none;
  /* width: 100%; */
  height: 7px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #FFF;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #FFF;
  cursor: pointer;
}


.highlight {
  padding: 1.5rem;
  border-radius: .5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #f8f9fa;
}

.category-title {
  color: #264e70;
}

.sidebar-width {
  width: 100%;
  max-width: 280px;
}

.main-menu {
  position: fixed;
  overflow: auto;
  top: 0;
  background: var(--colour-sidebar-bg);
  border-right: 1px solid var(--colour-sidebar-border);
}

.bottom-menu-border {
  border-top: 1px solid #d3d3d369;
}

.bottom-menu {
  position: fixed;
  bottom: 0;
  background: var(--colour-sidebar-bg);
  border-right: 1px solid var(--colour-sidebar-border);
}

#benchmark {
  border-bottom: 2px solid #bbd4ce;
}

.nav-text {
  font-size: .9rem;
}

.arrow {
  font-size: 1.6em;
  line-height: 0px;
}

.nav-hover:hover {
  cursor: pointer;
  text-decoration: underline;
}


.fflogo-sm {
  height: 22px;
  vertical-align: text-top;
}

.ff-link-hover:hover {
  text-decoration: underline;
}

.arrow-inactive {
  color: rgba(0, 0, 0, 0.27) !important;
}

.sidebar {
  text-align: left;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding-right: 18px;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh);
  overflow-x: hidden;
  overflow-y: auto;
}

.nav-icon {
  color: grey;
}

.nav-icon:hover {
  cursor: pointer;
  color: black;
}

.nav-bottom {
  position: fixed;
  bottom: 0;
  left: 5%;
  overflow-x: hidden;
  overflow-y: auto;
}

@media (max-width: 969px) {
  .nav-bottom {
    position: fixed;
    bottom: 0;
    left: 2%;
  }
}

.sidebar-item {
  padding-top: 4px;
  font-size: 100% !important;
}

.sidebar-item span:hover {
  text-decoration: underline;
  cursor: pointer;
}

.alert-not-applicable {
  color: #79858f;
  background-color: #f0f1f2;
  border-color: #d6d8db;
}

dd {
  margin-bottom: .5rem;
  margin-left: 0;
}

.bg-blue {
  background: rgba(54, 162, 235, 0.2) !important;
}

.text-blue {
  color: rgba(22, 102, 155, 0.88) !important;
}

.nav_progress_bar {
  display: flex
}

.nav_progress_bar .progress {
  margin-left: 5px;
  margin-top: 3px;
}
</style>
