<template>
  <div class="main"
       @mouseover="show=true"
       @mouseleave="show=false">
    <slot></slot>
    <div class="select" v-show="show" >
      <div v-for="(item,index) in items" :key="index"
           :style="{backgroundColor:styleFlag[index].backgroundColor}"
           @mouseover="styleFlag.splice(index,1,{backgroundColor:$attrs.itemHoverColor})"
           @click="itemClicked(index)"
           @mouseleave="styleFlag.splice(index,1,{backgroundColor:$attrs.itemBgColor})">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectSpan",
  props: ['items'],
  data() {
    let styleFlag=new Array(this.items.length).fill(null).
        map((item)=>{
         return {
            backgroundColor:this.$attrs.itemBgColor
          }
    })
    return {
      show: false,
      styleFlag: styleFlag,
    }
  },
  methods: {
    itemClicked(idx,event) {
      this.$emit('itemClicked', idx)
    },
  },
}
</script>

<style scoped>
.main {
  position: relative;
  cursor: pointer;
}

.select {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 100%;
}

.select > * {
  padding: 5px 10px;
  text-align: center;
  font-size: 0.8em;
  white-space: nowrap;
}
</style>