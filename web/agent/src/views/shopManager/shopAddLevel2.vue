<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="添加商户">
      <router-link to="/shopAddLevel1" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <el-form :model="ruleForm2" enctype="multipart/form-data" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm shop_content">
      <p class="pub_p">店铺照片</p>
      <div class="label_item1">
        <el-form-item class="el-self-item_class rz-picter" label="" prop="shopImg">
          <!-- <input v-model="ruleForm2.shopImg" placeholder="" class="spec-input"/> -->
          <div class="shoppic_wrap">
            <el-upload
              class="shop_pic"
              action="http://up.handnear.com/upload.aspx?t=custom&r=/"
              :show-file-list="false"
              :on-success="handleShopImg"
              :before-upload="beforeAvatarUpload">
              <img v-if="showShopPic" :src="showShopPic" class="avatar">
              <i v-else :style="{backgroundImage:'url(' + defaultPic + ')'}" class="uppic"></i>
            </el-upload>
            <!-- <input type="file" name="shopimagefile" id="shopimagefile" class="uppic" @change="uploadPic($event, 'shop')" value="" />
            <span href="javascript:;" class="shop_pic" :style="{'backgroundImage':'url('+ruleForm2.shopPic+')'}"></span> -->
          </div>
        </el-form-item>
      </div>
      <div class="label_item2">
        <el-form-item class="el-self-item_class" label="营业面积：" prop="area" required >
          <input v-model="ruleForm2.area" placeholder="请输入面积" class="spec-input"/>
        </el-form-item>
      </div>
      <p class="pub_p"><span style="color: #e33c32">*</span>门店地址</p>
      <div class="label_item3">
        <el-form-item class="el-self-item_class" label="地区" prop="address">
          <el-cascader
              class="cascader"
              :options="cityOptions"
              v-model="citys"
              @change="changeProvince"
              change-on-select
            >
          </el-cascader>
          <el-input @focus="clickAdress" v-model="ruleForm2.address" placeholder="请输入详细地址，不少于5个字" type="text" auto-complete="off" class="address_input el-input"/>
        </el-form-item>
      </div>
      <div class="label_item4">
        <el-form-item class="el-self-item_class" label="法人姓名" prop="layerName" >
          <input v-model="ruleForm2.layerName" placeholder="请输入姓名" class="spec-input"/>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="法人身份证" prop="identity">
          <input v-model="ruleForm2.identity" placeholder="请输入身份证" class="spec-input"/>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="营业执照编号" prop="license">
          <input v-model="ruleForm2.license" placeholder="请输入营业执照号" class="spec-input"/>
        </el-form-item>
      </div>
      <p class="pub_p">证件上传<span style="color: #e33c32">*</span></p>
      <div class="label_item5">
        <div>
          <el-form-item style="padding:0" class="el-self-item_class" label="" prop="idImg1">
            <!-- <input type="file" class="pub_file" name="idimagefile1" id="idimagefile1" @change="uploadPic($event, 'idFront')" value="" /> -->
            <el-upload
              class=""
              action="http://up.handnear.com/upload.aspx?t=custom&r=/"
              :show-file-list="false"
              :on-success="handleIdImg1"
              :before-upload="beforeAvatarUpload">
              <img v-if="showImg1" :src="showImg1">
              <i v-else :style="{backgroundImage:'url(' + defaultPic + ')'}" class="uppic1"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <el-form-item style="padding:0" class="el-self-item_class" label="" prop="idImg2">
            <!-- <input type="file" class="pub_file" name="idimagefile2" id="idimagefile2" @change="uploadPic($event, 'idBack')" value="" /> -->
            <el-upload
              class=""
              action="http://up.handnear.com/upload.aspx?t=custom&r=/"
              :show-file-list="false"
              :on-success="handleIdImg2"
              :before-upload="beforeAvatarUpload">
              <img v-if="showImg2" :src="showImg2">
              <i v-else :style="{backgroundImage:'url(' + defaultPic + ')'}" class="uppic1"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <el-form-item style="padding:0" class="el-self-item_class" label="" prop="licenseImg">
            <!-- <input type="file" class="pub_file" name="licenseimagefile" @change="uploadPic($event, 'license')" id="licenseimagefile" value="" /> -->
             <el-upload
              class=""
              action="http://up.handnear.com/upload.aspx?t=custom&r=/"
              :show-file-list="false"
              :on-success="handleIdImg3"
              :before-upload="beforeAvatarUpload">
              <img v-if="showImg3" :src="showImg3">
              <i v-else :style="{backgroundImage:'url(' + defaultPic + ')'}" class="uppic1"></i>
            </el-upload>
          </el-form-item>
        </div>
      </div>
      <div class="label_item6" style="margin-top:10px;">
        <el-form-item class="el-self-item_class" label="经营模式：" prop="parentMode" required >
          <el-select v-model="ruleForm2.parentMode" placeholder="请选择">
            <el-option
              v-for="item in modeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div v-if="ruleForm2.parentMode === '1'">
            <span style="color: #e33c32">*</span>
            <el-radio-group v-model="ruleForm2.mode">
              <el-radio :label="1">直营</el-radio>
              <el-radio :label="2">加盟</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
      </div>
      <div class="label_item7">
        <el-form-item class="el-self-item_class" label="所属连锁机构" prop="chain" v-if="ruleForm2.parentMode === '1'" required >
          <el-select v-model="ruleForm2.chain" placeholder="请选择">
            <el-option
              v-for="item in chainOptions"
              :key="item.ID"
              :label="item.Title"
              :value="item.ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="系统版本" prop="systemVersion" required >
          <el-select v-model="ruleForm2.systemVersion" @change="handleVersion" placeholder="请选择">
            <el-option
              v-for="item in systemOptions"
              :key="item.ID"
              :label="item.VersionName"
              :value="item.ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="赠送账户：" v-if="accounts">
          {{accounts}}个
        </el-form-item>
        <el-form-item class="el-self-item_class" label="版本费：">
          {{versionFee}}
        </el-form-item>
        <el-form-item class="el-self-item_class" label="账号单价：">
          {{accountPrice}}
        </el-form-item>
      </div>
      <div class="label_item7">
        <el-form-item class="el-self-item_class" label="购买账号：" prop="account">
          <input v-model="ruleForm2.account" placeholder="" class="spec-input"/>
          <span>个</span>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="账号费：">
          {{accountFee}}
        </el-form-item>
        <el-form-item class="el-self-item_class" label="合同总金额：">
          {{contractSum}}
        </el-form-item>
        <el-form-item class="el-self-item_class" label="首付款：" prop="firstPayMent" required >
          <input v-model="ruleForm2.firstPayMent" type="number" auto-complete="off" class="spec-input"/>
          <span>元</span>
          <span style="color:red;font-size:12px;">备用金支付100%，其它方式不低于{{sectionRebate}}%</span>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="备注：" prop="addRemark" >
          <el-input type="textarea" maxlength="20" v-model="ruleForm2.addRemark" placeholder="请输入20字以内备注"  class="spec-input spec-text"></el-input>
        </el-form-item>
      </div>
      <el-form-item label-width="0px" class="el-self-item_class btn_box" v-if="contractSum">
        <mt-button type="primary" :loading="loading" :disabled="paySame" @click.prevent="payHandle(0, 1)">备用金支付</mt-button>
        <mt-button type="primary" class="share_btn" @click.prevent="payHandle(1)">分享付款链接</mt-button>
      </el-form-item>
      <el-form-item label-width="0px" class="el-self-item_class" v-else>
        <el-button type="primary" class="submit" :loading="loading" @click.prevent="payHandle(0)">提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      class="excedd_fee"
      title="分享付款链接"
      :visible.sync="exceddLinkDialog"
      width="80%"
      center>
      <p class="link_tip">付款链接支付不能超过2万，超过请用【备用金支付】或联系掌通宝线下打款（0755-82789072）</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="backDetailPage">以后再付</el-button>
        <el-button type="primary" :loading="loading" :disabled="paySame" @click="payHandle(0, 1)">备用金支付</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import cityOptions from '@/utils/city_data2017_element.js'
