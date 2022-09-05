<template>
	<view>
		<my-address></my-address>

		<!-- 商品列表的标题 -->
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧的文本 -->
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 购物车中商品 -->
		<!-- <block v-for="(goods, i) in cart" :key="i">
			<my-goods :goods="goods" :show-radio="true" @radio-change='radioChangeHandler' :show-num='true'
				@num-change='numberChangeHandler'></my-goods>
		</block> -->

		<uni-swipe-action>
			<block v-for="(goods, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)">
					<my-goods :goods="goods" :show-radio="true" @radio-change='radioChangeHandler' :show-num='true'
						@num-change='numberChangeHandler'></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000',
					}
				}]
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			numberChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			swipeItemClickHandler(goods) {
				this.removeGoodsById(goods.goods_id)
			}
		},
	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;

		}
	}
</style>
