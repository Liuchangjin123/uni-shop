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

			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'amount', 'total']),
			...mapGetters('m_user', ['addstr']),
			...mapState('m_user', ['token']),
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			changeAllState() {
				console.log(this.isFullCheck)
				this.updateAllGoodsState(!this.isFullCheck)
			},
			settlement() {
				if (!this.checkedCount) return uni.$showMsg("请选择要结算的商品")

				if (!this.addstr) return uni.$showMsg("请选择收获地址")

				if (!this.token) return uni.$showMsg("请登录后结算")
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