import { Indicator, MessageBox } from 'mint-ui'
export default {
  mounted () {
    this.getAgentAppVersion()
  },
  computed: {
    accountFee () {
      return this.accountPrice * this.ruleForm2.account
    },
    contractSum () {
      return this.versionFee + this.accountFee
    },
    paySame () {
      return this.ruleForm2.firstPayMent === '' || this.contractSum !== parseFloat(this.ruleForm2.firstPayMent)
    }
  },
  methods: {
    getAgentAppVersion () {
      var params = {}
      this.$store.dispatch('AgentAppVersionGet', params).then((response) => {
        this.sectionRebate = response.SectionRebate
      }).catch(() => {
      })
    },
    uploadPic (eve, type) {
      let file = eve.target.files[0]
      if (!file) {
        return
      }
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (eve) => {
        if (type === 'shop') {
          this.ruleForm2.shopPic = reader.result
        } else if (type === 'idFront') {
          this.ruleForm2.identityFrontPic = reader.result
        } else if (type === 'idBack') {
          this.ruleForm2.identityBackPic = reader.result
        } else if (type === 'license') {
          this.ruleForm2.licensePic = reader.result
        }
      }
    },
    getAuthCode: function () {
      if (!(/^1\d{10}$/.test(this.ruleForm.mobile))) {
        this.$message.error('请输入正确的手机号')
        return
      }
      this.$store.dispatch('queryVeriCode', {mobile: this.ruleForm.mobile, type: '1'}).then((response) => {
        this.sendAuthCode = false
        this.auth_time = 60
        var timer = setInterval(() => {
          this.auth_time--
          if (this.auth_time <= 0) {
            this.sendAuthCode = true
            clearInterval(timer)
          }
        }, 1000)
      }).catch(() => {
      })
    },
    changeProvince () {
      this.ruleForm2.ProvinceID = this.citys[0] !== undefined ? this.citys[0] : ''
      this.ruleForm2.CityID = this.citys[1] !== undefined ? this.citys[1] : ''
      this.ruleForm2.AreaID = this.citys[2] !== undefined ? this.citys[2] : ''
    },
    clickAdress () {
      if (this.ruleForm2.ProvinceID === 0 || this.ruleForm2.CityID === 0 || this.ruleForm2.AreaID === 0) {
        this.$message.error('请先选择省市区')
      }
    },
    getCascaderObj (val, opt) {
      return val.map(function (value, index, array) {
        for (var itm of opt) {
          if (itm.value === value) { opt = itm.children; return itm }
        }
        return null
      })
    },
    payHandle (type, isSec) {
      if (type === 0) {
        this.submitForm2(type, isSec)
      } else {
        if (this.contractSum > 20000) {
          this.exceddLinkDialog = true
        } else {
          this.submitForm2(type)
        }
      }
    },
    submitForm2 (type, isSec) {
      if (!this.ruleForm2.identityFrontPic && this.versionFee === 0) {
        this.$message.error('请上传身份证正面')
        return false
      } else if (!this.ruleForm2.identityBackPic && this.versionFee === 0) {
        this.$message.error('请上传身份证反面')
        return false
      } else if (!this.ruleForm2.licensePic && this.versionFee === 0) {
        this.$message.error('请上传营业执照')
        return false
      }
      this.$refs['ruleForm2'].validate((valid) => {
        if (valid) {
          Indicator.open()
          let params = {}
          let queryParam = this.$route.query
          params['ShopTitle'] = queryParam.ShopTitle
          params['LinkMan'] = queryParam.LinkMan
          params['Mobile'] = queryParam.Mobile
          params['ShopPic'] = this.ruleForm2.shopPic
          params['ShopSpace'] = this.ruleForm2.area
          params['ProvinceID'] = this.ruleForm2.ProvinceID
          params['CityID'] = this.ruleForm2.CityID
          params['AreaID'] = this.ruleForm2.AreaID
          params['Address'] = this.ruleForm2.address
          params['JuridicalPersonName'] = this.ruleForm2.layerName
          params['JuridicalPersonIDNumber'] = this.ruleForm2.identity
          params['JuridicalPersonIDPic1'] = this.ruleForm2.identityFrontPic
          params['JuridicalPersonIDPic2'] = this.ruleForm2.identityBackPic
          params['BusinessLicenseNumber'] = this.ruleForm2.license
          params['BusinessLicensePic'] = this.ruleForm2.licensePic
          params['LetterID'] = 0
          params['AgentID'] = 0
          // params['ChainType'] = this.ruleForm2.parentMode === '2' ? 0 : this.ruleForm2.mode
          if (this.ruleForm2.parentMode === '1' && this.ruleForm2.mode === '2') {
            params['ChainType'] = 2
          } else {
            params['ChainType'] = this.ruleForm2.parentMode
          }
          params['GroupID'] = this.ruleForm2.parentMode === '1' ? this.ruleForm2.chain : 0
          params['VersionID'] = this.ruleForm2.systemVersion
          params['BuyAccounts'] = this.ruleForm2.account === '' ? 0 : this.ruleForm2.account
          params['FirstPays'] = this.ruleForm2.firstPayMent
          params['PayWay'] = type
          params['MainBusinessName'] = this.$route.query.MainBusiness
          params['Remark'] = this.ruleForm2.addRemark
          if (isSec === 1) {
            params['IsConfirmed'] = false
          } else if (isSec === 2) {
            params['IsConfirmed'] = true
          }
          this.loading = true
          this.$store.dispatch('addShopAccount', params).then((response) => {
            this.loading = false
            Indicator.close()
            if (type === 0) {
              if (response.IsConfirmed) {
                MessageBox({
                  title: '提示',
                  message: response.PayTips,
                  showCancelButton: true
                }).then(action => {
                  if (action === 'confirm') {
                    this.submitForm2(0, 2)
                  }
                })
              } else {
                this.$router.push({ path: '/shopAddSuccess', query: {payTips: response.PayTips} })
              }
            } else {
              var text = this.$route.query.ShopTitle + '付首付款链接'
              var img = ''
              var url = response.QRCodeUrl
              var title = '付首付款链接'
              var platforms = ['2', '28']
              window.plugins.SocialAgent.openShare(function (r) { window.alert('' + r) }, text, img, url, title, platforms)
            }
          }).catch(() => {
            this.loading = false
            Indicator.close()
          })
        }
      })
    },
    handleVersion () {
      this.systemOptions.forEach((curItem) => {
        if (this.ruleForm2.systemVersion === curItem.ID) {
          this.versionFee = curItem.VersionMoneys
          this.accountPrice = curItem.VersionAccountPrice
          this.accounts = curItem.Accounts
        }
      })
    },
    backDetailPage () {
      this.$router.push({ path: '/shopManager' })
    },
    handleShopImg (res, file) {
      this.showShopPic = URL.createObjectURL(file.raw)
      this.ruleForm2.shopPic = res[0].uploadUrl
    },
    handleIdImg1 (res, file) {
      this.showImg1 = URL.createObjectURL(file.raw)
      this.ruleForm2.identityFrontPic = res[0].uploadUrl
    },
    handleIdImg2 (res, file) {
      this.showImg2 = URL.createObjectURL(file.raw)
      this.ruleForm2.identityBackPic = res[0].uploadUrl
    },
    handleIdImg3 (res, file) {
      this.showImg3 = URL.createObjectURL(file.raw)
      this.ruleForm2.licensePic = res[0].uploadUrl
    },
    beforeAvatarUpload (file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isLt10M
    }
  },
  data () {
    var validateMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号不能为空'))
      } else {
        callback()
      }
    }
    var validateNewPersion = (rule, value, callback) => {
      if (!value) {
        callback(new Error('联系人不能为空'))
      } else {
        callback()
      }
    }
    var validateNewCompany = (rule, value, callback) => {
      if (!value) {
        callback(new Error('商户名称不能为空'))
      } else {
        callback()
      }
    }
    var validatearea = (rule, value, callback) => {
      if (!value) {
        callback(new Error('面积不能为空'))
      } else if (isNaN(value)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    var validateaddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入地址'))
      } else if (value.length < 5) {
        callback(new Error('地址不能少于5个字'))
      } else {
        callback()
      }
    }
    var validatelayerName = (rule, value, callback) => {
      if (!value && this.versionFee === 0) {
        callback(new Error('法人姓名不能为空'))
      } else {
        callback()
      }
    }
    var validateidentity = (rule, value, callback) => {
      if (!value && this.versionFee === 0) {
        callback(new Error('法人身份证不能为空'))
      } else {
        callback()
      }
    }
    var validatelicense = (rule, value, callback) => {
      if (!value && this.versionFee === 0) {
        callback(new Error('营业执照编号不能为空'))
      } else {
        callback()
      }
    }
    var validateparentMode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择经营模式'))
      } else {
        callback()
      }
    }
    var validatechain = (rule, value, callback) => {
      if (!value && this.ruleForm2.parentMode === '1') {
        callback(new Error('请选择连锁机构'))
      } else {
        callback()
      }
    }
    var validatesystemVersion = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择系统版本'))
      } else {
        callback()
      }
    }
    // var validateaccount = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请输入账号个数'))
    //   } else {
    //     callback()
    //   }
    // }
    var validatefirstPayMent = (rule, value, callback) => {
      // console.log(this.ruleForm2.systemVersion)
      // if (!value && this.ruleForm2.systemVersion === 2) {
      if (!value) {
        callback(new Error('请输入首付款'))
      } else {
        callback()
      }
    }
    return {
      sectionRebate: 0,
      specHeight: this.$store.getters.statusBarHeight,
      value2: '',
      value3: '',
      modeOptions: [{
        value: '0',
        label: '单店'
      }, {
        value: '1',
        label: '连锁'
      }],
      chainOptions: this.$store.getters.chainList,
      systemOptions: this.$store.getters.versionList,
      cityOptions: cityOptions,
      citys: [],
      selected: '1',
      // 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’
      sendAuthCode: true,
      // 倒计时 计数器
      auth_time: 0,
      versionFee: 0,
      accountPrice: 0,
      accounts: 0,
      exceddLinkDialog: false,
      loading: false,
      defaultPic: 'static/img/add.png',
      showShopPic: '',
      showImg1: '',
      showImg2: '',
      showImg3: '',
      backIsComfirmed: false,
      ruleForm2: {
        mobile: '',
        shopName: '',
        newPersion: '',
        area: '',
        ProvinceID: 0,
        CityID: 0,
        AreaID: 0,
        address: '',
        layerName: '',
        identity: '',
        license: '',
        parentMode: '',
        mode: 1,
        chain: '',
        systemVersion: '',
        account: '',
        firstPayMent: '',
        shopPic: '',
        identityFrontPic: '',
        identityBackPic: '',
        licensePic: '',
        addRemark: ''
      },
      rules2: {
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ],
        newPersion: [
          { validator: validateNewPersion, trigger: 'blur' }
        ],
        shopName: [
          { validator: validateNewCompany, trigger: 'blur' }
        ],
        area: [
          { validator: validatearea, trigger: 'blur' }
        ],
        address: [
          { validator: validateaddress, trigger: 'blur' }
        ],
        layerName: [
          { required: false, validator: validatelayerName, trigger: 'blur' }
        ],
        identity: [
          { required: false, validator: validateidentity, trigger: 'blur' }
        ],
        license: [
          { required: false, validator: validatelicense, trigger: 'blur' }
        ],
        parentMode: [
          { validator: validateparentMode, trigger: 'blur' }
        ],
        chain: [
          { validator: validatechain, trigger: 'blur' }
        ],
        systemVersion: [
          { validator: validatesystemVersion, trigger: 'blur' }
        ],
        // account: [
        //   { validator: validateaccount, trigger: 'blur' }
        // ],
        firstPayMent: [
          { validator: validatefirstPayMent, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.el-form-item{
  margin-bottom: 0;
}
.container-tab {
  margin-top: 5px;
}
.auth_text_blue{
  color: #37bfc8;
}
.auth_text_btn{
  cursor: pointer;
}
.shop_content{
  .pub_p{
    padding: 0 0 10px 10px;
    color: #545454;
  }
  &>div{
    background: #fff;
    .el-self-item_class{
      text-align: right;
      padding: 0 10px;
      margin-bottom: 15px;
      border-bottom: 1px solid #e0e0e0;
      .spec-input {
        border: none;
        width: 70%;
        height: 34px;
        line-height: 34px;
        padding: 0 10px;
        color: #5e5e5e;
        text-align: right;
      }
      .spec-text{
        height:62px;
        padding-right:0;
      }
    }
    .shoppic_wrap{
      width: 90%;
      margin: 0 auto;
      height: 80px;
      text-align: left;
      margin: 10px 0;
      position: relative;
      .uppic{
        position: absolute;
        top: 0;
        left: 0;
        width: 80px;
        height: 80px;
      }
      .shop_pic{
        width: 80px;
        display: inline-block;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        height: 80px;
        border: 1px solid #e0e0e0;
        img{
          width: 80px;
          height: 80px;
        }
        i{
          background-size: cover;
        }
      }
    }
  }
  .label_item5{
    display: flex;
    width: 100%;
    justify-content: space-around;
    &>div{
      width: 80px;
      display: inline-block;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      height: 80px;
      border: 1px solid #e0e0e0;
      position: relative;
      margin: 10px 0 25px;
      .el-self-item_class{
        border-bottom: none;
        .pub_file{
          position: absolute;
          top: 0;
          left: -10px;
          font-size: 0;
          width: 80px;
          height: 80px;
        }
        img{
          width: 80px;
          height: 80px;
        }
        i{
          display: inline-block;
          width: 80px;
          height: 80px;
          background-size:  cover;
        }
      }
      &:nth-child(1){
        position: relative;
        &::after{
          position: absolute;
          text-align: center;
          content: '身份证正面';
          position: absolute;
          top: 80px;
          left: 5%;
          right: 5%;
          font-size: 14px;
          color: #929dab;
        }
      }
      &:nth-child(2){
        position: relative;
        &::after{
          position: absolute;
          text-align: center;
          content: '身份证反面';
          position: absolute;
          top: 80px;
          left: 5%;
          right: 5%;
          font-size: 14px;
          color: #929dab;
        }
      }
      &:nth-child(3){
        position: relative;
        &::after{
          position: absolute;
          text-align: center;
          content: '营业执照';
          position: absolute;
          top: 80px;
          left: 5%;
          right: 5%;
          font-size: 14px;
          color: #929dab;
        }
      }
    }
  }
  .btn_box{
    padding: 10px 0;
    margin-top: 20px;
    display: flex;
    justify-content:center;
    font-size: 14px;
    width: 100%;
    .share_btn{
      background-color: #ffb554;
    }
  }
  .submit{
    // padding: 0px 60px;
    display: block;
    margin: 10px auto 10px;
    width: 90%;
  }
  .mint-button.is-disabled {
    opacity: .4;
  }
}
</style>
<style>
  .shop_content input.el-input__inner{
    border: none;
    text-align: right;
  }
  .address_input input.el-input__inner{
    border-top: 1px solid #e0e0e0;
    text-align:left;
    height: 40px;
    width: 100%;
    overflow: scroll;
    padding: 0;
    margin-bottom: 10px;
    border-radius: 0;
    line-height: 1.5;
    vertical-align: top;
  }
  .excedd_fee .el-dialog__body,.excedd_fee .el-dialog__footer{
    background: #f0f1f5;
  }
  .excedd_fee .el-dialog__body,.excedd_fee .el-dialog__footer{
    background: #f0f1f5;
  }
  .el-message-box{
    width: initial;
  }
</style>
