<template>
<div class="col-10 offset-1 col-md-8 offset-xl-2">
  <div class="row m-1 d-block">
    <div class="text-left mt-5">
      <h2 class="font-weight-lighter">Positive Impacts</h2>
      <h4 class="mt-4">Introduction</h4>
      <div class="mt-1">
        Companies create positive impacts through activities that benefit society, their customers, the environment, or that benefit their own employees above and beyond the company's normal responsibilities to provide decent working conditions and
        terms (see diagram below). These impacts help move society towards a future where people and the planet flourish, as described by the United Nations’ Sustainable Development Goals (SDGs). In Future-Fit’s methodology, these kinds of activities
        are called Positive Pursuits (PP).
      </div>
      <img class="w-100" src="@/assets/pi-1.jpeg">
      <h4 class="mt-5">How it works</h4>
      <div class="mt-1">
        The first step is to identify which of the company’s activities might lead to positive impact. First, you will create or edit a list of the company’s activities such as products, services, or projects that generate positive impact in the
        Manage section.
        <img class="w-100" src="@/assets/pi-2.jpeg">
        <h4 class="mt-5">What you'll need</h4>
        <div class="mt-1">
          To complete this section you will want to have the following information available.
        </div>
        <ul class="mt-2">
          <li>Knowledge of the company’s products, services and projects</li>
          <li>An understanding of the company’s customers or product-users</li>
          <li>The company’s financial information from the reporting period</li>
          <li>Any existing information on the company’s social and environmental impacts, if available</li>
        </ul>
      </div>
    </div>
    <router-link :to="{ path: '/positive-impacts/manage' }" class="">
      <button href="#" class="m-5 btn btn-success">Start</button>
    </router-link>
  </div>
</div>
</template>
