import Vue from 'vue'
import {toCurrency} from '@/common/utils'

Vue.filter('toCurrency', function (value) {
    return toCurrency(value)
})
