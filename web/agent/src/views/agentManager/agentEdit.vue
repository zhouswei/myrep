<template>
  <div class="mian_content">
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="代理商管理">
      <router-link to="/agentManager" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <el-form status-icon ref="ruleForm" class="demo-ruleForm form_wrap">
      <div class="shoperInfo">
        <el-form-item class="el-self-item_class" label="公司名称：" prop="newPersion">
          <span>{{fullName}}</span>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="联系人：" prop="newPersion">
          <span>{{LinkMan}}</span>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="手机号：" prop="newPersion">
          <span>{{mobile}}</span>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="购买版本分润：" prop="nextVersionRebate" required>
          <input v-model="nextVersionRebate" placeholder="%" class="spec-input"/>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="续年费分润：" prop="nextAccountRebate" required>
          <input v-model="nextAccountRebate" placeholder="%" class="spec-input"/>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="购买账号分润：" prop="nextContinuationRebate" required>
          <input v-model="nextContinuationRebate" placeholder="%" class="spec-input"/>
        </el-form-item>
      </div>
      <div class="agent_tip">注意：分润比例不能高于他的上级，不能低于他的下级</div>
      <el-form-item label-width="0px" class="el-self-item_class btn_box">
        <el-button type="primary" class="save-btn" :loading="loading" size="large" @click="editHandle">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fullName: '',
      LinkMan: '',
      mobile: '',
      nextVersionRebate: '',
      nextAccountRebate: '',
      nextContinuationRebate: '',
      loading: false,
      specHeight: this.$store.getters.statusBarHeight
    }
  },
  mounted () {
    this.fullName = this.$route.query.fullName
    this.LinkMan = this.$route.query.LinkMan
    this.mobile = this.$route.query.mobile
    this.nextVersionRebate = Math.round(this.$route.query.nextVersionRebate * 100)
    this.nextAccountRebate = Math.round(this.$route.query.nextAccountRebate * 100)
    this.nextContinuationRebate = Math.round(this.$route.query.nextContinuationRebate * 100)
  },
  methods: {
    editHandle () {
      // let r = /^([1]?\d{1,2})$/
      // if (!r.test(this.nextVersionRebate)) {
      //   this.$message({
      //     type: 'success',
      //     duration: 1500,
      //     showClose: true,
      //     message: '保存成功'
      //   })
      //   return false
      // }
      let params = {}
      params['VersionRebate'] = this.nextVersionRebate / 100
      params['AccountRebate'] = this.nextAccountRebate / 100
      params['ContinuationRebate'] = this.nextContinuationRebate / 100
      params['SubAgentID'] = this.$route.query.agentId
      this.loading = true
      this.$store.dispatch('AgentSubReateSet', params).then((response) => {
        this.loading = false
        if (response.IsError === false) {
          this.$message({
            type: 'success',
            duration: 1500,
            showClose: true,
            message: '保存成功'
          })
          setTimeout(() => {
            this.$router.push('/agentManager')
          }, 1500)
        } else {
          this.$message.error(response.Msg)
        }
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.container-tab {
  margin-top: 5px;
}
.form_wrap {
  .shoperInfo {
    background: #fff;
    padding: 0 10px 15px;
    .el-self-item_class {
      border-bottom: 1px solid #e0e0e0;
      padding: 5px 0;
      text-align: right;
      .spec-input {
        border: none;
        width: 64%;
        height: 34px;
        line-height: 34px;
        padding: 0 10px;
        color: #5e5e5e;
        text-align: right;
      }
    }
  }
  .tip_box{
    margin: 10px;
    font-size: 14px;
    color: #a8a8a8;
  }
}
.btn_box{
  margin-top: 20px;
}
.auth_text_blue {
  color: #37bfc8;
}
.auth_text_btn {
  cursor: pointer;
}
.save-btn {
  display: block;
  margin-top: 10px;
  width: 90%;
  background: #37bfc8;
  margin: 0 auto;
}
.el-form-item__error{
  left: initial;
  right: 0;
}
.el-form-item{
  margin-bottom: 0;
}
.agent_tip{
  margin: 10px 0;
  font-size: 14px;
  text-align: center;
}
</style>
<style>
  .mian_content input.el-input__inner{
    border: none;
    text-align: right;
  }
</style>
