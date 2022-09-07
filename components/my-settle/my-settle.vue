<template>
	<view class="my-settle-container">
		<label class="radio">
			<radio color='#c00000' :checked="isFullCheck" @click="changeAllState" /><text>全选</text>
		</label>
		<view class="amount-box">
			合计：<text class="amount">{{amount.toFixed(2)}}元</text>
		</view>
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				seconds: 3,
				timer: null
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'amount', 'total']),
			...mapGetters('m_user', ['addstr']),
			...mapState('m_user', ['token']),
			...mapState('m_cart', ['cart']),
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user', ['updateRedirectInfo']),
			changeAllState() {
				console.log(this.isFullCheck)
				this.updateAllGoodsState(!this.isFullCheck)
			},
			settlement() {
				if (!this.checkedCount) return uni.$showMsg("请选择要结算的商品")

				if (!this.addstr) return uni.$showMsg("请选择收获地址")

				// if (!this.token) return uni.$showMsg("请登录后结算")
				if (!this.token) return this.delayNavigate()

				this.payOrder()
			},
			// delayNavigate() {
			// 	uni.switchTab({
			// 		url: '/pages/my/my'
			// 	})
			// },
			async payOrder() {
				const orderInfo = {
					// order_price:'this.amount',
					order_price: 0.01,
					consignee_addr: this.addstr,
					goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price
					}))
				}
				const {
					data: res
				} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				console.log(res)
				if (res.meta.status !== 200) return uni.$showMsg('创建订单失败')
				const orderNumber = res.message.order_number

				const {
					data: res2
				} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
					order_number: oederNumber
				})
				if (res2.meta !== 200) return uni.$showMsg("预付订单生成失败")
				const payInfo = res2.message.pay

				const [err, succ] = await uni.requestPayment(payInfo)
				if (err) return uni.$showMsg('订单未支付！')

				const {
					data: res3
				} = await uni.$http.post('https://请求域名/api/public/v1/my/orders/chkOrder', {
					order_number: oederNumber
				})
				if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
				uni.showToast({
					title: '支付完成！',
					icon: 'success'
				})
			},
			delayNavigate() {
				this.showTips(this.seconds)

				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.seconds)
				}, 1000)
			},
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '请登录后再结算！' + n + '秒后跳转到登录页',
					mask: true,
					duration: 1500
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		letf: 0;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		font-size: 14px;
		padding: 0 5px;
		z-index: 999;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #c00000;
				font-weight: bold;
				text-align: center;
			}
		}

		.btn-settle {
			background-color: #c00000;
			height: 50px;
			color: white;
			line-height: 50px;
			padding: 0 30px;
			// min-width: 100px;
			// text-align: center;
		}
	}
</style>
