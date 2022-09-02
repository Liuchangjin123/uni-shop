<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 50
				},
				goodsList: [],
				total: 0,
				isLoading: false,
				loadingSuccess: false
			};
		},
		onLoad(options) {
			// console.log(options)
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''

			this.getGoodsList()
		},
		methods: {
			// 获取商品列表数据
			async getGoodsList(cb) {
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isLoading = false
				// console.log(res)
				if (res.meta.status !== 200) {
					return uni.$showMsg
				}
				this.total = res.message.total
				this.goodsList = [...this.goodsList, ...res.message.goods]
				cb && cb()
			},
			gotoDetail(goods) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			}
		},
		onReachBottom() {
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
				if (!this.loadingSuccess) {
					this.loadingSuccess = true
					return uni.$showMsg('数据加载完毕！')
				}
				if (this.loadingSuccess) return

			}
			if (this.isLoading) return
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.loadingSuccess = false
			this.queryObj.pagenum = 1
			this.total = 0
			this.goodsList = []
			this.getGoodsList(() => {
				uni.stopPullDownRefresh()
			})
			// uni.stopPullDownRefresh()
		}
	}
</script>

<style lang="scss">
</style>
