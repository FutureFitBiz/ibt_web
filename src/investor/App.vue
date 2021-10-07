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

.divider {
  margin-bottom: 5px;
  height: 1px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
}


.profile-block {
  height: 50px;
}

.weight-100 {
  font-weight: 100;
}

.question-ok {
  text-decoration: underline;
  text-decoration-color: var(--colour-light-green);
  color: var(--colour-dark-green);
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

.divider-lg {
  border-bottom: 4px solid var(--colour-chart-table-divider);
}

.divider-sm {
  border-bottom: 2px solid var(--colour-chart-table-divider);
}

.be-top {
  background: var(--colour-be-gradient-2);
  background-image: linear-gradient(170deg, var(--colour-be-gradient-1) 0%, var(--colour-be-gradient-2) 100%);
}

.be-top-description {
  color: var(--colour-be-text);
}

.setup-top {
  background-image: linear-gradient(120deg, var(--colour-setup-gradient-1) 0%, var(--colour-setup-gradient-2) 100%);
}

.welcome-top {
  background-image: linear-gradient(-225deg, var(--colour-welcome-gradient-1) 0%, var(--colour-welcome-gradient-2) 100%);
  border-radius: 3px 3px 0 0;
}

.setup-top-description {
  color: var(--colour-setup-text);
}

.pp-top {
  background: var(--colour-pp-gradient-1);
  background-image: linear-gradient(to right, var(--colour-pp-gradient-1) 0%, var(--colour-pp-gradient-2) 100%);
}

.pp-top-title {
  color: var(--colour-dark-blue);
}

.pp-top-description {
  color: var(--colour-pp-text);
}
</style>
