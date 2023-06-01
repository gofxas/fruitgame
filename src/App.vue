<template >
    <RouterView ></RouterView>
</template>
<script>
export default {
    name:'app'
}
</script>
<style lang="less">
.page {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.centerd {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>