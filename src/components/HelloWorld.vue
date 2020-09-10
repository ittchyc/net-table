<template>
  <div class="box">
    <h1>生成净值数据</h1>
    <el-form inline class="demo-form-inline">
      <el-form-item>
        <el-select v-model="type" placeholder="请选择">
          <el-option label="随机净值" value="1"></el-option>
          <el-option label="填写净值" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="form.startAt"
          type="date"
          value-format="yyyy/MM/dd"
          placeholder="开始时间"
          default-time="00:00:00">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="条数">
        <el-input v-model="form.num" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" plain :loading="btnLoading" v-if="type === '1'" @click="toExport">导出</el-button>
        <el-button type="info" plain :loading="btnLoading" v-if="type === '2'" @click="toExport2">导出</el-button>
      </el-form-item>
    </el-form>
    <div v-if="type === '2'">
      <el-form class="form-list" inline label-position="left" label-width="80px">
        <el-form-item style="margin-right: 50px">
          <span>{{ form.startAt }}</span>
        </el-form-item>
        <el-form-item>
          <el-input type="number" v-model="defVla"></el-input>
        </el-form-item>
      </el-form>
      <el-form class="form-list" inline label-position="left" label-width="80px" v-for="(item, index) in numList" :key="index">
        <el-form-item style="margin-right: 50px">
          <span>{{ item.date }}</span>
        </el-form-item>
        <el-form-item>
          <el-input type="number" v-model="item.val"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="table" v-show="false">
      <el-table ref="multipleTable2" id="exportTab" :data="arrData" tooltip-effect="light" style="width: 100%" stripe max-height="578">
        <el-table-column prop="data" label="日期:（yyyy/MM/dd)" min-width="500"></el-table-column>
        <el-table-column prop="net" label="单位净值:（最高精度8位)" min-width="500"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import moment from 'moment'
export default {
  data () {
    return {
      defVla: '',
      numList: [],
      arrData: [],
      btnLoading: false,
      type: '1',
      form: {
        startAt: moment().format('YYYY/MM/DD'),
        num: ''
      }
    }
  },
  methods: {
    toExport () {
      if (this.form.startAt && this.form.num) {
        this.btnLoading = true
        let arr = [{ data: this.form.startAt, net: 1 }]
        let timeV = this.form.startAt
        for (let index = 0; index < this.form.num - 1; index++) {
          timeV = moment(timeV).subtract(7, 'days')
          let numNet = Math.random() * 10
          arr.push({
            data: moment(timeV).format('YYYY/MM/DD'),
            net: numNet.toFixed(8)
          })
        }
        this.arrData = arr
        this.confirmExport()
      } else {
        this.$message.error('请填写参数')
      }
    },
    toExport2 () {
      if (this.form.startAt && this.form.num) {
        this.btnLoading = true
        let defv = this.defVla || 1
        let arr = [{ data: this.form.startAt, net: defv }]
        let timeV = this.form.startAt
        for (let index = 0; index < this.form.num - 1; index++) {
          timeV = moment(timeV).subtract(7, 'days')
          let numNet = Number(this.numList[index].val) || 1
          arr.push({
            data: moment(timeV).format('YYYY/MM/DD'),
            net: numNet.toFixed(8)
          })
        }
        this.arrData = arr
        this.confirmExport()
      } else {
        this.$message.error('请填写参数')
      }
    },
    confirmExport () {
      setTimeout(() => {
        let time = moment().format('YYYY-MM-DD')
        /* generate workbook object from table */
        var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
        var wb = XLSX.utils.table_to_book(document.querySelector('#exportTab'), xlsxParam)
        /* get binary string as output */
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `基金产品净值数据-${time}.xlsx`)
        } catch (e) {
          if (typeof console !== 'undefined') {
            console.log(e, wbout)
          }
        }
        setTimeout(() => {
          this.btnLoading = false
        }, 1000)
        return wbout
      }, 1000)
    },
    setList () {
      if (this.type === '2') {
        this.numList = []
        let timeV = this.form.startAt
        for (let index = 0; index < this.form.num - 1; index++) {
          timeV = moment(timeV).subtract(7, 'days')
          this.numList.push({
            val: '',
            date: moment(timeV).format('YYYY/MM/DD')
          })
        }
      }
    }
  },
  created () {
  },
  watch: {
    'form.startAt' () {
      this.setList()
    },
    'form.num' () {
      this.setList()
    },
    'type' () {
      this.setList()
    }
  }
}
</script>

<style lang="less" scoped>
  .box{
    height: 100%;
    padding-top: 30px;
    h1{
      color: #DBB171;
      font-size: 36px;
      margin-bottom: 60px;
      text-shadow: 6px 3px 5px #F5E7C9;
    }
  }
</style>
