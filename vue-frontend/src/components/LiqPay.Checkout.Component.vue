<template>
    <form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8" ref="liqpayForm">
      <input type="hidden" name="data" :value="formData.data" />
      <input type="hidden" name="signature" :value="formData.signature" />
      <button type="submit" class="checkout-button">
        {{ $t('checkout.payWithLiqPay') }}
      </button>
    </form>
  </template>
  
  <script>
  import liqpayService from '@/services/liqpayService';
  
  export default {
    props: {
      order: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        formData: {
          data: '',
          signature: ''
        }
      }
    },
    created() {
      this.formData = liqpayService.generatePaymentForm(this.order);
    },
    methods: {
      submit() {
        this.$refs.liqpayForm.submit();
      }
    }
  }
  </script>