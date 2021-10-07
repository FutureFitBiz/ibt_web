<template>
<div class="col-10 offset-1 col-md-8 offset-xl-2">
  <div class="row m-1 d-block">
    <div class="text-left mt-5">
      <h2 class="font-weight-lighter">ESG Risks</h2>
      <h4 class="mt-4">Introduction</h4>
      <div class="mt-1">
        <p>
          Environmental, Social, and Governance (ESG) refers to the three central factors in understanding the sustainability and societal impact of a company or business. All companies have an effect on people (such as employees, customers, and
          people living near their operations), and on the environment (such as through how their products are disposed, where materials are sourced from, and waste from operations).
        </p>
        <p>
          Different types of company will have larger or smaller risks in different areas, but by understanding how the company is tracking and addressing these topics, we can better anticipate - and work to improve - the future financial performance
          of companies.
        </p>
      </div>

      <h4 class="mt-5">How it works</h4>
      <div class="mt-1">
        There are five Business Areas listed, each containing a list of topics with their own set of questions. It’s possible that one or two topics won’t be applicable to your company. Work through the list to indicate the data the company has on
        each topic, and where possible enter the information requested to show the progress the company has made in mitigating each risk.
      </div>


      <h4 class="mt-5">What you'll need</h4>
      <div class="mt-1">
        To complete this section you will need the following handy. You can always save your progress and come back later!
      </div>
      <ul class="mt-2">
        <li>Access to the company’s operating information from the time period you’re making the report for, including:</li>
        <ul class="mt-2">
          <li>Sales numbers </li>
          <li>Vendor information and purchase levels</li>
          <li>Human resources records</li>
          <li>Company policies </li>
        </ul>
        <li>Information about the products and services the company offered during the period, such as materials included</li>
      </ul>


    </div>

    <router-link :to="{ path: '/esg-risks/business_inputs/energy' }" class="">
      <button href="#" class="m-5 btn btn-success">Start</button>
    </router-link>

  </div>
</div>
</template>
