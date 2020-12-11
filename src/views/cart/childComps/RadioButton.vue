<template>
    <div class="icon-selector" :class="{'selector-active': checked}">
      <img src="~/assets/img/cart/tick.svg" alt="" />
    </div>
</template>

<script>
	export default {
		name: "RadioButton",
    props: {
		  value: {
		    type: Boolean,
        default: false
      }
    },
    data() {
		  return {
		    checked: this.value
      }
    },
    watch: {
		  value: function (newValue) {
        this.checked = newValue;
      }
    }
	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
