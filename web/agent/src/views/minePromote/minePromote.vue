<template>
 <div class="page-lazyload">
   <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="我要推广">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button slot="right" @click="shareclick">分享</mt-button> -->
    </mt-header>
    <!-- <ul class="page-lazyload-list clearfix">
      <li @click="handleClickImg(item)" class="page-lazyload-listitem" v-for="item in list" :key=item.id>
        <img v-lazy="item.letterImages" class="page-lazyload-image">
        <p style="z-index: 1; position:absolute; top:10px;left:10px;">{{item.letterTitle}}</p>
      </li>
    </ul> -->
    <el-row>
      <el-col v-for="item in list" :key="item.id">
        <el-card :body-style="{ padding: '0px' }" shadow="never" class="card">
          <div class="letter">
            <span>{{item.letterTitle}}</span>
          </div>
          <img v-lazy="item.letterImages" @click="handleClickImg(item)" class="image">
        </el-card>
      </el-col>
    </el-row>
    <el-row class="explain">
      说明：
      <p>将上面文章分享出去后，读者点击文章中的版本申请或代理商申请，系统会自动登记为您的商户或下级代理商.</p>
    </el-row>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .page-lazyload-list {
    text-align: center;
    margin-top: 10px;
  }
  .page-lazyload-list {
    .page-lazyload-listitem {
      position: relative;
      margin: 0 auto;
      margin-bottom: 10px;
      background-color: #ddd;
      .page-lazyload-image {
        display: block;
        width: 100%;
      }
      .page-lazyload-image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto
      }
    }
  }
  .explain{
    margin: 20px 30px 20px 30px;
    p{
      color: #666;
    }
  }
  .card {
    border: 0;
    margin-top: 10px;
    padding: 10px 15px;
  }
  .letter{
    padding-bottom: 10px;
    span: {
      font-size: 15px;
    }
  }
  .image{
    width: 100%;
    display: block;
  }
</style>
<script>
export default {
  mounted () {
    this.getMetrialList()
  },
  data () {
    return {
      list: [ {
        text: '343242342',
        url: 'http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg'
      }
      ],
      specHeight: this.$store.getters.statusBarHeight,
      previewUrl: ''
    }
  },
  methods: {
    shareclick () {
      var text = '这是一条分享测试数据'
      var img = 'http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg'
      var url = 'http://www.baidu.com'
      var title = '测试'
      var platforms = ['0', '2', '28']
      window.plugins.SocialAgent.openShare(function (r) { window.alert('' + r) }, text, img, url, title, platforms)
    },
    handleClickImg (index) {
      console.log('1111' + index.letterMobHtml)
      // this.$store.getters.htmlContent = index.letterMobHtml
      this.$store.dispatch('GetHtml', index.letterMobHtml).then((response) => {

      }).catch(() => {

      })
      if (this.previewUrl) {
        index.previewUrl = this.previewUrl.replace('{id}', index.ID)
      } else {
        index.previewUrl = ''
      }
      this.$router.push({ path: '/promoteDetail', query: index })
    },
    getMetrialList () {
      var params = {}
      params['LetterType'] = -1
      params['PageID'] = 1
      params['PageSize'] = 2000
      this.$store.dispatch('GetMetrialList', params).then((response) => {
        if (response.IsError === false) {
          this.list = response.Letters
          this.previewUrl = response.previewUrl
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
