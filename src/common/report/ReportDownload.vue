<template>
<div class="report-container h-100 w-100 text-left">

  <div class="row p-3 bg-light m-0 download-nav">
    <div @click="back" class="ml-5 btn btn-outline-secondary">
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
      </svg>
      Back
    </div>

    <div @click="download" :class="{'disabled btn-outline-success': editing || loading}" class="ml-2 btn btn-success">{{loading ? 'Loading...' : 'Download PDF'}}</div>
    <div class="w-100 bg-light">

    </div>
  </div>


  <div class="p-4 text-center" style="margin-top:90px;"> Preview</div>

  <!-- /////////////////////////////////////// -->

  <div class="report-border">
    <div class="report-page">
      <div class="col-10 offset-1">

        <h2 class="weight-100 mt-5 text-center">Impact Benchmark Report</h2>

        <div v-if="editing" class="alert alert-primary" role="alert">
          Company details can be changed in the company section of your
          <a href="#" @click="goto('/profile')">profile</a>
        </div>

        <h3 class="weight-100 mt-5">{{$store.state.company.reporting_period}}</h3>
        <h1 class=""> <b>{{$store.state.company.name}}</b> </h1>

        <h4 class="weight-100">{{$store.state.company.description}} </h4>
        <div class="mt-5 pb-0 pt-1 highlight col-8 offset-2">
          <div class="">
            <dl class="row p-3 pb-0 d-flex justify-content-center">
              <dt class="col-4 offset-1">Industry</dt>
              <dd class="col-6">{{$store.state.company.industry_type}}</dd>
              <dt class="col-4 offset-1">Business Model</dt>
              <dd class="col-6">{{$store.state.company.business_model}}</dd>
              </dd>
            </dl>
          </div>
        </div>


        <div style="height:50px;"></div>

        <div class="mt-5 col-10 offset-1">
          <h5 class="">Contents</h5>
          <div v-for="item in contents">
            {{item.name}}
            <span>{{dots(item.dotCount)}} {{item.page}} </span>
          </div>
        </div>

        <div style="height:70px;"></div>

        <div class="mt-5 highlight" style="line-height:23px;">
          <h5 class="text-center">About The Report</h5>
          <p class="mb-2">
            This report has been prepared by {{$store.state.company.name}} using the Impact Benchmarking Tool, a management and reporting platform developed by Future-Fit Foundation with support from Shell Foundation.
          </p>
          <p class="mb-2">
            This is an in-depth report on the social and environmental impacts delivered by {{$store.state.company.name}} during its reporting period. The report presents {{$store.state.company.name}}’s results in a transparent, quantifiable and
            comparable way explaining the
            Company’s unique impact delivery and environmental, social and governance (“ESG”) related risk areas. It also highlights contributions to the UN Sustainable Development Goals (“SDGs”).
          </p>
          <p class="mb-2">
            All figures have been provided directly by {{$store.state.company.name}}. Unless otherwise indicated,
            <i>these figures have not been subjected to independent assurance</i>.
          </p>

          <h5 class="text-center mt-4">
            Future-Fit
          </h5>
          <p class="mb-2">
            Future-Fit Foundation is a non-profit organisation developing free-to-use tools to help businesses, investors and policy makers respond to today’s challenges.
          </p>
          <p class="mb-2">
            This report is based on a modified version of Future-Fit’s Business Benchmark (the Benchmark), which translates leading, science-based descriptions of conditions needed for people and the environment to flourish into
            business-actionable targets and metrics, enabling companies to track their progress. The positive and negative business outcomes outlined by the Benchmark have been mapped to the SDGs.
          </p>

          <h5 class="text-center mt-4">
            United Nations Sustainable Development Goals (SDGs)
          </h5>
          <p class="mb-2">
            The UN SDGs were created by the member states of the United Nations as the blueprint for countries to achieve a better and more sustainable future for all. They address the global challenges we face, including those related to poverty,
            inequality, climate change, environmental degradation, peace and justice. See Appendix to view the overarching themes of the 17 SDGs.
          </p>
          <p class="mb-2">
            Future-Fit has mapped the Business Benchmark methodology to the SDGs at the level of detail included in the 169 Targets that underpin these 17 Goals.
          </p>
        </div>

      </div>


      <div class="d-flex justify-content-center mt-5">

        <img class="mt-3 align-middle" src="@/assets/ff-logo.png" alt="" width="272" height="72">
        <img class="ml-3 align-middle" src="@/assets/sdg_main.jpeg" alt="" width="572" height="100">

      </div>

    </div>
  </div>



  <!-- /////////////////////////////////////// -->
  <div class="report-border">
    <div class="report-page">
      <div class="d-flex justify-content-center">
        <div class="col-10 ">

          <h2 class="weight-100 mt-5 text-center">
            Positive Impacts
          </h2>
          <p>
            Companies create positive impacts through activities that benefit society, their customers, the environment, or that benefit their own employees above and beyond {{$store.state.company.name}}'s normal responsibilities to provide decent
            working
            conditions and terms. These impacts help move society towards a future where people and the planet flourish, as described in Future-Fit’s methodology and the UN Sustainable Development Goals (SDGs).
          </p>

          <div class="mt-5">
            Positive Contributions to SDGs
          </div>
          <h4 class="weight-100 ">
            Impacts on Individuals
          </h4>
          <p class="mt-4 mb-1">
            These charts show how {{$store.state.company.name}} makes positive contributions to the SDGs through the positive impacts it delivers to individual people.
          </p>
          <p class="mb-1">
            The left chart shows {{$store.state.company.name}}’s positive contributions to the SDGs, and the number of individuals that experience each impact type. If one individual experiences more than one type of impact, they will be counted
            multiple times.
          </p>

          <p>
            The right chart shows the weighted average ‘Intensity’ of these impacts, per SDG. Intensity represents how much change each stakeholder experiences, combining the qualitative measures of Significance, Duration and Proportion of each
            impact.
          </p>

          <div class="text-black-50">
            See Appendix for information on Impact Intensity. For more explanations of charts and concepts, refer to:
            <div>https://help.sfibt.com/Reports-32c05d85d6fd42aba9f081173b41f8eb
            </div>
          </div>

          <pp-stacked :graphData="stacked"></pp-stacked>


          <div class="mt-5">
            Positive Contributions to SDGs
          </div>
          <h4 class="weight-100 mt-5">
            Impacts on Broader Stakeholders
          </h4>
          <div class="">
            This table shows {{$store.state.company.name}}’s contributions to the SDGs through the positive impacts it delivers which have wide-reaching effects, and are not measured in terms of affected individuals.
          </div>


          <div class=" mt-5">
            <pp-chart-2 :forPDF="true" :items="ppChart2Items[0]"></pp-chart-2>
          </div>

          <div v-if="ppChart2Items.length > 1" class="text-center p-0 mt-2">
            ... continued on the next page
          </div>

        </div>

      </div>
    </div>
  </div>



  <!-- /////////////////////////////////////// -->

  <div v-if="ppChart2Items.length > 1" v-for="(page, index) in ppChart2Items.slice(1)">
    <div class="report-border">
      <div class="report-page">
        <div class="d-flex justify-content-center">
          <div class="col-10 ">
            <div class=" mt-3">
              <pp-chart-2 :forPDF="true" :items="page"></pp-chart-2>
            </div>
            <div v-if="ppChart2Items.length !== (index + 2)" class="text-center p-0 mt-2">
              ... continued on the next page
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- /////////////////////////////////////// -->

  <div class="report-border">
    <div class="report-page">
      <div class=" d-flex justify-content-center">
        <div class="col-10">

          <h2 class="weight-100 mt-5 text-center">Potential Impact of Investment</h2>

          <pp-investment :pageOne="true" :forPDF="true" :pageItems="ppInvestmentItems[0]"></pp-investment>

          <div v-if="ppInvestmentItems.length > 1" class="text-center p-0 mt-2">
            ... continued on the next page
          </div>
        </div>

      </div>
    </div>
  </div>


  <!-- /////////////////////////////////////// -->


  <div v-if="ppInvestmentItems.length > 1" v-for="(page, index) in ppInvestmentItems.slice(1)">
    <div class="report-border">
      <div class="report-page">
        <div class="d-flex justify-content-center">
          <div class="col-10 ">

            <div class="row mt-3 chart-font">
              <pp-investment :forPDF="true" :pageItems="page"></pp-investment>
            </div>

            <div v-if="ppInvestmentItems.length !== (index + 2)" class="text-center p-0 mt-2">
              ... continued on the next page
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- /////////////////////////////////////// -->

  <div class="report-border">
    <div class="report-page">
      <div class="d-flex justify-content-center">
        <div class="col-10">

          <h2 class="weight-100 text-center">ESG Risks</h2>
          <p class="">
            All companies can inadvertently create negative impacts on people and the planet through their environmental, social and governance (ESG) policies. This section shows {{$store.state.company.name}}’s performance across ESG topics that all
            companies risk
            negatively impacting by mistake. Tracking relevant data points and acting to mitigate these risks lowers the chance of negative impacts and related financial consequences.
          </p>
          <div class="">
            <be-best-and-worst :progress="beProgress" :awareness="beAwareness" />
          </div>

          <!-- </br>
          </br>
          </br> -->
          </br>
          <div>
            Below is the full list of ESG topics where potential risks exist that apply to {{$store.state.company.name}}, and its progress towards measuring and managing these risks.
          </div>

          <be-overview-table class="" :forPDF="true" :pageItems="beOverviewItems" />

        </div>



      </div>
    </div>
  </div>


  <!-- /////////////////////////////////////// -->
  <div class="report-border">
    <div class="report-page">

      <h2 class="weight-100 text-center">
        Appendix
      </h2>

      <h2 class="mt-5 text-center">
        SDG Goals
      </h2>
      <p class="text-center col-8 offset-2">
        The Sustainable Development Goals (SDGs) are a collection of 17 global goals designed to create a better and more sustainable future for all. The SDGs were set in 2015 at the United Nations General Assembly and are intended to be achieved
        by 2030. Within each goal there are lists of targets which are measured by specific indicators.
      </p>
      <p class="text-center">
        <small>
          More information at - https://sdgs.un.org/goals
        </small>
      </p>

      <div class="d-flex justify-content-center">

        <div class="col-10 ">
          <div class="row row-cols-2">
            <div class="" v-for="sdg in sdgs">
              <div class="row mt-3 text-left">
                <div class="col-2 ">
                  <img width="70" class="float-right" :src="imgUrl(sdg.image)" style="opacity:0.85">
                </div>
                <div class="col-10 pl-0">
                  <h5 class="m-0">{{sdg.title}}</h5>
                  <div>{{sdg.text}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <h2 class="text-center"> Stakeholder Groups </h2>
        <p class="text-center col-8 offset-2">
          Reporting companies are asked to classify the stakeholder group related to each positive outcome. This describes the stakeholder that experiences the social and environmental outcomes being delivered.
        </p>
        <div class="col-10 offset-1 ">
          <div class="row">
            <div class="col" v-for="column in stakeholderGroups">
              <div v-for="item in column">
                <div class="row p-0 m-0 mt-2 text-left">
                  <div>
                    <div class="col-1" style="width:20px;height:70px;" :style="{'background': chartBackgroundColoursDict[item.title]}">
                    </div>
                  </div>
                  <div class="col-11">
                    <h5>{{item.title}}</h5>
                    <div>{{item.text}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>

  <!-- /////////////////////////////////////// -->

  <div class="report-border">
    <div class="report-page">

      <h2 class="mt-5 text-center"> Intensity </h2>
      <p class="text-center col-8 offset-2">
        Intensity represents the degree to which each affected stakeholder experiences a given impact. To calculate this, three factors are assessed. These are combined to create a numeric rating.
      </p>

      <div class="col-10 offset-1 mt-5" v-for="section in intensityInfo">
        <h4 class="">
          {{section.title}}
        </h4>
        <div class="">
          {{section.subtitle}}
        </div>

        <table class="table table-sm mt-3">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Value</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in section.items">
              <td>{{item.title}}</td>
              <td>{{item.value}}</td>
              <td>{{item.text}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="mt-5 text-center"> Glossary </h2>
      <p class="text-center col-8 offset-2">
        A quick list of terms used that benefit from further explanation.
      </p>

      <div class="col-10 offset-1">
        <div class="">
          <!-- <div class="" style="font-size:12px"> -->
          <div class="text-left row">
            <div class="col" v-for="column in glossary">
              <div class="mt-3" v-for="item in column">

                <b>
                  {{item.title}}
                </b>
                <p class="mt-1 mb-1" v-for="line in item.text">
                  {{line}}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- /////////////////////////////////////// -->

  <div class="report-border">
    <div class="report-page">
      <h2 class="mt-3 text-center"> Report Data </h2>
      <p class="text-center">
        T​he tables below show the underlying data used to generate the visuals in this report. This data was entered by {{$store.state.company.name}} via the Impact Benchmarking tool.
      </p>

      <h5 class="mt-5 text-center"> ESG Risks </h5>

      <be-data-table :forPDF="true" :items="rawData_be"></be-data-table>


      <h5 class="mt-5 text-center"> Positive Impacts </h5>

      <div v-for="(page, index) in rawData_pp.slice(0,1)">
        <pp-data-table :forPDF="true" :items="page"></pp-data-table>
        <div v-if="rawData_pp.length > 1" class="text-center p-0 mt-3">
          ... continued on the next page
        </div>
      </div>

    </div>
  </div>

  <!-- /////////////////////////////////////// -->

  <div v-for="(page, index) in rawData_pp.slice(1)">
    <div class="report-border">
      <div class="report-page">
        <pp-data-table :forPDF="true" :items="page"></pp-data-table>
        <div v-if="rawData_pp.length > 1 && rawData_pp.length !== (index + 2)" class="text-center p-0 mt-3">
          ... continued on the next page
        </div>
      </div>
    </div>
  </div>

  <div style="height:100px"> </div>
</div>
</template>

<script>
import ppStacked from '@/common/report/charts/ppStacked'
import ppChart2 from '@/common/report/charts/ppChart2'
import ppInvestment from '@/common/report/charts/ppInvestment'
import ppDataTable from '@/common/report/charts/ppDataTable'
import beDataTable from '@/common/report/charts/beDataTable'
import beBestAndWorst from '@/common/report/charts/beBestAndWorst'
import beOverviewTable from '@/common/report/charts/beOverviewTable'
import { chartBackgroundColoursDict } from '@/common/utils'
import { intensityInfo, glossary, stakeholderGroups, sdgs } from '@/common/report/utils'

import { jsPDF } from "jspdf";
import domtoimage from 'dom-to-image-more';

export default {
  name: 'Report',
  data: function() {
    return {
      stacked: {},
      intensity: {},
      rawData_pp: [],
      rawData_be: [],
      beProgress: [],
      beAwareness: [],
      showModal: false,
      editing: false,
      loading: false,
      ppInvestmentItems: [],
      ppChart2Items: [],
      contents: [],
      beOverviewItems: [],
      sdgs,
      glossary,
      stakeholderGroups,
      chartBackgroundColoursDict,
      intensityInfo
    }
  },
  created: function() {
    this.$store.commit('setShowSidebar', false)
    this.getData()
  },
  watch: {
    '$route': 'getData'
  },
  components: {
    ppStacked,
    // ppIntensity,
    ppChart2,
    ppInvestment,
    beBestAndWorst,
    beOverviewTable,
    ppDataTable,
    beDataTable,
  },
  methods: {
    getData: async function() {
      this.loading = true
      let app = this.$store.state.app
      let params = {
        forPDF: true,
        app
      }
      if (app === 'INVESTOR') {
        params.company_id = this.$route.params.company_id
      }
      await this.$http.get('/report/pp', { params: params }).then((response) => {
        this.ppInvestmentItems = response.data.investment
        this.rawData_pp = response.data.data_table
        this.stacked = response.data.stacked
        this.ppChart2Items = response.data.chart_2
      })
      await this.$http.get('/report/be', { params: params }).then((response) => {
        this.rawData_be = response.data.data_table
        this.beProgress = response.data.best_and_worst.progress
        this.beAwareness = response.data.best_and_worst.awareness
        this.beOverviewItems = response.data.overview
      })
      this.setContents()
      this.loading = false
    },
    setContents: function() {
      let items = [{
          name: 'Introduction',
          dotCount: 188,
          page: 1,
          extraPages: 0
        },
        {
          name: 'Positive Impacts',
          dotCount: 181,
          page: 2,
          extraPages: this.ppChart2Items.length - 1
        },
        {
          name: 'Potential Impact of Investment',
          dotCount: 159,
          page: 3,
          extraPages: this.ppInvestmentItems.length - 1
        },
        {
          name: 'ESG Risks',
          dotCount: 191,
          page: 4,
          extraPages: 0
        },
        {
          name: 'Appendix',
          dotCount: 192,
          page: 5,
          extraPages: 0
        },
        {
          name: 'Report Data',
          dotCount: 188,
          page: 7,
          extraPages: 0
        },
      ]

      let extras = 0

      for (var i = 0; i < items.length; i++) {
        items[i].page += extras
        extras += items[i].extraPages
        if (items[i].page >= 10) {
          items[i].dotCount -= 2
        }
      }

      this.contents = items
    },
    dots: function(count) {
      return Array(count).join('.').trim()
    },
    back: function(count) {
      this.$store.commit('setShowSidebar', true)
      this.$router.push({ path: '/reports' }).catch(err => {})
    },
    imgUrl: function(num) {
      return require('@/assets/sdg_icons/' + `${num}.jpeg`)
    },
    goto: function(path) {
      this.$router.push({ path: path }).catch(err => {})
    },
    edit: function(path) {
      this.editing = !this.editing
    },
    download: async function() {
      this.download_v1()
      // this.download_v2()
    },
    download_v1: async function() {
      if (this.editing) {
        return
      }
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      window.scrollTo(0, 0)
      this.loading = true

      var options = {
        logging: true,
        scale: 1.1,
      }
      var a4_width = 210
      var a4_height = 297
      var pdfOptions = {
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true,
      }

      var pdf = new jsPDF(pdfOptions)
      var page = 1
      pdf.setFontSize(8)

      const addFooter = () => {
        pdf.page = page
        pdf.text(180, 290, 'page ' + pdf.page)
        pdf.text(10, 290, 'Impact Benchmark Report - ' + this.$store.state.company.name)
        page += 1
      }

      const newPage = async function(imgData) {
        pdf.page = page
        if (page > 1) {
          pdf.addPage()
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 290)
        addFooter()
      }
      let pages = document.getElementsByClassName('report-page')

      for (let p of pages) {
        var img = await domtoimage.toJpeg(p, { quality: 1 })
        newPage(img)
      }
      pdf.save(`Impact Benchmark Report - ${this.$store.state.company.name} ${this.$store.state.company.reporting_period}.pdf`)
      this.loading = false
      document.getElementsByTagName('body')[0].style.overflow = 'visible'
    },
    download_v2: async function() {
      if (this.editing) {
        return
      }

      this.loading = true

      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      window.scrollTo(0, 0)

      const addFooter = () => {
        page += 1
      }

      var docDefinition = {
        pageSize: 'A4',
        pageMargins: [0, 0, 50, 0],
        compress: false,
        content: [{}, ],
        styles: {
          header: {
            fontSize: 22,
            // bold: true
          },
        }
      }

      const newPage = async function(imgData) {
        docDefinition.content.push({
          image: imgData,
          width: 610,
          margin: [0, 0, 0, 0],
        })
      }

      let pages = document.getElementsByClassName('report-page')

      for (let p of pages) {
        var img = await domtoimage.toPng(p)
        newPage(img)
      }

      pdfMake.createPdf(docDefinition).download()
      document.getElementsByTagName('body')[0].style.overflow = 'visible'
      this.loading = false
    },
  },
}
</script>

<style>
.download-nav {
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 0
}

.page-footer {
  position: fixed;
  bottom: 10px;
}

.report-container {
  width: 1500px;
}

.report-border {
  margin-left: 50px;
  margin-top: 30px;
  border: 2px solid grey;
  width: 1437px;
}

.report-page {
  height: 2000px;
  width: 1433px;
  background: white;
  padding-top: 50px;
}
</style>
